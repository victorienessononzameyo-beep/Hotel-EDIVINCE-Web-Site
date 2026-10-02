import { MessageSquare, Phone, Calendar, Send } from "lucide-react";
import { useState } from "react";

interface FloatingActionBarProps {
  onOpenBooking: () => void;
  onOpenChat: () => void;
}

export default function FloatingActionBar({ onOpenBooking, onOpenChat }: FloatingActionBarProps) {
  const [showCallMenu, setShowCallMenu] = useState(false);
  const [showWhatsAppMenu, setShowWhatsAppMenu] = useState(false);

  const orangePhone = "+237696826609";
  const mtnPhone = "+237670497140";
  const defaultWhatsAppText = encodeURIComponent(
    "Bonjour, je souhaiterais obtenir des informations de disponibilité pour un séjour à l'Hôtel EDIVINCE A.N Kribi."
  );

  return (
    <>
      {/* Floating Action Bar Container (Fixed Bottom on Mobile, Hidden on Desktop) */}
      <div id="mobile-action-bar" class="fixed bottom-0 left-0 right-0 z-50 bg-ocean/95 backdrop-blur-md border-t border-gold/30 shadow-2xl py-2 px-4 md:hidden flex justify-around items-center rounded-t-xl">
        
        {/* APPELER CTA */}
        <div class="relative flex flex-col items-center">
          <button
            onClick={() => {
              setShowCallMenu(!showCallMenu);
              setShowWhatsAppMenu(false);
            }}
            class="flex flex-col items-center justify-center p-2 text-sand hover:text-gold transition-colors focus:outline-none"
          >
            <div class="p-2 bg-white/5 rounded-full border border-white/10 hover:border-gold/50 transition-colors">
              <Phone class="h-5 w-5 text-gold" />
            </div>
            <span class="text-[10px] font-sans font-medium mt-1">Appeler</span>
          </button>

          {showCallMenu && (
            <div class="absolute bottom-16 left-0 bg-ocean border border-gold/30 rounded-xl shadow-2xl p-2 w-48 animate-in slide-in-from-bottom duration-200">
              <div class="text-[10px] uppercase tracking-wider text-sand/60 px-3 py-1 font-semibold">Choisir un réseau</div>
              <a
                href={`tel:${orangePhone}`}
                onClick={() => setShowCallMenu(false)}
                class="flex items-center gap-2 px-3 py-2.5 hover:bg-white/5 rounded-lg text-sm text-white font-medium"
              >
                <span class="w-3 h-3 bg-orange-500 rounded-full"></span>
                <span>Orange (+237)</span>
              </a>
              <a
                href={`tel:${mtnPhone}`}
                onClick={() => setShowCallMenu(false)}
                class="flex items-center gap-2 px-3 py-2.5 hover:bg-white/5 rounded-lg text-sm text-white font-medium"
              >
                <span class="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span>MTN (+237)</span>
              </a>
            </div>
          )}
        </div>

        {/* WHATSAPP CTA */}
        <div class="relative flex flex-col items-center">
          <a
            href={`https://wa.me/${mtnPhone}?text=${defaultWhatsAppText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setShowCallMenu(false);
              setShowWhatsAppMenu(false);
            }}
            class="flex flex-col items-center justify-center p-2 text-sand hover:text-gold transition-colors focus:outline-none"
          >
            <div class="p-2 bg-green-500/20 rounded-full border border-green-500/40 hover:border-green-400 transition-colors">
              <Send class="h-5 w-5 text-green-400" />
            </div>
            <span class="text-[10px] font-sans font-medium mt-1">WhatsApp (MTN)</span>
          </a>
        </div>

        {/* RESERVER CTA */}
        <button
          onClick={() => {
            onOpenBooking();
            setShowCallMenu(false);
            setShowWhatsAppMenu(false);
          }}
          class="flex flex-col items-center justify-center p-2 text-sand hover:text-gold transition-colors focus:outline-none"
        >
          <div class="p-2 bg-gold text-ocean rounded-full shadow-md border border-gold hover:scale-105 transition-transform">
            <Calendar class="h-5 w-5" />
          </div>
          <span class="text-[10px] font-sans font-bold text-gold mt-1">Réserver</span>
        </button>

      </div>
    </>
  );
}
