import { useState, useEffect, useCallback } from 'react'

// ─── Paiement Payzone ─────────────────────────────────────────────────────────
// Aucun backend nécessaire : chaque plan a son propre "lien de paiement" créé
// depuis le tableau de bord Payzone (montant fixe, aucune intégration technique
// requise côté Payzone). Le client clique sur "Payer maintenant" et est
// redirigé directement vers ce lien — voir le champ `paymentLink` dans PLANS
// plus bas pour remplacer les liens d'exemple par les tiens.

// ─── Page type ────────────────────────────────────────────────────────────────
type Page = 'home' | { type: 'model'; id: number }

// ─── Brand assets ─────────────────────────────────────────────────────────────
// Drop your logo file at /public/logo.svg (transparent PNG or SVG recommended,
// ~200×56px works well). It's used in the navbar, the mobile menu and the footer.
const LOGO_SRC = '/logo.svg'

// ─── Hero background carousel ─────────────────────────────────────────────────
// Two separate sets so you can art-direct desktop vs. mobile independently
// (e.g. a wide landscape crop for desktop, a tighter portrait crop for mobile).
// Drop 4 files in each folder using these exact names:
//   /public/backgrounds/desktop-1.jpg … desktop-4.jpg   (1920×1080 or wider, landscape)
//   /public/backgrounds/mobile-1.jpg  … mobile-4.jpg    (1080×1350 or taller, portrait)
const CAROUSEL_DESKTOP = [
  '/backgrounds/bg1-d.png',
  '/backgrounds/bg2-d.png',
  '/backgrounds/bg3-d.png',
  '/backgrounds/bg4-d.png',
]
const CAROUSEL_MOBILE = [
 '/backgrounds/bg1-m.png',
  '/backgrounds/bg2-m.png',
  '/backgrounds/bg3-m.png',
  '/backgrounds/bg4-m.png',
]

// ─── Model data ───────────────────────────────────────────────────────────────
type ModelData = {
  id: number
  name: string
  tag: string
  tagline: string
  description: string
  bgColor: string
  accent: string
  textColor: string
  badgeTextColor: string
  ctaTextColor: string
  thumb: string
  heroImg: string
  gallery: string[]
  liveUrl: string
  headerBg: string
  features: { icon: string; title: string; desc: string }[]
  techStack: string[]
  deliveryTime: string
  seoScore: string
  mobileScore: string
  sections: string[]
  forWho: string[]
}

// Real product screenshots — one true layout (sidebar profil + navigation par
// onglets), déclinée en 4 thèmes de couleur. Drop your own captures at these
// paths (same names) to replace the samples shown here.
const MODELS: ModelData[] = [
  {
    id: 1,
    name: 'Bleu',
    tag: 'Corporate & technique',
    tagline: 'La rigueur qui inspire confiance.',
    description:
      'Le thème Bleu associe une sidebar profil épurée à un bleu corporate franc. Vos coordonnées, votre disponibilité et votre CV téléchargeable restent visibles en permanence, pendant que le contenu se navigue par onglets (À propos, Expérience, Formation, Compétences, Contact).',
    bgColor: '#eef3ff',
    accent: '#1a56ff',
    textColor: '#0a0f1e',
    badgeTextColor: '#ffffff',
    ctaTextColor: '#ffffff',
    thumb: '/models/bleu-preview.png',
    heroImg: '/models/bleu-preview.png',
    gallery: ['/models/bleu-preview.png', '/models/bleu-2.png', '/models/bleu-3.png', '/models/bleu-4.png', '/models/bleu-5.png', '/models/bleu-6.png', '/models/bleu-7.png', '/models/bleu-8.png', '/models/bleu-9.png', '/models/bleu-10.png'],
    liveUrl: 'https://cvdyali-yassin.netlify.app',
    headerBg: '/models/header-bleu.jpg',
    features: [
      { icon: 'sidebar', title: 'Sidebar profil fixe', desc: 'Photo, titre, localisation, email, téléphone et disponibilité toujours visibles, sur desktop comme sur mobile.' },
      { icon: 'tabs', title: 'Navigation par onglets', desc: 'À propos, Expérience, Formation, Compétences et Contact accessibles en un clic, sans rechargement.' },
      { icon: 'download', title: 'CV téléchargeable', desc: 'Bouton de téléchargement du CV en PDF directement intégré à la sidebar.' },
      { icon: 'globe', title: 'Bilingue FR / EN', desc: 'Sélecteur de langue intégré pour présenter votre profil aux recruteurs francophones et anglophones.' },
      { icon: 'grid', title: 'Bloc "Ce que je fais"', desc: 'Quatre cartes de compétences clés mises en avant dès la page d\'accueil.' },
      { icon: 'mobile', title: '100% responsive', desc: 'Sidebar et onglets se réorganisent proprement sur mobile, sans perte de lisibilité.' },
    ],
    techStack: ['React', 'Tailwind CSS', 'Vite'],
    deliveryTime: '3–5 jours',
    seoScore: '97/100',
    mobileScore: '99/100',
    sections: ['Sidebar profil', 'À propos', 'Expérience', 'Formation', 'Compétences', 'Contact'],
    forWho: ['Ingénieurs & Techniciens', 'Développeurs & IT', 'Architectes', 'Chefs de projet BTP'],
  },
  {
    id: 2,
    name: 'Rose',
    tag: 'Soin & bienveillance',
    tagline: 'Une présence chaleureuse et rassurante.',
    description:
      'Le thème Rose reprend la même structure sidebar + onglets, habillée d\'un accent magenta doux. Pensé pour les métiers du soin et de l\'accompagnement, il met en avant l\'empathie autant que les compétences techniques.',
    bgColor: '#fdf1f7',
    accent: '#e0409e',
    textColor: '#0a0f1e',
    badgeTextColor: '#ffffff',
    ctaTextColor: '#ffffff',
    thumb: '/models/rose-preview.png',
    heroImg: '/models/rose-preview.png',
    gallery: ['/models/rose-preview.png', '/models/D2H2.PNG', '/models/D2H3.PNG', '/models/D2H4.PNG', '/models/D2H5.PNG', '/models/M2.PNG', '/models/M2H2.PNG', '/models/M2H3.PNG', '/models/M2H4.PNG', '/models/M2H5.PNG'],
    liveUrl: 'https://cvdyali-salma.netlify.app',
    headerBg: '/models/header-rose.jpg',
    features: [
      { icon: 'sidebar', title: 'Sidebar profil fixe', desc: 'Photo, poste, ville, email, téléphone et disponibilité toujours accessibles en un coup d\'œil.' },
      { icon: 'tabs', title: 'Navigation par onglets', desc: 'À propos, Expérience, Formation, Compétences et Contact, organisés clairement.' },
      { icon: 'heart', title: 'Ton chaleureux', desc: 'Palette et typographie pensées pour projeter empathie et rigueur professionnelle.' },
      { icon: 'download', title: 'CV téléchargeable', desc: 'Téléchargement du CV en PDF en un clic depuis la sidebar.' },
      { icon: 'grid', title: 'Bloc "Ce que je fais"', desc: 'Vos domaines d\'intervention mis en avant dans des cartes claires et lisibles.' },
      { icon: 'mobile', title: '100% responsive', desc: 'Expérience identique et fluide sur desktop, tablette et mobile.' },
    ],
    techStack: ['React', 'Tailwind CSS', 'Vite'],
    deliveryTime: '3–5 jours',
    seoScore: '96/100',
    mobileScore: '99/100',
    sections: ['Sidebar profil', 'À propos', 'Expérience', 'Formation', 'Compétences', 'Contact'],
    forWho: ['Infirmiers & Infirmières', 'Aides-soignants', 'Kinésithérapeutes', 'Personnel médical'],
  },
  {
    id: 3,
    name: 'Orange',
    tag: 'Éducation & pédagogie',
    tagline: 'La clarté au service de la transmission.',
    description:
      'Le thème Orange met une touche énergique et accessible sur la structure sidebar + onglets. Sa section Formation en liste chronologique cliquable est idéale pour présenter un parcours académique ou une progression pédagogique.',
    bgColor: '#fff4ec',
    accent: '#ea6a1f',
    textColor: '#0a0f1e',
    badgeTextColor: '#ffffff',
    ctaTextColor: '#ffffff',
    thumb: '/models/orange-preview.png',
    heroImg: '/models/orange-preview.png',
    gallery: ['/models/orange-preview.png', '/models/D3H2.PNG', '/models/D3H3.PNG', '/models/D3H4.PNG', '/models/D3H5.PNG', '/models/M3.PNG', '/models/M3H2.PNG', '/models/M3H3.PNG', '/models/M3H4.PNG', '/models/M3H5.PNG'],
    liveUrl: 'https://cvdyali-imane.netlify.app',
    headerBg: '/models/header-orange.jpg',
    features: [
      { icon: 'sidebar', title: 'Sidebar profil fixe', desc: 'Photo, matière enseignée, ville et disponibilité mis en avant en permanence.' },
      { icon: 'timeline', title: 'Formation en liste chronologique', desc: 'Diplômes et établissements présentés année par année, cliquables pour plus de détails.' },
      { icon: 'tabs', title: 'Navigation par onglets', desc: 'À propos, Expérience, Formation, Compétences et Contact clairement séparés.' },
      { icon: 'download', title: 'CV téléchargeable', desc: 'Export PDF du CV accessible directement depuis la sidebar.' },
      { icon: 'globe', title: 'Bilingue FR / EN', desc: 'Bascule instantanée entre français et anglais.' },
      { icon: 'mobile', title: '100% responsive', desc: 'Mise en page adaptée aux petits écrans, pied de page compris.' },
    ],
    techStack: ['React', 'Tailwind CSS', 'Vite'],
    deliveryTime: '3–5 jours',
    seoScore: '97/100',
    mobileScore: '98/100',
    sections: ['Sidebar profil', 'À propos', 'Expérience', 'Formation', 'Compétences', 'Contact'],
    forWho: ['Enseignants & Professeurs', 'Formateurs', 'Éducateurs', 'Répétiteurs & Tuteurs'],
  },
  {
    id: 4,
    name: 'Vert',
    tag: 'Finance & gestion',
    tagline: 'La précision qui inspire la confiance.',
    description:
      'Le thème Vert habille la structure sidebar + onglets d\'un vert profond, associé à la rigueur et à la fiabilité. Parfait pour présenter des compétences chiffrées et un parcours orienté finance ou gestion.',
    bgColor: '#eefaf1',
    accent: '#1f9d55',
    textColor: '#0a0f1e',
    badgeTextColor: '#ffffff',
    ctaTextColor: '#ffffff',
    thumb: '/models/vert-preview.png',
    heroImg: '/models/vert-preview.png',
    gallery: ['/models/vert-preview.png','/models/D4H2.PNG', '/models/D4H3.PNG', '/models/D4H4.PNG', '/models/M4.PNG', '/models/M4H2.PNG', '/models/M4H3.PNG', '/models/M4H4.PNG', '/models/M4H5.PNG'],
    liveUrl: 'https://cvdyali-yasine.netlify.app',
    headerBg: '/models/header-vert.jpg',
    features: [
      { icon: 'sidebar', title: 'Sidebar profil fixe', desc: 'Photo, fonction, email et téléphone toujours visibles pendant la navigation.' },
      { icon: 'tabs', title: 'Navigation par onglets', desc: 'À propos, Expérience, Formation, Compétences et Contact organisés en un clic.' },
      { icon: 'grid', title: 'Bloc "Ce que je fais"', desc: 'Comptabilité, fiscalité, contrôle de gestion et reporting présentés en cartes.' },
      { icon: 'download', title: 'CV téléchargeable', desc: 'Bouton de téléchargement du CV en PDF intégré à la sidebar.' },
      { icon: 'globe', title: 'Bilingue FR / EN', desc: 'Sélecteur de langue pour candidater aussi bien au Maroc qu\'à l\'international.' },
      { icon: 'mobile', title: '100% responsive', desc: 'Lisibilité et hiérarchie visuelle préservées sur tous les écrans.' },
    ],
    techStack: ['React', 'Tailwind CSS', 'Vite'],
    deliveryTime: '3–5 jours',
    seoScore: '98/100',
    mobileScore: '99/100',
    sections: ['Sidebar profil', 'À propos', 'Expérience', 'Formation', 'Compétences', 'Contact'],
    forWho: ['Comptables', 'Contrôleurs de gestion', 'Auditeurs', 'Profils finance & audit'],
  },
]

const PLANS = [
  {
    name: 'Starter',
    price: 199,
    description: 'Parfait pour démarrer.',
    features: ['1 modèle au choix', 'Contenu personnalisé', 'Design responsive', 'Hébergement 1 an', 'Livraison en 5 jours'],
    highlighted: false,
    cta: 'Commencer',
    paymentLink: 'https://www.paypal.com/ncp/payment/YSG7CA8GYPNFW', // <-- remplace par ton vrai lien Payzone pour ce plan
  },
  {
    name: 'Pro',
    price: 399,
    description: 'Pour se démarquer vraiment.',
    features: ['Tout Starter inclus', 'Animations avancées', 'Domaine personnalisé', 'SEO optimisé', 'Livraison en 3 jours', '2 révisions incluses'],
    highlighted: true,
    cta: 'Choisir Pro',
    badge: 'Le plus populaire',
    paymentLink: 'https://www.paypal.com/ncp/payment/VRW54QULM78B8', // <-- remplace par ton vrai lien Payzone pour ce plan
  },
  {
    name: 'Elite',
    price: 699,
    description: 'Expérience premium.',
    features: ['Tout Pro inclus', 'Design sur mesure', 'Intégration portfolio', 'Hébergement à vie', 'Livraison en 48h', 'Révisions illimitées', 'Support prioritaire'],
    highlighted: false,
    cta: 'Aller Elite',
    paymentLink: 'https://www.paypal.com/ncp/payment/5UA33SVFEZWJS', // <-- remplace par ton vrai lien Payzone pour ce plan
  },
]

// ─── Icon set (clean line icons, no emoji) ────────────────────────────────────
type IconKey =
  | 'sidebar' | 'tabs' | 'download' | 'globe' | 'grid' | 'mobile' | 'heart'
  | 'timeline' | 'check' | 'sparkles' | 'search' | 'moon' | 'chart' | 'mail'
  | 'target' | 'link' | 'video' | 'lock' | 'filter' | 'layers' | 'palette' | 'clock'
  | 'external' | 'images'

const ICON_PATHS: Record<IconKey, JSX.Element> = {
  sidebar: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M9 4v16" /></>,
  tabs: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18" /><path d="M7 6.5h3" /></>,
  download: <><path d="M12 4v11" /><path d="M8 11l4 4 4-4" /><path d="M5 19h14" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17" /><path d="M12 3.5c2.6 2.4 4 5.4 4 8.5s-1.4 6.1-4 8.5c-2.6-2.4-4-5.4-4-8.5s1.4-6.1 4-8.5z" /></>,
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  mobile: <><rect x="6.5" y="2.5" width="11" height="19" rx="2.2" /><path d="M10.5 18.3h3" /></>,
  heart: <path d="M12 20.5s-7.5-4.6-9.8-9.3C.6 7.7 2.2 4 5.9 4c2 0 3.4 1.1 4.2 2.2C10.9 5.1 12.3 4 14.3 4c3.7 0 5.3 3.7 3.7 7.2-2.3 4.7-9.8 9.3-9.8 9.3z" />,
  timeline: <><circle cx="6" cy="6" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="6" cy="18" r="2" /><path d="M10.5 6h9M10.5 12h9M10.5 18h9" /></>,
  check: <path d="M4 12.5l5 5L20 6" />,
  sparkles: <><path d="M12 3l1.6 4.9L18.5 9l-4.9 1.6L12 15.5l-1.6-4.9L5.5 9l4.9-1.6z" /><path d="M19 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4.8-4.8" /></>,
  moon: <path d="M20 14.5A8.5 8.5 0 119.5 4a7 7 0 0010.5 10.5z" />,
  chart: <><path d="M4 20V10" /><path d="M11 20V4" /><path d="M18 20v-7" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.2" /><path d="M4 6.5l8 6.5 8-6.5" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.9" fill="currentColor" /></>,
  link: <><path d="M9.5 14.5l5-5" /><path d="M13 6l1.6-1.6a3.8 3.8 0 015.4 5.4L18.3 11.4" /><path d="M11 18l-1.6 1.6a3.8 3.8 0 01-5.4-5.4L5.7 12.6" /></>,
  video: <><rect x="2.5" y="5.5" width="13" height="13" rx="2.2" /><path d="M15.5 10l6-3.3v10.6l-6-3.3" /></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" /><path d="M8 10.5V7a4 4 0 018 0v3.5" /></>,
  filter: <path d="M4 5h16l-6 7.5V19l-4 2v-8.5z" />,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  palette: <><circle cx="12" cy="12" r="9" /><circle cx="8.2" cy="10.5" r="1.3" fill="currentColor" /><circle cx="12" cy="8" r="1.3" fill="currentColor" /><circle cx="15.8" cy="10.5" r="1.3" fill="currentColor" /><path d="M12 21a3 3 0 010-6h1a2.5 2.5 0 000-5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  external: <><path d="M9 5H5.5A1.5 1.5 0 004 6.5v12A1.5 1.5 0 005.5 20h12a1.5 1.5 0 001.5-1.5V15" /><path d="M13 4h7v7" /><path d="M20 4l-9 9" /></>,
  images: <><rect x="2.5" y="3.5" width="14" height="11" rx="2" /><rect x="7.5" y="8.5" width="14" height="11" rx="2" /><circle cx="12" cy="8" r="1.2" fill="currentColor" /></>,
}

function Icon({ name, size = 20, className = '', color }: { name: string; size?: number; className?: string; color?: string }) {
  const path = ICON_PATHS[name as IconKey] ?? ICON_PATHS.sparkles
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {path}
    </svg>
  )
}

// ─── Gallery image with graceful placeholder ──────────────────────────────────
// Slots that don't have a real file yet show a friendly "add a photo" card
// instead of a broken image icon — swap in a real file at the same path and
// it upgrades automatically, no code change needed.
function GalleryThumb({ src, alt, accent, index }: { src: string; alt: string; accent: string; index: number }) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  if (status === 'error') {
    return (
      <div className="w-full aspect-[4/3] flex flex-col items-center justify-center gap-2 text-center px-4" style={{ backgroundColor: accent + '0a' }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '18', color: accent }}>
          <Icon name="images" size={18} />
        </div>
        <span className="text-xs font-medium" style={{ color: accent }}>Photo {index + 1} à venir</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-auto object-cover object-top transition-all duration-500 group-hover:scale-[1.02] ${status === 'ok' ? 'opacity-100' : 'opacity-0'}`}
      onLoad={() => setStatus('ok')}
      onError={() => setStatus('error')}
    />
  )
}

function LightboxImage({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  if (status === 'error') {
    return (
      <div className="w-[min(80vw,480px)] aspect-[4/3] rounded-2xl flex flex-col items-center justify-center gap-3" style={{ backgroundColor: accent + '15' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: accent + '25', color: accent }}>
          <Icon name="images" size={22} />
        </div>
        <span className="text-sm font-medium" style={{ color: accent }}>Cette photo n'a pas encore été ajoutée</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className="max-w-full max-h-[85vh] w-auto h-auto rounded-2xl shadow-2xl object-contain"
      onLoad={() => setStatus('ok')}
      onError={() => setStatus('error')}
    />
  )
}

// ─── Smart background image (graceful placeholder until you add the file) ────
// Used for per-model header backgrounds: drop the file at the given path and
// it appears automatically, blurred and softly framed by a white fade at the
// top and bottom so it blends smoothly into the rest of the (white) page.
// Until a real file exists, a soft themed gradient placeholder is shown
// instead of a broken image.
function SmartBackground({ src, accent, className = '' }: { src: string; accent: string; className?: string }) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Scaled up so the blur never reveals transparent edges */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-700 ${status === 'ok' ? 'opacity-100' : 'opacity-0'}`}
        style={{ filter: 'blur(28px)' }}
        onLoad={() => setStatus('ok')}
        onError={() => setStatus('error')}
      />
      {status !== 'ok' && (
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 30% 0%, ${accent}2e, transparent 60%), radial-gradient(ellipse at 80% 100%, ${accent}22, transparent 55%)` }}
        />
      )}
      {/* Soft white wash so the blurred photo never fights with the text */}
      <div className="absolute inset-0 bg-white/35" />
      {/* Smooth white fade at the very top — blends into the navbar area */}
      <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-white via-white/70 to-transparent" />
      {/* Smooth white fade at the bottom — blends into the page below */}
      <div className="absolute inset-x-0 bottom-0 h-40 sm:h-56 bg-gradient-to-t from-white via-white/85 to-transparent" />
    </div>
  )
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`h-8 sm:h-9 px-3 rounded-lg border-2 border-dashed flex items-center justify-center ${light ? 'border-white/25 bg-white/5' : 'border-slate-300 bg-slate-50'} ${className}`}>
        <span className={`text-[9px] sm:text-[10px] uppercase tracking-widest ${light ? 'text-white/40' : 'text-slate-400'}`}>Votre logo</span>
      </div>
    )
  }
  return (
    <img
      src={LOGO_SRC}
      alt="CV Dyali"
      className={`h-15 sm:h-19 w-auto object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  )
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
function HeroCarousel() {
  const [cur, setCur] = useState(0)
  const [key, setKey] = useState(0)
  useEffect(() => {
    const t = setInterval(() => { setCur((c) => (c + 1) % CAROUSEL_DESKTOP.length); setKey((k) => k + 1) }, 5500)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Desktop background */}
      <div key={`d-${key}`} className="hidden sm:block absolute inset-0 bg-center bg-cover carousel-enter" style={{ backgroundImage: `url(${CAROUSEL_DESKTOP[cur]})` }} />
      {/* Mobile background */}
      <div key={`m-${key}`} className="sm:hidden absolute inset-0 bg-center bg-cover carousel-enter" style={{ backgroundImage: `url(${CAROUSEL_MOBILE[cur]})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#040d1e]/75 via-[#040d1e]/60 to-[#040d1e]/95" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {CAROUSEL_DESKTOP.map((_, i) => (
          <button key={i} onClick={() => { setCur(i); setKey((k) => k + 1) }} aria-label={`Fond ${i + 1}`}
            className={`rounded-full transition-all duration-500 ${i === cur ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ page, onNavigate, onOrder }: { page: Page; onNavigate: (p: Page) => void; onOrder: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const isHome = page === 'home'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu when navigating
  useEffect(() => { setOpen(false) }, [page])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  const links = [
    { label: 'Accueil', action: () => onNavigate('home') },
    { label: 'Modèles', action: () => { onNavigate('home'); setTimeout(() => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' }), 100) } },
    { label: 'Tarifs', action: () => { onNavigate('home'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 100) } },
  ]

  const navBg = scrolled || !isHome ? 'glass-light shadow-sm shadow-blue-50' : ''
  const linkColor = scrolled || !isHome ? 'text-slate-600 hover:text-[#1a56ff]' : 'text-white/75 hover:text-white'

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 flex-shrink-0">
            <Logo light={!(scrolled || !isHome)} />
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <button key={l.label} onClick={l.action} className={`text-sm font-medium transition-colors ${linkColor}`}>{l.label}</button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button onClick={onOrder}
            className="hidden md:flex items-center gap-2 bg-[#1a56ff] hover:bg-[#0e3acc] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-[0_4px_20px_rgba(26,86,255,0.4)] active:scale-95"
          >
            Commander
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5h7M5.5 2l3.5 3.5L5.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          {/* Mobile burger */}
          <button
            className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${scrolled || !isHome ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open
              ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              : <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2.5 6h13M2.5 9h13M2.5 12h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            }
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col md:hidden menu-open bg-white">
          {/* Top bar with close */}
          <div className="flex items-center justify-between px-4 h-14 border-b border-slate-100">
            <Logo />
            <button onClick={() => setOpen(false)} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col justify-center px-6 gap-2">
            {links.map((l, i) => (
              <button
                key={l.label}
                onClick={() => { setOpen(false); l.action() }}
                className="w-full text-left py-4 px-5 rounded-2xl text-slate-900 font-display text-3xl hover:bg-[#f0f4ff] hover:text-[#1a56ff] transition-colors"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="px-6 pb-10 pb-safe space-y-3 border-t border-slate-100 pt-6">
            <button
              onClick={() => { setOpen(false); onOrder() }}
              className="w-full bg-[#1a56ff] text-white text-base font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_8px_32px_rgba(26,86,255,0.3)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Commander sur WhatsApp
            </button>
            <p className="text-slate-400 text-xs text-center">Réponse garantie en moins de 2h</p>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onOrder, onNavigate }: { onOrder: () => void; onNavigate: (p: Page) => void }) {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden px-4 sm:px-6 pt-16 pb-20">
      <HeroCarousel />
      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 glass-dark rounded-full px-3.5 py-1.5 mb-6 sm:mb-8 reveal">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1a56ff] pulse-dot" />
          <span className="text-[10px] sm:text-xs font-medium tracking-widest uppercase shimmer-text">Votre présence digitale professionnelle</span>
        </div>
        <h1 className="font-display text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[88px] text-white leading-[0.94] mb-5 sm:mb-7 reveal reveal-d1">
          Votre CV,{' '}
          <em className="font-display not-italic text-gradient-light">transformé</em>
          {' '}en site web.
        </h1>
        <p className="text-white/55 text-base sm:text-lg md:text-xl max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed font-light reveal reveal-d2">
          Démarquez-vous avec un CV website unique, élégant et mémorable. Conçu sur mesure, livré en 48h.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 reveal reveal-d3">
         
          <button
            onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' }), 100) }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 glass-dark text-white/80 hover:text-white text-sm font-medium px-6 py-4 rounded-2xl sm:rounded-full transition-all"
          >
            Voir les modèles
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 2v9M2 6.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 mt-12 sm:mt-16 w-full max-w-sm sm:max-w-2xl mx-auto reveal reveal-d4">
        <div className="glass-dark rounded-2xl grid grid-cols-3 divide-x divide-white/10 overflow-hidden">
          {[{ v: '+150', l: 'CVs livrés' }, { v: '48h', l: 'Délai moyen' }, { v: '100%', l: 'Satisfaction' }].map((s, i) => (
            <div key={i} className="py-4 sm:py-5 text-center px-2">
              <div className="font-display text-2xl sm:text-3xl text-white">{s.v}</div>
              <div className="text-[10px] sm:text-[11px] text-white/35 uppercase tracking-widest mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Model card (home) ────────────────────────────────────────────────────────
function ModelCard({ model, onSelect, onViewDetail }: { model: ModelData; onSelect: (id: number) => void; onViewDetail: (id: number) => void }) {
  return (
    <div className="group relative rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 border border-slate-100">
      {/* Preview — real screenshot of the template */}
      <div className="relative h-52 sm:h-56 overflow-hidden" style={{ backgroundColor: model.bgColor }}>
        <img
          src={model.thumb}
          alt={`Aperçu du modèle ${model.name}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm" style={{ backgroundColor: model.accent, color: model.badgeTextColor }}>
          {model.tag}
        </div>
        {/* Voir en ligne */}
        <a
          href={model.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title="Voir la démo en ligne"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:bg-white hover:scale-105 transition-all shadow-sm"
        >
          <Icon name="external" size={14} />
        </a>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: model.accent }} />
          <h3 className="font-display text-xl text-slate-900">Modèle {model.name}</h3>
        </div>
        <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">{model.tagline}</p>
        <ul className="space-y-1.5 mb-5">
          {model.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
              <Icon name="check" size={13} className="flex-shrink-0" color={model.accent} />
              {f.title}
            </li>
          ))}
        </ul>
        <div className="flex gap-2.5">
          <button onClick={() => onViewDetail(model.id)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:border-[#1a56ff] hover:text-[#1a56ff] transition-all active:scale-[0.97]"
          >
            Voir détails
          </button>
          <button onClick={() => onSelect(model.id)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] hover:opacity-90"
            style={{ backgroundColor: model.accent, color: model.ctaTextColor }}
          >
            Commander
          </button>
        </div>
      </div>
    </div>
  )
}

function ModelsSection({ onSelect, onNavigate }: { onSelect: (id: number) => void; onNavigate: (p: Page) => void }) {
  return (
    <section id="models" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#f7f8fc]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 glass-blue rounded-full px-3 py-1 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a56ff]" />
              <span className="text-[11px] font-medium text-[#1a56ff] uppercase tracking-widest">04 modèles exclusifs</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-tight">
              Choisissez votre<br /><span className="italic text-gradient">identité digitale.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-xs leading-relaxed">Chaque modèle est entièrement personnalisé avec vos informations et couleurs.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MODELS.map((m) => (
            <ModelCard key={m.id} model={m} onSelect={onSelect} onViewDetail={(id) => onNavigate({ type: 'model', id })} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Process ──────────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    { n: '01', title: 'Choisissez votre modèle', desc: 'Parcourez nos 4 designs et sélectionnez celui qui vous correspond.' },
    { n: '02', title: 'Remplissez le formulaire', desc: 'Partagez vos informations via notre formulaire simple et intuitif.' },
    { n: '03', title: 'Livraison en 48h', desc: 'Votre CV website est prêt et envoyé directement sur WhatsApp.' },
  ]
  return (
    <section id="process" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 glass-blue rounded-full px-3 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a56ff]" />
            <span className="text-[11px] font-medium text-[#1a56ff] uppercase tracking-widest">Processus</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-slate-900">Simple comme <span className="italic text-gradient">bonjour.</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative bg-[#f7f8fc] rounded-3xl p-7 sm:p-8 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#dce7ff] shadow-sm flex items-center justify-center mx-auto mb-5 relative">
                <span className="font-display text-xl text-[#1a56ff]">{s.n}</span>
                <span className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-[#1a56ff] text-white text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-base mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function PricingSection({ onSelect }: { onSelect: (plan: string) => void }) {
  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1a56ff] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 glass-blue rounded-full px-3 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a56ff]" />
            <span className="text-[11px] font-medium text-[#1a56ff] uppercase tracking-widest">Tarifs transparents</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-3">
            Investissez dans<br /><em className="not-italic text-gradient">votre carrière.</em>
          </h2>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">Paiement unique. Aucun abonnement caché.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div key={plan.name}
              className={`relative rounded-3xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5 ${plan.highlighted ? 'bg-[#1a56ff] shadow-[0_20px_60px_rgba(26,86,255,0.25)]' : 'bg-[#f7f8fc] border border-slate-100 hover:border-[#dce7ff] hover:shadow-md'}`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-[#1a56ff] text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shadow-sm">{plan.badge}</div>
              )}
              <div className="mb-6">
                <div className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${plan.highlighted ? 'text-blue-200' : 'text-[#1a56ff]'}`}>{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-1.5">
                  <span className={`font-display text-5xl ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className={`text-sm font-medium ${plan.highlighted ? 'text-blue-200' : 'text-slate-400'}`}>MAD</span>
                </div>
                <p className={`text-xs leading-relaxed ${plan.highlighted ? 'text-blue-100/80' : 'text-slate-400'}`}>{plan.description}</p>
              </div>
              <ul className="space-y-2.5 mb-7 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlighted ? 'bg-white/20' : 'bg-[#1a56ff]/10'}`}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke={plan.highlighted ? 'white' : '#1a56ff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span className={plan.highlighted ? 'text-white' : 'text-slate-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => onSelect(plan.name)}
                className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-[0.98] ${plan.highlighted ? 'bg-white text-[#1a56ff] hover:bg-blue-50' : 'bg-[#1a56ff] hover:bg-[#0e3acc] text-white'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const t = [
    { name: 'Yassine El Amrani', role: 'Ingénieur Génie Civil · Casablanca', avatar: 'yas.png', text: 'Mon CV website a impressionné mon recruteur dès le premier entretien. Livré en 48h exactement comme promis.' },
    { name: 'Salma Bennani', role: 'Infirmière Diplômée d\'État · Casablanca', avatar: 'salma.png', text: 'Le thème Rose correspond parfaitement à mon métier. Service impeccable, je recommande à 100%.' },
    { name: 'Imane El Fassi', role: 'Enseignante de Mathématiques · Rabat', avatar: 'imane.png', text: 'Professionnel et réactif. Mon CV Orange reflète exactement l\'image que je voulais projeter.' },
  ]
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#f7f8fc]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 glass-blue rounded-full px-3 py-1 mb-3">
            <span className="text-[11px] font-medium text-[#1a56ff] uppercase tracking-widest">Témoignages</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-slate-900">Ce que disent <span className="italic text-gradient">nos clients.</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {t.map((item, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, j) => <svg key={j} width="13" height="13" viewBox="0 0 14 14" fill="#1a56ff"><path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.3l-3.7 2 .7-4.1-3-2.9 4.2-.7z" /></svg>)}</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">"{item.text}"</p>
              <div className="flex items-center gap-3">
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                <div><div className="text-slate-900 font-semibold text-sm">{item.name}</div><div className="text-slate-400 text-xs">{item.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ onOrder, onNavigate }: { onOrder: () => void; onNavigate: (p: Page) => void }) {
  return (
    <footer className="bg-[#f7f8fc] border-t border-slate-100 pt-14 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">Transformez votre expérience en une présence digitale mémorable.</p>
            <a href="https://wa.me/212625185245" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#1eab54] hover:text-[#25D366] transition-colors font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              +212 625 185 245
            </a>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Modèles</div>
            <ul className="space-y-2.5">
              {MODELS.map((m) => (
                <li key={m.id}><button onClick={() => onNavigate({ type: 'model', id: m.id })} className="text-sm text-slate-500 hover:text-[#1a56ff] transition-colors">{m.name} — {m.tag}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Prêt à démarrer ?</div>
            <p className="text-slate-400 text-sm mb-5 leading-relaxed">Un CV website livré en quelques jours qui vous distingue.</p>
            <button onClick={onOrder} className="flex items-center gap-2 bg-[#1a56ff] hover:bg-[#0e3acc] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all hover:shadow-[0_4px_20px_rgba(26,86,255,0.4)]">
              Commander maintenant
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5h7M5.5 2l3.5 3.5L5.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-400 text-xs">© 2024 CV Dyali — Tous droits réservés</p>
          <p className="text-slate-400 text-xs">Conçu avec soin au Maroc 🇲🇦</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Model Detail Page ────────────────────────────────────────────────────────
function ModelDetailPage({ model, onBack, onOrder }: { model: ModelData; onBack: () => void; onOrder: (id: number) => void }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [galleryIdx, setGalleryIdx] = useState(0)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setGalleryIdx(0) }, [model.id])

  // Lock body scroll while the lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [lightboxOpen])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[46vh] sm:h-[52vh] overflow-hidden" style={{ backgroundColor: model.bgColor }}>
        <SmartBackground src={model.headerBg} accent={model.accent} />

        {/* Back button */}
        <button onClick={onBack} type="button"
          className="absolute top-20 left-4 sm:left-8 z-20 flex items-center gap-2 glass-light text-slate-700 text-sm font-medium px-4 py-2.5 rounded-full shadow-sm transition-all hover:bg-white active:scale-95 cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Retour
        </button>

        {/* Voir en ligne */}
        <a href={model.liveUrl} target="_blank" rel="noopener noreferrer"
          className="absolute top-20 right-4 sm:right-8 z-20 flex items-center gap-2 glass-light text-slate-700 text-sm font-medium px-4 py-2.5 rounded-full shadow-sm transition-all hover:bg-white active:scale-95"
        >
          Voir en ligne
          <Icon name="external" size={14} />
        </a>

        <div className="relative z-10 h-full flex flex-col justify-end px-4 sm:px-8 lg:px-16 pb-10 max-w-7xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 w-fit" style={{ backgroundColor: model.accent + '22', border: `1px solid ${model.accent}44` }}>
            <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: model.accent }}>{model.tag}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-3" style={{ color: model.textColor }}>
            Modèle {model.name}
          </h1>
          <p className="text-base sm:text-lg max-w-lg leading-relaxed" style={{ color: model.textColor + 'bb' }}>{model.tagline}</p>
        </div>
      </section>

      {/* Quick stats bar */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-6 sm:gap-10 py-4 min-w-max sm:min-w-0">
          {[
            { label: 'Livraison', value: model.deliveryTime },
            { label: 'Score SEO', value: model.seoScore },
            { label: 'Score Mobile', value: model.mobileScore },
            { label: 'Sections', value: `${model.sections.length} incluses` },
          ].map((s, i) => (
            <div key={i} className="text-center flex-shrink-0">
              <div className="font-display text-xl sm:text-2xl text-[#1a56ff]">{s.value}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Preview gallery */}
       <section className="py-12 sm:py-16">
  <div className="flex items-end justify-between mb-6">
    <div>
      <h2 className="font-display text-2xl sm:text-3xl text-slate-900">Aperçu du modèle</h2>
      <p className="text-slate-400 text-xs sm:text-sm mt-1 flex items-center gap-1.5">
        <Icon name="images" size={14} />
        Faites glisser pour voir toutes les captures
      </p>
    </div>
    <a href={model.liveUrl} target="_blank" rel="noopener noreferrer"
      className="hidden sm:flex flex-shrink-0 items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full border transition-all hover:opacity-80"
      style={{ borderColor: model.accent + '44', color: model.accent }}
    >
      Voir en ligne
      <Icon name="external" size={14} />
    </a>
  </div>

  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
    {/* Scrollable gallery */}
    <div className="flex-1 min-w-0">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-1 px-1" style={{ scrollbarWidth: 'thin' }}>
        {model.gallery.map((img, i) => (
          <button
            key={i}
            onClick={() => { setGalleryIdx(i); setLightboxOpen(true) }}
            className="relative flex-shrink-0 w-[85%] sm:w-[75%] lg:w-[80%] snap-center rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/70 shadow-[0_8px_24px_-8px_rgba(15,23,42,0.15)] group transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Fixed ratio wrapper — desktop-first (16:10), works fine with 9:16 too via object-cover */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={img}
                alt={`Modèle ${model.name} — capture ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Soft gradient overlay for legibility, on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 flex items-center gap-2 backdrop-blur-md bg-white/90 text-slate-900 text-xs font-semibold px-4 py-2 rounded-full shadow-sm">
                  <Icon name="search" size={14} />
                  Agrandir
                </span>
              </div>

              <span className="absolute bottom-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md bg-black/50 text-white">
                {i + 1} / {model.gallery.length}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4 lg:hidden">
        {model.gallery.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === 0 ? '18px' : '6px',
              backgroundColor: model.accent + (i === 0 ? 'ff' : '33'),
            }}
          />
        ))}
      </div>
    </div>

    {/* Side info */}
    <div className="lg:w-72 xl:w-80 flex-shrink-0 flex flex-col gap-4">
      {/* For who */}
      <div className="bg-[#f7f8fc] rounded-2xl p-5">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Idéal pour</div>
        <ul className="space-y-2">
          {model.forWho.map((w, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: model.accent }} />
              {w}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech stack */}
      <div className="rounded-2xl p-5 border" style={{ backgroundColor: model.accent + '0a', borderColor: model.accent + '22' }}>
        <div className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: model.accent }}>Stack technique</div>
        <div className="flex flex-wrap gap-2">
          {model.techStack.map((t, i) => (
            <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white border" style={{ color: model.accent, borderColor: model.accent + '33' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Live demo card */}
      <a href={model.liveUrl} target="_blank" rel="noopener noreferrer"
        className="rounded-2xl p-5 flex items-center justify-between gap-3 text-white transition-transform hover:-translate-y-0.5"
        style={{ backgroundColor: model.accent }}
      >
        <div>
          <div className="font-semibold text-sm mb-0.5">Voir le CV web en ligne</div>
        </div>
        <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <Icon name="external" size={16} />
        </span>
      </a>
    </div>
  </div>
</section>

        {/* Description */}
        <section className="pb-12 sm:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl text-slate-900 mb-4">À propos de ce modèle</h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">{model.description}</p>
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Sections incluses</div>
                <div className="flex flex-wrap gap-2">
                  {model.sections.map((s, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#f0f4ff] text-[#1a56ff] border border-[#dce7ff]">{s}</span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl text-slate-900 mb-4">Fonctionnalités incluses</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {model.features.map((f, i) => (
                  <div key={i} className="bg-[#f7f8fc] rounded-2xl p-4 hover:bg-[#f0f4ff] transition-colors">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: model.accent + '18', color: model.accent }}>
                      <Icon name={f.icon} size={18} />
                    </div>
                    <div className="font-semibold text-slate-900 text-sm mb-1">{f.title}</div>
                    <div className="text-slate-500 text-xs leading-relaxed">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="pb-16 sm:pb-20">
          <div className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden" style={{ backgroundColor: model.bgColor }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 0%, ${model.accent}15, transparent 70%)` }} />
            <div className="relative z-10">
              <h3 className="font-display text-3xl sm:text-4xl mb-3" style={{ color: model.textColor }}>
                Prêt à commander le modèle {model.name} ?
              </h3>
              <p className="mb-7 text-sm sm:text-base leading-relaxed max-w-md mx-auto" style={{ color: model.textColor + '88' }}>
                Livraison garantie en {model.deliveryTime}. Satisfaction 100% ou remboursement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => onOrder(model.id)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1a56ff] text-white font-bold px-8 py-4 rounded-2xl sm:rounded-full text-base hover:bg-[#0e3acc] transition-all hover:shadow-[0_8px_32px_rgba(26,86,255,0.45)] active:scale-[0.97]"
                >
                  Commander ce modèle
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button onClick={onBack}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-medium px-6 py-4 rounded-2xl sm:rounded-full bg-white transition-all"
                  style={{ color: model.textColor + 'aa' }}
                >
                  Voir d'autres modèles
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm modal-enter" onClick={() => setLightboxOpen(false)}>
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
          {model.gallery.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setGalleryIdx((galleryIdx - 1 + model.gallery.length) % model.gallery.length) }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setGalleryIdx((galleryIdx + 1) % model.gallery.length) }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </>
          )}
          <div className="max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <LightboxImage src={model.gallery[galleryIdx]} alt={`Modèle ${model.name} — capture ${galleryIdx + 1}`} accent={model.accent} />
          </div>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium text-white/60">
            {galleryIdx + 1} / {model.gallery.length}
          </span>
        </div>
      )}
    </div>
  )
}

// ─── Order Modal ──────────────────────────────────────────────────────────────
function OrderModal({ open, initialModel, initialPlan, onClose }: { open: boolean; initialModel: number | null; initialPlan: string; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [redirecting, setRedirecting] = useState(false)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', profession: '', linkedin: '', selectedModel: initialModel, selectedPlan: initialPlan || 'Pro', notes: '' })

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, selectedModel: initialModel ?? f.selectedModel, selectedPlan: initialPlan || f.selectedPlan }))
      setStep(1)
    }
  }, [open, initialModel, initialPlan])

  const update = useCallback((k: string, v: string | number | null) => setForm((f) => ({ ...f, [k]: v })), [])

  // Lock body scroll while the order modal is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  if (!open) return null

  const valid1 = form.fullName.trim() && form.email.trim() && form.phone.trim() && form.profession.trim()
  const valid2 = form.selectedModel !== null && form.selectedPlan
  const selectedPlanData = PLANS.find((p) => p.name === form.selectedPlan)

  // ─── Payzone checkout ───────────────────────────────────────────────────────
  // No backend involved: each plan has its own Payzone "payment link" (a
  // fixed-amount page created from the Payzone dashboard). Clicking "Payer
  // maintenant" redirects the browser straight to it — Payzone hosts the
  // actual card entry, so nothing sensitive ever touches this app.
  const handlePay = () => {
    if (!selectedPlanData?.paymentLink) return
    setRedirecting(true)
    setTimeout(() => {
      window.location.href = selectedPlanData.paymentLink
    }, 500)
  }

  const inputCls = 'w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#1a56ff] focus:ring-2 focus:ring-[#1a56ff]/12 transition-all'
  const STEP_LABELS = ['Vos infos', 'Choix', 'Paiement']

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(10,15,30,0.65)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-enter w-full sm:max-w-lg bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col overflow-hidden" style={{ maxHeight: '92svh' }}>
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="px-5 sm:px-7 pt-3 sm:pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div>
              <h2 className="font-display text-xl sm:text-2xl text-slate-900">Commander un CV</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Paiement sécurisé en ligne par carte</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors flex-shrink-0">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 1.5l10 10M11.5 1.5l-10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </div>
          {/* Steps */}
          <div className="flex items-center">
            {STEP_LABELS.map((label, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${i + 1 < step ? 'bg-[#1a56ff] text-white' : i + 1 === step ? 'bg-[#1a56ff] text-white ring-4 ring-[#1a56ff]/15' : 'bg-slate-100 text-slate-400'}`}>
                    {i + 1 < step ? <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : i + 1}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-medium ${i + 1 === step ? 'text-[#1a56ff]' : 'text-slate-300'}`}>{label}</span>
                </div>
                {i < STEP_LABELS.length - 1 && <div className="flex-1 h-px mx-1.5 sm:mx-2" style={{ background: i + 1 < step ? '#1a56ff' : '#e2e8f0' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 sm:px-7 py-5">
          {step === 1 && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Nom complet *</label>
                  <input className={inputCls} placeholder="Mohamed Amine" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Profession *</label>
                  <input className={inputCls} placeholder="Développeur Full-Stack" value={form.profession} onChange={(e) => update('profession', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Email *</label>
                <input className={inputCls} type="email" placeholder="votre@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">WhatsApp *</label>
                <input className={inputCls} placeholder="+212 6XX XXX XXX" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">LinkedIn <span className="text-slate-300 normal-case font-normal">(optionnel)</span></label>
                <input className={inputCls} placeholder="linkedin.com/in/profil" value={form.linkedin} onChange={(e) => update('linkedin', e.target.value)} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-3">Modèle *</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {MODELS.map((m) => (
                    <button key={m.id} onClick={() => update('selectedModel', m.id)}
                      className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-200 text-left ${form.selectedModel === m.id ? 'border-[#1a56ff] shadow-[0_0_0_3px_rgba(26,86,255,0.12)]' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="h-14 relative overflow-hidden" style={{ backgroundColor: m.bgColor }}>
                        <img src={m.thumb} alt={m.name} className="w-full h-full object-cover object-top" />
                        <span className="absolute bottom-1 left-1 w-2 h-2 rounded-full" style={{ backgroundColor: m.accent }} />
                      </div>
                      <div className="p-2 bg-white">
                        <div className="text-xs font-semibold text-slate-800">{m.name}</div>
                        <div className="text-[10px] text-slate-400">{m.tag}</div>
                      </div>
                      {form.selectedModel === m.id && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#1a56ff] flex items-center justify-center">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l1.5 1.5 3.5-3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">Plan *</label>
                <div className="space-y-2">
                  {PLANS.map((p) => (
                    <button key={p.name} onClick={() => update('selectedPlan', p.name)}
                      className={`w-full flex items-center justify-between rounded-xl px-4 py-3 border-2 transition-all text-left ${form.selectedPlan === p.name ? 'border-[#1a56ff] bg-[#f0f4ff]' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${form.selectedPlan === p.name ? 'border-[#1a56ff]' : 'border-slate-300'}`}>
                          {form.selectedPlan === p.name && <div className="w-2 h-2 rounded-full bg-[#1a56ff]" />}
                        </div>
                        <span className="text-sm font-medium text-slate-800">{p.name}</span>
                        {p.highlighted && <span className="text-[10px] bg-[#1a56ff] text-white px-1.5 py-0.5 rounded-full font-semibold">Populaire</span>}
                      </div>
                      <span className="font-display text-slate-700">{p.price} <span className="text-xs text-slate-400">MAD</span></span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Notes ou demandes spéciales</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  placeholder="Ex: couleur personnalisée, intégrer mon GitHub, ajouter une section langues..."
                  value={form.notes}
                  onChange={(e) => update('notes', e.target.value)}
                />
              </div>

              {/* Summary */}
              <div className="bg-[#f7f8fc] border border-slate-100 rounded-2xl p-5">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">Récapitulatif</div>
                {[
                  { l: 'Modèle', v: form.selectedModel ? MODELS.find((m) => m.id === form.selectedModel)?.name : '—' },
                  { l: 'Plan', v: form.selectedPlan || '—' },
                  { l: 'Prix', v: `${PLANS.find((p) => p.name === form.selectedPlan)?.price ?? '—'} MAD` },
                  { l: 'Livraison', v: form.selectedPlan === 'Elite' ? '48h' : form.selectedPlan === 'Pro' ? '3 jours' : '5 jours' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center text-sm py-1.5 border-b border-slate-200 last:border-0">
                    <span className="text-slate-400">{row.l}</span>
                    <span className={`font-medium ${i === 2 ? 'text-[#1a56ff]' : 'text-slate-800'}`}>{row.v}</span>
                  </div>
                ))}
              </div>

              {/* Payment note */}
              <div className="bg-[#f0f4ff] border border-[#dce7ff] rounded-xl p-4 flex gap-3">
                <Icon name="lock" size={16} className="flex-shrink-0 mt-0.5 text-[#1a56ff]" />
                <div>
                  <p className="text-slate-800 text-xs font-semibold mb-0.5">Paiement 100% sécurisé par Payzone</p>
                  <p className="text-slate-500 text-xs leading-relaxed">En cliquant sur "Payer maintenant", vous serez redirigé vers la page de paiement sécurisée Payzone pour régler par carte Visa ou Mastercard.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-7 py-4 border-t border-slate-100 bg-white flex items-center justify-between pb-safe">
          {step > 1
            ? <button onClick={() => setStep(step - 1)} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors py-2">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 2L3 6.5 8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Retour
              </button>
            : <div />
          }
          {step < 3
            ? <button onClick={() => setStep(step + 1)} disabled={step === 1 ? !valid1 : !valid2}
                className="flex items-center gap-2 bg-[#1a56ff] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#0e3acc] text-white text-sm font-bold px-6 py-3 rounded-full transition-all active:scale-95"
              >
                Continuer
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5h7M5.5 2l3.5 3.5L5.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            : <button onClick={handlePay} disabled={redirecting}
                className="flex items-center gap-2 bg-[#1a56ff] hover:bg-[#0e3acc] disabled:opacity-60 text-white text-sm font-bold px-6 py-3 rounded-full transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                {redirecting
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Icon name="lock" size={14} />}
                {redirecting ? 'Redirection…' : `Payer ${selectedPlanData?.price ?? ''} MAD`}
              </button>
          }
        </div>
      </div>
    </div>
  )
}

// ─── Floating WhatsApp button ─────────────────────────────────────────────────
// Global quick-contact bubble (desktop + mobile), replaces the old full-width
// mobile "Commander" bar which added little value of its own.
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/212625185245"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      title="Contacter sur WhatsApp"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-105 active:scale-95 transition-transform"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
    </a>
  )
}

// ─── Payment result banner ─────────────────────────────────────────────────────
// After a Payzone checkout, the customer is redirected back with
// ?payment=success|failure|cancel. This reads that once on load, shows a
// clear confirmation/error banner, and cleans the URL so refreshing doesn't
// re-trigger it.
function PaymentResultBanner() {
  const [result, setResult] = useState<'success' | 'failure' | 'cancel' | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const payment = params.get('payment')
    if (payment === 'success' || payment === 'failure' || payment === 'cancel') {
      setResult(payment)
      params.delete('payment')
      params.delete('orderId')
      const rest = params.toString()
      window.history.replaceState({}, '', window.location.pathname + (rest ? `?${rest}` : ''))
    }
  }, [])

  if (!result) return null

  const content = {
    success: { color: '#1a56ff', bg: '#f0f4ff', border: '#dce7ff', icon: 'check' as const, title: 'Paiement réussi !', text: 'Votre commande est confirmée. Vous recevrez votre CV website sous peu — nous vous contactons par email et WhatsApp pour la suite.' },
    failure: { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', icon: 'lock' as const, title: 'Paiement refusé', text: "La transaction n'a pas abouti. Aucun montant n'a été débité — vous pouvez réessayer ou choisir de commander via WhatsApp." },
    cancel: { color: '#94a3b8', bg: '#f8fafc', border: '#e2e8f0', icon: 'lock' as const, title: 'Paiement annulé', text: 'Vous avez annulé le paiement. Votre commande n\'a pas été enregistrée — revenez quand vous voulez.' },
  }[result]

  return (
    <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-[150] w-[calc(100%-2rem)] max-w-md">
      <div className="rounded-2xl border shadow-lg p-4 flex gap-3 modal-enter" style={{ backgroundColor: content.bg, borderColor: content.border }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: content.color + '18', color: content.color }}>
          <Icon name={content.icon} size={16} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold" style={{ color: content.color }}>{content.title}</div>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{content.text}</p>
        </div>
        <button onClick={() => setResult(null)} className="text-slate-400 hover:text-slate-600 flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [orderOpen, setOrderOpen] = useState(false)
  const [selModel, setSelModel] = useState<number | null>(null)
  const [selPlan, setSelPlan] = useState('Pro')

  const openOrder = (model?: number, plan?: string) => {
    if (model) setSelModel(model)
    if (plan) setSelPlan(plan)
    setOrderOpen(true)
  }

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentModel = typeof page === 'object' && page.type === 'model'
    ? MODELS.find((m) => m.id === page.id) ?? null
    : null

  return (
    <div className="min-h-screen bg-white">
      <PaymentResultBanner />
      <Navbar page={page} onNavigate={navigate} onOrder={() => openOrder()} />

      {page === 'home' && (
        <>
          <Hero onOrder={() => openOrder()} onNavigate={navigate} />
          <ModelsSection onSelect={openOrder} onNavigate={navigate} />
          <ProcessSection />
          <PricingSection onSelect={(plan) => openOrder(undefined, plan)} />
          <TestimonialsSection />
          <Footer onOrder={() => openOrder()} onNavigate={navigate} />
        </>
      )}

      {currentModel && (
        <ModelDetailPage model={currentModel} onBack={() => navigate('home')} onOrder={(id) => openOrder(id)} />
      )}

      <FloatingWhatsApp />

      <OrderModal
        open={orderOpen}
        initialModel={selModel}
        initialPlan={selPlan}
        onClose={() => setOrderOpen(false)}
      />
    </div>
  )
}