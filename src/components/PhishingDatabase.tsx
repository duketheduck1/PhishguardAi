import React, { useState } from 'react';
import { Database, Search, Flag, Calendar, MapPin } from 'lucide-react';
import { mockPhishingDatabase } from '../data/mockData';
import { ThreatItem } from '../types';
import { getThreatColor } from '../utils/threatDetection';

const PhishingDatabase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'url' | 'email' | 'phone' | 'area_code'>('all');
  const [threats] = useState<ThreatItem[]>(mockPhishingDatabase);

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         threat.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || threat.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'url': return '🌐';
      case 'email': return '✉️';
      case 'phone': return '📞';
      case 'area_code': return '🔢';
      default: return '❓';
    }
  };

  const getThreatBadge = (level: string) => {
    switch (level) {
      case 'safe':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'suspicious':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'dangerous':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Database className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">Phishing Indicator Database</h2>
        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-md font-medium">
          {threats.length} entries
        </span>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search threats, domains, emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>
        
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as any)}
          className="bg-gray-900/50 border border-gray-600/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50"
        >
          <option value="all">All Types</option>
          <option value="url">URLs</option>
          <option value="email">Emails</option>
          <option value="phone">Phone Numbers</option>
          <option value="area_code">Area Codes</option>
        </select>
      </div>

      {/* Database Entries */}
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredThreats.map((threat) => (
          <div
            key={threat.id}
            className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-lg">{getTypeIcon(threat.type)}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white">{threat.value}</span>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getThreatBadge(threat.threatLevel)}`}>
                      {threat.threatLevel.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{threat.description}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-400 mb-1">
                  <Flag className="w-3 h-3" />
                  <span>{threat.reportCount} reports</span>
                </div>
                <div className="text-xs text-gray-500">
                  Confidence: {threat.confidence}%
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {threat.indicators.map((indicator, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-800/50 rounded-md text-xs text-gray-300"
                >
                  {indicator}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>First seen: {threat.firstSeen}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Last seen: {threat.lastSeen}</span>
                </div>
              </div>
              {threat.region && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{threat.region}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredThreats.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No threats found matching your search criteria</p>
        </div>
      )}

      {/* Add Threat Button */}
      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <button className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg border border-cyan-500/30 text-cyan-400 font-medium transition-colors">
          <Flag className="w-4 h-4" />
          Report New Threat
        </button>
      </div>
    </div>
  );
};

export default PhishingDatabase;