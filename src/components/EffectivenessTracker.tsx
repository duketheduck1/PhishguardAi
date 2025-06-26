import React from 'react';
import { TrendingUp, Shield, Clock, Cpu } from 'lucide-react';
import { mockDetectionStats } from '../data/mockData';

const EffectivenessTracker: React.FC = () => {
  const stats = mockDetectionStats;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatLastUpdate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    return `${diffHours}h ago`;
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">Detection Effectiveness</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Accuracy Rate */}
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-4 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">Accuracy Rate</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {stats.accuracy.toFixed(1)}%
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${stats.accuracy}%` }}
            />
          </div>
        </div>

        {/* Total Scans */}
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Total Scans</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {formatNumber(stats.totalScans)}
          </div>
          <div className="text-xs text-blue-300/70 mt-1">
            +12.3% from last week
          </div>
        </div>

        {/* Threats Blocked */}
        <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-xl p-4 border border-red-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium text-red-400">Threats Blocked</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {formatNumber(stats.threatsBlocked)}
          </div>
          <div className="text-xs text-red-300/70 mt-1">
            8.8% of total scans
          </div>
        </div>

        {/* Model Info */}
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">AI Model</span>
          </div>
          <div className="text-sm font-semibold text-white mb-1">
            {stats.modelVersion}
          </div>
          <div className="flex items-center gap-1 text-xs text-purple-300/70">
            <Clock className="w-3 h-3" />
            Updated {formatLastUpdate(stats.lastUpdate)}
          </div>
        </div>
      </div>

      {/* Live Activity Indicator */}
      <div className="mt-6 flex items-center gap-2 p-3 bg-gray-900/50 rounded-lg">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-sm text-gray-300">System operational - Real-time scanning active</span>
      </div>
    </div>
  );
};

export default EffectivenessTracker;