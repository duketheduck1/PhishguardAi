import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users, Calendar, Activity, Filter } from 'lucide-react';
import { mockActiveThreats } from '../data/mockData';
import { ActiveThreat } from '../types';

const ActiveThreatsMonitor: React.FC = () => {
  const [threats, setThreats] = useState<ActiveThreat[]>(mockActiveThreats);
  const [filter, setFilter] = useState<'all' | 'active' | 'high' | 'critical'>('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-400 bg-red-500/20';
      case 'contained': return 'text-yellow-400 bg-yellow-500/20';
      case 'resolved': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const filteredThreats = threats.filter(threat => {
    switch (filter) {
      case 'active': return threat.status === 'active';
      case 'high': return threat.severity === 'high';
      case 'critical': return threat.severity === 'critical';
      default: return true;
    }
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setThreats(prev => prev.map(threat => ({
        ...threat,
        affectedUsers: threat.status === 'active' 
          ? threat.affectedUsers + Math.floor(Math.random() * 10)
          : threat.affectedUsers
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">Active Threats Monitor</h2>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-xs text-red-400">LIVE</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-gray-900/50 border border-gray-600/50 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">All Threats</option>
            <option value="active">Active Only</option>
            <option value="high">High Severity</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredThreats.map((threat) => (
          <div
            key={threat.id}
            className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">{threat.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{threat.description}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                  {threat.severity.toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(threat.status)}`}>
                  {threat.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Type:</span>
                <p className="text-white capitalize">{threat.type}</p>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-white">{threat.affectedUsers.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-white">{formatTimeAgo(threat.firstDetected)}</span>
              </div>
            </div>

            <div className="mt-3">
              <span className="text-xs text-gray-400">Targets:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {threat.targets.map((target, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-800/50 rounded-md text-xs text-gray-300 font-mono"
                  >
                    {target}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredThreats.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No threats match the current filter</p>
        </div>
      )}
    </div>
  );
};

export default ActiveThreatsMonitor;