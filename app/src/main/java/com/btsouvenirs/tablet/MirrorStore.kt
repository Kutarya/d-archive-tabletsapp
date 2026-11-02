package com.btsouvenirs.tablet

import android.content.Context
import android.util.AtomicFile
import org.json.JSONObject
import java.io.File
import java.security.MessageDigest

/** A second, atomic private copy supplements (and does not replace) the original localStorage schema. */
class MirrorStore(context: Context) {
    private val current = AtomicFile(File(context.filesDir, "records-current.json"))
    private val previous = AtomicFile(File(context.filesDir, "records-previous.json"))

    @Synchronized fun read(): String? = decode(current) ?: decode(previous)

    @Synchronized fun write(payload: String) {
        require(payload.toByteArray(Charsets.UTF_8).size <= MAX_BYTES) { "Backup exceeds 16 MB." }
        val json = JSONObject(payload)
        require(json.getInt("version") == 4 && json.has("settings")) { "Invalid record format." }
        listOf("customers", "products", "categories", "docs").forEach { json.getJSONArray(it) }
        val last = decode(current)
        if (last != null && last != payload) atomicWrite(previous, encode(last))
        atomicWrite(current, encode(payload))
    }

    private fun encode(payload: String) = JSONObject()
        .put("sha256", sha256(payload)).put("payload", payload).toString().toByteArray(Charsets.UTF_8)

    private fun decode(file: AtomicFile): String? = runCatching {
        val bytes = file.openRead().use { it.readBytes() }
        require(bytes.size <= MAX_BYTES * 2)
        val envelope = JSONObject(bytes.toString(Charsets.UTF_8))
        val payload = envelope.getString("payload")
        require(envelope.getString("sha256") == sha256(payload))
        payload
    }.getOrNull()

    private fun atomicWrite(file: AtomicFile, bytes: ByteArray) {
        val stream = file.startWrite()
        try {
            stream.write(bytes)
            file.finishWrite(stream)
        } catch (error: Exception) {
            file.failWrite(stream)
            throw error
        }
    }

    companion object {
        const val MAX_BYTES = 16 * 1024 * 1024
        private fun sha256(text: String): String = MessageDigest.getInstance("SHA-256")
            .digest(text.toByteArray(Charsets.UTF_8)).joinToString("") { "%02x".format(it) }
    }
}
