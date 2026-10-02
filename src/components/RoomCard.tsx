import { useState, useEffect } from "react";
import { Room, RoomSlug } from "../types";
import { Users, Bed, Square, ShieldCheck, ChevronLeft, ChevronRight, Play } from "lucide-react";

interface RoomCardProps {
  room: Room;
  onBook: (roomSlug: RoomSlug) => void;
  onOpenLightbox?: (url: string, caption: string) => void;
}

export default function RoomCard({ room, onBook, onOpenLightbox }: RoomCardProps) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Normalize gallery list or fallback to single image
  const mediaList = room.gallery && room.gallery.length > 0
    ? room.gallery
    : [{ type: "image" as const, url: room.image, title: room.name }];

  const currentMedia = mediaList[mediaIndex] || mediaList[0];

  // Auto-play slideshow for room gallery images (déroulantes)
  useEffect(() => {
    if (mediaList.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setMediaIndex((prev) => (prev + 1) % mediaList.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [mediaList.length, isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMediaIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMediaIndex((prev) => (prev + 1) % mediaList.length);
  };

  // Format price in FCFA
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  return (
    <div
      id={`room-card-${room.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      class="bg-white rounded-2xl overflow-hidden shadow-md border border-gold/10 hover:shadow-xl hover:border-gold/30 transition-all duration-300 flex flex-col group"
    >
      
      {/* Image & Video Carousel Container */}
      <div class="relative h-64 overflow-hidden bg-[#0A2342] flex items-center justify-center">
        {currentMedia ? (
          currentMedia.type === "video" ? (
            <div class="relative w-full h-full">
              <video
                src={currentMedia.url}
                autoPlay
                loop
                muted
                playsInline
                class="w-full h-full object-cover"
              />
              <div class="absolute top-4 right-4 z-10 bg-black/60 text-gold text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-gold/30 backdrop-blur-md">
                <Play class="h-3 w-3 fill-current" />
                <span>Vidéo</span>
              </div>
            </div>
          ) : (
            <img
              src={currentMedia.url}
              alt={currentMedia.title || room.name}
              referrerPolicy="no-referrer"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={() => onOpenLightbox && onOpenLightbox(currentMedia.url, `${room.name} — ${currentMedia.title || ""}`)}
            />
          )
        ) : (
          <div class="text-center">
            <span class="text-gold/40 text-[10px] font-mono tracking-widest uppercase block mb-1">Chambre & Suite</span>
            <span class="text-white font-serif text-lg font-bold tracking-tight">{room.name}</span>
          </div>
        )}

        {/* Carousel Navigation Arrows if multiple media */}
        {mediaList.length > 1 && (
          <div class="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between z-20 pointer-events-none">
            <button
              onClick={handlePrev}
              class="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20 pointer-events-auto cursor-pointer shadow-md hover:scale-110"
              title="Photo précédente"
            >
              <ChevronLeft class="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              class="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all border border-white/20 pointer-events-auto cursor-pointer shadow-md hover:scale-110"
              title="Photo suivante"
            >
              <ChevronRight class="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Dots Indicator */}
        {mediaList.length > 1 && (
          <div class="absolute bottom-3 left-4 flex gap-1.5 z-20">
            {mediaList.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setMediaIndex(idx);
                }}
                class={`h-1.5 rounded-full transition-all cursor-pointer ${
                  mediaIndex === idx ? "w-5 bg-gold" : "w-1.5 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}

        {/* Price Tag Overlay */}
        <div class="absolute top-4 left-4 z-10 bg-ocean/90 backdrop-blur-md text-sand font-sans font-bold text-xs px-3.5 py-1.5 rounded-full border border-gold/30 shadow-md">
          {formatPrice(room.price)} / NUIT
        </div>

        {/* Slide Counter Badge */}
        {mediaList.length > 1 && (
          <div class="absolute bottom-3 right-4 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-white/20">
            {mediaIndex + 1} / {mediaList.length}
          </div>
        )}

        {mediaList.length <= 1 && (
          <div class="absolute bottom-4 right-4 z-10 bg-gold text-ocean font-sans font-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
            <ShieldCheck class="h-3 w-3" />
            <span>Garanti direct</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div class="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-serif text-xl font-bold text-ocean group-hover:text-gold transition-colors">
              {room.name}
            </h3>
            <div class="flex items-center gap-1 text-gold">
              <span class="text-xs font-semibold">4.9</span>
              <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </div>
          </div>
          
          <p class="text-xs text-gray-600 line-clamp-2 font-sans mb-4 leading-relaxed">
            {room.description}
          </p>

          {/* Quick specs */}
          <div class="grid grid-cols-3 gap-2 border-t border-b border-gold/10 py-3 mb-4">
            <div class="flex flex-col items-center justify-center text-center">
              <Users class="h-4 w-4 text-palm mb-1" />
              <span class="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Capacité</span>
              <span class="text-xs font-semibold text-ocean">{room.capacity}</span>
            </div>
            <div class="flex flex-col items-center justify-center text-center border-l border-r border-gold/10">
              <Bed class="h-4 w-4 text-palm mb-1" />
              <span class="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Lit(s)</span>
              <span class="text-xs font-semibold text-ocean truncate max-w-full px-1">{room.bedType}</span>
            </div>
            <div class="flex flex-col items-center justify-center text-center">
              <Square class="h-4 w-4 text-palm mb-1" />
              <span class="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Taille</span>
              <span class="text-xs font-semibold text-ocean">{room.size}</span>
            </div>
          </div>

          {/* Key features bullets */}
          <div class="mb-6">
            <div class="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-400 mb-2">Inclus dans la chambre :</div>
            <div class="flex flex-wrap gap-1.5">
              {room.features.slice(0, 4).map((feature, idx) => (
                <span key={idx} class="bg-[#F4EBE1]/60 text-ocean text-[11px] font-medium px-2.5 py-1 rounded-md border border-gold/10">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div class="flex gap-2">
          <button
            onClick={() => onBook(room.slug)}
            class="flex-1 bg-ocean hover:bg-ocean/90 text-sand hover:text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md border border-ocean flex items-center justify-center gap-1 cursor-pointer"
          >
            Réserver
          </button>
          <a
            href={`https://wa.me/237696826609?text=Mbolo, je souhaite réserver la ${encodeURIComponent(room.name)} à l'Hôtel EDIVINCE Kribi.`}
            target="_blank"
            rel="noopener noreferrer"
            class="px-3 bg-green-50 hover:bg-green-100 text-green-600 border border-green-200 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer"
            title="Réserver via WhatsApp"
          >
            <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.022-.014-.45-.223-.52-.247-.07-.024-.121-.037-.172.037-.052.074-.199.247-.243.296-.045.05-.09.055-.162.018-.073-.037-.307-.113-.585-.362-.216-.193-.362-.432-.405-.504-.044-.072-.005-.11.032-.146.033-.033.073-.085.109-.128.037-.043.05-.073.074-.122.025-.049.012-.093-.006-.129-.018-.037-.172-.413-.236-.567-.062-.15-.125-.13-.172-.132-.045-.002-.097-.002-.149-.002-.052 0-.136.02-.208.097-.072.078-.276.27-.276.659s.284.764.324.818c.04.054.56 1.861 1.357 2.199.797.338.797.226.94.21.144-.016.45-.184.512-.351.063-.167.063-.31.044-.34-.02-.03-.07-.048-.142-.083zM12.003 21c-1.623 0-3.142-.424-4.464-1.166l-.32-.19-3.325.872.886-3.242-.208-.331C3.816 15.791 3.3 13.978 3.3 12.002c0-4.8 3.9-8.7 8.7-8.7 4.8 0 8.7 3.9 8.7 8.7 0 4.8-3.9 8.7-8.7 8.7zM12 2C6.48 2 2 6.48 2 12c0 1.95.56 3.77 1.52 5.31L2 22l4.83-1.26C8.31 21.46 10.1 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
