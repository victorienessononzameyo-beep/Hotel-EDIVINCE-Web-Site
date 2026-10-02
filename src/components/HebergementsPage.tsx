import { useState } from "react";
import { Room, RoomSlug } from "../types";
import RoomCard from "./RoomCard";
import { Sparkles, Calendar, Users, Filter, Phone, CheckCircle2, ShieldCheck, Clock, Award } from "lucide-react";

interface HebergementsPageProps {
  rooms: Room[];
  onBookRoom: (slug: RoomSlug | "") => void;
  onOpenLightbox: (url: string, caption: string) => void;
}

export default function HebergementsPage({
  rooms,
  onBookRoom,
  onOpenLightbox
}: HebergementsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestsCount, setGuestsCount] = useState("all");

  const categories = [
    { id: "all", label: "Toutes les catégories" },
    { id: "suite", label: "Suites Juniors & Salon" },
    { id: "prestige", label: "Chambres Prestige" },
    { id: "standard", label: "Chambres Standards" },
  ];

  const filteredRooms = rooms.filter((room) => {
    if (selectedCategory === "suite") {
      return room.slug.includes("suite");
    }
    if (selectedCategory === "prestige") {
      return room.slug.includes("prestige");
    }
    if (selectedCategory === "standard") {
      return room.slug.includes("standard") || room.slug.includes("classique") || room.slug.includes("budget");
    }
    if (guestsCount !== "all") {
      return room.capacity >= parseInt(guestsCount);
    }
    return true;
  });

  return (
    <div id="hebergements-view" class="bg-[#F8F5F0] min-h-screen pb-20 font-sans text-ocean">
      
      {/* ================= HERO HEADER BANNER WITH IMAGE & MESSAGE ================= */}
      <section 
        class="relative h-[340px] sm:h-[420px] bg-[#0A2342] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(10,35,66,0.65), rgba(10,35,66,0.9)), url('https://res.cloudinary.com/ccmyhjca/image/upload/v1785749361/Salon_Suite._bcvvrd.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div class="relative z-10 max-w-3xl px-4 space-y-3 animate-in fade-in duration-500">
          <span class="text-xs sm:text-sm font-sans font-bold tracking-widest text-gold uppercase block">
            — HÉBERGEMENTS —
          </span>
          <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Chambres & Suites d'Exception
          </h1>
          <p class="text-sm sm:text-base text-sand/90 font-sans max-w-xl mx-auto leading-relaxed pt-1">
            Le confort absolu face à la Marina de Kribi, dans un cadre raffiné et sécurisé.
          </p>
          <div class="pt-2">
            <span class="inline-block text-[11px] font-mono uppercase tracking-widest text-gold/90 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/30">
              ACCUEIL · HÉBERGEMENTS
            </span>
          </div>
        </div>
      </section>

      {/* ================= GALVANIZING BOOKING CALL-TO-ACTION BANNER ================= */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gold/30">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div class="lg:col-span-7 space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-xs text-gold font-bold uppercase tracking-widest">
                  Réservation directe
                </span>
                <span class="bg-palm/10 text-palm text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Meilleur Tarif Garanti
                </span>
              </div>
              <h2 class="font-serif text-2xl sm:text-3xl font-bold text-ocean">
                Prêt à réserver votre séjour ?
              </h2>
              <p class="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                Réservez en quelques clics ou contactez directement notre réception disponible 24h/24 pour vous garantir le meilleur tarif et une expérience inoubliable face à l'océan.
              </p>
            </div>

            <div class="lg:col-span-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onBookRoom("")}
                class="flex-1 bg-gold hover:bg-gold/90 text-ocean font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar class="h-4 w-4" />
                <span>Réserver en Ligne</span>
              </button>
              <a
                href="https://wa.me/237670497140?text=Bonjour,%20je%20souhaite%20réserver%20une%20chambre%20à%20l'Hôtel%20EDIVINCE%20A.N."
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 bg-ocean hover:bg-ocean/90 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Phone class="h-4 w-4 text-gold" />
                <span>WhatsApp Direct</span>
              </a>
            </div>

          </div>

          {/* Quick Filter Bar */}
          <div class="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-semibold text-gray-500 flex items-center gap-1 mr-2">
                <Filter class="h-3.5 w-3.5 text-gold" /> Catégorie :
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "text-gold font-bold underline decoration-gold decoration-2 underline-offset-4 bg-transparent border border-gold/40 shadow-xs"
                      : "bg-[#F4EBE1]/60 text-ocean/70 hover:text-gold hover:bg-gold/10 font-medium"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div class="text-xs text-gray-500 font-medium">
              <strong class="text-ocean font-bold">{filteredRooms.length}</strong> hébergements disponibles
            </div>
          </div>
        </div>
      </div>

      {/* ================= ROOMS GRID ================= */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onBook={onBookRoom}
              onOpenLightbox={onOpenLightbox}
            />
          ))}
        </div>
      </section>

      {/* ================= INCLUDED AMENITIES ================= */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div class="bg-white rounded-3xl p-8 border border-gold/20 shadow-sm text-center">
          <span class="text-xs text-gold font-bold uppercase tracking-widest block">
            Prestations incluses
          </span>
          <h3 class="font-serif text-2xl font-bold text-ocean mt-1">
            Tout le confort pour un séjour parfait
          </h3>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 text-left">
            <div class="flex items-start gap-3">
              <CheckCircle2 class="h-5 w-5 text-palm flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="font-bold text-ocean text-xs">Climatisation & TV HD</h4>
                <p class="text-[11px] text-gray-500">Canal+ Satellite et confort thermique</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <CheckCircle2 class="h-5 w-5 text-palm flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="font-bold text-ocean text-xs">Accès Piscine & Plage</h4>
                <p class="text-[11px] text-gray-500">Baignade et transats inclus</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <CheckCircle2 class="h-5 w-5 text-palm flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="font-bold text-ocean text-xs">WiFi Haut Débit Starlink</h4>
                <p class="text-[11px] text-gray-500">Connexion stable et illimitée</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <CheckCircle2 class="h-5 w-5 text-palm flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="font-bold text-ocean text-xs">Room Service 24h/24</h4>
                <p class="text-[11px] text-gray-500">Service en chambre à toute heure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
