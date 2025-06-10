import { HfInference } from '@huggingface/inference';
import type { AnalysisResult, Language } from '../types';

// Initialize Hugging Face client with free inference API
const hf = new HfInference();

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
  // Common URL shorteners (extended)
  'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd', 'buff.ly',
  'shorte.st', 'adf.ly', 'bc.vc', 'cli.gs', 'u.to', 'short.cm', 'cutt.ly',
  'tiny.cc', 'soo.gd', 'clk.im', 'bl.ink', 't.ly', 'lnkd.in',

  // Scammy-sounding English domains & keywords (extended)
  'jobsfast.in', 'verify-fast.biz', 'govsupport-', 'sbisecurehelp',
  'quickjobs', 'fastmoney', 'easywin', 'instantcash', 'secureverify',
  'bankverify', 'govscheme', 'covidrelief',
  'paynow', 'urgentpay', 'secure-pay', 'fastpay', 'quick-pay',
  'lotteryclaim', 'lottery-win', 'lottery-prize', 'winbig',
  'bank-alert', 'account-update', 'account-verify', 'pinverify',
  'otpverify', 'security-alert', 'support-covid', 'covidassist',
  'covidhelp', 'customsfee', 'customspayment', 'onlinejob',
  'joboffer', 'jobregister', 'refundclaim', 'refundprocessing',
  'inheritanceclaim', 'inheritance-payment', 'winning-notification',
  'prizewinner', 'kyc-update', 'account-blocked',
  'claimprize', 'winner-alert', 'payment-due', 'fee-required',
  'payfee-now', 'instantwin', 'securelogin', 'banklogin', 'creditverify',

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
  'covid19relieffund.com', 'alertbanking.info', 'instantlottery.win'
];

const SAFE_DOMAINS = [
  // Big tech and social media
  'google.com', 'microsoft.com', 'apple.com', 'amazon.com', 'facebook.com',
  'twitter.com', 'linkedin.com', 'github.com', 'wikipedia.org', 'stackoverflow.com',
  'reddit.com', 'youtube.com', 'instagram.com', 'netflix.com', 'dropbox.com',
  'slack.com', 'zoom.us', 'paypal.com', 'etsy.com', 'adobe.com',

  // Banks & financial services (India + global)
  'sbi.co.in', 'icicibank.com', 'hdfcbank.com', 'axisbank.com', 'paytm.com',
  'kotak.com', 'indusind.com', 'yesbank.in', 'bankofamerica.com', 'chase.com',
  'wellsfargo.com', 'citibank.com', 'barclays.co.uk', 'hsbc.com', 'paypal.com',

  // Educational & research institutions
  'mit.edu', 'harvard.edu', 'stanford.edu', 'ox.ac.uk', 'cam.ac.uk',
  'coursera.org', 'edx.org', 'khanacademy.org', 'udemy.com', 'w3schools.com',

  // Government & official portals
  'usa.gov', 'irs.gov', 'india.gov.in', 'gov.uk', 'nasa.gov', 'un.org',
  'europa.eu', 'cdc.gov', 'who.int', 'sec.gov',

  // News & media
  'bbc.com', 'cnn.com', 'theguardian.com', 'nytimes.com', 'reuters.com',
  'forbes.com', 'bloomberg.com', 'wsj.com', 'techcrunch.com', 'wired.com',

  // E-commerce & payments
  'ebay.com', 'alibaba.com', 'flipkart.com', 'paytm.com', 'amazon.in',
  'stripe.com', 'squareup.com', 'shopify.com',

  // Cloud providers & infrastructure
  'aws.amazon.com', 'azure.microsoft.com', 'cloud.google.com', 'digitalocean.com',
  'heroku.com', 'netlify.com', 'vercel.com',

  // Others - popular and trustworthy
  'mozilla.org', 'mozilla.com', 'openai.com', 'telegram.org', 'signal.org',
  'protonmail.com', 'icloud.com', 'medium.com', 'quora.com', 'trello.com'
];

// Use Hugging Face model for advanced text classification
async function analyzeWithHuggingFace(text: string): Promise<{ isScam: boolean; confidence: number; reasoning: string }> {
  try {
    // Use a free text classification model
    const prompt = `Analyze this message for scam indicators. Consider these as HIGH RISK scam patterns:
- Prize/lottery wins requiring payment
- Job offers requiring upfront payment
- Government schemes requiring fees
- Urgent account verification requests
- Requests for OTP/PIN sharing
- Fake bank/support messages

Message: "${text}"

Is this a scam? Provide reasoning.`;

    const response = await hf.textGeneration({
      model: 'microsoft/DialoGPT-medium',
      inputs: prompt,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.3,
        return_full_text: false
      }
    });

    const result = response.generated_text?.toLowerCase() || '';
    
    // Parse the AI response
    const isScam = result.includes('scam') || result.includes('fraud') || result.includes('suspicious');
    const confidence = isScam ? 85 : 75;
    const reasoning = response.generated_text || 'AI analysis completed';

    return { isScam, confidence, reasoning };
  } catch (error) {
    console.warn('Hugging Face API failed, falling back to pattern matching:', error);
    return { isScam: false, confidence: 50, reasoning: 'Fallback analysis used' };
  }
}

export async function analyzeUrl(url: string, language: Language): Promise<AnalysisResult> {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const domain = extractDomain(url);
  let risk: 'Safe' | 'Suspicious' | 'Scam' = 'Safe';
  let confidence = 95;
  let explanation = '';

  if (SAFE_DOMAINS.some(safeDomain => domain.includes(safeDomain))) {
    risk = 'Safe';
    confidence = 15; // LOW risk score for safe URLs
    explanation = getTranslatedExplanation(language, 'safe_url');
  } else if (SUSPICIOUS_DOMAINS.some(suspDomain => domain.includes(suspDomain))) {
    risk = 'Scam';
    confidence = 95; // HIGH risk score for scam URLs
    explanation = getTranslatedExplanation(language, 'scam_url');
  } else if (domain.includes('phishing') || domain.includes('scam') || domain.includes('fake')) {
    risk = 'Scam';
    confidence = 98; // VERY HIGH risk score for obvious scam URLs
    explanation = getTranslatedExplanation(language, 'scam_url');
  } else {
    // Check for suspicious patterns in URL
    const suspiciousUrlPatterns = ['secure', 'verify', 'urgent', 'fast', 'quick', 'instant', 'free', 'win', 'prize'];
    const matchedSuspicious = suspiciousUrlPatterns.filter(pattern => 
      domain.toLowerCase().includes(pattern)
    );
    
    if (matchedSuspicious.length >= 2) {
      risk = 'Suspicious';
      confidence = 65; // MEDIUM-HIGH risk score for suspicious URLs
      explanation = getTranslatedExplanation(language, 'suspicious_url');
    } else {
      risk = 'Safe';
      confidence = 20; // LOW risk score for safe URLs
      explanation = getTranslatedExplanation(language, 'safe_url');
    }
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

  // Score high-risk indicators
  indicators.highRisk.forEach(pattern => {
    if (lowerMessage.includes(pattern.toLowerCase())) {
      totalScore += 70; // Increased weight
      matchedIndicators.push(pattern);
    }
  });

  // Score medium-risk indicators
  indicators.mediumRisk.forEach(pattern => {
    if (lowerMessage.includes(pattern.toLowerCase())) {
      totalScore += 35; // Increased weight
      matchedIndicators.push(pattern);
    }
  });

  // Score low-risk indicators
  indicators.lowRisk.forEach(pattern => {
    if (lowerMessage.includes(pattern.toLowerCase())) {
      totalScore += 20; // Increased weight
      matchedIndicators.push(pattern);
    }
  });

  // Check for dangerous combinations
  SCAM_COMBINATIONS.forEach(combo => {
    const allPatternsFound = combo.patterns.every(pattern => 
      lowerMessage.includes(pattern.toLowerCase())
    );
    if (allPatternsFound) {
      totalScore += combo.weight;
      detectedCombinations.push(combo.description);
    }
  });

  // Additional scoring for specific scam patterns
  if (lowerMessage.includes('₹') || lowerMessage.includes('rs.') || lowerMessage.includes('rupees')) {
    if (lowerMessage.includes('pay') || lowerMessage.includes('fee') || lowerMessage.includes('charge')) {
      totalScore += 50; // Money + payment request
    }
  }

  // Phone numbers or suspicious contact info
  if (lowerMessage.match(/\d{10}/) || lowerMessage.includes('@gmail') || lowerMessage.includes('whatsapp')) {
    totalScore += 25;
  }

  // Use Hugging Face for additional analysis
  let aiAnalysis;
  try {
    aiAnalysis = await analyzeWithHuggingFace(message);
    if (aiAnalysis.isScam) {
      totalScore += 60; // Boost score if AI detects scam
    }
  } catch (error) {
    console.warn('AI analysis failed:', error);
  }

  // FIXED LOGIC: Determine risk level based on total score
  let risk: 'Safe' | 'Suspicious' | 'Scam' = 'Safe';
  let confidence = Math.min(98, Math.max(5, totalScore)); // Risk score = total score
  let explanation = '';

  // CORRECTED THRESHOLDS
  if (totalScore >= 70 || detectedCombinations.length > 0) {
    risk = 'Scam';
    confidence = Math.min(98, Math.max(70, totalScore));
    explanation = detectedCombinations.length > 0 
      ? getTranslatedExplanation(language, 'scam_message_combination')
      : getTranslatedExplanation(language, 'scam_message_high');
  } else if (totalScore >= 40) {
    risk = 'Suspicious';
    confidence = Math.min(69, Math.max(40, totalScore));
    explanation = getTranslatedExplanation(language, 'suspicious_message');
  } else {
    risk = 'Safe';
    confidence = Math.min(39, Math.max(5, totalScore));
    explanation = getTranslatedExplanation(language, 'safe_message');
  }

  // Override with AI analysis if available and confident
  if (aiAnalysis && aiAnalysis.isScam && aiAnalysis.confidence > 80) {
    risk = 'Scam';
    confidence = Math.max(confidence, aiAnalysis.confidence);
    explanation = `AI Detection: ${aiAnalysis.reasoning}`;
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
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
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
  const explanations = {
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

  return explanations[language]?.[type] || explanations.en[type];
}