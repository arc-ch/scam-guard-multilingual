import React from 'react';
import type { Theme } from '../types';

interface RiskMeterProps {
  score: number;
  theme: Theme;
}

export function RiskMeter({ score, theme }: RiskMeterProps) {
  const getColor = (score: number) => {
    if (score >= 80) return 'from-red-500 to-red-600';
    if (score >= 50) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-500';
  };

  const getTextColor = (score: number) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Risk Score
        </span>
        <span className={`text-sm font-medium ${getTextColor(score)}`}>
          {score}%
        </span>
      </div>
      <div className={`w-full rounded-full h-2 ${
        theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
      }`}>
        <div
          className={`h-2 bg-gradient-to-r ${getColor(score)} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}