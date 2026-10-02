import { useState } from "react";
import { ViewType, Room, RoomSlug } from "./types";
import Header from "./components/Header";
import FloatingActionBar from "./components/FloatingActionBar";
import RoomCard from "./components/RoomCard";
import BookingForm from "./components/BookingForm";
import AIChatBot from "./components/AIChatBot";
import KribiGuide from "./components/KribiGuide";
import BIDashboard from "./components/BIDashboard";
import ReviewsList from "./components/ReviewsList";
import MimosaRestaurant from "./components/MimosaRestaurant";
import HomePage from "./components/HomePage";
import GalleryPage from "./components/GalleryPage";
import ServicesPage from "./components/ServicesPage";
import HebergementsPage from "./components/HebergementsPage";
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle, 
  Star, 
  CheckCircle, 
  Award, 
  ArrowRight, 
  Compass, 
  Wifi, 
  Tv, 
  Utensils, 
  X, 
  Maximize2,
  Bed,
  Waves,
  Play,
  Users,
  ChevronRight
} from "lucide-react";

// Curated 32-unit room list (Official Phase 1 Source Inventory)
const ROOMS_DATA: Room[] = [
  {
    id: "R-CONF",
    name: "Chambre Confort",
    slug: "confort",
    description: "La solution idéale pour les séjours agréables et économiques à Kribi. Équipée d'un lit douillet, d'une climatisation performante et du Wi-Fi Starlink haut débit pour vous détendre en toute simplicité.",
    price: 55000,
    capacity: "1-2 Personnes",
    bedType: "1 Lit Double",
    size: "22 m²",
    image: "https://lh3.googleusercontent.com/d/1XbRs6BXG_IQXzIx065G1Kpvs0TIUCH1K",
    gallery: [
      { type: "image", url: "https://lh3.googleusercontent.com/d/1XbRs6BXG_IQXzIx065G1Kpvs0TIUCH1K", title: "Chambre Confort — Vue d'ensemble" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749415/WhatsApp_Image_2026-08-01_at_09.28.49_1_dezrx7.jpg", title: "Chambre Confort — Vue Principale" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749410/WhatsApp_Image_2026-08-01_at_09.28.42_z6wrni.jpg", title: "Chambre Confort — Aménagement & Literie" }
    ],
    features: ["Wi-Fi Starlink Gratuit", "Climatisation", "TV Câblée", "Douche Privative", "Bureau de Travail"],
    unitsCount: 4
  },
  {
    id: "R-PRES",
    name: "Chambre Prestige",
    slug: "prestige",
    description: "Spacieuse, élégante et parfaitement agencée. Elle offre un confort d'exception aux couples et aux professionnels exigeants avec sa literie King Size de haute qualité et son bureau d'affaires.",
    price: 65000,
    capacity: "2 Personnes",
    bedType: "1 Lit King Size",
    size: "28 m²",
    image: "https://lh3.googleusercontent.com/d/1QT8Mj03x0_4mlK_W6u1si6uzrDrfxA7_",
    gallery: [
      { type: "image", url: "https://lh3.googleusercontent.com/d/1QT8Mj03x0_4mlK_W6u1si6uzrDrfxA7_", title: "Chambre Prestige — Vue d'ensemble" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749861/WhatsApp_Image_2026-08-01_at_09.28.56_1_ld1oqm.jpg", title: "Chambre Prestige — Intérieur Raffiné" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749398/WhatsApp_Image_2026-08-01_at_09.28.12_1_rkr92n.jpg", title: "Chambre Prestige — Décor Soigné" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749391/WhatsApp_Image_2026-08-01_at_09.04.17_wtcskq.jpg", title: "Chambre Prestige — Espace Détente" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749403/WhatsApp_Image_2026-08-01_at_09.28.25_1_gvtljo.jpg", title: "Chambre Prestige — Luminosité" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749861/WhatsApp_Image_2026-08-01_at_09.28.57_1_nscymg.jpg", title: "Chambre Prestige — Literie King Size" }
    ],
    features: ["Climatisation Individuelle", "Wi-Fi Starlink", "Très Grand Lit", "Espace Bureau", "TV Câblée", "Articles de Toilette"],
    unitsCount: 11
  },
  {
    id: "R-PREM",
    name: "Chambre Premium",
    slug: "premium",
    description: "Le grand standing au cœur de l'Hôtel EDIVINCE. Profitez d'un espace généreux haut de gamme faisant face à la superbe Marina de Kribi pour un séjour prestigieux inoubliable.",
    price: 75000,
    capacity: "2 Personnes",
    bedType: "1 Lit King Size XL",
    size: "32 m²",
    image: "https://lh3.googleusercontent.com/d/1VeDj6eRiBugVON7p0Vmazo4gEpleNlHU",
    gallery: [
      { type: "image", url: "https://lh3.googleusercontent.com/d/1VeDj6eRiBugVON7p0Vmazo4gEpleNlHU", title: "Chambre Premium — Vue d'ensemble" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749405/WhatsApp_Image_2026-08-01_at_09.28.31_1_mjuts9.jpg", title: "Chambre Premium — Grand Standing" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749401/WhatsApp_Image_2026-08-01_at_09.28.20_xn7qgd.jpg", title: "Chambre Premium — Mobilier Moderne" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749404/WhatsApp_Image_2026-08-01_at_09.28.30_1_fp7sy6.jpg", title: "Chambre Premium — Espace Nuit" }
    ],
    features: ["Vue Privative Marina", "Climatisation", "Wi-Fi Starlink", "Espace Salon", "TV Écran Plat", "Douche Italienne Spacieuse"],
    unitsCount: 12
  },
  {
    id: "R-TWIN",
    name: "Chambre Twin",
    slug: "twin",
    description: "Parfaite pour les séjours de collaborateurs ou d'amis. Elle dispose de deux lits individuels ultra confortables et de tous les équipements nécessaires pour travailler et se relaxer.",
    price: 90000,
    capacity: "2 Personnes",
    bedType: "2 Lits Séparés",
    size: "30 m²",
    image: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785317226/WhatsApp_Image_2026-07-29_at_08.27.55_ius8lh.jpg",
    gallery: [
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785317226/WhatsApp_Image_2026-07-29_at_08.27.55_ius8lh.jpg", title: "Chambre Twin — Vue d'ensemble" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749861/WhatsApp_Image_2026-08-01_at_09.28.58_an8f7r.jpg", title: "Chambre Twin — Lits Séparés" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749864/WhatsApp_Image_2026-08-01_at_09.29.03_rvik2d.jpg", title: "Chambre Twin — Espace Duo" }
    ],
    features: ["2 Lits de Haute Qualité", "Climatisation", "Wi-Fi Starlink", "Bureau d'Affaires", "TV Câblée", "Rangement spacieux"],
    unitsCount: 1
  },
  {
    id: "R-JUN",
    name: "Suite Junior",
    slug: "junior",
    description: "Une suite de charme tropical associant un espace nuit d'exception et un agréable coin salon intégré. Idéal pour les escapades en amoureux et séjours de prestige face à la Marina.",
    price: 100000,
    capacity: "2-3 Personnes",
    bedType: "1 Lit King Size + Canapé",
    size: "45 m²",
    image: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316448/WhatsApp_Image_2026-07-29_at_10.12.32_znvbeh.jpg",
    gallery: [
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316448/WhatsApp_Image_2026-07-29_at_10.12.32_znvbeh.jpg", title: "Suite Junior — Vue d'ensemble" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749371/WhatsApp_Image_2026-07-28_at_08.28.02_srrswk.jpg", title: "Suite Junior — Cadre Raffiné & Espace" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749363/Suite_jr_301._uyrh0x.jpg", title: "Suite Junior 301 — Vue Principale" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749346/Douche_suite_jr_302_bqecjs.jpg", title: "Suite Junior 302 — Salle de Bain & Douche" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749362/Suite_jr_301.._y2gjdk.jpg", title: "Suite Junior 301 — Espace Salon" },
      { type: "video", url: "https://res.cloudinary.com/ccmyhjca/video/upload/v1785749969/WhatsApp_Video_2026-08-01_at_09.21.08_fbeyaz.mp4", title: "Vidéo Immersive — Suite Junior" }
    ],
    features: ["Salon Confortable Intégré", "Mini-bar Offert", "Climatisation", "Wi-Fi Starlink", "Machine à Café Expresso", "Service d'Accueil VIP"],
    unitsCount: 2
  },
  {
    id: "R-SPRE",
    name: "Suite Prestige",
    slug: "prestige-suite",
    description: "L'expression du luxe tropical moderne à Kribi. Cette suite majestueuse propose un grand salon entièrement séparé, un mobilier d'artiste raffiné et un service sur-mesure d'exception.",
    price: 135000,
    capacity: "2-4 Personnes",
    bedType: "1 Lit Impérial + Salon",
    size: "65 m²",
    image: "https://lh3.googleusercontent.com/d/1uIau46eXDhG-xA44o_dXqli8KnHJcsPO",
    gallery: [
      { type: "image", url: "https://lh3.googleusercontent.com/d/1uIau46eXDhG-xA44o_dXqli8KnHJcsPO", title: "Suite Prestige — Vue d'ensemble" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749339/Chambre_1_Suite_ho112c.jpg", title: "Suite Prestige — Chambre Principale" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749339/Chambre_2_suite._vsrdsf.jpg", title: "Suite Prestige — Seconde Chambre" },
      { type: "video", url: "https://res.cloudinary.com/ccmyhjca/video/upload/v1785749988/WhatsApp_Video_2026-08-01_at_09.21.43_rciium.mp4", title: "Vidéo Immersive — Suite Prestige" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749345/Douche_chambre_1_Suite._dlseio.jpg", title: "Suite Prestige — Douche de Luxe" }
    ],
    features: ["Grand Salon Indépendant", "Luxe Tropical Moderne", "Mini-bar Premium Offert", "Service en Chambre Privé", "Wi-Fi Starlink Premium"],
    unitsCount: 1
  },
  {
    id: "R-SSEA",
    name: "Suite Vue Mer",
    slug: "ocean-suite",
    description: "Le joyau absolu de l'Hôtel EDIVINCE A.N. Une suite d'exception avec une vue panoramique spectaculaire sur l'océan Atlantique et la Marina de Kribi. Terrasse privée majestueuse.",
    price: 150000,
    capacity: "2-4 Personnes",
    bedType: "1 Lit Royal Impérial",
    size: "75 m²",
    image: "https://lh3.googleusercontent.com/d/1-MddVINL35cye8qiynqoHfoxtJ-C19ED",
    gallery: [
      { type: "image", url: "https://lh3.googleusercontent.com/d/1-MddVINL35cye8qiynqoHfoxtJ-C19ED", title: "Suite Vue Mer — Vue d'ensemble" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749339/All%C3%A9e_Suite_fpz5ha.jpg", title: "Suite Vue Mer — Allée & Entrée" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749351/Salle_a_manger_suite._ggyw8w.jpg", title: "Suite Vue Mer — Salle à Manger Privée" },
      { type: "image", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749361/Salon_suite_oo3ede.jpg", title: "Suite Vue Mer — Salon Luxueux" }
    ],
    features: ["Vue Panoramique Mer & Marina", "Grande Terrasse Privative", "Grand Salon Luxueux", "Service VIP Dédié 24h", "Mini-bar d'exception offert"],
    unitsCount: 1
  }
];

// Hotel Services & Amenities (No images used)
const AMENITIES = [
  { icon: ShieldCheck, title: "Sécurité Garantie 24h/24", desc: "Parking privé, gardiennage physique permanent et surveillance vidéo pour votre sérénité." },
  { icon: Wifi, title: "Starlink Haut Débit", desc: "Wi-Fi par satellite ultra rapide et illimité dans tout l'établissement." },
  { icon: Utensils, title: "Table d'Exception", desc: "Notre restaurant gastronomique Le Mimosa vous sert poissons fins et grillades locales." },
  { icon: Clock, title: "Réception H24 & 7j/7", desc: "Un accueil chaleureux et professionnel à toute heure pour faciliter vos arrivées." },
  { icon: Compass, title: "Excursions Guidées", desc: "Organisation personnalisée de visites aux Chutes de la Lobé et plages sauvages." },
  { icon: Award, title: "Meilleur Tarif Direct", desc: "Réservation directe sans frais intermédiaires via MTN Mobile Money ou Orange Money." }
];

// User specified spaces with direct rendering URLs
const POOL_IMAGES = [
  "https://res.cloudinary.com/ccmyhjca/image/upload/v1787903827/Cafe_a_la_piscine_ccnrxj.jpg", // Café & Détente au bord de la piscine
  "https://lh3.googleusercontent.com/d/1XA_qKeBj33Cj-nUIl7h_tHh4_QH4F-0h", // Main Pool image
  "https://lh3.googleusercontent.com/d/1kLi1GybZgbuyJIH-2gaOvG38Og7IdeGo", // Pool Option 2
  "https://lh3.googleusercontent.com/d/1cY9e7IEkLLitANQ58m_9SpeLFWDQbwS1"  // Pool Option 3
];

const RECEPTION_IMAGES = [
  "https://lh3.googleusercontent.com/d/17xkF1kLEUhLMH4OqcHs0ixa0UbSh-9ph",
  "https://lh3.googleusercontent.com/d/1cYDLIS6HWGDqvOaYceDrXpDHVK68heP8",
  "https://lh3.googleusercontent.com/d/16N4I4ns6ngdICIBOzIX1qHNFky-JHm8v"
];

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<RoomSlug | "">("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<{ url: string; caption: string } | null>(null);
  const [poolSlideIndex, setPoolSlideIndex] = useState(0);
  const [receptionSlideIndex, setReceptionSlideIndex] = useState(0);

  // Scroll handler to booking section
  const handleScrollToBooking = (roomSlug: RoomSlug | "" = "") => {
    setSelectedRoomSlug(roomSlug);
    setCurrentView("home");
    setTimeout(() => {
      const element = document.getElementById("booking-anchor-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleOpenChat = () => setIsChatOpen(true);
  const handleCloseChat = () => setIsChatOpen(false);

  // 15 Kribi SEO FAQ Questions updated for EDIVINCE identity
  const faqData = [
    {
      q: "Où loger à Kribi face à la plage ?",
      a: "L'Hôtel EDIVINCE A.N est l'emplacement numéro un à Kribi. Idéalement situé en face de la Marina, il vous permet d'accéder aux plus belles plages de sable fin de Kribi en seulement 2 minutes de marche."
    },
    {
      q: "Quels sont les tarifs des chambres à l'Hôtel EDIVINCE A.N ?",
      a: "Nos tarifs commencent à 55 000 FCFA/nuit pour la Chambre Confort, 65 000 FCFA pour la Chambre Prestige, et vont jusqu'à 150 000 FCFA pour notre majestueuse Suite Vue Mer avec vue panoramique sur l'océan Atlantique."
    },
    {
      q: "Comment réserver une chambre à l'Hôtel EDIVINCE A.N ?",
      a: "La réservation est extrêmement simple et sécurisée : remplissez le formulaire de disponibilité en ligne en direct, puis cliquez pour envoyer un message de confirmation rapide sur nos lignes WhatsApp officielles Orange (+237 696 82 66 09) ou MTN (+237 670 49 71 40)."
    },
    {
      q: "Le Wi-Fi est-il de bonne qualité à l'hôtel ?",
      a: "Oui ! L'hôtel est équipé d'une connexion internet par satellite Starlink haut débit ultra rapide et stable, idéale pour les visioconférences des voyageurs d'affaires ou le streaming de vos enfants."
    },
    {
      q: "Où se trouve le restaurant Le Mimosa ?",
      a: "Le Mimosa est le restaurant d'exception de l'Hôtel EDIVINCE A.N. Ouvert tous les jours de 12h à 23h, il propose d'incroyables grillades de poisson frais braisé, notre célèbre Ndolé aux fruits de mer et des crevettes géantes de Kribi légendaires."
    },
    {
      q: "L'hôtel possède-t-il une piscine ?",
      a: "Absolument. Nous mettons à la disposition de nos clients résidents une magnifique piscine de relaxation ombragée par des palmiers et des transats confortables pour siroter un cocktail tropical en toute intimité."
    },
    {
      q: "Quelles activités faire à Kribi près de l'hôtel ?",
      a: "Vous pouvez visiter les célèbres Chutes de la Lobé à seulement 12 minutes en voiture (7.2 km), vous détendre sur la plage de Grand Batanga, acheter du poisson frais au débarcadère de Kribi, ou profiter d'une balade guidée en pirogue."
    },
    {
      q: "Comment contacter la réception d'EDIVINCE Kribi ?",
      a: "Notre service d'accueil téléphonique et physique est ouvert 24h/24 et 7j/7 aux numéros Orange +237 696 82 66 09 et MTN +237 670 49 71 40."
    },
    {
      q: "L'hôtel est-il sûr et sécurisé ?",
      a: "La sécurité est notre priorité absolue. L'Hôtel EDIVINCE A.N dispose d'un parking privé fermé, d'un gardiennage permanent assuré 24h/24 et de caméras de sécurité."
    },
    {
      q: "Le restaurant sert-il le petit-déjeuner ?",
      a: "Oui, un délicieux petit-déjeuner tropical et continental copieux est servi tous les matins au restaurant Le Mimosa pour bien débuter votre journée de plage ou de travail."
    },
    {
      q: "Peut-on réserver pour un voyage d'affaires ou un séminaire ?",
      a: "Absolument. Nos chambres Prestige et Twin disposent d'un coin bureau ergonomique et notre connexion Starlink gratuite permet de travailler dans d'excellentes conditions."
    },
    {
      q: "Les chambres disposent-elles toutes de la climatisation ?",
      a: "Oui, l'ensemble de nos 32 unités d'hébergement sont équipées de climatiseurs performants, silencieux et haut de gamme réglables individuellement."
    },
    {
      q: "Quels sont les horaires de check-in et check-out ?",
      a: "Les arrivées (check-in) se font généralement à partir de 13h00, et les départs (check-out) avant 12h00. Notre réception reste ouverte 24h/24 pour s'adapter à votre emploi du temps."
    },
    {
      q: "Les animaux de compagnie sont-ils acceptés ?",
      a: "Veuillez contacter notre réception à l'avance pour toute demande concernant les animaux domestiques afin de vous assurer de nos disponibilités d'accueil."
    },
    {
      q: "Faut-il payer à l'avance pour réserver ?",
      a: "Non. Sur notre site officiel, vous effectuez une demande de réservation directe sans aucun paiement en ligne obligatoire. Vous réglez simplement sur place en espèces ou par Mobile Money lors de votre séjour."
    }
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div class="min-h-screen bg-[#F4EBE1] text-ocean flex flex-col justify-between font-sans relative pb-16 md:pb-0">
      
      {/* Structural JSON-LD Schemas for local business & hotel SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hotel",
          "name": "Hôtel EDIVINCE A.N Kribi",
          "description": "Site officiel de l'Hôtel EDIVINCE A.N à Kribi, Cameroun. 32 chambres et suites face à la Marina de Kribi.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "BP 404, Face Marina, Kribi",
            "addressLocality": "Kribi",
            "addressCountry": "CM"
          },
          "telephone": "+237696826609",
          "priceRange": "55000FCFA - 150000FCFA"
        })}
      </script>

      {/* HEADER COMPONENT (SHOWN AT TOP FOR ALL NON-HOME VIEWS; HOME VIEW PLACES IT IMMEDIATELY AFTER THE HERO BANNER) */}
      {currentView !== "home" && (
        <Header 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          onOpenChat={handleOpenChat} 
        />
      )}

      {/* MAIN VIEWPORT */}
      <main class="flex-grow">
        
        {/* VIEW: HOME / ACCUEIL */}
        {currentView === "home" && (
          <HomePage
            rooms={ROOMS_DATA}
            poolImages={POOL_IMAGES}
            receptionImages={RECEPTION_IMAGES}
            onViewChange={setCurrentView}
            onBookRoom={handleScrollToBooking}
            onOpenChat={handleOpenChat}
            onOpenLightbox={(url, caption) => setLightboxImg({ url, caption })}
          />
        )}

        {/* VIEW: HÉBERGEMENTS */}
        {(currentView === "hebergements" || currentView === "chambres") && (
          <HebergementsPage
            rooms={ROOMS_DATA}
            onBookRoom={handleScrollToBooking}
            onOpenLightbox={(url, caption) => setLightboxImg({ url, caption })}
          />
        )}

        {/* VIEW: GALERIE */}
        {(currentView === "galerie" || currentView === "gallery") && (
          <GalleryPage />
        )}

        {/* VIEW: GUIDE KRIBI */}
        {currentView === "guide" && (
          <KribiGuide />
        )}

        {/* VIEW: SERVICES */}
        {currentView === "services" && (
          <ServicesPage />
        )}

        {/* VIEW: RESTAURANT LE MIMOSA */}
        {(currentView === "restaurant" || currentView === "mimosa") && (
          <MimosaRestaurant />
        )}

        {/* VIEW: REVIEWS */}
        {currentView === "reviews" && (
          <ReviewsList />
        )}

        {/* VIEW: ADMIN / BI & PMS REPORT DASHBOARD */}
        {(currentView === "admin" || currentView === "dashboard") && (
          <BIDashboard />
        )}

      </main>

      {/* FOOTER SECTION */}
      <footer id="app-footer" class="bg-[#0A2342] text-sand border-t border-gold/30 pt-16 pb-12 font-sans text-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo Brand Footer */}
          <div class="space-y-4">
            <h4 class="font-serif text-2xl font-bold text-white flex items-center gap-1">
              EDIVINCE <span class="text-gold text-xs font-sans tracking-widest uppercase">A.N</span>
            </h4>
            <p class="text-[11px] text-sand/60 leading-relaxed">
              Votre escale confort et luxe tropical face à la Marina de Kribi. Profitez de notre hospitalité chaleureuse, de notre restaurant d'exception et de nos services haut de gamme.
            </p>
            <div class="flex items-center gap-1 text-gold">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} class="h-3 w-3 fill-current" />
              ))}
              <span class="text-[10px] text-sand/80 ml-1 font-semibold">Note Google: 4.9 / 5</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h5 class="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-1.5">Navigation</h5>
            <ul class="space-y-2.5 font-medium">
              <li><button onClick={() => setCurrentView("home")} class="hover:text-gold transition-colors cursor-pointer">Accueil</button></li>
              <li><button onClick={() => setCurrentView("hebergements")} class="hover:text-gold transition-colors cursor-pointer">Hébergements</button></li>
              <li><button onClick={() => setCurrentView("galerie")} class="hover:text-gold transition-colors cursor-pointer">Galerie</button></li>
              <li><button onClick={() => setCurrentView("guide")} class="hover:text-gold transition-colors cursor-pointer">Guide kribi</button></li>
              <li><button onClick={() => setCurrentView("services")} class="hover:text-gold transition-colors cursor-pointer">Services</button></li>
              <li><button onClick={() => setCurrentView("restaurant")} class="hover:text-gold transition-colors cursor-pointer">Restaurant</button></li>
              <li><button onClick={() => setCurrentView("admin")} class="hover:text-gold transition-colors cursor-pointer flex items-center gap-1">🔒 <span>Admin.</span></button></li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h5 class="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-1.5">Contacts Officiels</h5>
            <ul class="space-y-3 font-medium">
              <li class="flex items-start gap-2">
                <MapPin class="h-4 w-4 text-gold flex-shrink-0" />
                <span>BP 404, Face Marina, Kribi, Cameroun</span>
              </li>
              <li class="flex items-center gap-2">
                <Phone class="h-4 w-4 text-gold flex-shrink-0" />
                <a href="tel:+237696826609" class="hover:text-gold transition-colors">+237 696 82 66 09 (Appels & SMS Orange)</a>
              </li>
              <li class="flex items-center gap-2">
                <Phone class="h-4 w-4 text-gold flex-shrink-0" />
                <a href="https://wa.me/237670497140" target="_blank" rel="noopener noreferrer" class="hover:text-gold transition-colors">+237 670 49 71 40 (WhatsApp & Appels MTN)</a>
              </li>
              <li class="flex items-center gap-2">
                <Mail class="h-4 w-4 text-gold flex-shrink-0" />
                <a href="mailto:Hoteledivince@gmail.com" class="hover:text-gold transition-colors font-sans">Hoteledivince@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Map info */}
          <div>
            <h5 class="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-1.5">Disponibilité</h5>
            <p class="text-[11px] text-sand/70 mb-4">
              Notre équipe d'accueil vous reçoit en permanence 24h sur 24 et 7 jours sur 7.
            </p>
            <div class="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between">
              <div>
                <div class="font-bold text-white">Réservation directes</div>
                <div class="text-[10px] text-gold">Meilleur tarif garanti</div>
              </div>
              <button
                onClick={() => handleScrollToBooking("")}
                class="bg-gold text-ocean hover:bg-gold-600 px-3 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer"
              >
                Y aller
              </button>
            </div>
          </div>

        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-sand/40 gap-4">
          <p>© 2026 Hôtel EDIVINCE A.N Kribi. Tous droits réservés.</p>
          <div class="flex gap-4">
            <a href="tel:+237696826609" class="hover:text-gold transition-colors">Appels Orange</a>
            <a href="https://wa.me/237670497140" target="_blank" rel="noopener noreferrer" class="hover:text-gold transition-colors">WhatsApp MTN</a>
            <button onClick={() => setCurrentView("dashboard")} class="hover:text-gold transition-colors cursor-pointer">🔒 Console PMS</button>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BOTTOM BAR FOR MOBILE */}
      <FloatingActionBar 
        onOpenBooking={() => handleScrollToBooking("")} 
        onOpenChat={handleOpenChat} 
      />

      {/* AI CHAT CONCIERGE PANEL DRAWER */}
      <AIChatBot 
        isOpen={isChatOpen} 
        onClose={handleCloseChat} 
      />

      {/* PHOTO & VIDEO LIGHTBOX MODAL */}
      {lightboxImg && (
        <div class="fixed inset-0 z-50 bg-black/95 flex flex-col justify-center items-center p-4 animate-in fade-in duration-300">
          <button
            onClick={() => setLightboxImg(null)}
            class="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all focus:outline-none cursor-pointer z-50 border border-white/10"
          >
            <X class="h-6 w-6" />
          </button>
          <div class="max-w-5xl w-full flex flex-col items-center">
            {lightboxImg.url.endsWith(".mp4") || lightboxImg.url.includes("/video/upload/") ? (
              <video
                src={lightboxImg.url}
                controls
                autoPlay
                playsInline
                class="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/5"
              />
            ) : (
              <img
                src={lightboxImg.url}
                alt={lightboxImg.caption}
                referrerPolicy="no-referrer"
                class="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/5"
              />
            )}
            <p class="text-sand text-xs sm:text-sm font-serif font-semibold mt-4 bg-ocean/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-gold/30 shadow-lg text-center">
              {lightboxImg.caption}
            </p>
          </div>
        </div>
      )}



    </div>
  );
}
