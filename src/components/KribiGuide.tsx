import { useState } from "react";
import { Compass, MapPin, Navigation, Eye, Clock, Route, Milestone, Heart, Anchor, Waves } from "lucide-react";

interface Attraction {
  name: string;
  distance: string;
  time: string;
  description: string;
  image: string;
  icon: any;
}

export default function KribiGuide() {
  const [routeFrom, setRouteFrom] = useState("douala");
  const [routeStep, setRouteStep] = useState(0);

  const attractions: Attraction[] = [
    {
      name: "Le Phare Historique de Kribi",
      distance: "0.2 km",
      time: "2 min à pied",
      description: "Édifié en 1906, ce phare emblématique surplombe l'océan Atlantique et guide les marins depuis plus d'un siècle. Situé à quelques pas de l'Hôtel EDIVINCE, c'est l'un des monuments les plus photographiés de la région.",
      image: "https://res.cloudinary.com/ccmyhjca/image/upload/v1787900037/WhatsApp_Image_2026-08-28_at_07.59.39_dapw42.jpg",
      icon: Compass
    },
    {
      name: "Chutes de la Lobé",
      distance: "7.2 km",
      time: "12 min en voiture",
      description: "Une merveille naturelle unique au monde où le fleuve Lobé se jette directement dans l'océan Atlantique en de magnifiques cascades de plus de 20 mètres de haut. Idéal pour une balade en pirogue traditionnelle ou déguster des crevettes grillées.",
      image: "https://res.cloudinary.com/ccmyhjca/image/upload/v1784189325/chutes_de_la_lobe_hd_enhanced_byeydq.jpg",
      icon: Waves
    },
    {
      name: "Plage de Grand Batanga",
      distance: "10.5 km",
      time: "15 min en voiture",
      description: "De longues étendues de sable fin doré ombragées par des cocotiers majestueux. C'est le spot idéal à Kribi pour se détendre, acheter du poisson frais sorti du filet des pêcheurs, et le faire braiser sur place dans des paillotes typiques.",
      image: "https://res.cloudinary.com/ccmyhjca/image/upload/v1785317027/WhatsApp_Image_2026-06-05_at_02.57.31_wfc5cp.jpg",
      icon: Compass
    },
    {
      name: "La Marina & Port de Kribi",
      distance: "0.1 km",
      time: "1 min à pied (Face à l'hôtel)",
      description: "Idéalement situé juste en face de notre établissement, le secteur de la Marina et du port offre un spectacle animé de chalutiers et de petites embarcations. Un lieu magique pour admirer le coucher de soleil et respirer la brise marine.",
      image: "https://lh3.googleusercontent.com/d/1TPOD08U36wVzXKVRnjrMvPyWEJaJfYwE",
      icon: Anchor
    }
  ];

  // GPS navigation simulator
  const navigationData: Record<string, {
    totalDistance: string;
    totalTime: string;
    steps: string[];
  }> = {
    douala: {
      totalDistance: "172 km",
      totalTime: "2h 45min",
      steps: [
        "Départ de Douala par l'Axe Lourd Douala-Yaoundé (N3).",
        "Prendre la bifurcation à Édéa en direction du Sud vers Kribi (N7).",
        "Continuer sur la route goudronnée en passant par Lokoundjé.",
        "Entrée dans la ville de Kribi par le rond-point du centre.",
        "Prendre la direction de la Marina. L'Hôtel EDIVINCE A.N se trouve à gauche, juste en face des quais de la Marina."
      ]
    },
    yaounde: {
      totalDistance: "285 km",
      totalTime: "4h 15min",
      steps: [
        "Sortie de Yaoundé par l'autoroute ou l'Axe Lourd vers Édéa.",
        "Au grand carrefour d'Édéa, tourner à gauche sur la Nationale 7 en direction de Kribi.",
        "Suivre la N7 à travers la forêt équatoriale (route en excellent état).",
        "Traverser le pont sur la Lobé à l'entrée de la ville côtière.",
        "Suivre les panneaux 'Marina / Centre administratif'. L'Hôtel EDIVINCE A.N se trouve face à la Marina de Kribi."
      ]
    },
    port: {
      totalDistance: "32 km",
      totalTime: "30 min",
      steps: [
        "Sortie du Complexe Industrialo-Portuaire de Kribi (Mboro).",
        "Prendre la route côtière en direction du Nord vers le centre de Kribi.",
        "Passer devant les chutes de la Lobé.",
        "Continuer tout droit vers l'embouchure et le port de plaisance.",
        "Arrivée en face de la Marina de Kribi. L'Hôtel EDIVINCE A.N est sur votre droite."
      ]
    }
  };

  const selectedRoute = navigationData[routeFrom];

  return (
    <div id="guide-section-container" class="bg-[#F8F5F0] min-h-screen pb-20 font-sans text-ocean">
      
      {/* ================= HERO HEADER BANNER WITH IMAGE & MESSAGE ================= */}
      <section 
        class="relative h-[340px] sm:h-[420px] bg-[#0A2342] flex items-center justify-center text-center overflow-hidden mb-12"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(10,35,66,0.65), rgba(10,35,66,0.9)), url('https://res.cloudinary.com/ccmyhjca/image/upload/v1787900037/WhatsApp_Image_2026-08-28_at_07.59.39_dapw42.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div class="relative z-10 max-w-3xl px-4 space-y-3 animate-in fade-in duration-500">
          <span class="text-xs sm:text-sm font-sans font-bold tracking-widest text-gold uppercase block">
            — GUIDE KRIBI —
          </span>
          <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Découvrez la Magie de Kribi
          </h1>
          <p class="text-sm sm:text-base text-sand/90 font-sans max-w-xl mx-auto leading-relaxed pt-1">
            Plages dorées, cascades majestueuses et patrimoine historique de la perle du littoral camerounais.
          </p>
          <div class="pt-2">
            <span class="inline-block text-[11px] font-mono uppercase tracking-widest text-gold/90 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/30">
              ACCUEIL · GUIDE KRIBI
            </span>
          </div>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-xs text-gold font-bold uppercase tracking-widest block">
            À Proximité Immédiate
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-ocean mt-1">
            Les Incontournables de Kribi
          </h2>
          <p class="text-sm text-gray-600 mt-2 max-w-2xl mx-auto">
            L'Hôtel EDIVINCE A.N est idéalement situé en face de la Marina, vous offrant un accès direct aux plus belles merveilles naturelles et culturelles de la cité balnéaire camerounaise.
          </p>
        </div>

      {/* Grid Attractions */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {attractions.map((attraction, idx) => {
          const Icon = attraction.icon;
          return (
            <div key={idx} class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gold/10 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Elegant Image Block */}
                <div class="relative h-48 bg-ocean overflow-hidden group/img">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    referrerPolicy="no-referrer"
                    class="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-ocean/60 via-transparent to-transparent pointer-events-none"></div>
                  <div class="absolute bottom-4 left-4 bg-ocean/90 backdrop-blur-md border border-gold/20 text-white p-2.5 rounded-xl shadow-md">
                    <Icon class="h-5 w-5 text-gold" />
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="font-serif text-xl font-bold text-ocean mb-1">{attraction.name}</h3>
                  <div class="flex items-center gap-3 text-xs text-palm font-semibold mb-3">
                    <span class="flex items-center gap-1">
                      <MapPin class="h-3.5 w-3.5" />
                      {attraction.distance}
                    </span>
                    <span class="flex items-center gap-1">
                      <Clock class="h-3.5 w-3.5" />
                      {attraction.time}
                    </span>
                  </div>
                  <p class="text-xs text-gray-600 leading-relaxed font-sans">
                    {attraction.description}
                  </p>
                </div>
              </div>
              
              <div class="p-6 pt-0">
                <a
                  href={`https://wa.me/237696826609?text=Bonjour, je souhaite organiser une excursion vers : ${encodeURIComponent(attraction.name)} pendant mon séjour.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full bg-[#F4EBE1]/40 hover:bg-[#F4EBE1] text-ocean border border-gold/20 hover:border-gold py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <Navigation class="h-3.5 w-3.5 text-gold" />
                  <span>Demander une excursion</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* GPS Route Planner Simulation */}
      <div class="bg-ocean text-sand rounded-2xl p-6 sm:p-8 border border-gold/20 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Route Selector & Info */}
        <div class="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div class="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 px-3 py-1.5 rounded-full text-gold text-xs font-semibold uppercase tracking-wider mb-4">
              <Route class="h-3.5 w-3.5 animate-pulse" />
              <span>Itinéraire GPS</span>
            </div>
            
            <h3 class="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">Comment venir à l'Hôtel ?</h3>
            <p class="text-xs text-sand/70 mb-6">
              Visualisez le trajet étape par étape depuis les grandes villes de départ ou le port autonome de Kribi.
            </p>

            <div class="space-y-3 mb-6">
              <label class="block text-[10px] font-sans font-bold uppercase tracking-wider text-sand/40">Sélectionner votre point de départ :</label>
              <div class="grid grid-cols-3 gap-2">
                {[
                  { id: "douala", name: "Douala" },
                  { id: "yaounde", name: "Yaoundé" },
                  { id: "port", name: "Port Kribi" }
                ].map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setRouteFrom(city.id);
                      setRouteStep(0);
                    }}
                    class={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      routeFrom === city.id
                        ? "bg-gold text-ocean shadow-md border-gold"
                        : "bg-white/5 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div class="bg-white/5 border border-white/10 rounded-xl p-4 font-sans">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs text-sand/60">Distance Totale :</span>
              <span class="text-sm font-bold text-white">{selectedRoute.totalDistance}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-sand/60">Temps estimé :</span>
              <span class="text-sm font-bold text-gold">{selectedRoute.totalTime}</span>
            </div>
          </div>
        </div>

        {/* Directions steps */}
        <div class="lg:col-span-7 bg-white/5 border border-white/10 rounded-xl p-6 font-sans flex flex-col justify-between">
          <div>
            <h4 class="font-serif font-bold text-lg text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
              <Milestone class="h-5 w-5 text-gold" />
              <span>Feuille de Route détaillée</span>
            </h4>
            
            <div class="space-y-4">
              {selectedRoute.steps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setRouteStep(idx)}
                  class={`flex gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
                    routeStep === idx ? "bg-white/5 border border-gold/20" : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div class={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    routeStep === idx ? "bg-gold text-ocean" : "bg-white/10 text-sand/70"
                  }`}>
                    {idx + 1}
                  </div>
                  <p class={`text-xs ${routeStep === idx ? "text-white font-medium" : "text-sand/80"}`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div class="pt-4 border-t border-white/10 mt-6 flex justify-between items-center text-xs">
            <span class="text-sand/60">Arrivée : BP 404, Kribi, Cameroun</span>
            <a
              href="https://maps.google.com/?q=Hôtel+EDIVINCE+Kribi"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gold hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Ouvrir sur Google Maps</span>
              <Navigation class="h-3 w-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
);
}
