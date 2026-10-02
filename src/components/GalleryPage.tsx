import { useState } from "react";
import { Play, Sparkles, Image as ImageIcon, Filter, ChevronLeft, ChevronRight, X, ZoomIn, Film } from "lucide-react";

interface GalleryItem {
  id: number;
  category: "restaurant" | "evenements" | "piscine" | "chambres" | "facade" | "clients" | "videos";
  url: string;
  title: string;
  type?: "image" | "video";
}

const ALL_GALLERY_DATA: GalleryItem[] = [
  // ================= RESTAURANT & GASTRONOMIE =================
  {
    id: 101,
    category: "restaurant",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1788238661/WhatsApp_Image_2026-08-31_at_18.02.03_5_lj3yhf.jpg",
    title: "Pizza au four traditionnelle cuite au feu de bois — Restaurant Le Mimosa"
  },
  {
    id: 104,
    category: "restaurant",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1788238658/WhatsApp_Image_2026-08-31_at_18.02.03_3_jgqp5b.jpg",
    title: "La table de cocktail raffinée & rafraîchissements tropicaux"
  },
  {
    id: 105,
    category: "restaurant",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1788238664/WhatsApp_Image_2026-08-31_at_18.02.03_4_swgvxn.jpg",
    title: "Une commande spéciale du client préparée à la minute par notre chef"
  },
  {
    id: 31,
    category: "restaurant",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899955/WhatsApp_Image_2026-08-22_at_12.56.09_luuie2.jpg",
    title: "Nos Plats d'Exception — Service en Chambre VIP & Suites"
  },
  {
    id: 32,
    category: "restaurant",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_12.56.00_1_ij6l16.jpg",
    title: "Gastronomie Raffinée — Saveurs océanes & dressage haut de gamme"
  },
  {
    id: 33,
    category: "restaurant",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_12.58.33_m7hqgr.jpg",
    title: "Poissons Frais Braisés & Saveurs authentiques du Terroir"
  },
  {
    id: 34,
    category: "restaurant",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316868/WhatsApp_Image_2026-07-29_at_10.20.17_uebnkn.jpg",
    title: "La Terrasse Extérieure & Dégustation Face Marina"
  },
  {
    id: 35,
    category: "restaurant",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316868/WhatsApp_Image_2026-07-29_at_10.20.16_ybstwj.jpg",
    title: "Espace Bar & Cocktails de Prestige"
  },

  // ================= SOIRÉES, FEUX DE CAMP & ÉVÉNEMENTS =================
  {
    id: 102,
    category: "evenements",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1788238659/WhatsApp_Image_2026-08-31_at_18.02.03_1_v4hbrg.jpg",
    title: "Feu de camp en bordure de mer — Soirées magiques & Convivialité à Kribi"
  },
  {
    id: 103,
    category: "evenements",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1788238657/WhatsApp_Image_2026-08-31_at_18.02.03_uwzqaj.jpg",
    title: "Buffet traiteur d'exception organisé pour vos cérémonies et banquets"
  },
  {
    id: 41,
    category: "evenements",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316448/WhatsApp_Image_2026-07-29_at_10.12.33_vh4kxz.jpg",
    title: "Grande Salle de Fête et de Conférence — Événements VIP & Séminaires"
  },
  {
    id: 42,
    category: "evenements",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785316448/WhatsApp_Image_2026-07-29_at_10.12.32_znvbeh.jpg",
    title: "Espace Réception & Banquets Institutionnels"
  },
  {
    id: 43,
    category: "evenements",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749349/picnic_a_la_plage_w8leod.jpg",
    title: "Pique-nique d'exception & Détente sur la plage privée"
  },
  {
    id: 44,
    category: "evenements",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749342/couple_a_la_plage_nlemz2.jpg",
    title: "Escapade Romantique & Promenade au coucher du soleil"
  },

  // ================= FAÇADE, BÂTIMENT & MARINA =================
  {
    id: 1,
    category: "facade",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787902229/Batiment_vue_de_face_oqhc6i.jpg",
    title: "Bâtiment & Façade Prestige de Nuit — Hôtel EDIVINCE A.N"
  },
  {
    id: 2,
    category: "facade",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787900037/WhatsApp_Image_2026-08-28_at_07.59.40_dhlsiu.jpg",
    title: "Bâtiment Prestige Hôtel EDIVINCE A.N — Vue de Journée"
  },
  {
    id: 3,
    category: "facade",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787902229/vu_de_profil_e6thh4.jpg",
    title: "Entrée Principale du Bâtiment & Vue de Profil"
  },
  {
    id: 4,
    category: "facade",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787902229/Premier_batiment_MARINA_ljy294.jpg",
    title: "Premier Bâtiment MARINA — Emplacement d'exception"
  },
  {
    id: 5,
    category: "facade",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787900037/WhatsApp_Image_2026-08-28_at_07.59.39_dapw42.jpg",
    title: "Le Phare Historique de Kribi — Vue depuis l'Hôtel"
  },
  {
    id: 6,
    category: "facade",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787900037/WhatsApp_Image_2026-08-28_at_07.59.39_1_runnqp.jpg",
    title: "Marina de Kribi — Vue panoramique sur l'Océan"
  },
  {
    id: 7,
    category: "facade",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1784189325/chutes_de_la_lobe_hd_enhanced_byeydq.jpg",
    title: "Les Célèbres Chutes de la Lobé à quelques minutes de l'hôtel"
  },

  // ================= CHAMBRES & SUITES =================
  {
    id: 11,
    category: "chambres",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749361/Salon_Suite._bcvvrd.jpg",
    title: "Salon de Suite Luxueuse — Décoration & Standing VIP"
  },
  {
    id: 12,
    category: "chambres",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749361/Salon_suite_oo3ede.jpg",
    title: "Grand Salon Suite Royale — Espace de réception privé"
  },
  {
    id: 13,
    category: "chambres",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749363/Suite_jr_301._uyrh0x.jpg",
    title: "Suite Junior 301 — Cadre Raffiné & Vue Lumineuse"
  },
  {
    id: 14,
    category: "chambres",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749362/Suite_jr_301.._y2gjdk.jpg",
    title: "Suite Junior — Vue Chambre & Literie King Size"
  },
  {
    id: 15,
    category: "chambres",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749371/WhatsApp_Image_2026-07-28_at_08.28.02_srrswk.jpg",
    title: "Chambre Confort Prestige — Luminosité & Douceur"
  },
  {
    id: 16,
    category: "chambres",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749339/Chambre_1_Suite_ho112c.jpg",
    title: "Chambre Principale Suite 1 — Finition contemporaine"
  },
  {
    id: 17,
    category: "chambres",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749339/Chambre_2_suite._vsrdsf.jpg",
    title: "Deuxième Chambre Suite Familiale"
  },
  {
    id: 18,
    category: "chambres",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749351/Salle_a_manger_suite._ggyw8w.jpg",
    title: "Salle à Manger Privée dans la Suite Prestige"
  },
  {
    id: 19,
    category: "chambres",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749339/All%C3%A9e_Suite_fpz5ha.jpg",
    title: "Allée d'accès & Couloirs des Suites"
  },
  {
    id: 20,
    category: "chambres",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749345/Douche_chambre_1_Suite._dlseio.jpg",
    title: "Salle d'eau & Douche à l'italienne Suite 1"
  },
  {
    id: 21,
    category: "chambres",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785749346/Douche_suite_jr_302_bqecjs.jpg",
    title: "Salle d'eau moderne Suite Junior 302"
  },
  {
    id: 22,
    category: "chambres",
    url: "https://lh3.googleusercontent.com/d/1VeDj6eRiBugVON7p0Vmazo4gEpleNlHU",
    title: "Chambre Supérieure — Équipements de standing"
  },
  {
    id: 23,
    category: "chambres",
    url: "https://lh3.googleusercontent.com/d/1QT8Mj03x0_4mlK_W6u1si6uzrDrfxA7_",
    title: "Chambre Exécutive — Vue Dégagée"
  },
  {
    id: 24,
    category: "chambres",
    url: "https://lh3.googleusercontent.com/d/1-MddVINL35cye8qiynqoHfoxtJ-C19ED",
    title: "Chambre Standard Confortable"
  },
  {
    id: 25,
    category: "chambres",
    url: "https://lh3.googleusercontent.com/d/1uIau46eXDhG-xA44o_dXqli8KnHJcsPO",
    title: "Suite Familiale Double Espace"
  },
  {
    id: 26,
    category: "chambres",
    url: "https://lh3.googleusercontent.com/d/1TPOD08U36wVzXKVRnjrMvPyWEJaJfYwE",
    title: "Suite Senior Panoramique"
  },

  // ================= PISCINE & ESPACES DÉTENTE =================
  {
    id: 50,
    category: "piscine",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787903827/Cafe_a_la_piscine_ccnrxj.jpg",
    title: "Café & Détente au Bord de la Piscine — Hôtel EDIVINCE A.N"
  },
  {
    id: 51,
    category: "piscine",
    url: "https://lh3.googleusercontent.com/d/1XA_qKeBj33Cj-nUIl7h_tHh4_QH4F-0h",
    title: "Piscine Privée de Relaxation & Rafraîchissement"
  },
  {
    id: 52,
    category: "piscine",
    url: "https://lh3.googleusercontent.com/d/1kLi1GybZgbuyJIH-2gaOvG38Og7IdeGo",
    title: "Espace Transats & Bain de Soleil tropical"
  },
  {
    id: 53,
    category: "piscine",
    url: "https://lh3.googleusercontent.com/d/1XbRs6BXG_IQXzIx065G1Kpvs0TIUCH1K",
    title: "Bord de piscine ombragé & service boisson"
  },
  {
    id: 54,
    category: "piscine",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785317226/WhatsApp_Image_2026-07-29_at_08.27.55_ius8lh.jpg",
    title: "Terrasse Piscine & Ambiance Matinale"
  },

  // ================= SOURIRES & MOMENTS PARTAGÉS =================
  {
    id: 70,
    category: "clients",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_12.58.29_eys8nx.jpg",
    title: "Moments de Partage & Sourires à l'Hôtel EDIVINCE"
  },
  {
    id: 71,
    category: "clients",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787901430/WhatsApp_Image_2026-08-22_at_12.56.02_1_mvrigj.jpg",
    title: "Séjours Mémorables en Famille & Entre Amis"
  },
  {
    id: 72,
    category: "clients",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899955/WhatsApp_Image_2026-08-22_at_12.55.59_draegp.jpg",
    title: "Accueil Chaleureux & Service Personnalisé"
  },
  {
    id: 73,
    category: "clients",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787901430/WhatsApp_Image_2026-08-22_at_12.56.11_1_mdoeyd.jpg",
    title: "Expérience Inoubliable au Cœur de Kribi"
  },
  {
    id: 74,
    category: "clients",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787899956/WhatsApp_Image_2026-08-22_at_13.03.37_1_vuagpj.jpg",
    title: "Ambiance Conviviale & Soirées Détente"
  },
  {
    id: 75,
    category: "clients",
    url: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785317027/WhatsApp_Image_2026-06-05_at_02.57.31_wfc5cp.jpg",
    title: "Séjours de Prestige face à la Marina"
  },

  // ================= VIDÉOS & EXPÉRIENCES IMMERSIVES =================
  {
    id: 90,
    category: "videos",
    url: "https://res.cloudinary.com/ccmyhjca/video/upload/v1785749343/champagne_sur_un_yacht_en_mer_yvceyk.mp4",
    title: "Vidéo : Champagne sur le Yacht & Sortie en Mer",
    type: "video"
  },
  {
    id: 91,
    category: "videos",
    url: "https://res.cloudinary.com/ccmyhjca/video/upload/v1785749969/WhatsApp_Video_2026-08-01_at_09.21.08_fbeyaz.mp4",
    title: "Vidéo : Découverte des Espaces & Chambres de l'Hôtel",
    type: "video"
  },
  {
    id: 92,
    category: "videos",
    url: "https://res.cloudinary.com/ccmyhjca/video/upload/v1785749988/WhatsApp_Video_2026-08-01_at_09.21.43_rciium.mp4",
    title: "Vidéo : Visite Guidée de la Suite & Vue Marina",
    type: "video"
  }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: `Toutes les photos (${ALL_GALLERY_DATA.length})` },
    { id: "restaurant", label: "Pizzas & Restaurant" },
    { id: "evenements", label: "Feu de Camp & Événements" },
    { id: "chambres", label: "Chambres & Suites" },
    { id: "piscine", label: "Piscine & Détente" },
    { id: "facade", label: "Façade & Marina" },
    { id: "clients", label: "Moments Partagés" },
    { id: "videos", label: "Vidéos & Expériences" }
  ];

  const filteredItems = activeCategory === "all"
    ? ALL_GALLERY_DATA
    : ALL_GALLERY_DATA.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div id="galerie-view" class="bg-[#F8F5F0] min-h-screen pb-20 font-sans text-ocean">
      
      {/* ================= HERO HEADER BANNER WITH IMAGE & MESSAGE ================= */}
      <section 
        class="relative h-[340px] sm:h-[420px] bg-[#0A2342] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(10,35,66,0.65), rgba(10,35,66,0.9)), url('https://res.cloudinary.com/ccmyhjca/image/upload/v1788238659/WhatsApp_Image_2026-08-31_at_18.02.03_1_v4hbrg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div class="relative z-10 max-w-3xl px-4 space-y-3 animate-in fade-in duration-500">
          <span class="text-xs sm:text-sm font-sans font-bold tracking-widest text-gold uppercase block">
            — GALERIE COMPLÈTE —
          </span>
          <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            L'expérience en images
          </h1>
          <p class="text-sm sm:text-base text-sand/90 font-sans max-w-xl mx-auto leading-relaxed pt-1">
            Plongez dans l'atmosphère unique de notre établissement et découvrez toutes les photographies et vidéos exclusives de l'Hôtel EDIVINCE A.N à Kribi.
          </p>
          <div class="pt-2">
            <span class="inline-block text-[11px] font-mono uppercase tracking-widest text-gold/90 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/30">
              ACCUEIL · GALERIE
            </span>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY FILTER BAR ================= */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl p-3 shadow-md border border-gold/20 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "text-gold font-bold underline decoration-gold decoration-2 underline-offset-8 bg-transparent"
                  : "text-ocean/70 hover:text-gold hover:bg-[#F4EBE1]/50 font-medium"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MASONRY GALLERY GRID ================= */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              class="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-72 border border-gold/20 bg-ocean"
            >
              {item.type === "video" ? (
                <div class="w-full h-full relative bg-black flex items-center justify-center">
                  <video
                    src={item.url}
                    class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    muted
                    loop
                    playsInline
                    onMouseOver={(e) => (e.currentTarget as HTMLVideoElement).play()}
                    onMouseOut={(e) => (e.currentTarget as HTMLVideoElement).pause()}
                  />
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-14 h-14 bg-gold text-ocean rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play class="h-6 w-6 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              )}
              
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div class="flex items-center gap-1.5 mb-1">
                  {item.type === "video" ? (
                    <span class="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Film class="h-3 w-3" /> Vidéo
                    </span>
                  ) : (
                    <span class="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/20 px-2 py-0.5 rounded-full">
                      Hôtel EDIVINCE A.N
                    </span>
                  )}
                </div>
                <h3 class="text-white font-serif font-bold text-sm leading-snug">
                  {item.title}
                </h3>
                <div class="flex items-center gap-1.5 text-[11px] text-sand/80 mt-2 font-sans">
                  <ZoomIn class="h-3.5 w-3.5 text-gold" />
                  <span>{item.type === "video" ? "Lire la vidéo" : "Agrandir la photo"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= LIGHTBOX MODAL ================= */}
      {lightboxIndex !== null && (
        <div class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            class="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all cursor-pointer z-50"
            title="Fermer"
          >
            <X class="h-6 w-6" />
          </button>

          <button
            onClick={prevImage}
            class="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 p-3 rounded-full transition-all cursor-pointer z-50 border border-white/20"
            title="Précédent"
          >
            <ChevronLeft class="h-6 w-6" />
          </button>

          <button
            onClick={nextImage}
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 p-3 rounded-full transition-all cursor-pointer z-50 border border-white/20"
            title="Suivant"
          >
            <ChevronRight class="h-6 w-6" />
          </button>

          <div class="max-w-4xl max-h-[85vh] flex flex-col items-center">
            {filteredItems[lightboxIndex].type === "video" ? (
              <video
                src={filteredItems[lightboxIndex].url}
                controls
                autoPlay
                class="max-w-full max-h-[70vh] rounded-xl shadow-2xl border border-white/20"
              />
            ) : (
              <img
                src={filteredItems[lightboxIndex].url}
                alt={filteredItems[lightboxIndex].title}
                class="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/20"
              />
            )}
            <div class="bg-black/70 backdrop-blur-md px-6 py-3 rounded-xl mt-4 max-w-2xl text-center border border-white/10">
              <p class="text-white font-serif text-sm sm:text-base font-semibold">
                {filteredItems[lightboxIndex].title}
              </p>
              <span class="text-gold text-xs font-mono mt-1 block">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
