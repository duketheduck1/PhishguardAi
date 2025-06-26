import React, { useState } from 'react';
import { Globe, Mail, Phone, Hash, Search, Shield } from 'lucide-react';
import { analyzeThreat, formatThreatLevel, getThreatColor } from '../utils/threatDetection';
import { ScanResult } from '../types';

const ThreatDetectionPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'url' | 'email' | 'phone' | 'area_code'>('url');
  const [input, setInput] = useState('');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const tabs = [
    { id: 'url' as const, label: 'URL', icon: Globe, placeholder: 'Enter URL to scan...' },
    { id: 'email' as const, label: 'Email', icon: Mail, placeholder: 'Enter email address...' },
    { id: 'phone' as const, label: 'Phone', icon: Phone, placeholder: 'Enter phone number...' },
    { id: 'area_code' as const, label: 'Area Code', icon: Hash, placeholder: 'Enter area code...' },
  ];

  const handleScan = async () => {
    if (!input.trim()) return;
    
    setIsScanning(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = analyzeThreat(input, activeTab);
    setScanResult(result);
    setIsScanning(false);
  };

  const getVerdictStyles = (verdict: string) => {
    switch (verdict) {
      case 'safe':
        return 'bg-green-500/20 border-green-500/50 text-green-400';
      case 'suspicious':
        return 'bg-amber-500/20 border-amber-500/50 text-amber-400';
      case 'dangerous':
        return 'bg-red-500/20 border-red-500/50 text-red-400';
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">Threat Detection Scanner</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-900/50 rounded-xl p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setInput('');
                setScanResult(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tabs.find(t => t.id === activeTab)?.placeholder}
            className="w-full bg-gray-900/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
            onKeyPress={(e) => e.key === 'Enter' && handleScan()}
          />
          <button
            onClick={handleScan}
            disabled={!input.trim() || isScanning}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className={`w-4 h-4 text-cyan-400 ${isScanning ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Scan Result */}
        {scanResult && (
          <div className={`rounded-xl border p-4 ${getVerdictStyles(scanResult.verdict)}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold">
                {formatThreatLevel(scanResult.verdict)}
              </span>
              <span className="text-sm opacity-75">
                Confidence: {scanResult.confidence}%
              </span>
            </div>
            
            <p className="text-sm mb-3 opacity-90">
              {scanResult.explanation}
            </p>

            {scanResult.indicators.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium opacity-75">Detected Indicators:</p>
                <div className="flex flex-wrap gap-2">
                  {scanResult.indicators.map((indicator, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-black/20 rounded-md text-xs font-medium"
                    >
                      {indicator}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs mt-3 opacity-50">
              Scanned: {new Date(scanResult.scanTime).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatDetectionPanel;