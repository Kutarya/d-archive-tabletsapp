package com.btsouvenirs.tablet

import android.os.Bundle
import android.os.CancellationSignal
import android.os.Handler
import android.os.Looper
import android.os.ParcelFileDescriptor
import android.print.PageRange
import android.print.PrintAttributes
import android.print.PrintDocumentAdapter
import android.print.PrintManager
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.graphics.Color
import android.graphics.pdf.PdfDocument
import android.view.View
import java.io.File
import java.util.concurrent.Executors
import kotlin.math.roundToInt
import org.json.JSONObject

/** Dedicated document-only WebView: the application UI never reaches a PDF or print adapter. */
class DocumentOutput(private val activity: MainActivity, private val root: FrameLayout) {
    private var view: WebView? = null
    private val handler = Handler(Looper.getMainLooper())
    private var timeout: Runnable? = null
    private var adapter: PrintDocumentAdapter? = null
    private var activeId: String? = null
    private val outputIo = Executors.newSingleThreadExecutor()
    private var shareDocument: PdfDocument? = null

    fun start(id: String, article: String, name: String, mode: String) {
        check(view == null) { "A document operation is already running." }
        activeId = id
        val printView = WebView(activity)
        view = printView
        activity.configureWebView(printView)
        printView.settings.domStorageEnabled = false
        val local = LocalContent(activity)
        var loaded = false
        var ready = false
        var started = false
        var pageInfo = JSONObject()
        fun beginIfReady() {
            if (!loaded || !ready || started || view !== printView) return
            started = true
            timeout?.let { handler.removeCallbacks(it) }
            if (mode == "share") {
                exportForSharing(id, name, printView, pageInfo)
                return
            }
            val delegate = printView.createPrintDocumentAdapter(name.removeSuffix(".pdf"))
            adapter = delegate
            try {
                // The framework owns its callback constructors. PDF export deliberately uses
                // its supported Save as PDF destination and system document-location picker.
                showPrint(id, name, delegate, mode == "pdf")
            } catch (error: Exception) { fail(id, error.message ?: "Document output failed.") }
        }
        activity.installBridge(printView, "BTPrintReady") { message ->
            try {
                val status = JSONObject(message)
                if (status.has("error")) fail(id, status.getString("error"))
                else if (status.optInt("pages") > 0) { pageInfo = status; ready = true; beginIfReady() }
            } catch (error: Exception) { fail(id, "Could not prepare the A4 document.") }
        }
        printView.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest) = local.shouldInterceptRequest(view, request)
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest) = true
            override fun onPageFinished(view: WebView, url: String) { loaded = true; beginIfReady() }
        }
        // Keep it attached and laid out, underneath the visible workspace, until output completes.
        // 3 physical pixels per CSS pixel yields a consistent 288 dpi shared PDF on every tablet density.
        val density = if (mode == "share") 3f else 1f
        if (mode == "share") printView.setLayerType(View.LAYER_TYPE_SOFTWARE, null)
        root.addView(printView, 0, FrameLayout.LayoutParams((794 * density).roundToInt(), (1123 * density).roundToInt()))
        val initialScale = if (mode == "share") 3f / activity.resources.displayMetrics.density else 1f
        val html = """<!doctype html><html lang="en"><head><meta charset="utf-8">
            <meta name="viewport" content="width=794,initial-scale=$initialScale">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'">
            <link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="print.css">
            </head><body><main id="document">$article</main><script src="paginate.js"></script></body></html>""".trimIndent()
        timeout = Runnable { fail(id, "A4 preparation timed out. Close the preview and retry.") }.also { handler.postDelayed(it, 30_000) }
        printView.loadDataWithBaseURL("${LocalContent.ORIGIN}/assets/print.html", html, "text/html", "UTF-8", null)
    }

    /** Draw the same paginated HTML to a standard PDF canvas; no printer-selection step is needed for sharing. */
    private fun exportForSharing(id: String, name: String, web: WebView, info: JSONObject) {
        val total = info.getInt("pages")
        require(total in 1..200)
        val cssWidth = info.getDouble("pageWidth").toFloat()
        require(cssWidth > 0)
        val document = PdfDocument()
        shareDocument = document
        fun paint(index: Int) {
            if (activeId != id || view !== web) return
            web.evaluateJavascript("window.BTSharePage($index)") {
            web.scrollTo(0, 0)
            web.postVisualStateCallback(index.toLong(), object : WebView.VisualStateCallback() {
                override fun onComplete(requestId: Long) {
                    if (activeId != id || view !== web) return
                    try {
                        val page = document.startPage(PdfDocument.PageInfo.Builder(595, 842, index + 1).create())
                        page.canvas.drawColor(Color.WHITE)
                        page.canvas.save()
                        val factor = 595f / web.width
                        page.canvas.scale(factor, factor)
                        web.draw(page.canvas)
                        page.canvas.restore()
                        document.finishPage(page)
                        if (index + 1 < total) { web.post { paint(index + 1) }; return }
                        val folder = File(activity.cacheDir, "shared/${System.nanoTime()}").apply { mkdirs() }
                        val file = File(folder, name)
                        shareDocument = null
                        outputIo.execute {
                            try {
                                file.outputStream().use { document.writeTo(it) }
                                document.close()
                                activity.runOnUiThread {
                                    close()
                                    try { activity.sharePdf(id, file, name) }
                                    catch (error: Exception) { activity.reply(id, error = "Could not share PDF: ${error.message}") }
                                }
                            } catch (error: Exception) {
                                runCatching { document.close() }
                                activity.runOnUiThread { fail(id, "Could not create PDF: ${error.message}") }
                            }
                        }
                    } catch (error: Exception) { fail(id, "Could not render PDF: ${error.message}") }
                }
            })
            }
        }
        paint(0)
    }

    private fun attributes() = PrintAttributes.Builder()
        .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
        .setResolution(PrintAttributes.Resolution("BT_A4", "A4", 300, 300))
        .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
        .setMinMargins(PrintAttributes.Margins.NO_MARGINS)
        .build()

    private fun showPrint(id: String, name: String, delegate: PrintDocumentAdapter, pdf: Boolean) {
        val manager = activity.getSystemService(PrintManager::class.java)
        val retained = object : PrintDocumentAdapter() {
            override fun onStart() { delegate.onStart() }
            override fun onLayout(old: PrintAttributes?, new: PrintAttributes, signal: CancellationSignal, callback: LayoutResultCallback, extras: Bundle?) {
                delegate.onLayout(old, new, signal, callback, extras)
            }
            override fun onWrite(pages: Array<out PageRange>, destination: ParcelFileDescriptor, signal: CancellationSignal, callback: WriteResultCallback) {
                delegate.onWrite(pages, destination, signal, callback)
            }
            override fun onFinish() { close() }
        }
        manager.print(name.removeSuffix(".pdf"), retained, attributes())
        activity.reply(id, JSONObject().put("dialogOpened", true).put("pdfDestination", pdf))
        if (pdf) android.widget.Toast.makeText(activity,
            "Choose Save as PDF, then tap the PDF button and select a local folder.", android.widget.Toast.LENGTH_LONG).show()
    }

    private fun fail(id: String, message: String) {
        if (activeId != id) return
        close()
        activity.reply(id, error = message)
    }

    fun close() {
        activeId = null
        timeout?.let { handler.removeCallbacks(it) }
        timeout = null
        runCatching { adapter?.onFinish() }
        adapter = null
        runCatching { shareDocument?.close() }
        shareDocument = null
        view?.let { root.removeView(it); it.destroy() }
        view = null
    }

    fun destroy() { close(); outputIo.shutdown() }
}
