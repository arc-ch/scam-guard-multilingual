// import { HfInference } from '@huggingface/inference';
// import type { AnalysisResult, Language } from '../types';

// // Initialize Hugging Face client with free inference API
// const hf = new HfInference();

// // Enhanced scam detection patterns with weighted scoring
// const SCAM_INDICATORS = {
//   en: {
//     // High-risk indicators (weight: 50-70 points each)
//     highRisk: [
//       'you have won', 'congratulations you won', 'you are selected', 'you have been selected',
//       'pay first', 'pay to claim', 'pay processing fee', 'pay verification fee', 'pay registration fee',
//       'show legitimacy', 'prove legitimacy', 'advance payment', 'upfront payment', 'send money first',
//       'transfer fee', 'claim your prize', 'won prize', 'won money', 'won cash', 'lottery winner',
//       'contest winner', 'lucky winner', 'selected winner', 'government subsidy', 'covid support',
//       'relief fund', 'urgent verification', 'account suspended', 'immediate action', 'verify now',
//       'click here now', 'limited time', 'expires today', 'act fast', 'hurry up', 'selected for job',
//       'online job opportunity', 'work from home job', 'earn money online', 'pay to apply',
//       'registration fee required', 'security deposit', 'refundable deposit', 'send pan', 'send aadhaar',
//       'share otp', 'give otp', 'provide otp', 'send pin', 'share pin', 'give pin',
//       'your sim will be blocked', 'clear customs fee', 'send gst number', 'pay tax upfront',
//       'passport suspended', 'electricity will be disconnected', 'blacklist removal fee',
//       'loan approved pay fee', 'click secure link', 'verify via link'
//     ],
//     // Medium-risk indicators (weight: 25-35 points each)
//     mediumRisk: [
//       'free money', 'easy money', 'quick money', 'earn money', 'make money', 'suspicious activity',
//       'security alert', 'verify account', 'update details', 'confirm identity', 'bank support',
//       'customer care', 'technical support', 'help desk', 'urgent', 'immediate', 'asap',
//       'quickly', 'fast', 'sbi support', 'hdfc support', 'icici support',
//       'account verification needed', 'unusual activity', 'verify to avoid suspension',
//       'reset kyc', 'your profile is incomplete', 'address verification pending'
//     ],
//     // Low-risk indicators (weight: 10-20 points each)
//     lowRisk: [
//       'click here', 'visit link', 'download app', 'install now', 'register now', 'sign up',
//       'apply now', 'contact us', 'call now', 'whatsapp', 'telegram', 'limited offer',
//       'grab this deal', 'offer inside', 'refer a friend', 'share to win', 'get gift card',
//       'follow for prizes'
//     ]
//   },
//   es: {
//     highRisk: [
//       'has ganado', 'felicidades ganaste', 'has sido seleccionado', 'pagar primero',
//       'pagar para reclamar', 'mostrar legitimidad', 'pago por adelantado', 'enviar dinero',
//       'ganaste premio', 'ganador de lotería', 'subsidio gubernamental', 'apoyo covid',
//       'verificación urgente', 'cuenta suspendida', 'acción inmediata', 'trabajo en línea',
//       'pagar para aplicar', 'compartir otp', 'enviar pin',
//       'tu cuenta fue bloqueada', 'tarifa de verificación', 'transferencia pendiente',
//       'sólo paga el cargo de procesamiento', 'urgente: responde ahora',
//       'haz clic en el enlace seguro', 'confirmar identidad'
//     ],
//     mediumRisk: [
//       'dinero gratis', 'dinero fácil', 'ganar dinero', 'actividad sospechosa',
//       'alerta de seguridad', 'verificar cuenta', 'soporte bancario', 'urgente', 'inmediato',
//       'verifica tu perfil', 'confirma tu dirección', 'soporte técnico', 'centro de ayuda'
//     ],
//     lowRisk: [
//       'haga clic aquí', 'visitar enlace', 'descargar aplicación', 'registrarse ahora',
//       'contactanos', 'llámanos ahora', 'whatsapp disponible', 'telegram', 'oferta limitada',
//       'refiere y gana', 'comparte para ganar', 'sorteo exclusivo'
//     ]
//   },

//   fr: {
//     highRisk: [
//       'vous avez gagné', 'félicitations vous avez gagné', 'vous avez été sélectionné',
//       'payer d\'abord', 'payer pour réclamer', 'montrer légitimité', 'paiement anticipé',
//       'envoyer argent', 'gagné prix', 'gagnant loterie', 'subvention gouvernementale',
//       'soutien covid', 'vérification urgente', 'compte suspendu', 'action immédiate',
//       'travail en ligne', 'payer pour postuler', 'partager otp', 'envoyer pin',
//       'frais de vérification requis', 'paiement à l\'avance', 'héritage en attente',
//       'offre gouvernementale exclusive', 'formulaire à remplir pour débloquer le prix'
//     ],
//     mediumRisk: [
//       'argent gratuit', 'argent facile', 'gagner argent', 'activité suspecte',
//       'alerte sécurité', 'vérifier compte', 'support bancaire', 'urgent', 'immédiat',
//       'réinitialiser vos informations', 'mettre à jour vos données', 'identité requise'
//     ],
//     lowRisk: [
//       'cliquez ici', 'visiter lien', 'télécharger application', 's\'inscrire maintenant',
//       'contactez nous', 'offre limitée', 'partager avec vos amis', 'télégramme', 'whatsapp',
//       'réclamer votre récompense', 'gagner des cadeaux', 'tirage au sort exclusif'
//     ]
//   }
// };

// // Dangerous scam combinations
// const SCAM_COMBINATIONS = [
//   // English combos
//   { patterns: ['won', 'pay'], weight: 90, description: 'Prize + Payment scam' },
//   { patterns: ['selected', 'fee'], weight: 85, description: 'Selection + Fee scam' },
//   { patterns: ['government', 'pay'], weight: 95, description: 'Fake government scheme' },
//   { patterns: ['job', 'pay'], weight: 80, description: 'Fake job scam' },
//   { patterns: ['covid', 'support', 'pay'], weight: 95, description: 'COVID relief scam' },
//   { patterns: ['bank', 'verify', 'urgent'], weight: 75, description: 'Fake bank alert' },
//   { patterns: ['account', 'suspended', 'verify'], weight: 80, description: 'Account suspension scam' },
//   { patterns: ['otp', 'share'], weight: 95, description: 'OTP sharing scam' },
//   { patterns: ['pin', 'give'], weight: 95, description: 'PIN sharing scam' },
//   { patterns: ['pan', 'send'], weight: 90, description: 'Identity theft scam' },
//   { patterns: ['aadhaar', 'send'], weight: 90, description: 'Identity theft scam' },
//   { patterns: ['lottery', 'processing fee'], weight: 90, description: 'Lottery + Fee scam' },
//   { patterns: ['customs', 'pay'], weight: 85, description: 'Fake customs scam' },
//   { patterns: ['account', 'blocked', 'kyc'], weight: 80, description: 'KYC blackmail scam' },

//   { patterns: ['immediate', 'payment', 'required'], weight: 85, description: 'Urgent payment demand' },
//   { patterns: ['click', 'link', 'verify'], weight: 80, description: 'Phishing link' },
//   { patterns: ['wire', 'transfer', 'fee'], weight: 85, description: 'Wire transfer scam' },
//   { patterns: ['refund', 'claim', 'fee'], weight: 80, description: 'Refund scam' },
//   { patterns: ['inheritance', 'claim', 'payment'], weight: 90, description: 'Inheritance scam' },
//   { patterns: ['dear', 'customer', 'update'], weight: 70, description: 'Generic scam opener' },
//   { patterns: ['account', 'closure', 'action'], weight: 75, description: 'Account closure scam' },
//   { patterns: ['lottery', 'winner', 'claim'], weight: 90, description: 'Lottery winner scam' },
//   { patterns: ['send', 'money', 'now'], weight: 95, description: 'Urgent money demand' },
//   { patterns: ['refund', 'payment', 'method'], weight: 80, description: 'Refund payment scam' },

//   // Spanish combos
//   { patterns: ['ganado', 'pagar'], weight: 90, description: 'Premio + Pago (Prize + Pay)' },
//   { patterns: ['has sido seleccionado', 'tarifa'], weight: 85, description: 'Selección + Tarifa' },
//   { patterns: ['subvención', 'pago'], weight: 95, description: 'Subsidio + Pago' },
//   { patterns: ['trabajo en línea', 'registro'], weight: 85, description: 'Trabajo falso con pago' },
//   { patterns: ['cuenta', 'suspendida', 'verificar'], weight: 80, description: 'Alerta bancaria falsa' },
//   { patterns: ['actividad', 'sospechosa', 'verificar'], weight: 75, description: 'Actividad sospechosa' },
//   { patterns: ['compartir', 'otp'], weight: 95, description: 'Estafa de OTP' },
//   { patterns: ['pagar', 'antes'], weight: 85, description: 'Anticipo fraudulento' },
//   { patterns: ['verificación urgente', 'haz clic'], weight: 80, description: 'Click fraudulento' },

//   { patterns: ['transferencia', 'urgente', 'dinero'], weight: 90, description: 'Transferencia urgente' },
//   { patterns: ['reembolso', 'solicitud', 'pago'], weight: 80, description: 'Solicitud de reembolso' },
//   { patterns: ['herencia', 'reclamar', 'pago'], weight: 90, description: 'Estafa de herencia' },
//   { patterns: ['actualización', 'cuenta', 'cliente'], weight: 70, description: 'Estafa genérica' },
//   { patterns: ['cierre', 'cuenta', 'acción'], weight: 75, description: 'Cierre de cuenta falso' },
//   { patterns: ['ganador', 'lotería', 'reclamar'], weight: 90, description: 'Estafa de ganador de lotería' },
//   { patterns: ['envíe', 'dinero', 'ahora'], weight: 95, description: 'Demanda urgente de dinero' },
//   { patterns: ['solicitud', 'pago', 'reembolso'], weight: 80, description: 'Estafa de pago reembolso' },

//   // French combos
//   { patterns: ['vous avez gagné', 'paiement requis'], weight: 90, description: 'Gagnant + Paiement' },
//   { patterns: ['subvention gouvernementale', 'frais'], weight: 95, description: 'Subvention + Frais' },
//   { patterns: ['compte', 'suspendu', 'vérifiez'], weight: 80, description: 'Fausse suspension de compte' },
//   { patterns: ['emploi', 'payer'], weight: 85, description: 'Offre d’emploi frauduleuse' },
//   { patterns: ['soutien', 'covid', 'paiement'], weight: 90, description: 'Soutien COVID + Frais' },
//   { patterns: ['partager', 'otp'], weight: 95, description: 'Partage OTP' },
//   { patterns: ['paiement anticipé', 'gagner'], weight: 85, description: 'Paiement anticipé + Gagnant' },
//   { patterns: ['vérifier', 'maintenant', 'compte'], weight: 75, description: 'Vérification urgente' },

//   { patterns: ['transfert', 'urgent', 'argent'], weight: 90, description: 'Transfert urgent d’argent' },
//   { patterns: ['remboursement', 'demande', 'paiement'], weight: 80, description: 'Demande de remboursement' },
//   { patterns: ['héritage', 'réclamer', 'paiement'], weight: 90, description: 'Arnaque à l’héritage' },
//   { patterns: ['mise à jour', 'compte', 'client'], weight: 70, description: 'Arnaque générique' },
//   { patterns: ['fermeture', 'compte', 'action'], weight: 75, description: 'Fausse fermeture de compte' },
//   { patterns: ['gagnant', 'loterie', 'réclamer'], weight: 90, description: 'Arnaque gagnant de loterie' },
//   { patterns: ['envoyer', 'argent', 'maintenant'], weight: 95, description: 'Demande urgente d’argent' },
//   { patterns: ['demande', 'paiement', 'remboursement'], weight: 80, description: 'Arnaque de paiement remboursement' }
// ];

// const SUSPICIOUS_DOMAINS = [
//   // Common URL shorteners (extended)
//   'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd', 'buff.ly',
//   'shorte.st', 'adf.ly', 'bc.vc', 'cli.gs', 'u.to', 'short.cm', 'cutt.ly',
//   'tiny.cc', 'soo.gd', 'clk.im', 'bl.ink', 't.ly', 'lnkd.in',

//   // Scammy-sounding English domains & keywords (extended)
//   'jobsfast.in', 'verify-fast.biz', 'govsupport-', 'sbisecurehelp',
//   'quickjobs', 'fastmoney', 'easywin', 'instantcash', 'secureverify',
//   'bankverify', 'govscheme', 'covidrelief',
//   'paynow', 'urgentpay', 'secure-pay', 'fastpay', 'quick-pay',
//   'lotteryclaim', 'lottery-win', 'lottery-prize', 'winbig',
//   'bank-alert', 'account-update', 'account-verify', 'pinverify',
//   'otpverify', 'security-alert', 'support-covid', 'covidassist',
//   'covidhelp', 'customsfee', 'customspayment', 'onlinejob',
//   'joboffer', 'jobregister', 'refundclaim', 'refundprocessing',
//   'inheritanceclaim', 'inheritance-payment', 'winning-notification',
//   'prizewinner', 'kyc-update', 'account-blocked',
//   'claimprize', 'winner-alert', 'payment-due', 'fee-required',
//   'payfee-now', 'instantwin', 'securelogin', 'banklogin', 'creditverify',

//   // Spanish scam keywords/domains (extended)
//   'trabajorapido', 'dinero-facil', 'pagarahora', 'verificacion-urgente',
//   'cuentasuspendida', 'pago-rapido', 'premioganado', 'ganador-loteria',
//   'reembolso-pago', 'herencia-pago', 'fraude-bancario', 'dinero-rapido',
//   'trabajo-online', 'pago-antiguo', 'verificar-cuenta', 'pago-seguro',
//   'alerta-banco', 'cuenta-verificada', 'pago-express',

//   // French scam keywords/domains (extended)
//   'emploi-rapide', 'argent-facile', 'paiement-urgent', 'verification-compte',
//   'compte-suspendu', 'paiement-rapide', 'gagnant-loterie',
//   'remboursement-paiement', 'fraude-bancaire', 'aide-covid',
//   'verification-urgent', 'paiement-express', 'alerte-securite',
//   'partage-otp', 'offre-emploi', 'paiement-frais',

//   // Suspicious TLDs often abused by scammers (extended)
//   '.xyz', '.top', '.club', '.online', '.site', '.win', '.bid', '.loan',
//   '.review', '.account', '.date', '.vip', '.men', '.party', '.trade',
//   '.racing', '.stream', '.click', '.download', '.work', '.webcam',
//   '.cricket', '.fit', '.gq', '.ml', '.cf', '.ga', '.tk', '.pw', '.buzz',

//   // Common scam-related prefixes or words in domains
//   'secure-', 'verify-', 'payment-', 'account-', 'login-', 'update-',
//   'alert-', 'official-', 'fast-', 'express-', 'claim-', 'bonus-', 'prize-',

//   // Additional suspicious keywords
//   'freegift', 'cashbonus', 'instantcash', 'easyloan', 'quickloan', 'creditcardverify',
//   'identityverify', 'fraudalert', 'securityupdate', 'taxrefund', 'irspayment',
//   'socialsecurity', 'banksecure', 'safeaccount', 'paymentrequest',

//   // Some random suspicious-looking domains (example)
//   'paytmverify.com', 'secure-paypal.net', 'support-gov.org', 'payment-update.biz',
//   'covid19relieffund.com', 'alertbanking.info', 'instantlottery.win'
// ];

// const SAFE_DOMAINS = [
//   // Big tech and social media
//   'google.com', 'microsoft.com', 'apple.com', 'amazon.com', 'facebook.com',
//   'twitter.com', 'linkedin.com', 'github.com', 'wikipedia.org', 'stackoverflow.com',
//   'reddit.com', 'youtube.com', 'instagram.com', 'netflix.com', 'dropbox.com',
//   'slack.com', 'zoom.us', 'paypal.com', 'etsy.com', 'adobe.com',

//   // Banks & financial services (India + global)
//   'sbi.co.in', 'icicibank.com', 'hdfcbank.com', 'axisbank.com', 'paytm.com',
//   'kotak.com', 'indusind.com', 'yesbank.in', 'bankofamerica.com', 'chase.com',
//   'wellsfargo.com', 'citibank.com', 'barclays.co.uk', 'hsbc.com', 'paypal.com',

//   // Educational & research institutions
//   'mit.edu', 'harvard.edu', 'stanford.edu', 'ox.ac.uk', 'cam.ac.uk',
//   'coursera.org', 'edx.org', 'khanacademy.org', 'udemy.com', 'w3schools.com',

//   // Government & official portals
//   'usa.gov', 'irs.gov', 'india.gov.in', 'gov.uk', 'nasa.gov', 'un.org',
//   'europa.eu', 'cdc.gov', 'who.int', 'sec.gov',

//   // News & media
//   'bbc.com', 'cnn.com', 'theguardian.com', 'nytimes.com', 'reuters.com',
//   'forbes.com', 'bloomberg.com', 'wsj.com', 'techcrunch.com', 'wired.com',

//   // E-commerce & payments
//   'ebay.com', 'alibaba.com', 'flipkart.com', 'paytm.com', 'amazon.in',
//   'stripe.com', 'squareup.com', 'shopify.com',

//   // Cloud providers & infrastructure
//   'aws.amazon.com', 'azure.microsoft.com', 'cloud.google.com', 'digitalocean.com',
//   'heroku.com', 'netlify.com', 'vercel.com',

//   // Others - popular and trustworthy
//   'mozilla.org', 'mozilla.com', 'openai.com', 'telegram.org', 'signal.org',
//   'protonmail.com', 'icloud.com', 'medium.com', 'quora.com', 'trello.com'
// ];

// // Use Hugging Face model for advanced text classification
// async function analyzeWithHuggingFace(text: string): Promise<{ isScam: boolean; confidence: number; reasoning: string }> {
//   try {
//     // Use a free text classification model
//     const prompt = `Analyze this message for scam indicators. Consider these as HIGH RISK scam patterns:
// - Prize/lottery wins requiring payment
// - Job offers requiring upfront payment
// - Government schemes requiring fees
// - Urgent account verification requests
// - Requests for OTP/PIN sharing
// - Fake bank/support messages

// Message: "${text}"

// Is this a scam? Provide reasoning.`;

//     const response = await hf.textGeneration({
//       model: 'microsoft/DialoGPT-medium',
//       inputs: prompt,
//       parameters: {
//         max_new_tokens: 150,
//         temperature: 0.3,
//         return_full_text: false
//       }
//     });

//     const result = response.generated_text?.toLowerCase() || '';
    
//     // Parse the AI response
//     const isScam = result.includes('scam') || result.includes('fraud') || result.includes('suspicious');
//     const confidence = isScam ? 85 : 75;
//     const reasoning = response.generated_text || 'AI analysis completed';

//     return { isScam, confidence, reasoning };
//   } catch (error) {
//     console.warn('Hugging Face API failed, falling back to pattern matching:', error);
//     return { isScam: false, confidence: 50, reasoning: 'Fallback analysis used' };
//   }
// }

// export async function analyzeUrl(url: string, language: Language): Promise<AnalysisResult> {
//   await new Promise(resolve => setTimeout(resolve, 1500));

//   const domain = extractDomain(url);
//   let risk: 'Safe' | 'Suspicious' | 'Scam' = 'Safe';
//   let confidence = 95;
//   let explanation = '';

//   if (SAFE_DOMAINS.some(safeDomain => domain.includes(safeDomain))) {
//     risk = 'Safe';
//     confidence = 15; // LOW risk score for safe URLs
//     explanation = getTranslatedExplanation(language, 'safe_url');
//   } else if (SUSPICIOUS_DOMAINS.some(suspDomain => domain.includes(suspDomain))) {
//     risk = 'Scam';
//     confidence = 95; // HIGH risk score for scam URLs
//     explanation = getTranslatedExplanation(language, 'scam_url');
//   } else if (domain.includes('phishing') || domain.includes('scam') || domain.includes('fake')) {
//     risk = 'Scam';
//     confidence = 98; // VERY HIGH risk score for obvious scam URLs
//     explanation = getTranslatedExplanation(language, 'scam_url');
//   } else {
//     // Check for suspicious patterns in URL
//     const suspiciousUrlPatterns = ['secure', 'verify', 'urgent', 'fast', 'quick', 'instant', 'free', 'win', 'prize'];
//     const matchedSuspicious = suspiciousUrlPatterns.filter(pattern => 
//       domain.toLowerCase().includes(pattern)
//     );
    
//     if (matchedSuspicious.length >= 2) {
//       risk = 'Suspicious';
//       confidence = 65; // MEDIUM-HIGH risk score for suspicious URLs
//       explanation = getTranslatedExplanation(language, 'suspicious_url');
//     } else {
//       risk = 'Safe';
//       confidence = 20; // LOW risk score for safe URLs
//       explanation = getTranslatedExplanation(language, 'safe_url');
//     }
//   }

//   return {
//     id: generateId(),
//     type: 'URL Analysis',
//     content: url,
//     risk,
//     confidence,
//     explanation,
//     timestamp: new Date(),
//     language,
//   };
// }

// export async function analyzeMessage(message: string, language: Language): Promise<AnalysisResult> {
//   await new Promise(resolve => setTimeout(resolve, 2000));

//   const lowerMessage = message.toLowerCase();
//   const indicators = SCAM_INDICATORS[language] || SCAM_INDICATORS.en;
  
//   let totalScore = 0;
//   let matchedIndicators: string[] = [];
//   let detectedCombinations: string[] = [];

//   // Score high-risk indicators
//   indicators.highRisk.forEach(pattern => {
//     if (lowerMessage.includes(pattern.toLowerCase())) {
//       totalScore += 70; // Increased weight
//       matchedIndicators.push(pattern);
//     }
//   });

//   // Score medium-risk indicators
//   indicators.mediumRisk.forEach(pattern => {
//     if (lowerMessage.includes(pattern.toLowerCase())) {
//       totalScore += 35; // Increased weight
//       matchedIndicators.push(pattern);
//     }
//   });

//   // Score low-risk indicators
//   indicators.lowRisk.forEach(pattern => {
//     if (lowerMessage.includes(pattern.toLowerCase())) {
//       totalScore += 20; // Increased weight
//       matchedIndicators.push(pattern);
//     }
//   });

//   // Check for dangerous combinations
//   SCAM_COMBINATIONS.forEach(combo => {
//     const allPatternsFound = combo.patterns.every(pattern => 
//       lowerMessage.includes(pattern.toLowerCase())
//     );
//     if (allPatternsFound) {
//       totalScore += combo.weight;
//       detectedCombinations.push(combo.description);
//     }
//   });

//   // Additional scoring for specific scam patterns
//   if (lowerMessage.includes('₹') || lowerMessage.includes('rs.') || lowerMessage.includes('rupees')) {
//     if (lowerMessage.includes('pay') || lowerMessage.includes('fee') || lowerMessage.includes('charge')) {
//       totalScore += 50; // Money + payment request
//     }
//   }

//   // Phone numbers or suspicious contact info
//   if (lowerMessage.match(/\d{10}/) || lowerMessage.includes('@gmail') || lowerMessage.includes('whatsapp')) {
//     totalScore += 25;
//   }

//   // Use Hugging Face for additional analysis
//   let aiAnalysis;
//   try {
//     aiAnalysis = await analyzeWithHuggingFace(message);
//     if (aiAnalysis.isScam) {
//       totalScore += 60; // Boost score if AI detects scam
//     }
//   } catch (error) {
//     console.warn('AI analysis failed:', error);
//   }

//   // FIXED LOGIC: Determine risk level based on total score
//   let risk: 'Safe' | 'Suspicious' | 'Scam' = 'Safe';
//   let confidence = Math.min(98, Math.max(5, totalScore)); // Risk score = total score
//   let explanation = '';

//   // CORRECTED THRESHOLDS
//   if (totalScore >= 70 || detectedCombinations.length > 0) {
//     risk = 'Scam';
//     confidence = Math.min(98, Math.max(70, totalScore));
//     explanation = detectedCombinations.length > 0 
//       ? getTranslatedExplanation(language, 'scam_message_combination')
//       : getTranslatedExplanation(language, 'scam_message_high');
//   } else if (totalScore >= 40) {
//     risk = 'Suspicious';
//     confidence = Math.min(69, Math.max(40, totalScore));
//     explanation = getTranslatedExplanation(language, 'suspicious_message');
//   } else {
//     risk = 'Safe';
//     confidence = Math.min(39, Math.max(5, totalScore));
//     explanation = getTranslatedExplanation(language, 'safe_message');
//   }

//   // Override with AI analysis if available and confident
//   if (aiAnalysis && aiAnalysis.isScam && aiAnalysis.confidence > 80) {
//     risk = 'Scam';
//     confidence = Math.max(confidence, aiAnalysis.confidence);
//     explanation = `AI Detection: ${aiAnalysis.reasoning}`;
//   }

//   return {
//     id: generateId(),
//     type: 'Message Analysis',
//     content: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
//     risk,
//     confidence,
//     explanation,
//     timestamp: new Date(),
//     language,
//   };
// }

// export async function synthesizeSpeech(text: string, language: Language): Promise<void> {
//   await new Promise(resolve => setTimeout(resolve, 1000));
  
//   if ('speechSynthesis' in window) {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'en-US';
//     utterance.rate = 0.8;
//     speechSynthesis.speak(utterance);
//   }
// }

// function extractDomain(url: string): string {
//   try {
//     const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
//     return urlObj.hostname;
//   } catch {
//     return url;
//   }
// }

// function generateId(): string {
//   return Math.random().toString(36).substring(2) + Date.now().toString(36);
// }

// function getTranslatedExplanation(language: Language, type: string): string {
//   const explanations = {
//     en: {
//       safe_url: 'This URL appears to be safe based on domain reputation and security checks.',
//       suspicious_url: 'This URL shows suspicious characteristics. Exercise caution before visiting.',
//       scam_url: 'This URL is likely malicious. Do not visit or share personal information.',
//       safe_message: 'This message appears legitimate with no obvious scam indicators.',
//       suspicious_message: 'This message contains suspicious phrases commonly used in scams.',
//       scam_message: 'This message shows clear signs of being a scam. Do not respond or click any links.',
//       scam_message_high: 'DANGER: This is a classic advance fee scam. Never pay money to claim prizes. Legitimate contests do not require upfront payments.',
//       scam_message_combination: 'CRITICAL ALERT: This message contains multiple scam indicators including prize claims and payment requests. This is definitely a scam.',
//     },
//     es: {
//       safe_url: 'Esta URL parece ser segura basada en la reputación del dominio y verificaciones de seguridad.',
//       suspicious_url: 'Esta URL muestra características sospechosas. Tenga precaución antes de visitar.',
//       scam_url: 'Esta URL es probablemente maliciosa. No visite ni comparta información personal.',
//       safe_message: 'Este mensaje parece legítimo sin indicadores obvios de estafa.',
//       suspicious_message: 'Este mensaje contiene frases sospechosas comúnmente usadas en estafas.',
//       scam_message: 'Este mensaje muestra signos claros de ser una estafa. No responda ni haga clic en enlaces.',
//       scam_message_high: 'PELIGRO: Esta es una estafa clásica de tarifa por adelantado. Nunca pague dinero para reclamar premios.',
//       scam_message_combination: 'ALERTA CRÍTICA: Este mensaje contiene múltiples indicadores de estafa incluyendo reclamos de premios y solicitudes de pago. Definitivamente es una estafa.',
//     },
//     fr: {
//       safe_url: 'Cette URL semble sûre basée sur la réputation du domaine et les vérifications de sécurité.',
//       suspicious_url: 'Cette URL présente certaines caractéristiques suspectes. Soyez prudent avant de visiter.',
//       scam_url: 'Cette URL est probablement malveillante. Ne visitez pas ou ne partagez pas d\'informations personnelles.',
//       safe_message: 'Ce message semble légitime sans indicateurs évidents d\'escroquerie.',
//       suspicious_message: 'Ce message contient des phrases suspectes couramment utilisées dans les escroqueries.',
//       scam_message: 'Ce message montre des signes clairs d\'être une escroquerie. Ne répondez pas ou ne cliquez sur aucun lien.',
//       scam_message_high: 'DANGER: Il s\'agit d\'une escroquerie classique de frais anticipés. Ne payez jamais d\'argent pour réclamer des prix.',
//       scam_message_combination: 'ALERTE CRITIQUE: Ce message contient plusieurs indicateurs d\'escroquerie y compris des réclamations de prix et des demandes de paiement. C\'est définitivement une escroquerie.',
//     },
//   };

//   return explanations[language]?.[type] || explanations.en[type];
// }


// import { HfInference } from '@huggingface/inference';
import { InferenceClient } from '@huggingface/inference';
import type { AnalysisResult, Language } from '../types';
// import { textGeneration } from "@huggingface/inference";

const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

// Initialize Hugging Face client with free inference API
const hf = new InferenceClient(API_KEY);


// Enhanced scam detection patterns with weighted scoring
const SCAM_INDICATORS = {
  en: {
    // High-risk indicators (weight: 50-70 points each)
    highRisk: [
      'you have won', 'congratulations you won', 'you are selected', 'you have been selected',
      'pay first', 'pay to claim', 'pay processing fee', 'pay verification fee', 'pay registration fee',
      'show legitimacy', 'prove legitimacy', 'advance payment', 'upfront payment', 'send money first',
      'transfer fee', 'claim your prize', 'won prize', 'won money', 'won cash', 'lottery winner',
      'contest winner', 'lucky winner', 'selected winner', 'government subsidy', 'covid support',
      'relief fund', 'urgent verification', 'account suspended', 'immediate action', 'verify now',
      'click here now', 'limited time', 'expires today', 'act fast', 'hurry up', 'selected for job',
      'online job opportunity', 'work from home job', 'earn money online', 'pay to apply',
      'registration fee required', 'security deposit', 'refundable deposit', 'send pan', 'send aadhaar',
      'share otp', 'give otp', 'provide otp', 'send pin', 'share pin', 'give pin',
      'your sim will be blocked', 'clear customs fee', 'send gst number', 'pay tax upfront',
      'passport suspended', 'electricity will be disconnected', 'blacklist removal fee',
      'loan approved pay fee', 'click secure link', 'verify via link'
    ],
    // Medium-risk indicators (weight: 25-35 points each)
    mediumRisk: [
      'free money', 'easy money', 'quick money', 'earn money', 'make money', 'suspicious activity',
      'security alert', 'verify account', 'update details', 'confirm identity', 'bank support',
      'customer care', 'technical support', 'help desk', 'urgent', 'immediate', 'asap',
      'quickly', 'fast', 'sbi support', 'hdfc support', 'icici support',
      'account verification needed', 'unusual activity', 'verify to avoid suspension',
      'reset kyc', 'your profile is incomplete', 'address verification pending'
    ],
    // Low-risk indicators (weight: 10-20 points each)
    lowRisk: [
      'click here', 'visit link', 'download app', 'install now', 'register now', 'sign up',
      'apply now', 'contact us', 'call now', 'whatsapp', 'telegram', 'limited offer',
      'grab this deal', 'offer inside', 'refer a friend', 'share to win', 'get gift card',
      'follow for prizes'
    ]
  },
  es: {
    highRisk: [
      'has ganado', 'felicidades ganaste', 'has sido seleccionado', 'pagar primero',
      'pagar para reclamar', 'mostrar legitimidad', 'pago por adelantado', 'enviar dinero',
      'ganaste premio', 'ganador de lotería', 'subsidio gubernamental', 'apoyo covid',
      'verificación urgente', 'cuenta suspendida', 'acción inmediata', 'trabajo en línea',
      'pagar para aplicar', 'compartir otp', 'enviar pin',
      'tu cuenta fue bloqueada', 'tarifa de verificación', 'transferencia pendiente',
      'sólo paga el cargo de procesamiento', 'urgente: responde ahora',
      'haz clic en el enlace seguro', 'confirmar identidad'
    ],
    mediumRisk: [
      'dinero gratis', 'dinero fácil', 'ganar dinero', 'actividad sospechosa',
      'alerta de seguridad', 'verificar cuenta', 'soporte bancario', 'urgente', 'inmediato',
      'verifica tu perfil', 'confirma tu dirección', 'soporte técnico', 'centro de ayuda'
    ],
    lowRisk: [
      'haga clic aquí', 'visitar enlace', 'descargar aplicación', 'registrarse ahora',
      'contactanos', 'llámanos ahora', 'whatsapp disponible', 'telegram', 'oferta limitada',
      'refiere y gana', 'comparte para ganar', 'sorteo exclusivo'
    ]
  },

  fr: {
    highRisk: [
      'vous avez gagné', 'félicitations vous avez gagné', 'vous avez été sélectionné',
      'payer d\'abord', 'payer pour réclamer', 'montrer légitimité', 'paiement anticipé',
      'envoyer argent', 'gagné prix', 'gagnant loterie', 'subvention gouvernementale',
      'soutien covid', 'vérification urgente', 'compte suspendu', 'action immédiate',
      'travail en ligne', 'payer pour postuler', 'partager otp', 'envoyer pin',
      'frais de vérification requis', 'paiement à l\'avance', 'héritage en attente',
      'offre gouvernementale exclusive', 'formulaire à remplir pour débloquer le prix'
    ],
    mediumRisk: [
      'argent gratuit', 'argent facile', 'gagner argent', 'activité suspecte',
      'alerte sécurité', 'vérifier compte', 'support bancaire', 'urgent', 'immédiat',
      'réinitialiser vos informations', 'mettre à jour vos données', 'identité requise'
    ],
    lowRisk: [
      'cliquez ici', 'visiter lien', 'télécharger application', 's\'inscrire maintenant',
      'contactez nous', 'offre limitée', 'partager avec vos amis', 'télégramme', 'whatsapp',
      'réclamer votre récompense', 'gagner des cadeaux', 'tirage au sort exclusif'
    ]
  }
};

// Dangerous scam combinations
const SCAM_COMBINATIONS = [
  // English combos
  { patterns: ['won', 'pay'], weight: 90, description: 'Prize + Payment scam' },
  { patterns: ['selected', 'fee'], weight: 85, description: 'Selection + Fee scam' },
  { patterns: ['government', 'pay'], weight: 95, description: 'Fake government scheme' },
  { patterns: ['job', 'pay'], weight: 80, description: 'Fake job scam' },
  { patterns: ['covid', 'support', 'pay'], weight: 95, description: 'COVID relief scam' },
  { patterns: ['bank', 'verify', 'urgent'], weight: 75, description: 'Fake bank alert' },
  { patterns: ['account', 'suspended', 'verify'], weight: 80, description: 'Account suspension scam' },
  { patterns: ['otp', 'share'], weight: 95, description: 'OTP sharing scam' },
  { patterns: ['pin', 'give'], weight: 95, description: 'PIN sharing scam' },
  { patterns: ['pan', 'send'], weight: 90, description: 'Identity theft scam' },
  { patterns: ['aadhaar', 'send'], weight: 90, description: 'Identity theft scam' },
  { patterns: ['lottery', 'processing fee'], weight: 90, description: 'Lottery + Fee scam' },
  { patterns: ['customs', 'pay'], weight: 85, description: 'Fake customs scam' },
  { patterns: ['account', 'blocked', 'kyc'], weight: 80, description: 'KYC blackmail scam' },

  { patterns: ['immediate', 'payment', 'required'], weight: 85, description: 'Urgent payment demand' },
  { patterns: ['click', 'link', 'verify'], weight: 80, description: 'Phishing link' },
  { patterns: ['wire', 'transfer', 'fee'], weight: 85, description: 'Wire transfer scam' },
  { patterns: ['refund', 'claim', 'fee'], weight: 80, description: 'Refund scam' },
  { patterns: ['inheritance', 'claim', 'payment'], weight: 90, description: 'Inheritance scam' },
  { patterns: ['dear', 'customer', 'update'], weight: 70, description: 'Generic scam opener' },
  { patterns: ['account', 'closure', 'action'], weight: 75, description: 'Account closure scam' },
  { patterns: ['lottery', 'winner', 'claim'], weight: 90, description: 'Lottery winner scam' },
  { patterns: ['send', 'money', 'now'], weight: 95, description: 'Urgent money demand' },
  { patterns: ['refund', 'payment', 'method'], weight: 80, description: 'Refund payment scam' },

  // Spanish combos
  { patterns: ['ganado', 'pagar'], weight: 90, description: 'Premio + Pago (Prize + Pay)' },
  { patterns: ['has sido seleccionado', 'tarifa'], weight: 85, description: 'Selección + Tarifa' },
  { patterns: ['subvención', 'pago'], weight: 95, description: 'Subsidio + Pago' },
  { patterns: ['trabajo en línea', 'registro'], weight: 85, description: 'Trabajo falso con pago' },
  { patterns: ['cuenta', 'suspendida', 'verificar'], weight: 80, description: 'Alerta bancaria falsa' },
  { patterns: ['actividad', 'sospechosa', 'verificar'], weight: 75, description: 'Actividad sospechosa' },
  { patterns: ['compartir', 'otp'], weight: 95, description: 'Estafa de OTP' },
  { patterns: ['pagar', 'antes'], weight: 85, description: 'Anticipo fraudulento' },
  { patterns: ['verificación urgente', 'haz clic'], weight: 80, description: 'Click fraudulento' },

  { patterns: ['transferencia', 'urgente', 'dinero'], weight: 90, description: 'Transferencia urgente' },
  { patterns: ['reembolso', 'solicitud', 'pago'], weight: 80, description: 'Solicitud de reembolso' },
  { patterns: ['herencia', 'reclamar', 'pago'], weight: 90, description: 'Estafa de herencia' },
  { patterns: ['actualización', 'cuenta', 'cliente'], weight: 70, description: 'Estafa genérica' },
  { patterns: ['cierre', 'cuenta', 'acción'], weight: 75, description: 'Cierre de cuenta falso' },
  { patterns: ['ganador', 'lotería', 'reclamar'], weight: 90, description: 'Estafa de ganador de lotería' },
  { patterns: ['envíe', 'dinero', 'ahora'], weight: 95, description: 'Demanda urgente de dinero' },
  { patterns: ['solicitud', 'pago', 'reembolso'], weight: 80, description: 'Estafa de pago reembolso' },

  // French combos
  { patterns: ['vous avez gagné', 'paiement requis'], weight: 90, description: 'Gagnant + Paiement' },
  { patterns: ['subvention gouvernementale', 'frais'], weight: 95, description: 'Subvention + Frais' },
  { patterns: ['compte', 'suspendu', 'vérifiez'], weight: 80, description: 'Fausse suspension de compte' },
  { patterns: ['emploi', 'payer'], weight: 85, description: 'Offre d’emploi frauduleuse' },
  { patterns: ['soutien', 'covid', 'paiement'], weight: 90, description: 'Soutien COVID + Frais' },
  { patterns: ['partager', 'otp'], weight: 95, description: 'Partage OTP' },
  { patterns: ['paiement anticipé', 'gagner'], weight: 85, description: 'Paiement anticipé + Gagnant' },
  { patterns: ['vérifier', 'maintenant', 'compte'], weight: 75, description: 'Vérification urgente' },

  { patterns: ['transfert', 'urgent', 'argent'], weight: 90, description: 'Transfert urgent d’argent' },
  { patterns: ['remboursement', 'demande', 'paiement'], weight: 80, description: 'Demande de remboursement' },
  { patterns: ['héritage', 'réclamer', 'paiement'], weight: 90, description: 'Arnaque à l’héritage' },
  { patterns: ['mise à jour', 'compte', 'client'], weight: 70, description: 'Arnaque générique' },
  { patterns: ['fermeture', 'compte', 'action'], weight: 75, description: 'Fausse fermeture de compte' },
  { patterns: ['gagnant', 'loterie', 'réclamer'], weight: 90, description: 'Arnaque gagnant de loterie' },
  { patterns: ['envoyer', 'argent', 'maintenant'], weight: 95, description: 'Demande urgente d’argent' },
  { patterns: ['demande', 'paiement', 'remboursement'], weight: 80, description: 'Arnaque de paiement remboursement' }
];

const SUSPICIOUS_DOMAINS = [
  // === HOMOGLYPH/LOOKALIKE DOMAINS (High Priority) ===
  // Google variants (most common target)
  'g00gle.com', 'googIe.com', 'goog1e.com', 'gooogle.com', 'googlle.com', 
  'gooqle.com', 'googel.com', 'gogle.com', 'googie.com', 'goolge.com',
  'googl3.com', 'g0ogle.com', 'go0gle.com', 'googl.com', 'googlee.com','gmaiI.com',
  
  // PayPal variants (financial target)
  'paypaI.com', 'paypa1.com', 'paypaII.com', 'payp4l.com', 'paypaL.com',
  'paypaI.net', 'paypal-secure.com', 'paypal-verify.com', 'paypaI-support.com',
  'paypaI.org', 'paypaI.info', 'paypaI.biz', 'paypaI.co', 'paypaI.us',
  'paipal.com', 'paypaI.me', 'paypaI.co.uk', 'paypaI.ca', 'paypaI.de',
  
  // Amazon variants
  'amaz0n.com', 'amazom.com', 'amazon.co', 'amazon-secure.com', 'amazon-verify.com',
  'amazone.com', 'amazom.net', 'amaz0n.net', 'amazon-support.com', 'amazon-help.com',
  'amazom.org', 'amaz0n.org', 'amazon.info', 'amazon.biz', 'amazon-login.com',
  
  // Microsoft variants
  'microsft.com', 'micr0soft.com', 'microsooft.com', 'microsofft.com','rnicrosoft.com',
  'microsot.com', 'microsofy.com', 'microsoff.com', 'microsoft-secure.com',
  'microsoft-support.com', 'microsoft-login.com', 'microsoft.net', 'microsoft.org',
  
  // Apple variants
  'appIe.com', 'app1e.com', 'appl3.com', 'apple.co', 'apple-secure.com',
  'apple-support.com', 'apple-id.com', 'apple-verify.com', 'applle.com',
  'apple.net', 'apple.org', 'apple.info', 'apple-login.com', 'apple-help.com',
  
  // Facebook/Meta variants
  'faceb00k.com', 'facebook.co', 'facebo0k.com', 'facebok.com', 'facebook-secure.com',
  'facebook-login.com', 'facebook.net', 'facebook.org', 'facebo0k.net',
  'facebook-verify.com', 'facebook-support.com', 'faceb0ok.com', 'facebk.com',
  
  // Banking homoglyphs (Indian banks)
  'sbI.co.in', 'sbi.c0.in', 'sbi-secure.com', 'sbi-online.com', 'sbi-verify.com',
  'hdfcbank.c0m', 'hdfc-bank.com', 'hdfc-secure.com', 'hdfc-verify.com',
  'icicibank.c0m', 'icici-bank.com', 'icici-secure.com', 'icici-verify.com',
  'axisbank.c0m', 'axis-bank.com', 'axis-secure.com', 'axis-verify.com',
  
  // Cryptocurrency exchanges
  'binance.c0m', 'binance.co', 'binance-secure.com', 'binance-verify.com',
  'coinbase.c0m', 'coinbase.co', 'coinbase-secure.com', 'coinbase-verify.com',
  
  // === TYPOSQUATTING PATTERNS ===
  // Common character substitutions
  'arnazon.com', 'paypaI.com', 'microsaft.com', 'gmai1.com', 'gmaiI.com',
  'youtub3.com', 'youtu6e.com', 'linkedln.com', 'linkedm.com', 'twltter.com',
  'twitterr.com', 'instaqram.com', 'instagramm.com', 'whatsaap.com', 'whatsapp.co',
  
  // === SUSPICIOUS PREFIXES/SUFFIXES ===
  'secure-paypal.com', 'verify-paypal.com', 'paypal-security.com', 'paypal-update.com',
  'secure-amazon.com', 'verify-amazon.com', 'amazon-security.com', 'amazon-update.com',
  'secure-google.com', 'verify-google.com', 'google-security.com', 'google-update.com',
  'secure-microsoft.com', 'verify-microsoft.com', 'microsoft-security.com',
  'secure-apple.com', 'verify-apple.com', 'apple-security.com', 'apple-update.com',
  
  // === GOVERNMENT/OFFICIAL IMPERSONATION ===
  'gov-support.com', 'government-scheme.com', 'covid-relief.com', 'covid-support.com',
  'irs-refund.com', 'tax-refund.com', 'social-security.com', 'medicare-update.com',
  'india-gov.com', 'gov-india.com', 'pm-kisan.com', 'digital-india.com',
  
  // === FINANCIAL SCAM DOMAINS ===
  'instant-loan.com', 'quick-loan.com', 'easy-loan.com', 'loan-approved.com',
  'credit-approved.com', 'instant-credit.com', 'quick-money.com', 'easy-money.com',
  'lottery-winner.com', 'prize-winner.com', 'jackpot-winner.com', 'lucky-winner.com',
  
  // === JOB SCAM DOMAINS ===
  'work-from-home.com', 'online-jobs.com', 'easy-jobs.com', 'quick-jobs.com',
  'job-opportunity.com', 'employment-offer.com', 'career-opportunity.com',
  'remote-work.com', 'home-based-work.com', 'part-time-jobs.com',
  
  // === TECH SUPPORT SCAM DOMAINS ===
  'microsoft-support.net', 'apple-support.net', 'google-support.net',
  'tech-support.com', 'computer-help.com', 'virus-removal.com', 'pc-repair.com',
  'antivirus-update.com', 'security-alert.com', 'system-warning.com',
  
  // Spanish scam keywords/domains (extended)
  'trabajorapido', 'dinero-facil', 'pagarahora', 'verificacion-urgente',
  'cuentasuspendida', 'pago-rapido', 'premioganado', 'ganador-loteria',
  'reembolso-pago', 'herencia-pago', 'fraude-bancario', 'dinero-rapido',
  'trabajo-online', 'pago-antiguo', 'verificar-cuenta', 'pago-seguro',
  'alerta-banco', 'cuenta-verificada', 'pago-express',

  // French scam keywords/domains (extended)
  'emploi-rapide', 'argent-facile', 'paiement-urgent', 'verification-compte',
  'compte-suspendu', 'paiement-rapide', 'gagnant-loterie',
  'remboursement-paiement', 'fraude-bancaire', 'aide-covid',
  'verification-urgent', 'paiement-express', 'alerte-securite',
  'partage-otp', 'offre-emploi', 'paiement-frais',

  // Suspicious TLDs often abused by scammers (extended)
  '.xyz', '.top', '.club', '.online', '.site', '.win', '.bid', '.loan',
  '.review', '.account', '.date', '.vip', '.men', '.party', '.trade',
  '.racing', '.stream', '.click', '.download', '.work', '.webcam',
  '.cricket', '.fit', '.gq', '.ml', '.cf', '.ga', '.tk', '.pw', '.buzz',

  // Common scam-related prefixes or words in domains
  'secure-', 'verify-', 'payment-', 'account-', 'login-', 'update-',
  'alert-', 'official-', 'fast-', 'express-', 'claim-', 'bonus-', 'prize-',

  // Additional suspicious keywords
  'freegift', 'cashbonus', 'instantcash', 'easyloan', 'quickloan', 'creditcardverify',
  'identityverify', 'fraudalert', 'securityupdate', 'taxrefund', 'irspayment',
  'socialsecurity', 'banksecure', 'safeaccount', 'paymentrequest',

  // Some random suspicious-looking domains (example)
  'paytmverify.com', 'secure-paypal.net', 'support-gov.org', 'payment-update.biz',
  'covid19relieffund.com', 'alertbanking.info', 'instantlottery.win',
  // === SUSPICIOUS TLDs ===
  '.tk', '.ml', '.ga', '.cf', '.gq', '.pw', '.top', '.xyz', '.club', '.online',
  '.site', '.win', '.bid', '.loan', '.review', '.account', '.date', '.vip',
  '.men', '.party', '.trade', '.racing', '.stream', '.click', '.download',
  '.work', '.webcam', '.cricket', '.fit', '.buzz', '.science', '.faith',
   // **ADD THESE for rn -> m substitution**
  'rnicrosft.com', 'rnicrosft.net', 'rnicrosft.org',
  'arnaz0n.com', 'arnazon.com', 'rnazon.com',
  'gmaiI.com', 'gmaiI.net', // Capital I variants
  'googIe.com', 'googIe.net', // Capital I variants
  'appIe.com', 'appIe.net', // Capital I variants
  'paypaI.com', 'paypaI.net', // Capital I variants
  
  // === REGIONAL SCAM PATTERNS ===
  // Indian specific
  'paytm-verify.com', 'paytm-secure.com', 'paytm-support.com', 'paytm.co',
  'phonepe-verify.com', 'phonepe-secure.com', 'gpay-verify.com', 'gpay-secure.com',
  'aadhaar-update.com', 'pan-update.com', 'kyc-update.com', 'upi-verify.com',
  
  // === HOMOGLYPH CHARACTERS (Unicode lookalikes) ===
  // These use actual Unicode homoglyphs
  'аpple.com', 'gооgle.com', 'раypal.com', 'аmazon.com', 'miсrosoft.com',
  'fаcebook.com', 'instаgram.com', 'tеlegram.com', 'whаtsapp.com', 'уoutube.com',
  
  // === BRAND IMPERSONATION WITH COMMON MISSPELLINGS ===
  'netflix.co', 'spotify.co', 'disney.co', 'hulu.co', 'prime-video.com',
  'youtube-premium.com', 'netflix-premium.com', 'spotify-premium.com',
  'amazon-prime.co', 'disney-plus.co', 'netflix-support.com', 'spotify-support.com',
  
  // === CRYPTOCURRENCY SCAMS ===
  'bitcoin-wallet.com', 'crypto-wallet.com', 'blockchain-wallet.com',
  'bitcoin-investment.com', 'crypto-investment.com', 'bitcoin-trading.com',
  'crypto-trading.com', 'bitcoin-mining.com', 'crypto-mining.com',
  
  // === ROMANCE/DATING SCAMS ===
  'dating-site.com', 'romance-finder.com', 'love-connection.com',
  'match-maker.com', 'dating-app.com', 'romance-app.com', 'love-app.com',
  
  // === FAKE NEWS/CLICKBAIT DOMAINS ===
  'breaking-news.com', 'urgent-news.com', 'viral-news.com', 'trending-news.com',
  'celebrity-news.com', 'shocking-news.com', 'exclusive-news.com'
];

const SAFE_DOMAINS = [
  // === MAJOR TECH COMPANIES ===
  'google.com', 'gmail.com', 'youtube.com', 'googledrive.com', 'googlecloud.com',
  'microsoft.com', 'outlook.com', 'office.com', 'azure.com', 'xbox.com',
  'apple.com', 'icloud.com', 'itunes.com', 'appstore.com', 'mac.com',
  'amazon.com', 'aws.amazon.com', 'amazon.in', 'amazon.co.uk', 'amazon.de',
  'facebook.com', 'instagram.com', 'whatsapp.com', 'messenger.com', 'meta.com',
  'twitter.com', 'x.com', 'linkedin.com', 'reddit.com', 'discord.com',
  'telegram.org', 'signal.org', 'zoom.us', 'skype.com', 'teams.microsoft.com',
  
  // === LEGITIMATE FINANCIAL INSTITUTIONS ===
  // Indian Banks
  'sbi.co.in', 'onlinesbi.com', 'icicibank.com', 'hdfcbank.com', 'axisbank.com',
  'kotak.com', 'indusind.com', 'yesbank.in', 'pnbindia.in', 'bankofindia.co.in',
  'canarabank.com', 'unionbankofindia.co.in', 'bankofbaroda.in',
  
  // International Banks
  'chase.com', 'bankofamerica.com', 'wellsfargo.com', 'citibank.com',
  'jpmorgan.com', 'goldmansachs.com', 'morganstanley.com', 'hsbc.com',
  'barclays.co.uk', 'lloydsbank.com', 'santander.com', 'bnpparibas.com',
  
  // Payment Processors
  'paypal.com', 'stripe.com', 'square.com', 'razorpay.com', 'paytm.com',
  'phonepe.com', 'googlepay.com', 'amazonpay.com', 'payu.in', 'instamojo.com',
  
  // === GOVERNMENT DOMAINS ===
  'gov.in', 'india.gov.in', 'mygov.in', 'digitalindia.gov.in', 'uidai.gov.in',
  'incometaxindia.gov.in', 'epfindia.gov.in', 'esic.in', 'nrega.nic.in',
  'usa.gov', 'irs.gov', 'ssa.gov', 'medicare.gov', 'cdc.gov', 'fda.gov',
  'gov.uk', 'hmrc.gov.uk', 'nhs.uk', 'gov.ca', 'canada.ca', 'cra-arc.gc.ca',
  
  // === EDUCATIONAL INSTITUTIONS ===
  'mit.edu', 'harvard.edu', 'stanford.edu', 'berkeley.edu', 'caltech.edu',
  'ox.ac.uk', 'cam.ac.uk', 'imperial.ac.uk', 'ucl.ac.uk', 'kcl.ac.uk',
  'iitb.ac.in', 'iitd.ac.in', 'iitk.ac.in', 'iitm.ac.in', 'iisc.ac.in',
  
  // === NEWS AND MEDIA ===
  'bbc.com', 'cnn.com', 'reuters.com', 'ap.org', 'bloomberg.com',
  'wsj.com', 'nytimes.com', 'washingtonpost.com', 'theguardian.com',
  'economist.com', 'forbes.com', 'techcrunch.com', 'wired.com', 'arstechnica.com',
  
  // === E-COMMERCE PLATFORMS ===
  'ebay.com', 'etsy.com', 'shopify.com', 'alibaba.com', 'aliexpress.com',
  'flipkart.com', 'myntra.com', 'snapdeal.com', 'nykaa.com', 'bigbasket.com',
  
  // === CLOUD AND HOSTING ===
  'github.com', 'gitlab.com', 'bitbucket.org', 'sourceforge.net',
  'digitalocean.com', 'linode.com', 'vultr.com', 'heroku.com',
  'netlify.com', 'vercel.com', 'cloudflare.com', 'fastly.com',
  
  // === CRYPTOCURRENCY EXCHANGES (Legitimate) ===
  'coinbase.com', 'binance.com', 'kraken.com', 'gemini.com', 'bitstamp.net',
  'coindesk.com', 'coinmarketcap.com', 'coingecko.com', 'blockchain.com',
  
  // === PRODUCTIVITY AND COLLABORATION ===
  'notion.so', 'slack.com', 'trello.com', 'asana.com', 'monday.com',
  'dropbox.com', 'box.com', 'onedrive.com', 'googledrive.com', 'icloud.com'
];


// Use Hugging Face model for advanced text classification
// async function analyzeWithHuggingFace(text: string): Promise<{ isScam: boolean; confidence: number; reasoning: string }> {
//   try {
//     // Use a free text classification model
//     const prompt = `Analyze this message for scam indicators. Consider these as HIGH RISK scam patterns:
// - Prize/lottery wins requiring payment
// - Job offers requiring upfront payment
// - Government schemes requiring fees
// - Urgent account verification requests
// - Requests for OTP/PIN sharing
// - Fake bank/support messages

// Message: "${text}"

// Is this a scam? Provide reasoning.`;

//     // const response = await hf.textGeneration({
//     //   model: 'microsoft/DialoGPT-medium',
//     //   inputs: prompt,
//     //   parameters: {
//     //     max_new_tokens: 150,
//     //     temperature: 0.3,
//     //     return_full_text: false
//     //   }
//     // });
   
//     const response = await hf.textGeneration({
//       provider: "hf-inference",
//       model: "sarvamai/sarvam-m", //tiiuae/falcon-7b-instruct, 'microsoft/DialoGPT-medium', 'gpt2', 'sarvamai/sarvam-m'
//       inputs: prompt,
//       parameters: { 
//         max_new_tokens: 150,
//         temperature: 0.3, 
//         top_p: 0.9,
//         do_sample: true,
//       },
//     });
    
//     const result = response.generated_text?.toLowerCase() || '';
//     console.log(response.generated_text);
    
//     // Parse the AI response
//     const isScam = result.includes('scam') || result.includes('fraud') || result.includes('suspicious');
//     const confidence = isScam ? 85 : 75;
//     const reasoning = response.generated_text || 'AI analysis completed';

//     return { isScam, confidence, reasoning };
//   } catch (error) {
//     console.warn('Hugging Face API failed, falling back to pattern matching:', error);
//     return { isScam: false, confidence: 50, reasoning: 'Fallback analysis used' };
//   }
// }


async function analyzeWithHuggingFace(text: string): Promise<{ isScam: boolean; confidence: number; reasoning: string }> {
  try {
    const prompt = `Analyze this message for scam indicators:
- Prize/lottery wins requiring payment
- Job offers requiring upfront payment
- Government schemes requiring fees
- Urgent account verification requests
- Requests for OTP/PIN sharing
- Fake bank/support messages

Message: "${text}"

Provide analysis in this EXACT format:
Is scam: [Yes/No]
Confidence: [1-100%]
Reasoning: [2-3 sentence explanation]`;

      // const prompt = `You are a fraud-detection expert. Analyze this message for scam indicators:
      // - Prize/lottery wins requiring payment
      // - Job offers requiring upfront payment
      // - Government schemes requiring fees
      // - Urgent account verification requests
      // - Requests for OTP/PIN sharing
      // - Fake bank or support messages

      // Message: "${text}"

      // Provide your output in **exactly** this format (use only integer percentages, include “%”):

      // Is scam: [Yes/No]  
      // Confidence: [1-100%]  // Confidence that your “Is scam” answer is correct  
      // Reasoning: [2–3 sentences explaining why you chose that label]

      // **Guidance:**  
      // - If you choose “Yes,” the confidence is how sure you are that it *is* a scam.  
      // - If you choose “No,” the confidence is how sure you are that it *is not* a scam.  
      // - If you’re very sure in either direction, pick a value ≥ 80%.`


    const response = await hf.chatCompletion({
      provider: "together",
      model: "mistralai/Mistral-7B-Instruct-v0.3", // Chat-completion model
      messages: [
        { 
          role: 'system', 
          content: 'You are a fraud detection expert analyzing messages for scam indicators. Respond ONLY in the requested format.' 
        },
        { 
          role: 'user', 
          content: prompt 
        }
      ],
      parameters: {
        max_new_tokens: 200,
        temperature: 0.3,
        top_p: 0.9,
      }
    });

    // Extract the generated content safely
    const result = response.choices?.[0]?.message?.content || '';
    console.log('AI Response:', result);

// FIXED: Proper parsing of AI response
    let isScam = false;
    let confidence = 50;
    let reasoning = 'Analysis completed';

    // Parse "Is scam: Yes/No" more carefully
    const scamMatch = result.match(/Is scam:\s*(Yes|No)/i);
    if (scamMatch) {
      isScam = scamMatch[1].toLowerCase() === 'yes';
    } else {
      // Fallback: look for scam-related keywords only if no clear Yes/No found
      isScam = /\b(scam|fraud|malicious|phishing)\b/i.test(result) && 
               !/not.*scam|no.*scam|legitimate|safe/i.test(result);
    }
    
    // Parse confidence percentage
    const confidenceMatch = result.match(/Confidence:\s*(\d+)/);
    if (confidenceMatch) {
      confidence = parseInt(confidenceMatch[1]);
    }
    
    // Extract reasoning
    const reasoningMatch = result.split('Reasoning:')[1];
    if (reasoningMatch) {
      reasoning = reasoningMatch.trim();
    }
    
    console.log('Parsed result:', { isScam, confidence, reasoning });
    
    return { 
      isScam, 
      confidence: Math.min(100, Math.max(0, confidence)),
      reasoning: reasoning.substring(0, 500) // Limit length
    };
  } catch (error) {
    console.warn('Hugging Face API failed:', error);
    return { 
      isScam: false, 
      confidence: 50, 
      reasoning: 'Fallback analysis used - API error' 
    };
  }
}

// FINAL DETECT HOMOGLYPHIC ATTACK FUNCTION
// function detectHomoglyphAttack(domain: string): { isHomoglyph: boolean; suspiciousChars: string[] } {
//   const suspiciousChars: string[] = [];
//   let isHomoglyph = false;

//   // 1. Hardcoded dangerous patterns for major brands
//   const hardcodedPatterns = [
//     { brand: 'gmail.com', patterns: [/gmai[I1і]/] },
//     { brand: 'google.com', patterns: [/goog[I1і]e/] },
//     { brand: 'apple.com', patterns: [/app[I1і]e/] },
//     { brand: 'paypal.com', patterns: [/paypa[I1і]l?/] },
//     { brand: 'microsoft.com', patterns: [/rnicrosoft/, /micr[o0]soft/] },
//     { brand: 'amazon.com', patterns: [/arnazon/, /amaz[o0]n/] },
//   ];
//   for (const { brand, patterns } of hardcodedPatterns) {
//     for (const pattern of patterns) {
//       if (pattern.test(domain)) {
//         suspiciousChars.push(`Pattern matches homoglyph phishing for ${brand}`);
//         isHomoglyph = true;
//       }
//     }
//   }

//   // 2. General Unicode homoglyphs (Cyrillic, Greek, etc.)
//   const hasLatin = /[a-zA-Z]/.test(domain);
//   for (let i = 0; i < domain.length; i++) {
//     const char = domain[i];
//     const code = char.charCodeAt(0);
//     if (hasLatin && ((code >= 0x0400 && code <= 0x04FF) || (code >= 0x0370 && code <= 0x03FF))) {
//       suspiciousChars.push(`${char} (non-Latin script)`);
//       isHomoglyph = true;
//     }
//   }

//   // 3. Special: rn for m anywhere in the domain for major brands
//   if (/rn/.test(domain)) {
//     const rnToM = domain.replace(/rn/g, 'm');
//     const legitBrands = ['microsoft.com'];
//     if (legitBrands.some(legit => rnToM.includes(legit))) {
//       suspiciousChars.push('rn (impersonating m)');
//       isHomoglyph = true;
//     }
//   }

//   // 4. Special: vv for w
//   if (domain.includes('vv')) {
//     suspiciousChars.push('vv (impersonating w)');
//     isHomoglyph = true;
//   }

//   return { isHomoglyph, suspiciousChars };
// }




//FINAL ANALYZE URL FUNCTION

// export async function analyzeUrl(url: string, language: Language): Promise<AnalysisResult> {
//   await new Promise(resolve => setTimeout(resolve, 1500));

//   const domain = extractDomain(url);
//   let risk: 'Safe' | 'Suspicious' | 'Scam' = 'Safe';
//   let confidence = 95;
//   let explanation = '';

//   if (SAFE_DOMAINS.some(safeDomain => domain.includes(safeDomain))) {
//     risk = 'Safe';
//     confidence = 15; // LOW risk score for safe URLs
//     explanation = getTranslatedExplanation(language, 'safe_url');
//   } else if (SUSPICIOUS_DOMAINS.some(suspDomain => domain.includes(suspDomain))) {
//     risk = 'Scam';
//     confidence = 95; // HIGH risk score for scam URLs
//     explanation = getTranslatedExplanation(language, 'scam_url');
//   } else if (domain.includes('phishing') || domain.includes('scam') || domain.includes('fake')) {
//     risk = 'Scam';
//     confidence = 98; // VERY HIGH risk score for obvious scam URLs
//     explanation = getTranslatedExplanation(language, 'scam_url');
//   } else {
//     // Check for suspicious patterns in URL
//     const suspiciousUrlPatterns = ['secure', 'verify', 'urgent', 'fast', 'quick', 'instant', 'free', 'win', 'prize'];
//     const matchedSuspicious = suspiciousUrlPatterns.filter(pattern => 
//       domain.toLowerCase().includes(pattern)
//     );
    
//     if (matchedSuspicious.length >= 2) {
//       risk = 'Suspicious';
//       confidence = 65; // MEDIUM-HIGH risk score for suspicious URLs
//       explanation = getTranslatedExplanation(language, 'suspicious_url');
//     } else {
//       risk = 'Safe';
//       confidence = 20; // LOW risk score for safe URLs
//       explanation = getTranslatedExplanation(language, 'safe_url');
//     }
//   }

//   return {
//     id: generateId(),
//     type: 'URL Analysis',
//     content: url,
//     risk,
//     confidence,
//     explanation,
//     timestamp: new Date(),
//     language,
//   };
// }


// export async function analyzeMessage(message: string, language: Language): Promise<AnalysisResult> {
//   await new Promise(resolve => setTimeout(resolve, 2000));

//   const lowerMessage = message.toLowerCase();
//   const indicators = SCAM_INDICATORS[language] || SCAM_INDICATORS.en;
  
//   let totalScore = 0;
//   let matchedIndicators: string[] = [];
//   let detectedCombinations: string[] = [];

//   // Score high-risk indicators
//   indicators.highRisk.forEach(pattern => {
//     if (lowerMessage.includes(pattern.toLowerCase())) {
//       totalScore += 70; // Increased weight
//       matchedIndicators.push(pattern);
//     }
//   });

//   // Score medium-risk indicators
//   indicators.mediumRisk.forEach(pattern => {
//     if (lowerMessage.includes(pattern.toLowerCase())) {
//       totalScore += 35; // Increased weight
//       matchedIndicators.push(pattern);
//     }
//   });

//   // Score low-risk indicators
//   indicators.lowRisk.forEach(pattern => {
//     if (lowerMessage.includes(pattern.toLowerCase())) {
//       totalScore += 20; // Increased weight
//       matchedIndicators.push(pattern);
//     }
//   });

//   // Check for dangerous combinations
//   SCAM_COMBINATIONS.forEach(combo => {
//     const allPatternsFound = combo.patterns.every(pattern => 
//       lowerMessage.includes(pattern.toLowerCase())
//     );
//     if (allPatternsFound) {
//       totalScore += combo.weight;
//       detectedCombinations.push(combo.description);
//     }
//   });

//   // Additional scoring for specific scam patterns
//   if (lowerMessage.includes('₹') || lowerMessage.includes('rs.') || lowerMessage.includes('rupees')) {
//     if (lowerMessage.includes('pay') || lowerMessage.includes('fee') || lowerMessage.includes('charge')) {
//       totalScore += 50; // Money + payment request
//     }
//   }

//   // Phone numbers or suspicious contact info
//   if (lowerMessage.match(/\d{10}/) || lowerMessage.includes('@gmail') || lowerMessage.includes('whatsapp')) {
//     totalScore += 25;
//   }

//   // Use Hugging Face for additional analysis
//   let aiAnalysis;
//   try {
//     aiAnalysis = await analyzeWithHuggingFace(message);
//     if (aiAnalysis.isScam) {
//       totalScore += 60; // Boost score if AI detects scam
//     }
//   } catch (error) {
//     console.warn('AI analysis failed:', error);
//   }

//   // FIXED LOGIC: Determine risk level based on total score
//   let risk: 'Safe' | 'Suspicious' | 'Scam' = 'Safe';
//   // let confidence = Math.min(98, Math.max(5, totalScore)); // Risk score = total score
//   let confidence = Math.min(98, Math.max(0, totalScore)); // allow 0% too

//   let explanation = '';

//   // CORRECTED THRESHOLDS
// // Fallback default scoring-based logic
// if (totalScore >= 70 || detectedCombinations.length > 0) {
//   risk = 'Scam';
//   confidence = Math.min(98, Math.max(70, totalScore));
//   explanation = detectedCombinations.length > 0 
//     ? getTranslatedExplanation(language, 'scam_message_combination')
//     : getTranslatedExplanation(language, 'scam_message_high');
// } else if (totalScore >= 40) {
//   risk = 'Suspicious';
//   confidence = Math.min(69, Math.max(40, totalScore));
//   explanation = getTranslatedExplanation(language, 'suspicious_message');
// } else {
//   risk = 'Safe';
//   confidence = Math.min(39, Math.max(5, totalScore));
//   explanation = getTranslatedExplanation(language, 'safe_message');
// }


//   // // Override with AI analysis if available and confident
//   // // 1) If HF says "Yes" with >80% confidence, force Scam
//   // if (aiAnalysis && aiAnalysis.isScam && aiAnalysis.confidence > 80) {
//   //   risk       = 'Scam';
//   //   confidence = Math.max(confidence, aiAnalysis.confidence);
//   //   explanation = `AI Detection: ${aiAnalysis.reasoning}`;
//   // }
//   // // 2) Else if HF says "No" with >80% confidence, force Safe
//   // // else if (aiAnalysis && !aiAnalysis.isScam && aiAnalysis.confidence > 80) {
//   // //   risk       = 'Safe';
//   // //   confidence = aiAnalysis.confidence;
//   // //   explanation = `AI Detection: ${aiAnalysis.reasoning}`;
//   // // }


//         // Override logic from Hugging Face AI
//         if (aiAnalysis) {
//           if (aiAnalysis.isScam && aiAnalysis.confidence > 70) {
//             // Force scam
//             risk = 'Scam';
//             confidence = Math.max(confidence, aiAnalysis.confidence);
//             explanation = `AI Detection: ${aiAnalysis.reasoning}`;
//           } else if (!aiAnalysis.isScam) {
//             // Force safe if AI says it's not a scam, regardless of confidence
//             risk = 'Safe';
//             confidence = Math.min(30, totalScore);  // Cap it low for green bar
//             explanation = `AI Detection: ${aiAnalysis.reasoning}`;
//           }
//         }
        

//   return {
//     id: generateId(),
//     type: 'Message Analysis',
//     content: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
//     risk,
//     confidence,
//     explanation,
//     timestamp: new Date(),
//     language,
//   };
// }






// export async function analyzeMessage(message: string, language: Language): Promise<AnalysisResult> {
//   await new Promise(resolve => setTimeout(resolve, 2000));

//   const lowerMessage = message.toLowerCase();
//   const indicators = SCAM_INDICATORS[language] || SCAM_INDICATORS.en;

//   let totalScore = 0;
//   let matchedIndicators: string[] = [];
//   let detectedCombinations: string[] = [];

//   indicators.highRisk.forEach(pattern => {
//     if (lowerMessage.includes(pattern.toLowerCase())) {
//       totalScore += 70;
//       matchedIndicators.push(pattern);
//     }
//   });

//   indicators.mediumRisk.forEach(pattern => {
//     if (lowerMessage.includes(pattern.toLowerCase())) {
//       totalScore += 35;
//       matchedIndicators.push(pattern);
//     }
//   });

//   indicators.lowRisk.forEach(pattern => {
//     if (lowerMessage.includes(pattern.toLowerCase())) {
//       totalScore += 20;
//       matchedIndicators.push(pattern);
//     }
//   });

//   SCAM_COMBINATIONS.forEach(combo => {
//     const allPatternsFound = combo.patterns.every(pattern =>
//       lowerMessage.includes(pattern.toLowerCase())
//     );
//     if (allPatternsFound) {
//       totalScore += combo.weight;
//       detectedCombinations.push(combo.description);
//     }
//   });

//   if (lowerMessage.includes('₹') || lowerMessage.includes('rs.') || lowerMessage.includes('rupees')) {
//     if (lowerMessage.includes('pay') || lowerMessage.includes('fee') || lowerMessage.includes('charge')) {
//       totalScore += 50;
//     }
//   }

//   if (lowerMessage.match(/\d{10}/) || lowerMessage.includes('@gmail') || lowerMessage.includes('whatsapp')) {
//     totalScore += 25;
//   }

//   // AI analysis
//   let aiAnalysis;
//   try {
//     aiAnalysis = await analyzeWithHuggingFace(message);
//   } catch (error) {
//     console.warn('Hugging Face API failed:', error);
//   }

  
//   // Pure AI-based override (Trust AI more)
//   if (aiAnalysis) {
//   const { isScam, confidence, reasoning } = aiAnalysis;

//   const risk: 'Safe' | 'Suspicious' | 'Scam' = isScam
//     ? (confidence >= 70 ? 'Scam' : 'Suspicious')
//     : (confidence >= 80 ? 'Safe' : 'Suspicious');

//   const cappedConfidence = isScam
//     ? Math.max(70, confidence)
//     : Math.max(20, Math.min(30, confidence)); // ✅ FIXED to avoid 0%

//   return {
//     id: generateId(),
//     type: 'Message Analysis',
//     content: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
//     risk,
//     confidence: cappedConfidence,
//     explanation: `AI Detection: ${reasoning}`,
//     timestamp: new Date(),
//     language,
//   };
// }


//   // Fallback to rules only if AI fails
//   let fallbackRisk: 'Safe' | 'Suspicious' | 'Scam' = 'Safe';
//   let fallbackConfidence = Math.min(98, Math.max(5, totalScore));
//   let fallbackExplanation = '';

//   if (totalScore >= 70 || detectedCombinations.length > 0) {
//     fallbackRisk = 'Scam';
//     fallbackConfidence = Math.min(98, Math.max(70, totalScore));
//     fallbackExplanation = detectedCombinations.length > 0
//       ? getTranslatedExplanation(language, 'scam_message_combination')
//       : getTranslatedExplanation(language, 'scam_message_high');
//   } else if (totalScore >= 40) {
//     fallbackRisk = 'Suspicious';
//     fallbackConfidence = Math.min(69, Math.max(40, totalScore));
//     fallbackExplanation = getTranslatedExplanation(language, 'suspicious_message');
//   } else {
//     fallbackRisk = 'Safe';
//     fallbackConfidence = Math.min(39, Math.max(5, totalScore));
//     fallbackExplanation = getTranslatedExplanation(language, 'safe_message');
//   }

//   return {
//     id: generateId(),
//     type: 'Message Analysis',
//     content: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
//     risk: fallbackRisk,
//     confidence: fallbackConfidence,
//     explanation: fallbackExplanation,
//     timestamp: new Date(),
//     language,
//   };
// }




//claude
// export async function analyzeMessage(message: string, language: Language): Promise<AnalysisResult> {
//   await new Promise(resolve => setTimeout(resolve, 2000));

//   const lowerMessage = message.toLowerCase();
//   const indicators = SCAM_INDICATORS[language] || SCAM_INDICATORS.en;

//   let totalScore = 0;
//   let matchedIndicators: string[] = [];
//   let detectedCombinations: string[] = [];

//   indicators.highRisk.forEach(pattern => {
//     if (lowerMessage.includes(pattern.toLowerCase())) {
//       totalScore += 70; 
//       matchedIndicators.push(pattern);
//     }
//   });

//   indicators.mediumRisk.forEach(pattern => {
//     if (lowerMessage.includes(pattern.toLowerCase())) {
//       totalScore += 35;
//       matchedIndicators.push(pattern);
//     }
//   });

//   indicators.lowRisk.forEach(pattern => {
//     if (lowerMessage.includes(pattern.toLowerCase())) {
//       totalScore += 20;
//       matchedIndicators.push(pattern);
//     }
//   });

//   SCAM_COMBINATIONS.forEach(combo => {
//     const allPatternsFound = combo.patterns.every(pattern =>
//       lowerMessage.includes(pattern.toLowerCase())
//     );
//     if (allPatternsFound) {
//       totalScore += combo.weight;
//       detectedCombinations.push(combo.description);
//     }
//   });

//   if (lowerMessage.includes('₹') || lowerMessage.includes('rs.') || lowerMessage.includes('rupees')) {
//     if (lowerMessage.includes('pay') || lowerMessage.includes('fee') || lowerMessage.includes('charge')) {
//       totalScore += 50;
//     }
//   }

//   if (lowerMessage.match(/\d{10}/) || lowerMessage.includes('@gmail') || lowerMessage.includes('whatsapp')) {
//     totalScore += 25;
//   }

//   // AI analysis
//   let aiAnalysis;
//   try {
//     aiAnalysis = await analyzeWithHuggingFace(message);
//   } catch (error) {
//     console.warn('Hugging Face API failed:', error);
//   }

//   // FIXED: Simple and clear AI-based classification
//   if (aiAnalysis) {
//     const { isScam, confidence, reasoning } = aiAnalysis;
    
//     let risk: 'Safe' | 'Suspicious' | 'Scam';
//     let finalConfidence: number;
    
//     if (isScam) {
//       // AI says it IS a scam
//       risk = 'Scam';
//       finalConfidence = Math.max(70, confidence); // High risk score for scams
//     } else {
//       // AI says it's NOT a scam - ALWAYS classify as Safe
//       risk = 'Safe';
//       finalConfidence = Math.max(5, Math.min(25, confidence)); // Low risk score (5-25%)
//     }

//     return {
//       id: generateId(),
//       type: 'Message Analysis',
//       content: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
//       risk,
//       confidence: finalConfidence,
//       explanation: `AI Detection: ${reasoning}`,
//       timestamp: new Date(),
//       language,
//     };
//   }

//   // Fallback to rules only if AI fails
//   let fallbackRisk: 'Safe' | 'Suspicious' | 'Scam' = 'Safe';
//   let fallbackConfidence = Math.min(98, Math.max(5, totalScore));
//   let fallbackExplanation = '';

//   if (totalScore >= 70 || detectedCombinations.length > 0) {
//     fallbackRisk = 'Scam';
//     fallbackConfidence = Math.min(98, Math.max(70, totalScore));
//     fallbackExplanation = detectedCombinations.length > 0
//       ? getTranslatedExplanation(language, 'scam_message_combination')
//       : getTranslatedExplanation(language, 'scam_message_high');
//   } else if (totalScore >= 40) {
//     fallbackRisk = 'Suspicious';
//     fallbackConfidence = Math.min(69, Math.max(40, totalScore));
//     fallbackExplanation = getTranslatedExplanation(language, 'suspicious_message');
//   } else {
//     fallbackRisk = 'Safe';
//     fallbackConfidence = Math.min(39, Math.max(5, totalScore));
//     fallbackExplanation = getTranslatedExplanation(language, 'safe_message');
//   }

//   return {
//     id: generateId(),
//     type: 'Message Analysis',
//     content: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
//     risk: fallbackRisk,
//     confidence: fallbackConfidence,
//     explanation: fallbackExplanation,
//     timestamp: new Date(),
//     language,
//   };
// }


//perplexity

// export async function analyzeUrl(url: string, language: Language): Promise<AnalysisResult> {
//   await new Promise(resolve => setTimeout(resolve, 1500));

//   const domain = extractDomain(url);
//   let risk: 'Safe' | 'Suspicious' | 'Scam' = 'Safe';
//   let confidence = 95;
//   let explanation = '';

//   // Check for homoglyph attacks
//   const homoglyphCheck = detectHomoglyphAttack(domain);
//   if (homoglyphCheck.isHomoglyph) {
//     risk = 'Scam';
//     confidence = 95;
//     explanation = `HOMOGLYPH ATTACK DETECTED: Domain contains suspicious characters (${homoglyphCheck.suspiciousChars.join(', ')}) that mimic legitimate domains. This is a common phishing technique.`;
    
//     return {
//       id: generateId(),
//       type: 'URL Analysis',
//       content: url,
//       risk,
//       confidence,
//       explanation,
//       timestamp: new Date(),
//       language,
//     };
//   }

//   // Check against safe domains first
//   if (SAFE_DOMAINS.some(safeDomain => domain === safeDomain || domain.endsWith('.' + safeDomain))) {
//     risk = 'Safe';
//     confidence = 15;
//     explanation = getTranslatedExplanation(language, 'safe_url');
//   } 
//   // Check against suspicious domains
//   else if (SUSPICIOUS_DOMAINS.some(suspDomain => 
//     domain.includes(suspDomain) || 
//     domain === suspDomain ||
//     domain.endsWith('.' + suspDomain)
//   )) {
//     risk = 'Scam';
//     confidence = 95;
//     explanation = getTranslatedExplanation(language, 'scam_url');
//   } 
//   // Check for obvious scam patterns
//   else if (domain.includes('phishing') || domain.includes('scam') || domain.includes('fake')) {
//     risk = 'Scam';
//     confidence = 98;
//     explanation = getTranslatedExplanation(language, 'scam_url');
//   } 
//   // Advanced pattern detection
//   else {
//     let suspiciousScore = 0;
//     const suspiciousPatterns = [];

//     // Check for suspicious keywords in domain
//     const suspiciousKeywords = [
//       'secure', 'verify', 'urgent', 'fast', 'quick', 'instant', 'free', 'win', 'prize',
//       'support', 'help', 'update', 'login', 'account', 'payment', 'bank', 'official'
//     ];
    
//     suspiciousKeywords.forEach(keyword => {
//       if (domain.toLowerCase().includes(keyword)) {
//         suspiciousScore += 20;
//         suspiciousPatterns.push(keyword);
//       }
//     });

//     // Check for suspicious TLD combinations
//     const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.gq', '.pw', '.top', '.xyz'];
//     if (suspiciousTlds.some(tld => domain.endsWith(tld))) {
//       suspiciousScore += 30;
//       suspiciousPatterns.push('suspicious TLD');
//     }

//     // Check for excessive hyphens or numbers
//     const hyphenCount = (domain.match(/-/g) || []).length;
//     const numberCount = (domain.match(/\d/g) || []).length;
    
//     if (hyphenCount > 2) {
//       suspiciousScore += 25;
//       suspiciousPatterns.push('excessive hyphens');
//     }
    
//     if (numberCount > 3) {
//       suspiciousScore += 20;
//       suspiciousPatterns.push('excessive numbers');
//     }

//     // Determine risk based on score
//     if (suspiciousScore >= 50) {
//       risk = 'Scam';
//       confidence = Math.min(95, 70 + suspiciousScore);
//       explanation = `High risk domain detected. Suspicious patterns: ${suspiciousPatterns.join(', ')}`;
//     } else if (suspiciousScore >= 25) {
//       risk = 'Suspicious';
//       confidence = Math.min(75, 40 + suspiciousScore);
//       explanation = `Potentially suspicious domain. Patterns detected: ${suspiciousPatterns.join(', ')}`;
//     } else {
//       risk = 'Safe';
//       confidence = 20;
//       explanation = getTranslatedExplanation(language, 'safe_url');
//     }
//   }

//   return {
//     id: generateId(),
//     type: 'URL Analysis',
//     content: url,
//     risk,
//     confidence,
//     explanation,
//     timestamp: new Date(),
//     language,
//   };
// }


// //FINAL ANALYZE URL FUNCTION
// export async function analyzeUrl(url: string, language: Language): Promise<AnalysisResult> {
//   await new Promise(resolve => setTimeout(resolve, 1500));
//   const domain = extractDomain(url).toLowerCase();

//   // 1. Homoglyph detection (highest priority)
//   const homoglyphCheck = detectHomoglyphAttack(domain);
//   if (homoglyphCheck.isHomoglyph) {
//     return {
//       id: generateId(),
//       type: 'URL Analysis',
//       content: url,
//       risk: 'Scam',
//       confidence: 95,
//       explanation: `HOMOGLYPH ATTACK DETECTED: Domain contains suspicious characters (${homoglyphCheck.suspiciousChars.join(', ')}) that mimic legitimate domains. This is a common phishing technique.`,
//       timestamp: new Date(),
//       language,
//     };
//   }

//   // 2. Suspicious domains (substring match, lowercased)
//   if (SUSPICIOUS_DOMAINS.some(suspDomain => domain.includes(suspDomain.toLowerCase()))) {
//     return {
//       id: generateId(),
//       type: 'URL Analysis',
//       content: url,
//       risk: 'Scam',
//       confidence: 95,
//       explanation: getTranslatedExplanation(language, 'scam_url'),
//       timestamp: new Date(),
//       language,
//     };
//   }

//   // 3. Safe domains (exact match only, lowercased)
//   if (SAFE_DOMAINS.some(safeDomain => domain === safeDomain.toLowerCase())) {
//     return {
//       id: generateId(),
//       type: 'URL Analysis',
//       content: url,
//       risk: 'Safe',
//       confidence: 15,
//       explanation: getTranslatedExplanation(language, 'safe_url'),
//       timestamp: new Date(),
//       language,
//     };
//   }

//   // 4. Obvious scam keywords
//   if (domain.includes('phishing') || domain.includes('scam') || domain.includes('fake')) {
//     return {
//       id: generateId(),
//       type: 'URL Analysis',
//       content: url,
//       risk: 'Scam',
//       confidence: 98,
//       explanation: getTranslatedExplanation(language, 'scam_url'),
//       timestamp: new Date(),
//       language,
//     };
//   }

//   // 5. Pattern-based suspicious scoring...
//   // (keep your existing suspicious scoring logic here)

//   // Default: Safe
//   return {
//     id: generateId(),
//     type: 'URL Analysis',
//     content: url,
//     risk: 'Safe',
//     confidence: 20,
//     explanation: getTranslatedExplanation(language, 'safe_url'),
//     timestamp: new Date(),
//     language,
//   };
// }


export async function analyzeUrl(url: string, language: Language): Promise<AnalysisResult> {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const domain = extractDomain(url).toLowerCase();
  let risk: 'Safe' | 'Suspicious' | 'Scam' = 'Safe';
  let confidence = 20;
  let explanation = '';

  // 1. FIRST PRIORITY: Check against SUSPICIOUS_DOMAINS (these should always be SCAM)
  const matchedSuspiciousDomain = SUSPICIOUS_DOMAINS.find(suspDomain => 
    domain.includes(suspDomain.toLowerCase()) || 
    domain === suspDomain.toLowerCase()
  );
  
  if (matchedSuspiciousDomain) {
    return {
      id: generateId(),
      type: 'URL Analysis',
      content: url,
      risk: 'Scam',
      confidence: 95,
      explanation: `SCAM DETECTED: Domain "${domain}" matches known malicious pattern used "${matchedSuspiciousDomain}". This is a verified phishing/scam domain.`,
      timestamp: new Date(),
      language,
    };
  }

  // 2. HARDCODED ADDITIONAL HOMOGLYPH CHECKS (for any missed patterns)
  const additionalScamPatterns = [
    // Capital I instead of lowercase l variations
    /gmai[I]/i,     // gmaiI.com
    /goog[I]e/i,    // googIe.com  
    /app[I]e/i,     // appIe.com
    /paypa[I]/i,    // paypaI.com
    // /microsof[t]/i, // Any microsoft variant
    
    // Zero instead of O
    /g[0]ogle/i,    // g0ogle.com
    /amaz[0]n/i,    // amaz0n.com
    /micr[0]soft/i, // micr0soft.com
    
    // rn instead of m
    /rnicrosoft/i,  // rnicrosoft.com
    /arnazon/i,     // arnazon.com
    
    // Common typos
    /googlle/i,     // googlle.com
    /gooogle/i,     // gooogle.com (triple o)
    /paypaII/i,     // paypaII.com (double I)
    /amazom/i,      // amazom.com
    /microsft/i,    // microsft.com (missing o)

    // TLD variations that might be missed
    /^(microsoft|google|apple|amazon|paypal|facebook)\.co$/i,
    /^(microsoft|google|apple|amazon|paypal)\.net$/i,
    /^(microsoft|google|apple|amazon|paypal)\.org$/i,

    // Suspicious prefixes/suffixes
    /secure-(google|paypal|amazon|microsoft|apple)/i,
    /verify-(google|paypal|amazon|microsoft|apple)/i,
    /(google|paypal|amazon|microsoft|apple)-(secure|verify|support|help|login)/i,
  ];

  for (const pattern of additionalScamPatterns) {
    if (pattern.test(domain)) {
      return {
        id: generateId(),
        type: 'URL Analysis',
        content: url,
        risk: 'Scam',
        confidence: 92,
        explanation: `HOMOGLYPH/TYPOSQUATTING DETECTED: Domain "${domain}" uses character substitution or typosquatting to impersonate legitimate brands. This is a common phishing technique.`,
        timestamp: new Date(),
        language,
      };
    }
  }

  // 3. SAFE DOMAINS CHECK (exact match only)
  if (SAFE_DOMAINS.some(safeDomain => domain === safeDomain.toLowerCase())) {
    return {
      id: generateId(),
      type: 'URL Analysis',
      content: url,
      risk: 'Safe',
      confidence: 10,
      explanation: getTranslatedExplanation(language, 'safe_url'),
      timestamp: new Date(),
      language,
    };
  }

  // 4. OBVIOUS SCAM KEYWORDS
  const obviousScamKeywords = ['phishing', 'scam', 'fake', 'fraud', 'malware', 'virus'];
  const foundScamKeyword = obviousScamKeywords.find(keyword => domain.includes(keyword));
  if (foundScamKeyword) {
    return {
      id: generateId(),
      type: 'URL Analysis',
      content: url,
      risk: 'Scam',
      confidence: 98,
      explanation: `OBVIOUS SCAM: Domain contains the keyword "${foundScamKeyword}" which is commonly used in malicious websites.`,
      timestamp: new Date(),
      language,
    };
  }

  // 5. SUSPICIOUS TLD CHECK
  const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.gq', '.pw', '.top', '.xyz', '.club', '.online', '.site', '.win', '.bid', '.loan', '.review', '.account', '.date', '.vip', '.men', '.party', '.trade', '.racing', '.stream', '.click', '.download', '.work', '.webcam', '.cricket', '.fit', '.buzz', '.science', '.faith'];
  const hasSuspiciousTld = suspiciousTlds.some(tld => domain.endsWith(tld));
  
  // 6. SUSPICIOUS PATTERN SCORING
  let suspiciousScore = 0;
  const detectedPatterns: string[] = [];

  // High-risk keywords (instant red flags)
  const highRiskKeywords = ['urgent', 'verify', 'suspended', 'expired', 'update', 'secure', 'confirm', 'activate', 'locked', 'limited', 'restricted'];
  highRiskKeywords.forEach(keyword => {
    if (domain.includes(keyword)) {
      suspiciousScore += 35;
      detectedPatterns.push(`high-risk keyword: "${keyword}"`);
    }
  });

  // Medium-risk keywords
  const mediumRiskKeywords = ['fast', 'quick', 'instant', 'free', 'win', 'prize', 'bonus', 'cash', 'money', 'loan', 'credit', 'official', 'government', 'tax', 'refund'];
  mediumRiskKeywords.forEach(keyword => {
    if (domain.includes(keyword)) {
      suspiciousScore += 20;
      detectedPatterns.push(`medium-risk keyword: "${keyword}"`);
    }
  });

  // Suspicious TLD
  if (hasSuspiciousTld) {
    suspiciousScore += 30;
    detectedPatterns.push('suspicious TLD');
  }

  // URL structure analysis
  const hyphenCount = (domain.match(/-/g) || []).length;
  const numberCount = (domain.match(/\d/g) || []).length;
  const dotCount = (domain.match(/\./g) || []).length;

  if (hyphenCount > 2) {
    suspiciousScore += 25;
    detectedPatterns.push(`excessive hyphens (${hyphenCount})`);
  }

  if (numberCount > 3) {
    suspiciousScore += 20;
    detectedPatterns.push(`excessive numbers (${numberCount})`);
  }

  if (dotCount > 3) {
    suspiciousScore += 15;
    detectedPatterns.push(`multiple subdomains (${dotCount} dots)`);
  }

  // Domain length analysis
  const domainLength = domain.length;
  if (domainLength > 50) {
    suspiciousScore += 15;
    detectedPatterns.push('unusually long domain');
  } else if (domainLength < 4) {
    suspiciousScore += 10;
    detectedPatterns.push('unusually short domain');
  }

  // Suspicious character patterns
  if (/[0-9]{2,}/.test(domain)) {
    suspiciousScore += 15;
    detectedPatterns.push('consecutive numbers');
  }

  if (/[a-z]{10,}/.test(domain)) {
    suspiciousScore += 10;
    detectedPatterns.push('long character sequences');
  }

  // Check for mixed scripts (basic Latin vs others)
  const hasMixedScripts = /[^\x00-\x7F]/.test(domain) && /[a-zA-Z]/.test(domain);
  if (hasMixedScripts) {
    suspiciousScore += 40;
    detectedPatterns.push('mixed character scripts (potential homoglyph)');
  }

  // 7. DETERMINE FINAL RISK BASED ON SCORE
  if (suspiciousScore >= 70) {
    risk = 'Scam';
    confidence = Math.min(95, 70 + Math.floor(suspiciousScore * 0.3));
    explanation = `HIGH RISK DOMAIN: Multiple suspicious patterns detected: ${detectedPatterns.join(', ')}. Total risk score: ${suspiciousScore}.`;
  } else if (suspiciousScore >= 35) {
    risk = 'Suspicious';
    confidence = Math.min(75, 35 + Math.floor(suspiciousScore * 0.5));
    explanation = `POTENTIALLY SUSPICIOUS: Some concerning patterns detected: ${detectedPatterns.join(', ')}. Proceed with caution.`;
  } else if (suspiciousScore >= 15) {
    risk = 'Suspicious';
    confidence = Math.min(50, 15 + suspiciousScore);
    explanation = `MINOR CONCERNS: Limited suspicious patterns detected: ${detectedPatterns.join(', ')}. Exercise caution.`;
  } else {
    risk = 'Safe';
    confidence = Math.max(5, 25 - suspiciousScore);
    explanation = detectedPatterns.length > 0 
      ? `MOSTLY SAFE: Minor patterns detected (${detectedPatterns.join(', ')}) but overall appears legitimate.`
      : getTranslatedExplanation(language, 'safe_url');
  }

  return {
    id: generateId(),
    type: 'URL Analysis',
    content: url,
    risk,
    confidence,
    explanation,
    timestamp: new Date(),
    language,
  };
}

export async function analyzeMessage(message: string, language: Language): Promise<AnalysisResult> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const lowerMessage = message.toLowerCase();
  const indicators = SCAM_INDICATORS[language] || SCAM_INDICATORS.en;

  let totalScore = 0;
  let matchedIndicators: string[] = [];
  let detectedCombinations: string[] = [];

  // Calculate rule-based score
  indicators.highRisk.forEach(pattern => {
    if (lowerMessage.includes(pattern.toLowerCase())) {
      totalScore += 70; 
      matchedIndicators.push(pattern);
    }
  });

  indicators.mediumRisk.forEach(pattern => {
    if (lowerMessage.includes(pattern.toLowerCase())) {
      totalScore += 35;
      matchedIndicators.push(pattern);
    }
  });

  indicators.lowRisk.forEach(pattern => {
    if (lowerMessage.includes(pattern.toLowerCase())) {
      totalScore += 20;
      matchedIndicators.push(pattern);
    }
  });

  SCAM_COMBINATIONS.forEach(combo => {
    const allPatternsFound = combo.patterns.every(pattern =>
      lowerMessage.includes(pattern.toLowerCase())
    );
    if (allPatternsFound) {
      totalScore += combo.weight;
      detectedCombinations.push(combo.description);
    }
  });

  // Additional contextual scoring
  if (lowerMessage.includes('₹') || lowerMessage.includes('rs.') || lowerMessage.includes('rupees')) {
    if (lowerMessage.includes('pay') || lowerMessage.includes('fee') || lowerMessage.includes('charge')) {
      totalScore += 50;
    }
  }

  if (lowerMessage.match(/\d{10}/) || lowerMessage.includes('@gmail') || lowerMessage.includes('whatsapp')) {
    totalScore += 25;
  }

  // Get AI analysis
  let aiAnalysis;
  try {
    aiAnalysis = await analyzeWithHuggingFace(message);
  } catch (error) {
    console.warn('Hugging Face API failed:', error);
  }

  // **IMPROVED HYBRID SCORING SYSTEM**
  let finalScore = totalScore;
  let explanation = '';

  if (aiAnalysis) {
    const { isScam, confidence, reasoning } = aiAnalysis;
    
    // Convert AI confidence to a score adjustment
    const aiWeight = Math.min(confidence / 100, 1.0); // Normalize to 0-1
    
    if (isScam) {
      // AI says scam: boost the score proportionally to AI confidence
      const aiBoost = aiWeight * 60; // Max boost of 60 points
      finalScore = Math.max(finalScore, totalScore + aiBoost);
      explanation = `AI + Rules Detection: ${reasoning}`;
    } else {
      // AI says safe: reduce score but don't eliminate it completely
      const aiReduction = aiWeight * 0.4; // Reduce by up to 40%
      finalScore = totalScore * (1 - aiReduction);
      explanation = `AI + Rules Detection: ${reasoning}`;
    }
  }

  // **IMPROVED RISK CLASSIFICATION WITH BETTER THRESHOLDS**
  let risk: 'Safe' | 'Suspicious' | 'Scam';
  let confidence: number;

  if (finalScore >= 80 || detectedCombinations.length > 0) {
    risk = 'Scam';
    confidence = Math.min(98, Math.max(80, finalScore));
    if (!explanation) {
      explanation = detectedCombinations.length > 0
        ? getTranslatedExplanation(language, 'scam_message_combination')
        : getTranslatedExplanation(language, 'scam_message_high');
    }
  } else if (finalScore >= 35) {
    risk = 'Suspicious';
    confidence = Math.min(79, Math.max(35, finalScore));
    if (!explanation) {
      explanation = getTranslatedExplanation(language, 'suspicious_message');
    }
  } else {
    risk = 'Safe';
    confidence = Math.min(34, Math.max(5, finalScore));
    if (!explanation) {
      explanation = getTranslatedExplanation(language, 'safe_message');
    }
  }

  return {
    id: generateId(),
    type: 'Message Analysis',
    content: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
    risk,
    confidence,
    explanation,
    timestamp: new Date(),
    language,
  };
}




export async function synthesizeSpeech(text: string, language: Language): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Stop any ongoing speech first
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Proper event handling
    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      reject(event);
    };

    speechSynthesis.speak(utterance);
  });
}

// Add a function to stop speech
export function stopSpeech(): void {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
}


function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname;
  } catch {
    return url;
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function getTranslatedExplanation(language: Language, type: string): string {
  const explanations: { [key: string]: { [key: string]: string } } = {
  
  // const explanations = {
    en: {
      safe_url: 'This URL appears to be safe based on domain reputation and security checks.',
      suspicious_url: 'This URL shows suspicious characteristics. Exercise caution before visiting.',
      scam_url: 'This URL is likely malicious. Do not visit or share personal information.',
      safe_message: 'This message appears legitimate with no obvious scam indicators.',
      suspicious_message: 'This message contains suspicious phrases commonly used in scams.',
      scam_message: 'This message shows clear signs of being a scam. Do not respond or click any links.',
      scam_message_high: 'DANGER: This is a classic advance fee scam. Never pay money to claim prizes. Legitimate contests do not require upfront payments.',
      scam_message_combination: 'CRITICAL ALERT: This message contains multiple scam indicators including prize claims and payment requests. This is definitely a scam.',
    },
    es: {
      safe_url: 'Esta URL parece ser segura basada en la reputación del dominio y verificaciones de seguridad.',
      suspicious_url: 'Esta URL muestra características sospechosas. Tenga precaución antes de visitar.',
      scam_url: 'Esta URL es probablemente maliciosa. No visite ni comparta información personal.',
      safe_message: 'Este mensaje parece legítimo sin indicadores obvios de estafa.',
      suspicious_message: 'Este mensaje contiene frases sospechosas comúnmente usadas en estafas.',
      scam_message: 'Este mensaje muestra signos claros de ser una estafa. No responda ni haga clic en enlaces.',
      scam_message_high: 'PELIGRO: Esta es una estafa clásica de tarifa por adelantado. Nunca pague dinero para reclamar premios.',
      scam_message_combination: 'ALERTA CRÍTICA: Este mensaje contiene múltiples indicadores de estafa incluyendo reclamos de premios y solicitudes de pago. Definitivamente es una estafa.',
    },
    fr: {
      safe_url: 'Cette URL semble sûre basée sur la réputation du domaine et les vérifications de sécurité.',
      suspicious_url: 'Cette URL présente certaines caractéristiques suspectes. Soyez prudent avant de visiter.',
      scam_url: 'Cette URL est probablement malveillante. Ne visitez pas ou ne partagez pas d\'informations personnelles.',
      safe_message: 'Ce message semble légitime sans indicateurs évidents d\'escroquerie.',
      suspicious_message: 'Ce message contient des phrases suspectes couramment utilisées dans les escroqueries.',
      scam_message: 'Ce message montre des signes clairs d\'être une escroquerie. Ne répondez pas ou ne cliquez sur aucun lien.',
      scam_message_high: 'DANGER: Il s\'agit d\'une escroquerie classique de frais anticipés. Ne payez jamais d\'argent pour réclamer des prix.',
      scam_message_combination: 'ALERTE CRITIQUE: Ce message contient plusieurs indicateurs d\'escroquerie y compris des réclamations de prix et des demandes de paiement. C\'est définitivement une escroquerie.',
    },
  };

  // return explanations[language]?.[type] || explanations.en[type];
  return explanations[language as keyof typeof explanations]?.[type];
}
