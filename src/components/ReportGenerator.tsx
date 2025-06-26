import React, { useState } from 'react';
import { FileText, Download, Share, Calendar, User, AlertTriangle } from 'lucide-react';

interface ReportData {
  id: string;
  target: string;
  type: string;
  threatLevel: string;
  confidence: number;
  indicators: string[];
  recommendation: string;
  generatedAt: string;
}

const ReportGenerator: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<ReportData | null>(null);
  const [reportFormat, setReportFormat] = useState<'pdf' | 'json' | 'csv'>('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const mockReports: ReportData[] = [
    {
      id: '1',
      target: 'paypa1-security.com',
      type: 'URL',
      threatLevel: 'dangerous',
      confidence: 95,
      indicators: ['Typosquatting', 'SSL Certificate Mismatch', 'Recent Domain Registration'],
      recommendation: 'Block immediately and report to security team',
      generatedAt: '2024-01-21T10:30:00Z',
    },
    {
      id: '2',
      target: 'security@amazom-support.net',
      type: 'Email',
      threatLevel: 'dangerous',
      confidence: 92,
      indicators: ['Domain Spoofing', 'Suspicious TLD', 'Mass Distribution'],
      recommendation: 'Add to spam filter and educate users about this threat',
      generatedAt: '2024-01-21T09:15:00Z',
    },
    {
      id: '3',
      target: '+1-888-555-0199',
      type: 'Phone',
      threatLevel: 'suspicious',
      confidence: 78,
      indicators: ['Toll-Free Spoofing', 'Multiple Reports', 'Robocall Pattern'],
      recommendation: 'Monitor for additional reports and consider blocking',
      generatedAt: '2024-01-21T08:45:00Z',
    },
  ];

  const handleGenerateReport = async () => {
    if (!selectedThreat) return;
    
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create downloadable content
    const reportContent = generateReportContent(selectedThreat, reportFormat);
    downloadReport(reportContent, selectedThreat.target, reportFormat);
    
    setIsGenerating(false);
  };

  const generateReportContent = (threat: ReportData, format: string): string => {
    switch (format) {
      case 'json':
        return JSON.stringify({
          report: {
            id: threat.id,
            generated_at: new Date().toISOString(),
            target: threat.target,
            type: threat.type,
            threat_assessment: {
              level: threat.threatLevel,
              confidence: threat.confidence,
              indicators: threat.indicators,
            },
            recommendation: threat.recommendation,
            ai_analysis: `Advanced AI analysis detected this ${threat.type.toLowerCase()} as ${threat.threatLevel} with ${threat.confidence}% confidence. The system identified multiple threat indicators including ${threat.indicators.join(', ')}.`,
          },
        }, null, 2);
      
      case 'csv':
        return [
          'Target,Type,Threat Level,Confidence,Indicators,Recommendation,Generated At',
          `"${threat.target}","${threat.type}","${threat.threatLevel}",${threat.confidence},"${threat.indicators.join('; ')}","${threat.recommendation}","${new Date().toISOString()}"`,
        ].join('\n');
      
      default: // PDF content as text
        return `
PHISHING THREAT REPORT
Generated: ${new Date().toLocaleString()}

TARGET INFORMATION
Target: ${threat.target}
Type: ${threat.type}
Report ID: ${threat.id}

THREAT ASSESSMENT
Threat Level: ${threat.threatLevel.toUpperCase()}
Confidence Score: ${threat.confidence}%

DETECTED INDICATORS
${threat.indicators.map(indicator => `• ${indicator}`).join('\n')}

AI ANALYSIS
Advanced AI analysis detected this ${threat.type.toLowerCase()} as ${threat.threatLevel} with ${threat.confidence}% confidence. The system identified multiple threat indicators that strongly suggest malicious intent.

RECOMMENDATION
${threat.recommendation}

TECHNICAL DETAILS
Analysis performed using PhishGuard AI v1.2.4
Scan completed at: ${new Date().toISOString()}

This report was generated automatically by the AI-Powered Anti-Phishing System.
        `.trim();
    }
  };

  const downloadReport = (content: string, filename: string, format: string) => {
    const blob = new Blob([content], { 
      type: format === 'json' ? 'application/json' : 
           format === 'csv' ? 'text/csv' : 'text/plain' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `threat-report-${filename.replace(/[^a-zA-Z0-9]/g, '-')}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'dangerous': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'suspicious': return 'text-amber-400 bg-amber-500/20 border-amber-500/50';
      case 'safe': return 'text-green-400 bg-green-500/20 border-green-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">Threat Report Generator</h2>
      </div>

      {/* Recent Scans */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Recent Scans Available for Reporting</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
          {mockReports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedThreat(report)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedThreat?.id === report.id
                  ? 'bg-cyan-500/20 border-cyan-500/50'
                  : 'bg-gray-900/50 border-gray-700/50 hover:border-gray-600/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm text-white">{report.target}</span>
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getThreatColor(report.threatLevel)}`}>
                  {report.threatLevel.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>{report.type}</span>
                <span>{report.confidence}% confidence</span>
                <span>{new Date(report.generatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Configuration */}
      {selectedThreat && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
            <h4 className="font-medium text-white mb-2">Selected Threat</h4>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-cyan-400">{selectedThreat.target}</span>
            </div>
            <p className="text-sm text-gray-400">{selectedThreat.recommendation}</p>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Report Format</label>
              <select
                value={reportFormat}
                onChange={(e) => setReportFormat(e.target.value as any)}
                className="bg-gray-900/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value="pdf">PDF Report</option>
                <option value="json">JSON Data</option>
                <option value="csv">CSV Export</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Actions</label>
              <div className="flex gap-2">
                <button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg border border-cyan-500/30 text-cyan-400 font-medium transition-colors disabled:opacity-50"
                >
                  <Download className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  {isGenerating ? 'Generating...' : 'Generate Report'}
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700/70 rounded-lg border border-gray-600/50 text-gray-300 font-medium transition-colors">
                  <Share className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Template Preview */}
      {selectedThreat && (
        <div className="mt-6 p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
          <h4 className="font-medium text-white mb-3">Report Preview</h4>
          <div className="text-sm text-gray-300 space-y-2 font-mono">
            <div>Target: <span className="text-cyan-400">{selectedThreat.target}</span></div>
            <div>Threat Level: <span className={getThreatColor(selectedThreat.threatLevel).split(' ')[0]}>{selectedThreat.threatLevel.toUpperCase()}</span></div>
            <div>Confidence: <span className="text-white">{selectedThreat.confidence}%</span></div>
            <div>Indicators: <span className="text-amber-400">{selectedThreat.indicators.length} detected</span></div>
            <div>Format: <span className="text-purple-400">{reportFormat.toUpperCase()}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;