// import React from 'react';
// import { Shield, Zap, Sun, Moon } from 'lucide-react';
// import type { Language, Theme } from '../types';

// interface HeaderProps {
//   currentLanguage: Language;
//   theme: Theme;
//   onThemeToggle: () => void;
// }

// export function Header({ currentLanguage, theme, onThemeToggle }: HeaderProps) {
//   return (
//     <header className={`relative z-20 border-b ${
//       theme === 'dark' 
//         ? 'border-white/10 bg-white/5 backdrop-blur-sm' 
//         : 'border-gray-200 bg-white/90 backdrop-blur-sm'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <Shield className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={32} />
//               <Zap className={`absolute -top-1 -right-1 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} size={16} />
//             </div>
//             <div>
//               <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
//                 ScamGuard AI
//               </h1>
//               <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
//                 Advanced Threat Detection
//               </p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-4">
//             {/* Theme Toggle */}
//             <button
//               onClick={onThemeToggle}
//               className={`p-2 rounded-lg transition-all duration-200 ${
//                 theme === 'dark'
//                   ? 'bg-white/10 hover:bg-white/20 text-white'
//                   : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
//               }`}
//               aria-label="Toggle theme"
//             >
//               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
            
//             <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border ${
//               theme === 'dark'
//                 ? 'bg-green-500/20 border-green-500/30'
//                 : 'bg-green-50 border-green-200'
//             }`}>
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//               <span className={`text-sm font-medium ${
//                 theme === 'dark' ? 'text-green-400' : 'text-green-600'
//               }`}>
//                 Online
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


import { Shield, Zap, Sun, Moon, Download } from 'lucide-react';
import type { Language, Theme } from '../types';

interface HeaderProps {
  currentLanguage: Language;
  theme: Theme;
  onThemeToggle: () => void;
}

export function Header({ currentLanguage, theme, onThemeToggle }: HeaderProps) {
  const handleDownloadGuide = () => {
    // You can either:
    // 1. Link to a static PDF in your public folder
    const link = document.createElement('a');
    link.href = '/scam-prevention-guide.pdf'; // Put your PDF in public folder
    link.download = 'Scam_Prevention_Guide.pdf';
    link.click();
    
    // 2. Or trigger download of the markdown content as PDF
    // (You'd need to implement PDF generation)
  };

  return (
    <header className={`relative z-20 border-b ${
      theme === 'dark' 
        ? 'border-white/10 bg-white/5 backdrop-blur-sm' 
        : 'border-gray-200 bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={32} />
              <Zap className={`absolute -top-1 -right-1 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} size={16} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                ScamGuard AI
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Advanced Threat Detection
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Download Guide Button */}
            <button
              onClick={handleDownloadGuide}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                theme === 'dark'
                  ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200'
              }`}
              title="Download Scam Prevention Guide"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Guide</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-lg transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border ${
              theme === 'dark'
                ? 'bg-green-500/20 border-green-500/30'
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
