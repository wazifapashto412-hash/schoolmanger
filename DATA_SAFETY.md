# Data Safety preparation notes (Google Play Console)

Based on the actual app (verify again if you add features or SDKs):
- Code: one HTML file, no external scripts, no network requests. Only Capacitor core/android libraries are included. No analytics, ads, crash-reporting or login SDKs.
- Data is stored locally only (WebView local storage). The developer receives nothing.

Suggested answers (you must review and submit them yourself):
- Does your app collect or share any of the required user data types? -> **No** (data is processed only on the device and is never sent off the device).
- Is all user data encrypted in transit? -> Not applicable (no data is transmitted).
- Data deletion request mechanism: not applicable, because no data is held by the developer; users delete data inside the app or by uninstalling.
- Ads: **No ads**.
- Privacy policy URL: the public HTTPS page you publish from `PRIVACY_POLICY.md`.
- Target audience: adults / staff (not a children's app). Complete the content-rating questionnaire honestly.
- Not covered by this document: a real-device review of runtime behaviour. Do that before submitting.
