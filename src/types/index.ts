export interface ThreatItem {
  id: string;
  type: 'url' | 'email' | 'phone' | 'area_code';
  value: string;
  threatLevel: 'safe' | 'suspicious' | 'dangerous';
  confidence: number;
  indicators: string[];
  description: string;
  reportCount: number;
  firstSeen: string;
  lastSeen: string;
  region?: string;
}

export interface ActiveThreat {
  id: string;
  name: string;
  type: 'phishing' | 'scam' | 'malware' | 'spam';
  targets: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedUsers: number;
  firstDetected: string;
  status: 'active' | 'contained' | 'resolved';
  description: string;
}

export interface DetectionStats {
  accuracy: number;
  totalScans: number;
  threatsBlocked: number;
  lastUpdate: string;
  modelVersion: string;
}

export interface ScanResult {
  id: string;
  input: string;
  type: 'url' | 'email' | 'phone' | 'area_code';
  verdict: 'safe' | 'suspicious' | 'dangerous';
  confidence: number;
  explanation: string;
  indicators: string[];
  scanTime: string;
}