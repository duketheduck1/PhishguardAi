# PhishGuard AI: Phishing Detection and Threat Monitoring

This project is a web application designed to help users detect phishing attempts and monitor cybersecurity threats in real time. The application provides several features, including:

- **Threat Detection Panel:** Analyze and identify potential phishing threats.
- **Active Threats Monitor:** View ongoing and recent cybersecurity threats.
- **Effectiveness Tracker:** Track the effectiveness of your security measures.
- **Phishing Database:** Access a database of known phishing attempts.
- **Report Generator:** Generate reports on detected threats and incidents.
- **Contact Section:** Get in touch with support or report new threats.

## Implementation Details

- **Frontend:** Built with React (TypeScript) and styled using Tailwind CSS.
- **Threat Detection:** Utilizes **Gemini 2.0 Flash**, a state-of-the-art AI model, to analyze and check for phishing attempts and other cybersecurity threats. The model provides fast and accurate detection, helping users stay protected against evolving threats.
- **Mock Data:** The application uses mock data for demonstration purposes, which can be replaced with real data sources as needed.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Customization
- To integrate with real threat intelligence feeds or APIs, update the data sources in `src/data/` and the detection logic in `src/utils/threatDetection.ts`.
- For production deployment, follow best practices for securing API keys and sensitive data.

## Firebase Integration

This project leverages **Firebase** to provide real-time, secure, and scalable features alongside Gemini 2.0 Flash AI detection:

### 1. Real-Time Alerts & Notifications
- **Firebase Cloud Messaging (FCM):**
  - Sends instant push notifications when a phishing threat is detected (e.g., "⚠️ Suspicious link detected in email.", "Phishing SMS blocked.").
  - Supports web, Android, and iOS for consistent alerting.

### 2. User Authentication & Security
- **Firebase Auth:**
  - Manages user access to the dashboard with email/password, Google Workspace (SSO), or phone number.
  - Protects admin features, user data, and threat logs with secure roles.

### 3. Threat Logs & Reports
- **Firebase Firestore:**
  - Stores scan results, suspicious entries (URLs, emails, phone numbers), user-submitted reports, and LLM (Gemini) responses.
  - Enables real-time updates for dashboards and active threat feeds.

### 4. Analytics & Monitoring
- **Firebase Analytics:**
  - Tracks user interactions and feature usage to improve detection models and Gemini prompts.

### 5. Hosting the Frontend
- **Firebase Hosting:**
  - Securely deploys the React/Vite frontend with built-in SSL and CDN for fast, reliable access.

### 6. User Reporting System
- Users can report false positives or new phishing threats via Firestore.
- Gemini 2.0 Flash can auto-analyze user-submitted data for threat classification.

---

## 🤖 Firebase + Gemini 2.0 = Real-Time, AI-Powered Protection

### Summary
- **Gemini 2.0** provides intelligent phishing detection and explanations.
- **Firebase** powers real-time alerts, user management, secure data storage, frontend hosting, and coordinated multi-device protection and reporting.

Let us know if you need an architecture diagram or a full Firebase config setup with Gemini integration!

## Credits
- Powered by Gemini 2.0 Flash for AI-driven phishing detection.
- Developed as part of the HackTheBrain project.
