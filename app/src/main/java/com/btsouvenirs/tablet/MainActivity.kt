package com.btsouvenirs.tablet

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Intent
import android.content.ClipData
import android.net.Uri
import android.os.Bundle
import android.view.ViewGroup
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.JsResult
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebSettings
import android.widget.FrameLayout
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.webkit.WebViewCompat
import androidx.webkit.WebViewFeature
import androidx.core.content.FileProvider
import org.json.JSONObject
import java.io.File
import java.util.concurrent.Executors

class MainActivity : ComponentActivity() {
    private lateinit var root: FrameLayout
    internal lateinit var webView: WebView
    private lateinit var mirror: MirrorStore
    private lateinit var documents: DocumentOutput
    private val io = Executors.newSingleThreadExecutor()
    private var pendingSave: PendingSave? = null
    private var pendingOpen: String? = null
    private var closing = false

    private data class PendingSave(val id: String, val file: File, val name: String, val mime: String)

    private val saveFile = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        val pending = pendingSave ?: return@registerForActivityResult
        pendingSave = null
        val uri = result.data?.data
        if (result.resultCode != RESULT_OK || uri == null) {
            pending.file.delete()
            reply(pending.id, JSONObject().put("cancelled", true))
        } else io.execute {
            try {
                contentResolver.openOutputStream(uri, "wt").use { out ->
                    requireNotNull(out) { "The selected location cannot be written." }
                    pending.file.inputStream().use { it.copyTo(out) }
                    out.flush()
                }
                runOnUiThread {
                    reply(pending.id, JSONObject().put("saved", true).put("name", pending.name))
                    Toast.makeText(this, "Saved: ${pending.name}", Toast.LENGTH_LONG).show()
                }
            } catch (error: Exception) {
                runOnUiThread { reply(pending.id, error = "Could not save: ${error.message}. Choose another location and retry.") }
            } finally { pending.file.delete() }
        }
    }

    private val openFile = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        val id = pendingOpen ?: return@registerForActivityResult
        pendingOpen = null
        val uri = result.data?.data
        if (result.resultCode != RESULT_OK || uri == null) {
            reply(id, JSONObject().put("cancelled", true))
        } else io.execute {
            try {
                val bytes = contentResolver.openInputStream(uri).use { input ->
                    requireNotNull(input) { "The selected file cannot be read." }
                    val buffer = ByteArray(8192)
                    val output = java.io.ByteArrayOutputStream()
                    while (true) {
                        val count = input.read(buffer)
                        if (count < 0) break
                        require(output.size() + count <= MirrorStore.MAX_BYTES) { "The selected file exceeds 16 MB." }
                        output.write(buffer, 0, count)
                    }
                    output.toByteArray()
                }
                val text = bytes.toString(Charsets.UTF_8).removePrefix("\uFEFF")
                runOnUiThread { reply(id, JSONObject().put("text", text)) }
            } catch (error: Exception) {
                runOnUiThread { reply(id, error = "Could not open: ${error.message}") }
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        WindowCompat.setDecorFitsSystemWindows(window, false)
        WindowCompat.getInsetsController(window, window.decorView).apply {
            isAppearanceLightStatusBars = false
            isAppearanceLightNavigationBars = false
        }
        root = FrameLayout(this).apply { setBackgroundColor(0xff142642.toInt()) }
        setContentView(root)
        ViewCompat.setOnApplyWindowInsetsListener(root) { view, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout())
            val ime = insets.getInsets(WindowInsetsCompat.Type.ime())
            view.setPadding(bars.left, bars.top, bars.right, maxOf(bars.bottom, ime.bottom))
            insets
        }
        mirror = MirrorStore(this)
        documents = DocumentOutput(this, root)
        createWorkspace()
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                val insets = ViewCompat.getRootWindowInsets(root)
                if (insets?.isVisible(WindowInsetsCompat.Type.ime()) == true) {
                    WindowCompat.getInsetsController(window, root).hide(WindowInsetsCompat.Type.ime())
                    return
                }
                webView.evaluateJavascript("window.BTApp ? BTApp.handleBack() : 'blocked'") { result ->
                    if (result == "\"exit\"") confirmExit()
                }
            }
        })
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun createWorkspace() {
        webView = WebView(this)
        configureWebView(webView)
        webView.webViewClient = object : android.webkit.WebViewClient() {
            private val local = LocalContent(this@MainActivity)
            override fun shouldInterceptRequest(view: WebView, request: android.webkit.WebResourceRequest) =
                local.shouldInterceptRequest(view, request)
            override fun shouldOverrideUrlLoading(view: WebView, request: android.webkit.WebResourceRequest) =
                local.shouldOverrideUrlLoading(view, request)
            override fun onRenderProcessGone(view: WebView, detail: RenderProcessGoneDetail): Boolean {
                root.removeView(view)
                view.destroy()
                createWorkspace()
                Toast.makeText(this@MainActivity, "Workspace reloaded. Saved records and drafts are retained.", Toast.LENGTH_LONG).show()
                return true
            }
        }
        webView.webChromeClient = object : WebChromeClient() {
            override fun onJsAlert(view: WebView, url: String, message: String, result: JsResult): Boolean {
                AlertDialog.Builder(this@MainActivity).setMessage(message)
                    .setPositiveButton("OK") { _, _ -> result.confirm() }
                    .setOnCancelListener { result.cancel() }.show()
                return true
            }
            override fun onJsConfirm(view: WebView, url: String, message: String, result: JsResult): Boolean {
                AlertDialog.Builder(this@MainActivity).setMessage(message)
                    .setPositiveButton("Continue") { _, _ -> result.confirm() }
                    .setNegativeButton("Cancel") { _, _ -> result.cancel() }
                    .setOnCancelListener { result.cancel() }.show()
                return true
            }
            override fun onConsoleMessage(message: ConsoleMessage): Boolean {
                if (BuildConfig.DEBUG) android.util.Log.d("BTWebView", "${message.messageLevel()}: ${message.message()} @${message.lineNumber()}")
                return true
            }
        }
        installBridge(webView, "BTNative") { message -> handleMessage(message) }
        root.addView(webView, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
        webView.loadUrl(LocalContent.START_URL)
    }

    @SuppressLint("SetJavaScriptEnabled")
    internal fun configureWebView(view: WebView) {
        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG)
        view.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = false
            allowContentAccess = false
            @Suppress("DEPRECATION")
            allowFileAccessFromFileURLs = false
            @Suppress("DEPRECATION")
            allowUniversalAccessFromFileURLs = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            javaScriptCanOpenWindowsAutomatically = false
            setSupportMultipleWindows(false)
            setSupportZoom(false)
            builtInZoomControls = false
            displayZoomControls = false
            textZoom = 100
            mediaPlaybackRequiresUserGesture = true
            cacheMode = WebSettings.LOAD_DEFAULT
        }
        view.isFocusableInTouchMode = true
    }

    @SuppressLint("JavascriptInterface", "RequiresFeature")
    internal fun installBridge(view: WebView, name: String, handler: (String) -> Unit) {
        if (WebViewFeature.isFeatureSupported(WebViewFeature.WEB_MESSAGE_LISTENER)) {
            WebViewCompat.addWebMessageListener(view, name, setOf(LocalContent.ORIGIN)) { _, message, origin, mainFrame, _ ->
                if (mainFrame && origin.toString().trimEnd('/') == LocalContent.ORIGIN) handler(message.data ?: "")
            }
        } else {
            // Older Android 8 WebViews: all frames, navigation and network content are blocked;
            // the CSP allows only packaged scripts. Check the active URL on the UI thread as well.
            view.addJavascriptInterface(object {
                @JavascriptInterface fun postMessage(message: String) {
                    if (message.length > MirrorStore.MAX_BYTES * 2) return
                    view.post { if (LocalContent.isLocal(Uri.parse(view.url ?: ""))) handler(message) }
                }
            }, name)
        }
    }

    private fun handleMessage(message: String) {
        if (webView.url != LocalContent.START_URL || message.length > MirrorStore.MAX_BYTES * 2) return
        var id = ""
        try {
            val request = JSONObject(message)
            id = request.getString("id")
            require(id.matches(Regex("[a-zA-Z0-9-]{1,80}")))
            val payload = request.optJSONObject("payload") ?: JSONObject()
            when (request.getString("action")) {
                "loadState" -> io.execute {
                    val snapshot = mirror.read()
                    runOnUiThread { reply(id, JSONObject().put("snapshot", snapshot ?: JSONObject.NULL)) }
                }
                "saveState" -> io.execute {
                    try {
                        mirror.write(payload.getString("text"))
                        runOnUiThread { reply(id, JSONObject().put("saved", true)) }
                    } catch (error: Exception) { runOnUiThread { reply(id, error = error.message ?: "Private backup failed.") } }
                }
                "saveText" -> {
                    val name = safeName(payload.getString("name"), ".json")
                    val text = payload.getString("text")
                    require(text.toByteArray(Charsets.UTF_8).size <= MirrorStore.MAX_BYTES) { "File exceeds 16 MB." }
                    io.execute {
                        try {
                            val temp = File.createTempFile("backup-", ".json", cacheDir)
                            temp.writeText(text, Charsets.UTF_8)
                            runOnUiThread { offerSave(id, temp, name, "application/json") }
                        } catch (error: Exception) { runOnUiThread { reply(id, error = error.message ?: "Backup export failed.") } }
                    }
                }
                "openText" -> {
                    require(pendingOpen == null && pendingSave == null) { "Finish the current file operation first." }
                    val kind = payload.getString("kind")
                    require(kind == "json" || kind == "xml" || kind == "customers")
                    pendingOpen = id
                    val types = if (kind == "json") arrayOf("application/json", "text/json", "text/plain", "application/octet-stream")
                        else if (kind == "xml") arrayOf("application/xml", "text/xml", "text/plain", "application/octet-stream")
                        else arrayOf("application/json", "application/xml", "text/xml", "text/plain", "application/octet-stream")
                    try {
                        openFile.launch(Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
                            addCategory(Intent.CATEGORY_OPENABLE)
                            type = "*/*"
                            putExtra(Intent.EXTRA_MIME_TYPES, types)
                            putExtra(Intent.EXTRA_LOCAL_ONLY, true)
                        })
                    } catch (error: Exception) { pendingOpen = null; throw error }
                }
                "pdf", "print", "share" -> {
                    require(pendingOpen == null && pendingSave == null) { "Finish the current file operation first." }
                    val html = payload.getString("html")
                    require(html.length <= 4 * 1024 * 1024 && html.startsWith("<article class=\"paper\">")) { "Invalid document." }
                    documents.start(id, html, safeName(payload.getString("name"), ".pdf"), request.getString("action"))
                }
                else -> throw IllegalArgumentException("Unknown action.")
            }
        } catch (error: Exception) {
            if (id.isNotEmpty()) reply(id, error = error.message ?: "Operation failed.")
        }
    }

    internal fun offerSave(id: String, file: File, name: String, mime: String) {
        if (isFinishing || isDestroyed) { file.delete(); return }
        if (pendingSave != null || pendingOpen != null) { file.delete(); reply(id, error = "Finish the current file operation first."); return }
        pendingSave = PendingSave(id, file, name, mime)
        try {
            saveFile.launch(Intent(Intent.ACTION_CREATE_DOCUMENT).apply {
                addCategory(Intent.CATEGORY_OPENABLE)
                type = mime
                putExtra(Intent.EXTRA_TITLE, name)
                putExtra(Intent.EXTRA_LOCAL_ONLY, true)
            })
        } catch (error: Exception) {
            pendingSave = null
            file.delete()
            reply(id, error = "File picker is unavailable: ${error.message}")
        }
    }

    internal fun reply(id: String, value: JSONObject? = null, error: String? = null) {
        if (isDestroyed) return
        val response = JSONObject().put("id", id).put("value", value ?: JSONObject.NULL)
            .put("error", error ?: JSONObject.NULL)
        webView.evaluateJavascript("window.BTPlatform && BTPlatform.receive($response)", null)
    }

    internal fun sharePdf(id: String, file: File, name: String) {
        if (isFinishing || isDestroyed) return
        val uri = FileProvider.getUriForFile(this, "$packageName.files", file)
        val send = Intent(Intent.ACTION_SEND).apply {
            type = "application/pdf"
            putExtra(Intent.EXTRA_STREAM, uri)
            putExtra(Intent.EXTRA_SUBJECT, name.removeSuffix(".pdf"))
            clipData = ClipData.newRawUri(name, uri)
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
        startActivity(Intent.createChooser(send, "Share PDF · WhatsApp or another app"))
        reply(id, JSONObject().put("shareOpened", true))
    }

    private fun confirmExit() {
        if (closing) return
        closing = true
        AlertDialog.Builder(this).setTitle("Close BT Souvenirs?")
            .setMessage("Your current draft and records are saved on this device.")
            .setPositiveButton("Close app") { _, _ -> finish() }
            .setNegativeButton("Keep working") { _, _ -> closing = false }
            .setOnCancelListener { closing = false }.show()
    }

    override fun onPause() {
        if (::webView.isInitialized) webView.evaluateJavascript("window.BTApp && BTApp.checkpoint()", null)
        super.onPause()
    }

    override fun onDestroy() {
        documents.destroy()
        root.removeAllViews()
        webView.destroy()
        io.shutdown()
        super.onDestroy()
    }

    companion object {
        fun safeName(name: String, suffix: String): String {
            val base = name.removeSuffix(suffix).replace(Regex("[^\\p{L}\\p{N}._ -]"), "_").take(100).trim().trim('.')
            return (base.ifEmpty { "bt-souvenirs" }) + suffix
        }
    }
}
