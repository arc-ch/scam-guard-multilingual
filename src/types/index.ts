export type Language = 'en' | 'es' | 'fr';
export type Theme = 'light' | 'dark';

export interface AnalysisResult {
  id: string;
  type: string;
  content: string;
  risk: 'Safe' | 'Suspicious' | 'Scam';
  confidence: number;
  explanation: string;
  timestamp: Date;
  language: Language;
}

export interface Translation {
  title: string;
  subtitle: string;
  urlAnalysis: string;
  urlDescription: string;
  urlPlaceholder: string;
  analyzeUrl: string;
  messageAnalysis: string;
  messageDescription: string;
  messagePlaceholder: string;
  analyzeMessage: string;
  recentAnalyses: string;
  totalAnalyses: string;
  safeResults: string;
  suspiciousResults: string;
  scamResults: string;
}