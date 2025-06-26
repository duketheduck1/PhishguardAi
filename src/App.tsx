import React from 'react';
import { Shield, Zap } from 'lucide-react';
import ThreatDetectionPanel from './components/ThreatDetectionPanel';
import EffectivenessTracker from './components/EffectivenessTracker';
import ActiveThreatsMonitor from './components/ActiveThreatsMonitor';
import PhishingDatabase from './components/PhishingDatabase';
import ReportGenerator from './components/ReportGenerator';
import ContactSection from './components/ContactSection';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-800/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                <Shield className="w-6 h-6 text-cyan-400" />
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">PhishGuard AI</h1>
                <p className="text-sm text-gray-400">Advanced Anti-Phishing Security Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-lg border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-400 font-medium">System Online</span>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-white">Security Operations Center</div>
                <div className="text-xs text-gray-400">Last updated: {new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Row */}
          <ThreatDetectionPanel />
          <EffectivenessTracker />
        </div>

        {/* Middle Row - Full Width */}
        <div className="mb-8">
          <ActiveThreatsMonitor />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PhishingDatabase />
          <ReportGenerator />
        </div>

        {/* Contact Section - Full Width */}
        <div className="mb-8">
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700/50 bg-gray-800/30 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span>Powered by PhishGuard AI v1.2.4</span>
              <span>•</span>
              <span>Database updated 3h ago</span>
              <span>•</span>
              <span>99.7% uptime</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="hover:text-white transition-colors">Documentation</button>
              <button className="hover:text-white transition-colors">API</button>
              <button className="hover:text-white transition-colors">Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;