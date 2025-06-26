import { ScanResult, ThreatItem } from '../types';
import { mockPhishingDatabase } from '../data/mockData';

export const analyzeThreat = (input: string, type: 'url' | 'email' | 'phone' | 'area_code'): ScanResult => {
  const cleanInput = input.toLowerCase().trim();
  
  // Check against known threats
  const knownThreat = mockPhishingDatabase.find(
    threat => threat.type === type && threat.value.toLowerCase().includes(cleanInput)
  );

  if (knownThreat) {
    return {
      id: Date.now().toString(),
      input,
      type,
      verdict: knownThreat.threatLevel,
      confidence: knownThreat.confidence,
      explanation: knownThreat.description,
      indicators: knownThreat.indicators,
      scanTime: new Date().toISOString(),
    };
  }

  // Basic heuristic analysis
  let verdict: 'safe' | 'suspicious' | 'dangerous' = 'safe';
  let confidence = 85;
  let explanation = 'No known threats detected';
  let indicators: string[] = [];

  switch (type) {
    case 'url':
      if (analyzeSuspiciousUrl(cleanInput)) {
        verdict = 'suspicious';
        confidence = 72;
        explanation = 'URL shows suspicious characteristics but is not in known threat database';
        indicators = ['Suspicious Domain Pattern', 'Uncommon TLD'];
      }
      break;
    case 'email':
      if (analyzeSuspiciousEmail(cleanInput)) {
        verdict = 'suspicious';
        confidence = 68;
        explanation = 'Email address shows patterns common in phishing attempts';
        indicators = ['Suspicious Domain', 'Character Substitution'];
      }
      break;
    case 'phone':
      if (analyzeSuspiciousPhone(cleanInput)) {
        verdict = 'suspicious';
        confidence = 64;
        explanation = 'Phone number format associated with scam calls';
        indicators = ['Toll-Free Pattern', 'Sequential Numbers'];
      }
      break;
    case 'area_code':
      if (analyzeSuspiciousAreaCode(cleanInput)) {
        verdict = 'suspicious';
        confidence = 76;
        explanation = 'Area code frequently associated with scam operations';
        indicators = ['High-Risk Region', 'Premium Rate'];
      }
      break;
  }

  return {
    id: Date.now().toString(),
    input,
    type,
    verdict,
    confidence,
    explanation,
    indicators,
    scanTime: new Date().toISOString(),
  };
};

const analyzeSuspiciousUrl = (url: string): boolean => {
  const suspiciousPatterns = [
    /\d+/g, // Contains numbers (often used in typosquatting)
    /secure|verify|update|confirm/i, // Common phishing words
    /\.tk$|\.ml$|\.ga$|\.cf$/i, // Suspicious TLDs
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(url));
};

const analyzeSuspiciousEmail = (email: string): boolean => {
  const suspiciousPatterns = [
    /@.*\d+.*\./g, // Numbers in domain
    /noreply|no-reply|support|security/i, // Common phishing sender names
    /\.tk$|\.ml$|\.ga$|\.cf$/i, // Suspicious TLDs
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(email));
};

const analyzeSuspiciousPhone = (phone: string): boolean => {
  const suspiciousPatterns = [
    /1-800-|1-888-|1-877-/g, // Toll-free numbers
    /(\d)\1{3,}/g, // Repeated digits
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(phone));
};

const analyzeSuspiciousAreaCode = (areaCode: string): boolean => {
  const highRiskCodes = ['+876', '+809', '+900', '+284', '+649'];
  return highRiskCodes.includes(areaCode);
};

export const formatThreatLevel = (level: string): string => {
  switch (level) {
    case 'safe': return '✅ Safe';
    case 'suspicious': return '⚠️ Suspicious';
    case 'dangerous': return '❌ Dangerous';
    default: return '❓ Unknown';
  }
};

export const getThreatColor = (level: string): string => {
  switch (level) {
    case 'safe': return 'text-green-400';
    case 'suspicious': return 'text-amber-400';
    case 'dangerous': return 'text-red-400';
    default: return 'text-gray-400';
  }
};