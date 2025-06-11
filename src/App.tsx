// import React, { useState, useRef, useEffect } from 'react';
// import { Shield, Globe, MessageSquare, Volume2, Languages, CheckCircle, AlertTriangle, XCircle, Zap, BarChart3 } from 'lucide-react';
// import { Header } from './components/Header';
// import { AnalysisCard } from './components/AnalysisCard';
// import { RiskMeter } from './components/RiskMeter';
// import { LanguageToggle } from './components/LanguageToggle';
// import { StatsPanel } from './components/StatsPanel';
// import { translations } from './utils/translations';
// import { analyzeUrl, analyzeMessage, synthesizeSpeech } from './services/scamDetection';
// import type { Language, AnalysisResult, Theme } from './types';

// function App() {
//   const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
//   const [theme, setTheme] = useState<Theme>('dark');
//   const [urlInput, setUrlInput] = useState('');
//   const [messageInput, setMessageInput] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [results, setResults] = useState<AnalysisResult[]>([]);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const t = translations[currentLanguage];

//   const handleThemeToggle = () => {
//     setTheme(prev => prev === 'dark' ? 'light' : 'dark');
//   };

//   const handleAnalyzeUrl = async () => {
//     if (!urlInput.trim()) return;
    
//     setIsAnalyzing(true);
//     try {
//       const result = await analyzeUrl(urlInput, currentLanguage);
//       setResults(prev => [result, ...prev.slice(0, 4)]);
//       setUrlInput('');
//     } catch (error) {
//       console.error('URL analysis failed:', error);
//     }
//     setIsAnalyzing(false);
//   };

//   const handleAnalyzeMessage = async () => {
//     if (!messageInput.trim()) return;
    
//     setIsAnalyzing(true);
//     try {
//       const result = await analyzeMessage(messageInput, currentLanguage);
//       setResults(prev => [result, ...prev.slice(0, 4)]);
//       setMessageInput('');
//     } catch (error) {
//       console.error('Message analysis failed:', error);
//     }
//     setIsAnalyzing(false);
//   };

//   const playResultAudio = async (result: AnalysisResult) => {
//     if (isPlaying) return;
    
//     setIsPlaying(true);
//     try {
//       await synthesizeSpeech(result.explanation, currentLanguage);
//       // Simulate audio playback
//       setTimeout(() => setIsPlaying(false), 3000);
//     } catch (error) {
//       console.error('Audio synthesis failed:', error);
//       setIsPlaying(false);
//     }
//   };

//   const getRiskColor = (risk: string) => {
//     switch (risk.toLowerCase()) {
//       case 'safe': return 'text-green-600';
//       case 'suspicious': return 'text-yellow-600';
//       case 'scam': return 'text-red-600';
//       default: return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
//     }
//   };

//   const getRiskIcon = (risk: string) => {
//     switch (risk.toLowerCase()) {
//       case 'safe': return CheckCircle;
//       case 'suspicious': return AlertTriangle;
//       case 'scam': return XCircle;
//       default: return Shield;
//     }
//   };

//   return (
//     // <div className={`min-h-screen transition-colors duration-300 ${
//     //   theme === 'dark'
//     //     ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
//     //     : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
//     // }`}>
//     <div className={`min-h-screen transition-colors duration-300 ${
//   theme === 'dark'
//     ? 'bg-gradient-to-br from-[#050607] via-[#121921] to-[#2f5c5a]' // Dark Space Blue
//     // or use the other gradient:
//     // 'bg-gradient-to-br from-[#2e0854] via-[#3e0a71] to-[#000000]'
//     : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
// }`}>

//       {/* <div className={`absolute inset-0 ${
//         theme === 'dark'
//           ? 'bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10'
//           : 'bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5'
//       }`} /> */}
//       <div className={`absolute inset-0 ${
//   theme === 'dark'
//     ? 'bg-gradient-to-br from-[#000000]/80 via-[#1f2833]/70 to-[#0b0c10]/80' // For Dark Space Blue
//     // or
//     // 'bg-gradient-to-br from-[#000000]/90 via-[#3e0a71]/70 to-[#2e0854]/80' // For Dark Purple to Black
//     : 'bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5'
// }`} />

      
//       <div className="relative z-10">
//         <Header 
//           currentLanguage={currentLanguage} 
//           theme={theme}
//           onThemeToggle={handleThemeToggle}
//         />
        
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Language Toggle */}
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h1 className={`text-4xl font-bold mb-2 ${
//                 theme === 'dark' ? 'text-white' : 'text-gray-900'
//               }`}>
//                 {t.title}
//               </h1>
//               <p className={`text-xl ${
//                 theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
//               }`}>
//                 {t.subtitle}
//               </p>
//             </div>
//             <LanguageToggle 
//               currentLanguage={currentLanguage} 
//               onLanguageChange={setCurrentLanguage}
//               theme={theme}
//             />
//           </div>

//           {/* Stats Panel */}
//           <StatsPanel results={results} currentLanguage={currentLanguage} theme={theme} />

//           {/* Analysis Tools Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             {/* URL Analysis */}
//             <AnalysisCard
//               icon={Globe}
//               title={t.urlAnalysis}
//               description={t.urlDescription}
//               gradient="from-blue-500 to-cyan-500"
//               theme={theme}
//             >
//               <div className="space-y-4">
//                 <div className="relative">
//                   <input
//                     type="url"
//                     value={urlInput}
//                     onChange={(e) => setUrlInput(e.target.value)}
//                     placeholder={t.urlPlaceholder}
//                     className={`w-full px-4 py-3 backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
//                       theme === 'dark'
//                         ? 'bg-white/10 border-white/20 text-white placeholder-gray-300'
//                         : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500'
//                     }`}
//                     onKeyPress={(e) => e.key === 'Enter' && handleAnalyzeUrl()}
//                   />
//                 </div>
//                 <button
//                   onClick={handleAnalyzeUrl}
//                   disabled={isAnalyzing || !urlInput.trim()}
//                   className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
//                 >
//                   {isAnalyzing ? (
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
//                   ) : (
//                     <Zap size={20} />
//                   )}
//                   {t.analyzeUrl}
//                 </button>
//               </div>
//             </AnalysisCard>

//             {/* Message Analysis */}
//             <AnalysisCard
//               icon={MessageSquare}
//               title={t.messageAnalysis}
//               description={t.messageDescription}
//               gradient="from-green-500 to-emerald-500"
//               theme={theme}
//             >
//               <div className="space-y-4">
//                 <div className="relative">
//                   <textarea
//                     value={messageInput}
//                     onChange={(e) => setMessageInput(e.target.value)}
//                     placeholder={t.messagePlaceholder}
//                     rows={3}
//                     className={`w-full px-4 py-3 backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none ${
//                       theme === 'dark'
//                         ? 'bg-white/10 border-white/20 text-white placeholder-gray-300'
//                         : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500'
//                     }`}
//                   />
//                 </div>
//                 <button
//                   onClick={handleAnalyzeMessage}
//                   disabled={isAnalyzing || !messageInput.trim()}
//                   className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
//                 >
//                   {isAnalyzing ? (
//                     <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
//                   ) : (
//                     <Zap size={20} />
//                   )}
//                   {t.analyzeMessage}
//                 </button>
//               </div>
//             </AnalysisCard>
//           </div>

//           {/* Results Section */}
//           {results.length > 0 && (
//             <div className={`backdrop-blur-sm rounded-2xl border p-6 ${
//               theme === 'dark'
//                 ? 'bg-white/5 border-white/10'
//                 : 'bg-white/80 border-gray-200'
//             }`}>
//               <div className="flex items-center gap-3 mb-6">
//                 <BarChart3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'} size={24} />
//                 <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//                   {t.recentAnalyses}
//                 </h2>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {results.map((result, index) => {
//                   const RiskIcon = getRiskIcon(result.risk);
//                   return (
//                     <div key={index} className={`backdrop-blur-sm rounded-xl border p-4 ${
//                       theme === 'dark'
//                         ? 'bg-white/5 border-white/10'
//                         : 'bg-white/60 border-gray-200'
//                     }`}>
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex items-center gap-2">
//                           <RiskIcon className={`${getRiskColor(result.risk)} p-1 rounded-lg ${
//                             theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'
//                           }`} size={32} />
//                           <div>
//                             <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//                               {result.type}
//                             </h3>
//                             <span className={`text-sm font-medium ${getRiskColor(result.risk)}`}>
//                               {result.risk.toUpperCase()}
//                             </span>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => playResultAudio(result)}
//                           disabled={isPlaying}
//                           className={`p-2 rounded-lg transition-colors duration-200 ${
//                             theme === 'dark'
//                               ? 'bg-white/10 hover:bg-white/20'
//                               : 'bg-gray-100 hover:bg-gray-200'
//                           }`}
//                         >
//                           <Volume2 className={theme === 'dark' ? 'text-white' : 'text-gray-900'} size={16} />
//                         </button>
//                       </div>
                      
//                       <RiskMeter score={result.confidence} theme={theme} />
                      
//                       <p className={`text-sm mt-3 line-clamp-2 ${
//                         theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
//                       }`}>
//                         {result.explanation}
//                       </p>
                      
//                       {result.content && (
//                         <div className={`mt-3 p-2 rounded-lg ${
//                           theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'
//                         }`}>
//                           <p className={`text-xs truncate ${
//                             theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
//                           }`}>
//                             {result.content}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useRef, useEffect } from 'react';
import { Shield, Globe, MessageSquare, Volume2, Languages, CheckCircle, AlertTriangle, XCircle, Zap, BarChart3 } from 'lucide-react';
import { Header } from './components/Header';
import { AnalysisCard } from './components/AnalysisCard';
import { RiskMeter } from './components/RiskMeter';
import { LanguageToggle } from './components/LanguageToggle';
import { StatsPanel } from './components/StatsPanel';
import { translations } from './utils/translations';
// import { analyzeUrl, analyzeMessage, synthesizeSpeech } from './services/scamDetection';
import type { Language, AnalysisResult, Theme } from './types';

import { analyzeUrl, analyzeMessage, synthesizeSpeech, stopSpeech } from './services/scamDetection';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [urlInput, setUrlInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const t = translations[currentLanguage];

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleAnalyzeUrl = async () => {
    if (!urlInput.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeUrl(urlInput, currentLanguage);
      setResults(prev => [result, ...prev.slice(0, 4)]);
      setUrlInput('');
    } catch (error) {
      console.error('URL analysis failed:', error);
    }
    setIsAnalyzing(false);
  };

  const handleAnalyzeMessage = async () => {
    if (!messageInput.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeMessage(messageInput, currentLanguage);
      setResults(prev => [result, ...prev.slice(0, 4)]);
      setMessageInput('');
    } catch (error) {
      console.error('Message analysis failed:', error);
    }
    setIsAnalyzing(false);
  };

  // const playResultAudio = async (result: AnalysisResult) => {
  //   if (isPlaying) return;
    
  //   setIsPlaying(true);
  //   try {
  //     await synthesizeSpeech(result.explanation, currentLanguage);
  //     // Simulate audio playback
  //     setTimeout(() => setIsPlaying(false), 3000);
  //   } catch (error) {
  //     console.error('Audio synthesis failed:', error);
  //     setIsPlaying(false);
  //   }
  // };


//   const playResultAudio = async (result: AnalysisResult) => {
//   // If already playing, stop the speech
//   if (isPlaying) {
//     stopSpeech();
//     setIsPlaying(false);
//     return;
//   }
  
//   setIsPlaying(true);
//   try {
//     await synthesizeSpeech(result.explanation, currentLanguage);
//   } catch (error) {
//     console.error('Audio synthesis failed:', error);
//   } finally {
//     setIsPlaying(false); // Reset when speech actually finishes
//   }
// };


const playResultAudio = async (result: AnalysisResult) => {
  // If this audio is already playing, stop it
  if (playingAudioId === result.id) {
    stopSpeech();
    setPlayingAudioId(null);
    return;
  }
  
  // If another audio is playing, stop it first
  if (playingAudioId) {
    stopSpeech();
  }
  
  setPlayingAudioId(result.id);
  try {
    await synthesizeSpeech(result.explanation, currentLanguage);
  } catch (error) {
    console.error('Audio synthesis failed:', error);
  } finally {
    setPlayingAudioId(null); // Reset when finished
  }
};

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'safe': return 'text-green-600';
      case 'suspicious': return 'text-yellow-600';
      case 'scam': return 'text-red-600';
      default: return theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'safe': return CheckCircle;
      case 'suspicious': return AlertTriangle;
      case 'scam': return XCircle;
      default: return Shield;
    }
  };

  return (
    // <div className={`min-h-screen transition-colors duration-300 ${
    //   theme === 'dark'
    //     ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
    //     : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    // }`}>
    <div className={`min-h-screen min-w-full overflow-x-hidden transition-colors duration-300 ${
    theme === 'dark'
      ? 'bg-gradient-to-br from-[#050607] via-[#121921] to-[#2f5c5a]'
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
  }`}>

    {/* Add hidden div to force Tailwind to include red classes */}
    <div className="hidden bg-red-500/20 text-red-500 bg-red-500/30 hover:bg-red-500/30"></div>

    {/* Fixed background overlay */}
    <div 
      className={`fixed inset-0 w-full h-full ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#000000]/80 via-[#1f2833]/70 to-[#0b0c10]/80'
          : 'bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5'
      }`} 
      style={{ zIndex: -1 }}
    />

    <div className="relative z-10 min-h-screen">
      {/* Your existing content - keep everything else the same */}
      <Header 
        currentLanguage={currentLanguage} 
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Language Toggle */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className={`text-4xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t.title}
              </h1>
              <p className={`text-xl ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t.subtitle}
              </p>
            </div>
            <LanguageToggle 
              currentLanguage={currentLanguage} 
              onLanguageChange={setCurrentLanguage}
              theme={theme}
            />
          </div>

          {/* Stats Panel */}
          <StatsPanel results={results} currentLanguage={currentLanguage} theme={theme} />

          {/* Analysis Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* URL Analysis */}
            <AnalysisCard
              icon={Globe}
              title={t.urlAnalysis}
              description={t.urlDescription}
              gradient="from-blue-500 to-cyan-500"
              theme={theme}
            >
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder={t.urlPlaceholder}
                    className={`w-full px-4 py-3 backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      theme === 'dark'
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-300'
                        : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                    onKeyPress={(e) => e.key === 'Enter' && handleAnalyzeUrl()}
                  />
                </div>
                <button
                  onClick={handleAnalyzeUrl}
                  disabled={isAnalyzing || !urlInput.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <Zap size={20} />
                  )}
                  {t.analyzeUrl}
                </button>
              </div>
            </AnalysisCard>

            {/* Message Analysis */}
            <AnalysisCard
              icon={MessageSquare}
              title={t.messageAnalysis}
              description={t.messageDescription}
              gradient="from-green-500 to-emerald-500"
              theme={theme}
            >
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder={t.messagePlaceholder}
                    rows={3}
                    className={`w-full px-4 py-3 backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none ${
                      theme === 'dark'
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-300'
                        : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
                <button
                  onClick={handleAnalyzeMessage}
                  disabled={isAnalyzing || !messageInput.trim()}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <Zap size={20} />
                  )}
                  {t.analyzeMessage}
                </button>
              </div>
            </AnalysisCard>
          </div>

          {/* Results Section */}
          {results.length > 0 && (
            <div className={`backdrop-blur-sm rounded-2xl border p-6 ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'} size={24} />
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t.recentAnalyses}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((result, index) => {
                  const RiskIcon = getRiskIcon(result.risk);
                  return (
                    <div key={index} className={`backdrop-blur-sm rounded-xl border p-4 ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10'
                        : 'bg-white/60 border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <RiskIcon className={`${getRiskColor(result.risk)} p-1 rounded-lg ${
                            theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'
                          }`} size={32} />
                          <div>
                            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {result.type}
                            </h3>
                            <span className={`text-sm font-medium ${getRiskColor(result.risk)}`}>
                              {result.risk.toUpperCase()}
                            </span>
                          </div>
                        </div>
                          <button
                            onClick={() => playResultAudio(result)}
                            className={`p-2 rounded-lg transition-colors duration-200 ${
                              playingAudioId === result.id
                                ? 'bg-red-500/20 hover:bg-red-500/30 animate-pulse' // Enhanced red styling
                                : theme === 'dark'
                                  ? 'bg-white/10 hover:bg-white/20'
                                  : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            title={playingAudioId === result.id ? 'Click to stop' : 'Click to play explanation'}
                          >
                            <Volume2 
                              className={`transition-colors duration-200 ${
                                playingAudioId === result.id 
                                  ? 'text-red-500' 
                                  : theme === 'dark' 
                                    ? 'text-white' 
                                    : 'text-gray-900'
                              }`} 
                              size={16} 
                            />
                          </button>

                      </div>
                      
                      <RiskMeter score={result.confidence} theme={theme} />
                      
                      <p className={`text-sm mt-3 line-clamp-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {result.explanation}
                      </p>
                      
                      {result.content && (
                        <div className={`mt-3 p-2 rounded-lg ${
                          theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'
                        }`}>
                          <p className={`text-xs truncate ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {result.content}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
