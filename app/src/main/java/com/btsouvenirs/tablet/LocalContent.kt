package com.btsouvenirs.tablet

import android.content.Context
import android.net.Uri
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.webkit.WebViewAssetLoader
import java.io.ByteArrayInputStream

/** There is no network fallback, even for an absent asset or an external subresource. */
class LocalContent(context: Context) : WebViewClient() {
    private val loader = WebViewAssetLoader.Builder()
        .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(context))
        .build()

    override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse =
        if (isLocal(request.url) && request.method == "GET") {
            loader.shouldInterceptRequest(request.url) ?: blocked()
        } else blocked()

    override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean =
        request.url.toString() != START_URL

    companion object {
        const val ORIGIN = "https://appassets.androidplatform.net"
        const val START_URL = "$ORIGIN/assets/index.html"
        fun isLocal(uri: Uri): Boolean = uri.scheme == "https" &&
            uri.host == "appassets.androidplatform.net" && uri.port == -1 &&
            uri.path?.startsWith("/assets/") == true && uri.userInfo == null

        private fun blocked() = WebResourceResponse(
            "text/plain", "UTF-8", 403, "Blocked", mapOf("Cache-Control" to "no-store"),
            ByteArrayInputStream("Only packaged local assets are available.".toByteArray())
        )
    }
}
