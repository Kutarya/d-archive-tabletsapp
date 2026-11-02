package com.btsouvenirs.tablet

import android.content.Context
import android.content.ContextWrapper
import android.net.Uri
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import androidx.core.content.FileProvider
import org.json.JSONArray
import org.json.JSONObject
import org.junit.Assert.*
import org.junit.Test
import org.junit.runner.RunWith
import java.io.File
import java.util.UUID

@RunWith(AndroidJUnit4::class)
class NativeContractTest {
    @Test fun sharingExposesOnlyGeneratedPdfCacheFiles() {
        val target = InstrumentationRegistry.getInstrumentation().targetContext
        val file = File(target.cacheDir, "shared/provider-contract.pdf").apply { parentFile?.mkdirs(); writeText("contract") }
        try {
            val uri = FileProvider.getUriForFile(target, "${target.packageName}.files", file)
            assertEquals("content", uri.scheme)
            assertEquals("application/pdf", target.contentResolver.getType(uri))
            assertEquals("contract", target.contentResolver.openInputStream(uri)!!.bufferedReader().use { it.readText() })
            try {
                FileProvider.getUriForFile(target, "${target.packageName}.files", File(target.filesDir, "records-current.json"))
                fail("Private customer records must never be available through the PDF provider")
            } catch (_: IllegalArgumentException) { }
        } finally { file.delete() }
    }
    @Test fun atomicMirrorRetainsPreviousValidStateWhenLatestIsCorrupt() {
        val target = InstrumentationRegistry.getInstrumentation().targetContext
        val directory = File(target.cacheDir, "mirror-test-${UUID.randomUUID()}").apply { mkdirs() }
        val context = object : ContextWrapper(target) { override fun getFilesDir() = directory }
        try {
            val store = MirrorStore(context)
            fun payload(marker: String) = JSONObject().put("version", 4)
                .put("settings", JSONObject().put("marker", marker))
                .put("customers", JSONArray()).put("products", JSONArray())
                .put("categories", JSONArray()).put("docs", JSONArray()).toString()
            val first = payload("first")
            val second = payload("second")
            store.write(first)
            assertEquals(first, store.read())
            store.write(second)
            assertEquals(second, store.read())
            File(directory, "records-current.json").writeText("interrupted or corrupt")
            assertEquals(first, store.read())
            try { store.write("{}"); fail("Malformed mirror must be rejected") } catch (_: Exception) { }
            assertEquals(first, store.read())
        } finally { directory.deleteRecursively() }
    }

    @Test fun onlyPackagedHttpsOriginIsTrusted() {
        assertTrue(LocalContent.isLocal(Uri.parse(LocalContent.START_URL)))
        for (url in listOf("https://example.com/assets/index.html", "http://appassets.androidplatform.net/assets/index.html",
            "https://appassets.androidplatform.net:443/assets/index.html", "https://user@appassets.androidplatform.net/assets/index.html",
            "file:///android_asset/index.html", "content://local/index.html", "https://appassets.androidplatform.net/untrusted/index.html")) {
            assertFalse(url, LocalContent.isLocal(Uri.parse(url)))
        }
    }

    @Test fun filenamesAreBoundedAndCannotEscapeTheSelectedSafDocument() {
        val name = MainActivity.safeName("../../test/Český-Şirket.pdf", ".pdf")
        assertFalse(name.contains('/'))
        assertFalse(name.contains('\\'))
        assertTrue(name.endsWith(".pdf"))
        assertTrue(MainActivity.safeName("a".repeat(1000), ".json").length <= 105)
    }
}
