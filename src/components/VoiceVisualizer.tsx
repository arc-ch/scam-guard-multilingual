import React, { useEffect, useState } from 'react';
import type { Theme } from '../types';

interface VoiceVisualizerProps {
  isRecording: boolean;
  theme: Theme;
}

export function VoiceVisualizer({ isRecording, theme }: VoiceVisualizerProps) {
  const [bars, setBars] = useState<number[]>(Array(8).fill(0));

  useEffect(() => {
    if (!isRecording) {
      setBars(Array(8).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 100));
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className={`flex items-center justify-center gap-1 h-16 rounded-lg border ${
      theme === 'dark'
        ? 'bg-white/5 border-white/10'
        : 'bg-gray-50 border-gray-200'
    }`}>
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-2 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full transition-all duration-100 ease-out"
          style={{ 
            height: `${Math.max(4, height * 0.5)}px`,
            opacity: isRecording ? 1 : 0.3
          }}
        />
      ))}
    </div>
  );
}