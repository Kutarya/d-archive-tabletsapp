import java.util.Properties

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.btsouvenirs.tablet"
    compileSdk = 36
    defaultConfig {
        applicationId = "com.btsouvenirs.tablet"
        minSdk = 26
        targetSdk = 36
        versionCode = 2
        versionName = "1.1.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    val releaseKeys = rootProject.file("signing/release.properties")
    signingConfigs {
        create("tabletRelease") {
            if (releaseKeys.exists()) {
                val keys = Properties().apply { releaseKeys.inputStream().use { load(it) } }
                storeFile = rootProject.file(keys.getProperty("storeFile"))
                storePassword = keys.getProperty("storePassword")
                keyAlias = keys.getProperty("keyAlias")
                keyPassword = keys.getProperty("keyPassword")
            }
        }
    }
    buildTypes {
        debug { isDebuggable = true }
        release {
            if (releaseKeys.exists()) signingConfig = signingConfigs.getByName("tabletRelease")
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
    buildFeatures { buildConfig = true }
    testOptions { animationsDisabled = true }
}

dependencies {
    implementation("androidx.activity:activity-ktx:1.11.0")
    implementation("androidx.webkit:webkit:1.14.0")
    implementation("androidx.core:core-ktx:1.17.0")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.3.0")
    androidTestImplementation("androidx.test:runner:1.7.0")
}
