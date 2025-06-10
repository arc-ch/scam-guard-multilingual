import React from 'react';
import { Shield, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import type { AnalysisResult, Language, Theme } from '../types';
import { translations } from '../utils/translations';

interface StatsPanelProps {
  results: AnalysisResult[];
  currentLanguage: Language;
  theme: Theme;
}

export function StatsPanel({ results, currentLanguage, theme }: StatsPanelProps) {
  const t = translations[currentLanguage];
  
  const stats = {
    total: results.length,
    safe: results.filter(r => r.risk.toLowerCase() === 'safe').length,
    suspicious: results.filter(r => r.risk.toLowerCase() === 'suspicious').length,
    scam: results.filter(r => r.risk.toLowerCase() === 'scam').length,
  };

  const statItems = [
    {
      label: t.totalAnalyses,
      value: stats.total,
      icon: Shield,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      label: t.safeResults,
      value: stats.safe,
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      label: t.suspiciousResults,
      value: stats.suspicious,
      icon: AlertTriangle,
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      label: t.scamResults,
      value: stats.scam,
      icon: TrendingUp,
      gradient: 'from-red-500 to-pink-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, index) => (
        <div key={index} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-xl blur" 
               style={{ background: `linear-gradient(to right, ${item.gradient.split(' ')[1]}, ${item.gradient.split(' ')[3]})` }} />
          
          <div className={`relative backdrop-blur-sm border rounded-xl p-4 transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/5 border-white/10 hover:bg-white/10'
              : 'bg-white/80 border-gray-200 hover:bg-white/90'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.label}
                </p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {item.value}
                </p>
              </div>
              <div className={`p-2 bg-gradient-to-r ${item.gradient} rounded-lg`}>
                <item.icon className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}