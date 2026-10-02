import { useState, useEffect } from "react";
import { ViewType, Room, RoomSlug } from "../types";
import RoomCard from "./RoomCard";
import BookingForm from "./BookingForm";
import Header from "./Header";
import { 
  Star, 
  Wifi, 
  Waves, 
  Utensils, 
  Users, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  ChevronLeft,
  ChevronRight, 
  Play, 
  Pause,
  ArrowRight, 
  MapPin, 
  Compass, 
  Phone, 
  MessageSquare,
  QrCode,
  Calendar,
  Sparkles,
  Coffee,
  Wine,
  Car,
  CreditCard,
  Headphones,
  Award
} from "lucide-react";

interface HomePageProps {
  rooms: Room[];
  poolImages: string[];
  receptionImages: string[];
  onViewChange: (view: ViewType) => void;
  onBookRoom: (slug: RoomSlug | "") => void;
  onOpenChat: () => void;
  onOpenLightbox: (url: string, caption: string) => void;
}

export default function HomePage({
  rooms,
  poolImages,
  receptionImages,
  onViewChange,
  onBookRoom,
  onOpenChat,
  onOpenLightbox
}: HomePageProps) {
  const [galleryFilter, setGalleryFilter] = useState<string>("all");
  const [poolIndex, setPoolIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Auto-play Pool Carousel (Réservée Exclusivité Clients / Détente et Rafraîchissement)
  useEffect(() => {
    if (!poolImages || poolImages.length <= 1) return;
    const interval = setInterval(() => {
      setPoolIndex((prev) => (prev + 1) % poolImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [poolImages]);

  // Hero Background Carousel Media List (Images only, ordered as requested)
  const heroMediaList = [
    {
      type: "image",
      url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749361/Salon_Suite._bcvvrd.jpg",
      title: "Salon de Suite Luxueuse"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749363/Suite_jr_301._uyrh0x.jpg",
      title: "Suite Junior — Cadre Raffiné & Décoration Soignée"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749371/WhatsApp_Image_2026-07-28_at_08.28.02_srrswk.jpg",
      title: "Suite Junior — Espace & Élégance"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749406/WhatsApp_Image_2026-08-01_at_09.28.34_1_o3u4rj.jpg",
      title: "Chambre Premium — Espace & Sérénité"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316448/WhatsApp_Image_2026-07-29_at_10.12.33_vh4kxz.jpg",
      title: "Salle de Fête et de Conférence"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1784189325/chutes_de_la_lobe_hd_enhanced_byeydq.jpg",
      title: "Destination Kribi — Chutes de la Lobé"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787903827/Cafe_a_la_piscine_ccnrxj.jpg",
      title: "Café & Détente au Bord de la Piscine — Hôtel EDIVINCE A.N"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787900037/WhatsApp_Image_2026-08-28_at_07.59.40_dhlsiu.jpg",
      title: "Bâtiment Prestige Hôtel EDIVINCE A.N — Vue de Journée"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787902229/vu_de_profil_e6thh4.jpg",
      title: "Entrée Principale du Bâtiment & Vue de Profil"
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787900037/WhatsApp_Image_2026-08-28_at_07.59.39_dapw42.jpg",
      title: "Le Phare Historique de Kribi — À Deux Pas de l'Hôtel"
    }
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const [heroAutoPlay, setHeroAutoPlay] = useState(true);

  useEffect(() => {
    if (!heroAutoPlay) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroMediaList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroAutoPlay, heroMediaList.length]);

  const handlePrevHero = () => {
    setHeroIndex((prev) => (prev - 1 + heroMediaList.length) % heroMediaList.length);
  };

  const handleNextHero = () => {
    setHeroIndex((prev) => (prev + 1) % heroMediaList.length);
  };

  // Mimosa Restaurant Carousel Images
  const mimosaImages = [
    { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1788238658/WhatsApp_Image_2026-08-31_at_18.02.03_3_jgqp5b.jpg", caption: "Cocktail de Fruits Frais Pressés — Restaurant Le Mimosa" },
    { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899955/WhatsApp_Image_2026-08-22_at_12.56.09_luuie2.jpg", caption: "Nos Plats d'Exception — Service en Chambre VIP" },
    { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_12.56.00_1_ij6l16.jpg", caption: "Nos Plats d'Exception — Gastronomie Raffinée du Mimosa" },
    { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_12.58.33_m7hqgr.jpg", caption: "Nos Plats d'Exception — Poissons Frais & Saveurs du Terroir" },
    { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899955/WhatsApp_Image_2026-08-22_at_12.55.59_draegp.jpg", caption: "Champagne & Vins Mousseux en Mer — Moments d'Évasion" },
    { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749396/WhatsApp_Image_2026-08-01_at_09.21.54_1_lyewzl.jpg", caption: "Buffet & Petit-Déjeuner Le Mimosa" },
    { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316868/WhatsApp_Image_2026-07-29_at_10.20.17_uebnkn.jpg", caption: "La Terrasse Extérieure & Dégustation — Vue Marina" },
    { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316868/WhatsApp_Image_2026-07-29_at_10.20.16_ybstwj.jpg", caption: "Ambiance Terrasse & Rafraîchissements de Kribi" },
    { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749392/WhatsApp_Image_2026-08-01_at_09.04.19_tb18vo.jpg", caption: "Petit-Déjeuner VIP Servi en Chambre" }
  ];
  const [mimosaIndex, setMimosaIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMimosaIndex((prev) => (prev + 1) % mimosaImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mimosaImages.length]);

  // Conference Room Carousel Images
  const conferenceImages = [
    { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316448/WhatsApp_Image_2026-07-29_at_10.12.33_vh4kxz.jpg", caption: "Salle de Fête et de Conférence EDIVINCE A.N — Événements & Banquets" },
    { url: "https://lh3.googleusercontent.com/d/1HdkmjYKGAcegcD7cAwstzyV129xoyOzd", caption: "Salle de Conférence Professionnelle — Capacité +100 pers." }
  ];
  const [conferenceIndex, setConferenceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setConferenceIndex((prev) => (prev + 1) % conferenceImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [conferenceImages.length]);

  // Gallery items for Masonry Lightbox
  const galleryItems = [
    { id: 1, category: "facade", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787902229/Batiment_vue_de_face_oqhc6i.jpg", title: "Bâtiment & Façade Prestige de Nuit — Hôtel EDIVINCE A.N" },
    { id: 32, category: "facade", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787900037/WhatsApp_Image_2026-08-28_at_07.59.40_dhlsiu.jpg", title: "Bâtiment Prestige Hôtel EDIVINCE A.N — Vue de Journée" },
    { id: 33, category: "facade", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787902229/vu_de_profil_e6thh4.jpg", title: "Entrée Principale du Bâtiment & Vue de Profil" },
    { id: 30, category: "services", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787900037/WhatsApp_Image_2026-08-28_at_07.59.39_1_runnqp.jpg", title: "Disponibilité Drone HD — Sauvegardez vos Moments d'Exception" },
    { id: 31, category: "facade", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787900037/WhatsApp_Image_2026-08-28_at_07.59.39_dapw42.jpg", title: "Le Phare Historique de Kribi — Vue Proche Hôtel" },
    { id: 34, category: "restaurant", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899955/WhatsApp_Image_2026-08-22_at_12.56.09_luuie2.jpg", title: "Nos Plats d'Exception — Room Service VIP" },
    { id: 35, category: "restaurant", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_12.56.00_1_ij6l16.jpg", title: "Nos Plats d'Exception — Gastronomie Raffinée" },
    { id: 36, category: "restaurant", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_12.58.33_m7hqgr.jpg", title: "Nos Plats d'Exception — Saveurs Locales & Poissons Fins" },
    { id: 37, category: "restaurant", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899955/WhatsApp_Image_2026-08-22_at_12.55.59_draegp.jpg", title: "Champagne & Vin Mousseux en Mer — Dégustation" },
    { id: 38, category: "clients", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_12.58.29_eys8nx.jpg", title: "Nos Clients Satisfaits — Petit Bozard et son équipe" },
    { id: 39, category: "clients", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_13.03.37_1_vuagpj.jpg", title: "Nos Clients Satisfaits — Vanister ENAMA" },
    { id: 40, category: "clients", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787901430/WhatsApp_Image_2026-08-22_at_12.56.02_1_mvrigj.jpg", title: "Nos Clients Satisfaits — MAALHOX le VIBEUR" },
    { id: 41, category: "clients", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787901430/WhatsApp_Image_2026-08-22_at_12.56.11_1_mdoeyd.jpg", title: "Nos Clients Satisfaits — Victorien ESSONO NZAMEYO" },
    { id: 2, category: "chambres", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749411/WhatsApp_Image_2026-08-01_at_09.28.38_1_mpfniw.jpg", title: "Serviettes, Peignoir & Pantoufles de Luxe EDIVINCE" },
    { id: 3, category: "chambres", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749415/WhatsApp_Image_2026-08-01_at_09.28.49_1_dezrx7.jpg", title: "Chambre Confort Prestige" },
    { id: 4, category: "chambres", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749861/WhatsApp_Image_2026-08-01_at_09.28.56_1_ld1oqm.jpg", title: "Chambre Prestige — Vue d'ensemble" },
    { id: 5, category: "chambres", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749405/WhatsApp_Image_2026-08-01_at_09.28.31_1_mjuts9.jpg", title: "Chambre Premium — Grand Standing" },
    { id: 6, category: "chambres", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749861/WhatsApp_Image_2026-08-01_at_09.28.58_an8f7r.jpg", title: "Chambre Twin — Lits Séparés" },
    { id: 7, category: "chambres", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749363/Suite_jr_301._uyrh0x.jpg", title: "Suite Junior — Salon & Espace Nuit" },
    { id: 8, category: "chambres", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749339/Chambre_1_Suite_ho112c.jpg", title: "Suite Prestige — Grand Confort" },
    { id: 9, category: "chambres", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749361/Salon_suite_oo3ede.jpg", title: "Suite Vue Mer — Grand Salon" },
    { id: 10, category: "piscine", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787903827/Cafe_a_la_piscine_ccnrxj.jpg", title: "Café & Détente au Bord de la Piscine — Hôtel EDIVINCE A.N" },
    { id: 42, category: "piscine", url: "https://lh3.googleusercontent.com/d/1XA_qKeBj33Cj-nUIl7h_tHh4_QH4F-0h", title: "Piscine Privée de Relaxation & Rafraîchissement" },
    { id: 11, category: "piscine", url: "https://lh3.googleusercontent.com/d/1kLi1GybZgbuyJIH-2gaOvG38Og7IdeGo", title: "Piscine de Relaxation — Espace Bain & Soleil" },
    { id: 12, category: "piscine", url: "https://lh3.googleusercontent.com/d/1cY9e7IEkLLitANQ58m_9SpeLFWDQbwS1", title: "Transats & Sérénité au Bord de l'Eau" },
    { id: 13, category: "conference", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316448/WhatsApp_Image_2026-07-29_at_10.12.33_vh4kxz.jpg", title: "Salle de Fête et de Conférence — Événements VIP" },
    { id: 14, category: "restaurant", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316868/WhatsApp_Image_2026-07-29_at_10.20.17_uebnkn.jpg", title: "La Terrasse Extérieure & Dégustation" },
    { id: 15, category: "restaurant", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316868/WhatsApp_Image_2026-07-29_at_10.20.16_ybstwj.jpg", title: "Rafraîchissements & Boissons Fraîches sur la Terrasse" },
    { id: 16, category: "restaurant", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749349/picnic_a_la_plage_w8leod.jpg", title: "Pique-Nique Gourmand à la Plage de Kribi" },
    { id: 17, category: "restaurant", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749342/couple_a_la_plage_nlemz2.jpg", title: "Moment Coucher du Soleil à la Plage" },
    { id: 18, category: "restaurant", type: "video", url: "https://res.cloudinary.com/ccmyhjca/video/upload/v1785749343/champagne_sur_un_yacht_en_mer_yvceyk.mp4", title: "Champagne & Dégustation sur Yacht en Mer" },
    { id: 19, category: "restaurant", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749392/WhatsApp_Image_2026-08-01_at_09.04.19_tb18vo.jpg", title: "Petit-Déjeuner VIP Servi en Chambre" },
    { id: 20, category: "restaurant", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749396/WhatsApp_Image_2026-08-01_at_09.21.54_1_lyewzl.jpg", title: "Petit-Déjeuner Buffet au Restaurant — Sélection Chaud/Froid" },
    { id: 26, category: "chambres", url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749371/WhatsApp_Image_2026-07-28_at_08.28.02_srrswk.jpg", title: "Suite Junior — Élégance & Grand Confort" },
    { id: 27, category: "conference", url: "https://lh3.googleusercontent.com/d/1HdkmjYKGAcegcD7cAwstzyV129xoyOzd", title: "Salle de Conférence Professionnelle" },
    { id: 28, category: "reception", url: "https://lh3.googleusercontent.com/d/17xkF1kLEUhLMH4OqcHs0ixa0UbSh-9ph", title: "Réception d'Honneur VIP 24h" }
  ];

  const filteredGallery = galleryFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryFilter);

  // Customer Reviews Data with Real Happy Guests Photos
  const testimonials = [
    {
      id: 1,
      name: "Petit Bozard et son equipes",
      avatar: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_12.58.29_eys8nx.jpg",
      rating: 5,
      stay: "Suite Junior & Espace VIP",
      comment: "L'accueil est merveilleux, digne d'un palace tropical. Nous avons adoré déguster nos crevettes géantes et plats d'exception près de la piscine de relaxation de l'hôtel !",
      date: "Août 2026"
    },
    {
      id: 2,
      name: "Vanister ENAMA",
      avatar: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_13.03.37_1_vuagpj.jpg",
      rating: 5,
      stay: "Chambre Prestige & Affaires",
      comment: "Un séjour d'affaires parfait. Le Wi-Fi Starlink est d'une rapidité incroyable et la salle de conférence était impeccablement équipée pour notre séminaire.",
      date: "Août 2026"
    },
    {
      id: 3,
      name: "MAALHOX le VIBEUR",
      avatar: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787901430/WhatsApp_Image_2026-08-22_at_12.56.02_1_mvrigj.jpg",
      rating: 5,
      stay: "Suite Vue Mer & Room Service",
      comment: "Vue splendide sur l'océan Atlantique et la Marina de Kribi ! La chambre est immense, le service en chambre avec champagne en mer était inoubliable.",
      date: "Août 2026"
    },
    {
      id: 4,
      name: "Victorien ESSONO NZAMEYO",
      avatar: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787901430/WhatsApp_Image_2026-08-22_at_12.56.11_1_mdoeyd.jpg",
      rating: 5,
      stay: "Suite Prestige & Prestation Drone",
      comment: "Des souvenirs inoubliables gravés grâce aux magnifiques prises de vue par drone et à l'attention exceptionnelle de toute l'équipe de l'Hôtel EDIVINCE !",
      date: "Août 2026"
    }
  ];

  // Hotel Services Grid
  const servicesList = [
    { title: "Réception 24h/24", icon: Clock, desc: "Accueil physique & conciergerie VIP permanent" },
    { title: "Wi-Fi Starlink Ultra Rapide", icon: Wifi, desc: "Internet haut débit par satellite dans tout l'hôtel" },
    { title: "Service en Chambre VIP", icon: Coffee, desc: "Plats d'exception & rafraîchissements livrés en chambre" },
    { title: "Prises de Vue par Drone HD", icon: Sparkles, desc: "Disponibilité de notre drone pour immortaliser vos moments d'exception" },
    { title: "Ménage Quotidien", icon: Sparkles, desc: "Entretien méticuleux & linge frais quotidien" },
    { title: "Parking Sécurisé", icon: Car, desc: "Parking privé gratuit gardé jour & nuit" },
    { title: "Surveillance Vidéo & Gardiennage", icon: ShieldCheck, desc: "Système de sécurité moderne pour votre sérénité" },
    { title: "Réservation en Ligne Directe", icon: Calendar, desc: "Confirmation rapide via MTN & Orange Money" },
    { title: "Paiement Sécurisé", icon: CreditCard, desc: "Cartes bancaires, Mobile Money et espèces acceptés" },
    { title: "Organisation d'Événements", icon: Users, desc: "Mariages, banquets, séminaires et anniversaires" }
  ];

  return (
    <div id="home-view" class="space-y-16 bg-sand/20 font-sans">
      
      {/* ================= 1. SECTION HERO (PLEIN ÉCRAN) ================= */}
      <section 
        id="hero-banner" 
        class="relative min-h-[92vh] sm:min-h-screen px-4 sm:px-8 lg:px-16 flex flex-col justify-between pt-8 sm:pt-12 pb-12 overflow-hidden bg-[#07132A]"
      >
        {/* Custom CSS for smooth luxury zoom & dynamic glowing logo */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes kenburns {
            0% { transform: scale(1) translate(0, 0); }
            50% { transform: scale(1.06) translate(-0.5%, -0.5%); }
            100% { transform: scale(1) translate(0, 0); }
          }
          .kenburns-hero {
            animation: kenburns 25s ease-in-out infinite;
          }
          @keyframes logoGlowFloat {
            0%, 100% { transform: translateY(0px) scale(1); filter: drop-shadow(0 4px 16px rgba(212, 175, 55, 0.5)); }
            50% { transform: translateY(-7px) scale(1.04); filter: drop-shadow(0 8px 25px rgba(212, 175, 55, 0.9)); }
          }
          .dynamic-hero-logo {
            animation: logoGlowFloat 3.8s ease-in-out infinite;
          }
        `}} />

        {/* Animated Carousel Background Media (Images & Video) */}
        <div class="absolute inset-0 z-0 overflow-hidden bg-[#07132A]">
          {heroMediaList.map((item, idx) => (
            <div
              key={item.url + idx}
              class={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === heroIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {item.type === "video" ? (
                <video
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  class="w-full h-full object-cover scale-105"
                />
              ) : (
                <div 
                  class="absolute inset-0 bg-cover bg-center kenburns-hero"
                  style={{
                    backgroundImage: `url('${item.url}')`
                  }}
                />
              )}
            </div>
          ))}

          {/* Clean gradient overlays for high legibility while keeping background crisp */}
          <div class="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent z-15 pointer-events-none" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-15 pointer-events-none" />
        </div>

        {/* Top-left Brand Logo Overlay */}
        <div class="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between pt-2 sm:pt-4">
          <div class="flex items-center gap-3 cursor-pointer group" onClick={() => onViewChange("home")}>
            <img 
              src="https://res.cloudinary.com/ccmyhjca/image/upload/v1785310757/WhatsApp_Image_2026-07-28_at_08.53.29-removebg-preview_tryhep.png" 
              alt="Logo Hôtel EDIVINCE A.N" 
              class="h-16 sm:h-20 md:h-24 w-auto object-contain dynamic-hero-logo transition-transform duration-300 group-hover:scale-110"
            />
            <div class="hidden sm:block">
              <span class="font-serif text-lg font-bold text-white tracking-wider uppercase block group-hover:text-gold transition-colors">HÔTEL EDIVINCE A.N</span>
              <span class="text-xs text-gold font-sans tracking-widest uppercase block">Chic & Prestige • Kribi</span>
            </div>
          </div>

          <a
            href={`https://wa.me/237696826609?text=${encodeURIComponent("Bonjour, je souhaite contacter l'Hôtel EDIVINCE A.N Kribi.")}`}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 bg-black/20 hover:bg-black/40 text-white px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 transition-all duration-300 hover:scale-105 group cursor-pointer"
          >
            <svg class="h-4 w-4 fill-current text-[#25D366] transition-transform group-hover:rotate-12" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Main Hero Content Block */}
        <div class="max-w-7xl mx-auto w-full relative z-20 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 sm:pt-12">
          <div class="lg:col-span-8 text-left space-y-6">
            
            {/* Main Title with elegant serif italic style */}
            <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl text-gold italic font-extrabold tracking-wide leading-tight drop-shadow-lg max-w-3xl">
              « L'art du séjour d'exception »
            </h1>

            {/* CTA Action Buttons */}
            <div class="pt-3 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => onBookRoom("")}
                class="w-full sm:w-auto bg-gold hover:bg-gold/90 text-ocean font-bold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-gold/30 border border-gold hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Réserver maintenant</span>
                <ChevronRight class="h-4 w-4" />
              </button>

              <button
                onClick={() => onViewChange("chambres")}
                class="w-full sm:w-auto bg-black/40 hover:bg-black/70 text-white font-bold px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 border border-gold/40 hover:border-gold cursor-pointer flex items-center justify-center gap-2"
              >
                <Play class="h-3.5 w-3.5 fill-current text-gold" />
                <span>Découvrir nos chambres</span>
              </button>
            </div>

            {/* Carousel Slide Title Badge & Control Navigation */}
            <div class="pt-2 flex flex-wrap items-center gap-3">
              <div class="flex items-center gap-1.5 bg-black/50 border border-white/20 rounded-full px-3 py-1.5 text-white text-xs shadow-lg">
                <button 
                  onClick={handlePrevHero} 
                  class="p-1 hover:text-gold transition-colors cursor-pointer"
                  title="Média précédent"
                >
                  <ChevronLeft class="h-4 w-4" />
                </button>
                <span class="text-[11px] font-medium px-2.5 text-sand border-x border-white/10">
                  {heroIndex + 1} / {heroMediaList.length} • {heroMediaList[heroIndex].title}
                </span>
                <button 
                  onClick={handleNextHero} 
                  class="p-1 hover:text-gold transition-colors cursor-pointer"
                  title="Média suivant"
                >
                  <ChevronRight class="h-4 w-4" />
                </button>
              </div>

              {/* Indicator Dots */}
              <div class="flex items-center gap-1.5 bg-black/40 border border-white/10 px-3 py-2 rounded-full">
                {heroMediaList.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setHeroIndex(dotIdx)}
                    class={`h-2 rounded-full transition-all cursor-pointer ${
                      dotIdx === heroIndex ? "w-6 bg-gold" : "w-2 bg-white/40 hover:bg-white/80"
                    }`}
                    title={`Diapositive ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Highlights Banner */}
        <div class="relative z-20 w-full max-w-7xl mx-auto mt-8">
          <div class="bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 shadow-2xl">
            
            <a 
              href={`https://wa.me/237696826609?text=${encodeURIComponent("Bonjour, je souhaite contacter l'Hôtel EDIVINCE A.N Kribi.")}`}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2.5 group cursor-pointer"
            >
              <div class="p-2 bg-[#25D366]/20 text-[#25D366] rounded-lg border border-[#25D366]/40 flex-shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-all">
                <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <div>
                <h4 class="text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider group-hover:text-[#25D366] transition-colors">WhatsApp Direct</h4>
                <p class="text-[9px] text-sand/60">Contact Instantané</p>
              </div>
            </a>

            <div class="flex items-center gap-2.5">
              <div class="p-2 bg-gold/15 text-gold rounded-lg border border-gold/20 flex-shrink-0">
                <Users class="h-4 w-4" />
              </div>
              <div>
                <h4 class="text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">32 Chambres</h4>
                <p class="text-[9px] text-sand/60">& Suites d'exception</p>
              </div>
            </div>

            <div class="flex items-center gap-2.5">
              <div class="p-2 bg-gold/15 text-gold rounded-lg border border-gold/20 flex-shrink-0">
                <Wifi class="h-4 w-4" />
              </div>
              <div>
                <h4 class="text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">Starlink</h4>
                <p class="text-[9px] text-sand/60">Wi-Fi Ultra Rapide</p>
              </div>
            </div>

            <div class="flex items-center gap-2.5">
              <div class="p-2 bg-gold/15 text-gold rounded-lg border border-gold/20 flex-shrink-0">
                <Waves class="h-4 w-4" />
              </div>
              <div>
                <h4 class="text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">Piscine Privée</h4>
                <p class="text-[9px] text-sand/60">Réservée résidents</p>
              </div>
            </div>

            <div class="flex items-center gap-2.5">
              <div class="p-2 bg-gold/15 text-gold rounded-lg border border-gold/20 flex-shrink-0">
                <Utensils class="h-4 w-4" />
              </div>
              <div>
                <h4 class="text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">Le Mimosa</h4>
                <p class="text-[9px] text-sand/60">Gastronomie locale</p>
              </div>
            </div>

            <div class="flex items-center gap-2.5">
              <div class="p-2 bg-gold/15 text-gold rounded-lg border border-gold/20 flex-shrink-0">
                <ShieldCheck class="h-4 w-4" />
              </div>
              <div>
                <h4 class="text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">Sécurité 24h/24</h4>
                <p class="text-[9px] text-sand/60">Parking gardé</p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* STICKY SELECTION BAR (NAVIGATION MENU AFTER HERO SECTION) */}
      <Header 
        currentView="home" 
        onViewChange={onViewChange} 
        onOpenChat={onOpenChat} 
      />

      {/* QUICK BOOKING BAR (ANCHOR SECTION) */}
      <section id="booking-anchor-section" class="max-w-4xl mx-auto px-4 relative z-20">
        <BookingForm 
          selectedRoomSlug="" 
          onSuccess={() => {
            const el = document.getElementById("booking-anchor-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }} 
        />
      </section>


      {/* ================= 2. SECTION À PROPOS ================= */}
      <section id="about-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="bg-white rounded-3xl p-8 sm:p-12 border border-gold/20 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div class="lg:col-span-6 space-y-6">
            <span class="text-xs text-gold font-bold uppercase tracking-widest block font-sans">
              Hospitalité Africaine & Élégance
            </span>
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-ocean leading-tight">
              Bienvenue à l'Hôtel EDIVINCE A.N
            </h2>
            
            <p class="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
              Situé dans la magnifique ville balnéaire de Kribi, l'Hôtel EDIVINCE A.N offre une expérience unique mêlant confort, élégance et hospitalité.
            </p>

            <p class="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
              Que vous soyez en voyage d'affaires, en vacances ou en séjour romantique, notre établissement met à votre disposition des infrastructures modernes et un service irréprochable.
            </p>

            <div class="grid grid-cols-2 gap-4 pt-2 font-sans text-xs">
              <div class="flex items-center gap-2 text-ocean font-semibold">
                <CheckCircle class="h-4 w-4 text-gold flex-shrink-0" />
                <span>Emplacement Face Marina</span>
              </div>
              <div class="flex items-center gap-2 text-ocean font-semibold">
                <CheckCircle class="h-4 w-4 text-gold flex-shrink-0" />
                <span>Literie Haut De Gamme</span>
              </div>
              <div class="flex items-center gap-2 text-ocean font-semibold">
                <CheckCircle class="h-4 w-4 text-gold flex-shrink-0" />
                <span>Cadre Calme & Sécurisé</span>
              </div>
              <div class="flex items-center gap-2 text-ocean font-semibold">
                <CheckCircle class="h-4 w-4 text-gold flex-shrink-0" />
                <span>Service Personnalisé</span>
              </div>
            </div>

            <div class="pt-4 flex items-center gap-4">
              <button
                onClick={() => onViewChange("chambres")}
                class="bg-ocean hover:bg-ocean/90 text-gold font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <span>Explorer l'Hôtel</span>
                <ArrowRight class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="lg:col-span-6 relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/30">
              <img 
                src="https://res.cloudinary.com/ccmyhjca/image/upload/v1787902229/Premier_batiment_MARINA_ljy294.jpg" 
                alt="Premier Bâtiment Face Marina — Hôtel EDIVINCE A.N Kribi" 
                class="w-full h-[380px] sm:h-[450px] object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                onClick={() => onOpenLightbox("https://res.cloudinary.com/ccmyhjca/image/upload/v1787902229/Premier_batiment_MARINA_ljy294.jpg", "Premier Bâtiment Face Marina — Hôtel EDIVINCE A.N")}
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div class="absolute bottom-6 left-6 right-6 bg-ocean/90 backdrop-blur-md p-4 rounded-xl border border-gold/30 text-white">
                <div class="font-serif font-bold text-base text-gold">Cadre d'exception face à la Marina</div>
                <div class="text-xs text-sand/80 mt-0.5">Kribi, Cameroun — À 2 minutes à pied de la plage & du Phare</div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ================= 3. SECTION CHAMBRES ================= */}
      <section id="rooms-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <span class="text-xs text-gold font-bold uppercase tracking-widest block font-sans">
              Collection Prestige (32 Unités)
            </span>
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-ocean mt-1">
              Nos Chambres & Suites
            </h2>
          </div>
          <button
            onClick={() => onViewChange("chambres")}
            class="text-xs font-bold text-gold uppercase tracking-wider hover:underline flex items-center gap-1.5 cursor-pointer font-sans"
          >
            <span>Voir les 7 catégories de chambres</span>
            <ArrowRight class="h-4 w-4" />
          </button>
        </div>

        {/* Display core room cards */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.slice(0, 3).map((room) => (
            <RoomCard key={room.id} room={room} onBook={onBookRoom} onOpenLightbox={onOpenLightbox} />
          ))}
        </div>
      </section>


      {/* ================= 4. SECTION PISCINE ================= */}
      <section id="pool-section" class="bg-[#0A2342] text-sand py-16 relative overflow-hidden">
        {/* Background ambient water glow */}
        <div class="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent" />

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div class="lg:col-span-5 space-y-6">
              <span class="text-xs text-gold font-bold uppercase tracking-widest block font-sans">
                Réservée Exclusivité Clients
              </span>
              <h2 class="font-serif text-3xl sm:text-4xl font-bold text-white">
                Détente et Rafraîchissement
              </h2>
              <p class="text-sm sm:text-base text-sand/85 leading-relaxed font-sans">
                Profitez de notre magnifique piscine réservée exclusivement aux clients séjournant à l'hôtel.
              </p>

              <div class="space-y-3 font-sans text-xs">
                <div class="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Waves class="h-5 w-5 text-gold flex-shrink-0" />
                  <div>
                    <div class="font-bold text-white">Reflets d'eau & Ambiance Tropicale</div>
                    <div class="text-sand/70 text-[11px]">Bordée de palmiers et transats confortables</div>
                  </div>
                </div>

                <div class="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Sparkles class="h-5 w-5 text-gold flex-shrink-0" />
                  <div>
                    <div class="font-bold text-white">Éclairage Élégant de Nuit</div>
                    <div class="text-sand/70 text-[11px]">Baignades en soirée sous un ciel étoilé</div>
                  </div>
                </div>
              </div>

              <div class="pt-2">
                <button
                  onClick={() => onBookRoom("")}
                  class="bg-gold hover:bg-gold/90 text-ocean font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
                >
                  <span>Réserver votre séjour avec accès piscine</span>
                  <ChevronRight class="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Interactive Pool Image Carousel */}
            <div class="lg:col-span-7">
              <div class="relative rounded-3xl overflow-hidden border-2 border-gold/30 shadow-2xl bg-ocean group">
                <img 
                  src={poolImages[poolIndex]} 
                  alt={`Piscine Hôtel EDIVINCE ${poolIndex + 1}`} 
                  class="w-full h-[380px] sm:h-[450px] object-cover transition-all duration-700 cursor-pointer"
                  onClick={() => onOpenLightbox(poolImages[poolIndex], "Piscine Privée de Relaxation — Hôtel EDIVINCE A.N")}
                />
                
                {/* Controls */}
                <div class="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button
                    onClick={() => setPoolIndex((prev) => (prev === 0 ? poolImages.length - 1 : prev - 1))}
                    class="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20 pointer-events-auto cursor-pointer"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setPoolIndex((prev) => (prev === poolImages.length - 1 ? 0 : prev + 1))}
                    class="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20 pointer-events-auto cursor-pointer"
                  >
                    ›
                  </button>
                </div>

                {/* Index indicators */}
                <div class="absolute bottom-4 left-4 flex gap-2 z-10">
                  {poolImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPoolIndex(i)}
                      class={`h-2.5 rounded-full transition-all ${poolIndex === i ? 'bg-gold w-8' : 'bg-white/50 w-2.5 hover:bg-white'}`}
                    />
                  ))}
                </div>

                <div class="absolute top-4 right-4 bg-gold text-ocean font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-gold/30">
                  Photo {poolIndex + 1} / {poolImages.length}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ================= 5. SECTION RESTAURANT ================= */}
      <section id="restaurant-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="bg-white rounded-3xl p-8 sm:p-12 border border-gold/20 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div class="lg:col-span-6 order-2 lg:order-1 relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/30 bg-ocean group">
              <img 
                src={mimosaImages[mimosaIndex].url} 
                alt={mimosaImages[mimosaIndex].caption} 
                class="w-full h-[380px] sm:h-[450px] object-cover transition-all duration-700 cursor-pointer"
                onClick={() => onOpenLightbox(mimosaImages[mimosaIndex].url, mimosaImages[mimosaIndex].caption)}
              />
              
              {/* Carousel Arrows */}
              <div class="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                <button
                  onClick={() => setMimosaIndex((prev) => (prev === 0 ? mimosaImages.length - 1 : prev - 1))}
                  class="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20 pointer-events-auto cursor-pointer"
                  title="Image précédente"
                >
                  ‹
                </button>
                <button
                  onClick={() => setMimosaIndex((prev) => (prev === mimosaImages.length - 1 ? 0 : prev + 1))}
                  class="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20 pointer-events-auto cursor-pointer"
                  title="Image suivante"
                >
                  ›
                </button>
              </div>

              {/* Dots */}
              <div class="absolute bottom-3 left-4 flex gap-2 z-10">
                {mimosaImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setMimosaIndex(i)}
                    class={`h-2 rounded-full transition-all ${mimosaIndex === i ? 'bg-gold w-6' : 'bg-white/50 w-2 hover:bg-white'}`}
                  />
                ))}
              </div>

              <div class="absolute top-3 right-3 bg-gold text-ocean font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-gold/30">
                Photo {mimosaIndex + 1} / {mimosaImages.length}
              </div>

              <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white text-xs font-sans">
                {mimosaImages[mimosaIndex].caption}
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span class="text-xs text-gold font-bold uppercase tracking-widest block font-sans">
              Gastronomie & Brise Marine
            </span>
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-ocean">
              Restaurant Le Mimosa
            </h2>
            <p class="font-serif text-lg text-gold italic font-semibold">
              Une cuisine savoureuse pour tous les goûts
            </p>

            <p class="text-sm text-gray-600 leading-relaxed font-sans">
              Savourez le meilleur de la gastronomie de Kribi : poisson frais braisé sorti directement du filet des pêcheurs, n'dolé royal, crevettes géantes sautées et cocktails rafraîchissants sur notre terrasse arborée.
            </p>

            {/* Meal Categories Tags */}
            <div class="flex flex-wrap gap-2 pt-2 font-sans text-xs">
              <span class="bg-[#F4EBE1] text-ocean px-3 py-1.5 rounded-full font-semibold border border-gold/20 flex items-center gap-1">
                <Coffee class="h-3.5 w-3.5 text-gold" /> Petit-déjeuner
              </span>
              <span class="bg-[#F4EBE1] text-ocean px-3 py-1.5 rounded-full font-semibold border border-gold/20 flex items-center gap-1">
                <Utensils class="h-3.5 w-3.5 text-gold" /> Déjeuner
              </span>
              <span class="bg-[#F4EBE1] text-ocean px-3 py-1.5 rounded-full font-semibold border border-gold/20 flex items-center gap-1">
                <Utensils class="h-3.5 w-3.5 text-gold" /> Dîner
              </span>
              <span class="bg-[#F4EBE1] text-ocean px-3 py-1.5 rounded-full font-semibold border border-gold/20 flex items-center gap-1">
                <Wine class="h-3.5 w-3.5 text-gold" /> Cocktails
              </span>
              <span class="bg-[#F4EBE1] text-ocean px-3 py-1.5 rounded-full font-semibold border border-gold/20">
                Spécialités locales
              </span>
              <span class="bg-[#F4EBE1] text-ocean px-3 py-1.5 rounded-full font-semibold border border-gold/20">
                Cuisine internationale
              </span>
            </div>

            {/* Action buttons */}
            <div class="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onViewChange("mimosa")}
                class="w-full sm:w-auto bg-ocean hover:bg-ocean/90 text-gold font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Voir le menu</span>
                <ArrowRight class="h-4 w-4" />
              </button>

              <button
                onClick={() => setShowQrModal(true)}
                class="w-full sm:w-auto bg-transparent border border-gold text-ocean hover:bg-gold/10 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <QrCode class="h-4 w-4 text-gold" />
                <span>Commander via QR Code</span>
              </button>
            </div>

          </div>

        </div>
      </section>


      {/* ================= SECTION PAIEMENT ================= */}
      <section id="payment-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="bg-white rounded-3xl p-8 sm:p-12 border border-gold/25 shadow-sm text-center">
          <span class="text-xs text-gold font-bold uppercase tracking-widest block font-sans">
            Paiement
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-ocean mt-1">
            Réglez en toute confiance
          </h2>
          <p class="text-sm text-gray-600 max-w-2xl mx-auto mt-2 font-sans">
            Réservation en ligne ou règlement sur place — nous acceptons les moyens suivants.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-left font-sans">
            {/* Orange Money */}
            <div class="p-6 rounded-2xl bg-[#FFF9F3] border border-orange-200 hover:border-orange-400 hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-[#FF6600] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  OM
                </div>
                <div>
                  <h4 class="font-bold text-ocean text-base">Orange Money</h4>
                  <span class="text-[11px] text-orange-600 font-semibold uppercase">Mobile Money</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Règlement mobile via Orange Money.
              </p>
            </div>

            {/* MTN MoMo */}
            <div class="p-6 rounded-2xl bg-[#FFFDF0] border border-yellow-200 hover:border-yellow-400 hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-[#FFCC00] flex items-center justify-center text-ocean font-bold text-xs shadow-sm">
                  MoMo
                </div>
                <div>
                  <h4 class="font-bold text-ocean text-base">MTN MoMo</h4>
                  <span class="text-[11px] text-yellow-700 font-semibold uppercase">Paiement Mobile</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Paiement mobile MTN MoMo, simple et rapide.
              </p>
            </div>

            {/* Espèces */}
            <div class="p-6 rounded-2xl bg-[#F4EBE1]/50 border border-gold/30 hover:border-gold hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-ocean flex items-center justify-center text-gold font-bold text-xs shadow-sm">
                  CASH
                </div>
                <div>
                  <h4 class="font-bold text-ocean text-base">Espèces</h4>
                  <span class="text-[11px] text-gold font-semibold uppercase">Sur Place (XAF)</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Règlement en espèces à l'établissement.
              </p>
            </div>

            {/* Visa */}
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-[#1A1F71] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  VISA
                </div>
                <div>
                  <h4 class="font-bold text-ocean text-base">Visa</h4>
                  <span class="text-[11px] text-blue-700 font-semibold uppercase">Carte Bancaire</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Cartes Visa acceptées en ligne et à l'accueil.
              </p>
            </div>

            {/* Mastercard */}
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-400 hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-[#EB001B] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  MC
                </div>
                <div>
                  <h4 class="font-bold text-ocean text-base">Mastercard</h4>
                  <span class="text-[11px] text-red-600 font-semibold uppercase">Carte Bancaire</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                Paiement Mastercard, en ligne ou sur place.
              </p>
            </div>

            {/* American Express */}
            <div class="p-6 rounded-2xl bg-sky-50/50 border border-sky-200 hover:border-sky-400 hover:shadow-md transition-all">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-[#006FCF] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  AMEX
                </div>
                <div>
                  <h4 class="font-bold text-ocean text-base">American Express</h4>
                  <span class="text-[11px] text-sky-700 font-semibold uppercase">International</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 leading-relaxed">
                American Express bienvenue pour vos séjours.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ================= 7. SECTION SALLE DE CONFÉRENCE ================= */}
      <section id="conference-section" class="bg-[#F4EBE1]/60 py-16 border-t border-b border-gold/15">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div class="lg:col-span-6 space-y-6">
              <span class="text-xs text-gold font-bold uppercase tracking-widest block font-sans">
                Événements & Séminaires
              </span>
              <h2 class="font-serif text-3xl sm:text-4xl font-bold text-ocean">
                Salle de Conférence Professionnelle
              </h2>
              
              <p class="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                Notre salle moderne et climatisée peut accueillir <strong>plus de 100 participants</strong> pour tous vos rendez-vous professionnels :
              </p>

              <div class="grid grid-cols-2 gap-3 font-sans text-xs">
                <div class="bg-white p-3 rounded-xl border border-gold/15 font-semibold text-ocean flex items-center gap-2">
                  <span class="text-gold">✦</span> Séminaires d'entreprises
                </div>
                <div class="bg-white p-3 rounded-xl border border-gold/15 font-semibold text-ocean flex items-center gap-2">
                  <span class="text-gold">✦</span> Formations professionnelles
                </div>
                <div class="bg-white p-3 rounded-xl border border-gold/15 font-semibold text-ocean flex items-center gap-2">
                  <span class="text-gold">✦</span> Réunions d'affaires
                </div>
                <div class="bg-white p-3 rounded-xl border border-gold/15 font-semibold text-ocean flex items-center gap-2">
                  <span class="text-gold">✦</span> Conférences & Banquets
                </div>
              </div>

              <div class="pt-2">
                <button
                  onClick={() => setShowQuoteModal(true)}
                  class="bg-gold hover:bg-gold/90 text-ocean font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                >
                  <span>Demander un devis sur mesure</span>
                  <ChevronRight class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="lg:col-span-6">
              <div class="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/30 bg-ocean group">
                <img 
                  src={conferenceImages[conferenceIndex].url} 
                  alt={conferenceImages[conferenceIndex].caption} 
                  class="w-full h-[360px] sm:h-[420px] object-cover transition-all duration-700 cursor-pointer"
                  onClick={() => onOpenLightbox(conferenceImages[conferenceIndex].url, conferenceImages[conferenceIndex].caption)}
                />

                {/* Carousel Controls */}
                <div class="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                  <button
                    onClick={() => setConferenceIndex((prev) => (prev === 0 ? conferenceImages.length - 1 : prev - 1))}
                    class="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20 pointer-events-auto cursor-pointer"
                    title="Image précédente"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setConferenceIndex((prev) => (prev === conferenceImages.length - 1 ? 0 : prev + 1))}
                    class="w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20 pointer-events-auto cursor-pointer"
                    title="Image suivante"
                  >
                    ›
                  </button>
                </div>

                {/* Index badge */}
                <div class="absolute top-3 right-3 bg-gold text-ocean font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-gold/30">
                  Photo {conferenceIndex + 1} / {conferenceImages.length}
                </div>

                <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 text-white text-xs font-sans">
                  {conferenceImages[conferenceIndex].caption}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= 8. SECTION LOCALISATION ================= */}
      <section id="location-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-10">
          <span class="text-xs text-gold font-bold uppercase tracking-widest block font-sans">
            Emplacement Privilégié
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-ocean mt-1">
            Au cœur de Kribi
          </h2>
          <p class="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto mt-2 font-sans">
            Situé face à la Marina de Kribi, notre hôtel offre un accès direct aux incontournables de la ville.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Distances List */}
          <div class="lg:col-span-5 space-y-4 font-sans">
            
            <div class="bg-white p-4 rounded-2xl border border-gold/15 shadow-sm flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2.5 bg-[#F4EBE1] text-ocean rounded-xl">
                  <MapPin class="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h4 class="font-serif font-bold text-ocean text-sm">Plage de la Marina</h4>
                  <p class="text-xs text-gray-500">Accès piéton direct</p>
                </div>
              </div>
              <span class="bg-gold/15 text-ocean text-xs font-bold px-3 py-1 rounded-full border border-gold/30">
                2 min à pied
              </span>
            </div>

            <div class="bg-white p-4 rounded-2xl border border-gold/15 shadow-sm flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2.5 bg-[#F4EBE1] text-ocean rounded-xl">
                  <Compass class="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h4 class="font-serif font-bold text-ocean text-sm">Chutes de la Lobé</h4>
                  <p class="text-xs text-gray-500">Merveille naturelle unique</p>
                </div>
              </div>
              <span class="bg-gold/15 text-ocean text-xs font-bold px-3 py-1 rounded-full border border-gold/30">
                7.2 km (12 min)
              </span>
            </div>

            <div class="bg-white p-4 rounded-2xl border border-gold/15 shadow-sm flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2.5 bg-[#F4EBE1] text-ocean rounded-xl">
                  <MapPin class="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h4 class="font-serif font-bold text-ocean text-sm">Port Autonome de Kribi</h4>
                  <p class="text-xs text-gray-500">Zone industrielle & affaires</p>
                </div>
              </div>
              <span class="bg-gold/15 text-ocean text-xs font-bold px-3 py-1 rounded-full border border-gold/30">
                12.5 km (15 min)
              </span>
            </div>

            <div class="bg-white p-4 rounded-2xl border border-gold/15 shadow-sm flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2.5 bg-[#F4EBE1] text-ocean rounded-xl">
                  <Compass class="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h4 class="font-serif font-bold text-ocean text-sm">Centre-Ville & Marché</h4>
                  <p class="text-xs text-gray-500">Commerces & débarcadère</p>
                </div>
              </div>
              <span class="bg-gold/15 text-ocean text-xs font-bold px-3 py-1 rounded-full border border-gold/30">
                3.5 km (5 min)
              </span>
            </div>

            <div class="pt-2">
              <a
                href="https://maps.google.com/?q=Hotel+Edivince+Kribi"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full bg-ocean hover:bg-ocean/90 text-gold font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MapPin class="h-4 w-4" />
                <span>Obtenir l'itinéraire Google Maps</span>
              </a>
            </div>

          </div>

          {/* Map Frame Embed */}
          <div class="lg:col-span-7">
            <div class="rounded-3xl overflow-hidden border-2 border-gold/30 shadow-xl h-[380px] sm:h-[420px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.673891048187!2d9.9042!3d2.9392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwNTYnMzEuMSJOIDnCsDU0JzE1LjEiRQ!5e0!3m2!1sfr!2scm!4v1650000000000!5m2!1sfr!2scm"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Google Maps Hôtel EDIVINCE A.N Kribi"
              />
            </div>
          </div>

        </div>
      </section>


      {/* ================= 9. SECTION AVIS CLIENTS ================= */}
      <section id="reviews-section" class="bg-[#0A2342] text-sand py-16">
        <div class="max-w-4xl mx-auto px-4 text-center space-y-8">
          
          <div>
            <span class="text-xs text-gold font-bold uppercase tracking-widest block font-sans">
              Témoignages & Avis Verified
            </span>
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
              Ce que disent nos clients
            </h2>
          </div>

          <div class="bg-white/5 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 relative space-y-6">
            
            <div class="flex justify-center gap-1.5 text-gold">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} class="h-6 w-6 fill-current" />
              ))}
            </div>

            <p class="font-serif text-lg sm:text-xl text-white italic leading-relaxed">
              "{testimonials[reviewIndex].comment}"
            </p>

            <div class="flex items-center justify-center gap-3 pt-2">
              <img 
                src={testimonials[reviewIndex].avatar} 
                alt={testimonials[reviewIndex].name} 
                class="w-12 h-12 rounded-full object-cover border-2 border-gold"
              />
              <div class="text-left font-sans">
                <div class="font-bold text-white text-sm">{testimonials[reviewIndex].name}</div>
                <div class="text-xs text-gold">{testimonials[reviewIndex].stay} • {testimonials[reviewIndex].date}</div>
              </div>
            </div>

            {/* Carousel navigation */}
            <div class="flex justify-center gap-3 pt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setReviewIndex(idx)}
                  class={`h-2.5 rounded-full transition-all cursor-pointer ${reviewIndex === idx ? 'bg-gold w-8' : 'bg-white/40 w-2.5 hover:bg-white'}`}
                />
              ))}
            </div>

          </div>

          {/* Happy Guests Real Photo Highlights */}
          <div class="space-y-4 pt-2">
            <div class="text-xs uppercase tracking-widest text-gold font-bold font-sans">
              Moments d'Exception Partagés par nos Clients
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_12.58.29_eys8nx.jpg", caption: "Moments de Partage & Joie — EDIVINCE A.N" },
                { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_13.03.37_1_vuagpj.jpg", caption: "Ambiance Conviviale & Sourires à l'Hôtel" },
                { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787901430/WhatsApp_Image_2026-08-22_at_12.56.02_1_mvrigj.jpg", caption: "Séjour Mémorable en Famille & Amis" },
                { url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787901430/WhatsApp_Image_2026-08-22_at_12.56.11_1_mdoeyd.jpg", caption: "Moments Précieux & Détente Tropicale" }
              ].map((clientImg, i) => (
                <div 
                  key={i} 
                  onClick={() => onOpenLightbox(clientImg.url, clientImg.caption)}
                  class="group relative h-28 sm:h-36 rounded-2xl overflow-hidden border border-white/20 cursor-pointer shadow-md hover:scale-105 transition-all duration-300"
                >
                  <img 
                    src={clientImg.url} 
                    alt={clientImg.caption}
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                    <span class="text-[10px] text-gold font-bold">{clientImg.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => onViewChange("reviews")}
              class="bg-transparent border border-gold hover:bg-gold hover:text-ocean text-gold font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer font-sans"
            >
              Donner votre avis / Voir tous les témoignages
            </button>
          </div>

        </div>
      </section>


      {/* ================= 11. SECTION RÉSERVATION RAPIDE ================= */}
      <section id="quick-booking-section" class="max-w-4xl mx-auto px-4 py-12">
        <div class="text-center mb-8">
          <span class="text-xs text-gold font-bold uppercase tracking-widest block font-sans">
            Garantie Meilleur Tarif Direct
          </span>
          <h2 class="font-serif text-3xl font-bold text-ocean mt-1">
            Réservez votre séjour à Kribi
          </h2>
          <p class="text-xs text-gray-500 mt-1 font-sans">
            Confirmation instantanée par SMS & WhatsApp
          </p>
        </div>

        <BookingForm selectedRoomSlug="" onSuccess={() => {}} />
      </section>


      {/* ================= 12. SECTION CTA FINAL ================= */}
      <section id="final-cta-section" class="relative py-20 px-4 overflow-hidden bg-[#07132A] text-center text-white">
        <div 
          class="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/ccmyhjca/image/upload/v1785311335/gemini-2.5-flash-image_Supprimer_tout_le_texte_de_cette_image_et_ne_laisser_que_l_image_vierge_et_la_re-0_1_e3mfsm.jpg')"
          }}
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

        <div class="relative z-10 max-w-3xl mx-auto space-y-6">
          <span class="text-xs text-gold font-bold uppercase tracking-widest block font-sans">
            Hôtel EDIVINCE A.N • Kribi
          </span>
          
          <h2 class="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            Prêt à vivre une expérience inoubliable à Kribi ?
          </h2>

          <p class="text-xs sm:text-sm text-sand/80 max-w-xl mx-auto font-sans leading-relaxed">
            Profitez de la tranquillité de nos chambres luxueuses, savourez un poisson braisé face à la Marina et détendez-vous dans notre piscine privée.
          </p>

          <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto font-sans">
            <button
              onClick={() => onBookRoom("")}
              class="w-full sm:w-auto bg-gold hover:bg-gold/90 text-ocean font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-gold/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Réserver une chambre</span>
              <ChevronRight class="h-4 w-4" />
            </button>

            <a
              href="https://wa.me/237670497140?text=Bonjour,%20je%20souhaite%20des%20renseignements%20pour%20une%20réservation."
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Phone class="h-4 w-4" />
              <span>WhatsApp MTN (+237 670 49 71 40)</span>
            </a>
          </div>
        </div>
      </section>

      {/* QR CODE MODAL */}
      {showQrModal && (
        <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 border border-gold/30 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowQrModal(false)}
              class="absolute top-4 right-4 text-gray-400 hover:text-ocean text-xl font-bold cursor-pointer"
            >
              ✕
            </button>
            <div class="p-3 bg-gold/15 text-gold w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
              <QrCode class="h-8 w-8 text-ocean" />
            </div>
            <h3 class="font-serif text-xl font-bold text-ocean">Commande Resto QR Code</h3>
            <p class="text-xs text-gray-600 font-sans">
              Scannez le QR Code posé sur votre table au restaurant Le Mimosa ou en chambre pour passer votre commande directement sur votre smartphone.
            </p>
            <div class="bg-[#F4EBE1] p-6 rounded-2xl border border-gold/20 flex flex-col items-center">
              <div class="w-40 h-40 bg-white p-2 rounded-xl shadow border border-gold/30 flex items-center justify-center">
                <QrCode class="w-32 h-32 text-ocean" />
              </div>
              <span class="text-[10px] text-gray-500 mt-2 font-mono">EDIVINCE-MIMOSA-QR-2026</span>
            </div>
            <button
              onClick={() => {
                setShowQrModal(false);
                onViewChange("mimosa");
              }}
              class="w-full bg-ocean text-gold font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
            >
              Ouvrir la carte du restaurant Le Mimosa
            </button>
          </div>
        </div>
      )}

      {/* QUOTE DEVIS MODAL FOR CONFERENCE */}
      {showQuoteModal && (
        <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-gold/30 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left">
            <button
              onClick={() => setShowQuoteModal(false)}
              class="absolute top-4 right-4 text-gray-400 hover:text-ocean text-xl font-bold cursor-pointer"
            >
              ✕
            </button>
            <h3 class="font-serif text-2xl font-bold text-ocean">Demande de Devis Conférence</h3>
            <p class="text-xs text-gray-600 font-sans">
              Remplissez les détails de votre événement et notre équipe vous recontactera sous 2 heures avec un devis personnalisé.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Votre demande de devis a été transmise à notre service commercial. Merci !");
                setShowQuoteModal(false);
              }}
              class="space-y-3 font-sans text-xs"
            >
              <div>
                <label class="block text-gray-700 font-semibold mb-1">Nom / Entreprise *</label>
                <input required type="text" placeholder="Ex: Société SNH / M. Ondoua" class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-gray-700 font-semibold mb-1">Téléphone WhatsApp *</label>
                  <input required type="tel" placeholder="+237 6..." class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-1">Nombre de participants *</label>
                  <input required type="number" placeholder="Ex: 50" class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none" />
                </div>
              </div>
              <div>
                <label class="block text-gray-700 font-semibold mb-1">Services requis</label>
                <div class="grid grid-cols-2 gap-2 text-[11px]">
                  <label class="flex items-center gap-1.5"><input type="checkbox" defaultChecked /> Pause-café & Viennoiseries</label>
                  <label class="flex items-center gap-1.5"><input type="checkbox" defaultChecked /> Déjeuner Buffet Le Mimosa</label>
                  <label class="flex items-center gap-1.5"><input type="checkbox" defaultChecked /> Rétroprojecteur & Sonorisation</label>
                  <label class="flex items-center gap-1.5"><input type="checkbox" defaultChecked /> Hébergement des participants</label>
                </div>
              </div>
              <button
                type="submit"
                class="w-full bg-gold text-ocean font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md hover:bg-gold/90 transition-all mt-2"
              >
                Envoyer la demande de devis
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
