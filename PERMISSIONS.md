# Permissions
The app code needs no permissions. The Capacitor Android template adds one by default:
- `android.permission.INTERNET` - added by the template for Capacitor's WebView. This app does not use the internet. Google Play may list it; no dangerous (runtime) permission is requested.

Not requested: location, contacts, camera, microphone, storage, notifications.
The workflow also sets `android:allowBackup="false"` so student data is not copied to cloud backups.
Check the final permissions in the Play Console after upload (the Play Console shows what the AAB declares).
