import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import type { Theme } from '../types';

interface AnalysisCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  children: React.ReactNode;
  theme: Theme;
}

export function AnalysisCard({ icon: Icon, title, description, gradient, children, theme }: AnalysisCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur" 
           style={{ background: `linear-gradient(to right, ${gradient.split(' ')[1]}, ${gradient.split(' ')[3]})` }} />
      
      <div className={`relative backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-white/5 border-white/10 hover:bg-white/10'
          : 'bg-white/80 border-gray-200 hover:bg-white/90'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 bg-gradient-to-r ${gradient} rounded-xl`}>
            <Icon className="text-white" size={24} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {description}
            </p>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
}