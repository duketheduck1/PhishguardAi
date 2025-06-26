# Project Bolt: Phishing Detection and Threat Monitoring

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

## Credits
- Powered by Gemini 2.0 Flash for AI-driven phishing detection.
- Developed as part of the HackTheBrain project.
