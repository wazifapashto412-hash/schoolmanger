# Signing guide
You need an **upload key**. With Google Play App Signing, Google keeps the real app-signing key; you sign uploads with the upload key.

1. Create a keystore on a computer with Java (do not do this inside GitHub, and never commit it):
   `keytool -genkeypair -v -keystore upload.jks -alias upload -keyalg RSA -keysize 2048 -validity 10000`
2. Back up `upload.jks` and both passwords in at least two safe places. If lost, recovering needs a Play support request.
3. Convert to text: Linux/Mac `base64 -w 0 upload.jks`  (Windows PowerShell: `[Convert]::ToBase64String([IO.File]::ReadAllBytes("upload.jks"))`).
4. GitHub repo > Settings > Secrets and variables > Actions > New repository secret:
   - `KEYSTORE_BASE64` = the text from step 3
   - `KEY_ALIAS` = `upload` (or your alias)
   - `KEYSTORE_PASSWORD` = keystore password
   - `KEY_PASSWORD` = key password
5. Set your real `appId` first (see README), then run the workflow. The signed files appear in the `school-manager-release-signed` artifact.
Never publish these values. If the app is already on Google Play, confirm your existing signing setup before using a new key.
