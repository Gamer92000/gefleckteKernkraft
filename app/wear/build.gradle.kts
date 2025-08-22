plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "cloud.imhof.geflecktekernkraft"
    compileSdk = 35

    defaultConfig {
        applicationId = "cloud.imhof.geflecktekernkraft"
        minSdk = 33
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
}

dependencies {

    implementation(libs.play.services.wearable)
    // lynx dependencies
    implementation(libs.lynx)
    implementation(libs.lynx.jssdk)
    implementation(libs.lynx.trace)
    implementation(libs.primjs)

    // integrating image-service
    implementation(libs.lynx.service.image)

    // image-service dependencies, if not added, images cannot be loaded; if the host APP needs to use other image libraries, you can customize the image-service and remove this dependency
    implementation(libs.fresco)
    implementation(libs.animated.gif)
    implementation(libs.animated.webp)
    implementation(libs.webpsupport)
    implementation(libs.animated.base)

    // integrating log-service
    implementation(libs.lynx.service.log)

    // integrating http-service
    implementation(libs.lynx.service.http)

    implementation(libs.okhttp)
}