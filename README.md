# Daily QC Defect Log — Android & Web App

A Quality Control defect tallying app designed for woodshop inspection, real-time defect tracking, and shift auditing.

## 📱 Native Android APK from GitHub

This repository contains an automated **GitHub Actions Workflow** (`.github/workflows/android.yml`) that compiles and builds a native Android APK (`.apk`) every time code is pushed or exported to GitHub.

### How to Download the APK from GitHub:
1. Open this repository on **GitHub**.
2. Click on the **Actions** tab at the top.
3. Click on the latest workflow run named **Build Android APK**.
4. Scroll down to the **Artifacts** section at the bottom of the page.
5. Click **Daily-QC-Defect-Log-Android-APK** to download the zip containing `app-debug.apk`.
6. Transfer `app-debug.apk` to your Android device and tap to install and run natively!

---

## 🛠 Local Android Development with Capacitor

If you want to build and run the APK on your local machine using Android Studio:

### Prerequisites:
- Node.js (v18+)
- Android Studio with Android SDK installed

### Commands:
```bash
# 1. Install dependencies
npm install

# 2. Build the web app and sync with Capacitor
npm run android:sync

# 3. Open project in Android Studio to run on an emulator or physical Android phone
npm run android:open
```

Or build the APK directly via Gradle CLI:
```bash
cd android
./gradlew assembleDebug
```
The compiled APK will be located at `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## 🚀 Web & PWA Mode
You can also run the web app in development or production mode:

```bash
# Start Vite development server
npm run dev

# Production build
npm run build
```
When accessed from Chrome on an Android phone, you can also tap **"Add to Home screen"** to install it as an offline-ready Progressive Web App (PWA).
