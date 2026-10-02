import { ViewType } from "../types";
import { Menu, X, Landmark, Award, Shield, MessageSquare, Phone, Star } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onOpenChat?: () => void;
}

export default function Header({ currentView, onViewChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: { id: ViewType; label: string }[] = [
    { id: "home", label: "Accueil" },
    { id: "hebergements", label: "Hébergements" },
    { id: "galerie", label: "Galerie" },
    { id: "guide", label: "Guide kribi" },
    { id: "services", label: "Services" },
    { id: "restaurant", label: "Restaurant" },
    { id: "admin", label: "Admin." },
  ];

  // Helper to check active state considering legacy aliases
  const isItemActive = (id: ViewType) => {
    if (currentView === id) return true;
    if (id === "hebergements" && currentView === "chambres") return true;
    if (id === "restaurant" && currentView === "mimosa") return true;
    if (id === "admin" && currentView === "dashboard") return true;
    return false;
  };

  return (
    <header id="app-header" class="sticky top-0 z-40 bg-sand/95 backdrop-blur-md text-ocean shadow-md border-b border-gold/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div class="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onViewChange("home")}>
            <img 
              src="https://res.cloudinary.com/ccmyhjca/image/upload/v1785310757/WhatsApp_Image_2026-07-28_at_08.53.29-removebg-preview_tryhep.png" 
              alt="Hôtel EDIVINCE Logo" 
              class="h-10 sm:h-12 w-auto object-contain mr-3 filter drop-shadow" 
            />
            <div>
              <h1 class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-ocean flex items-center gap-1">
                EDIVINCE <span class="text-gold text-sm font-sans tracking-widest uppercase block sm:inline">A.N</span>
              </h1>
              <p class="text-xs text-ocean/70 font-sans tracking-wider uppercase">Face Marina • Kribi</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {menuItems.map((item) => {
              const active = isItemActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-3 py-2 text-sm font-sans transition-all duration-200 cursor-pointer ${
                    active
                      ? "text-gold font-bold underline decoration-gold decoration-2 underline-offset-8 bg-transparent"
                      : "text-ocean/85 hover:text-gold hover:bg-transparent font-medium"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Call-to-actions / Reception status */}
          <div class="hidden lg:flex items-center space-x-3">
            <a
              href={`https://wa.me/237670497140?text=${encodeURIComponent("Bonjour, je souhaite contacter l'Hôtel EDIVINCE A.N Kribi.")}`}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 bg-transparent hover:bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/40 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300"
            >
              <svg class="h-4 w-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+237696826609"
              class="flex items-center gap-1.5 bg-gold text-ocean font-bold px-3.5 py-2 rounded-lg text-xs tracking-wider transition-all duration-300 shadow-sm hover:bg-gold/90"
            >
              <Phone class="h-3.5 w-3.5" />
              <span>+237 696 82 66 09</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div class="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              class="p-2 rounded-lg text-ocean hover:text-ocean hover:bg-ocean/5 transition-colors focus:outline-none cursor-pointer"
            >
              {isOpen ? <X class="h-6 w-6" /> : <Menu class="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-sand border-t border-gold/20 px-4 pt-2 pb-4 space-y-1 shadow-inner animate-in fade-in duration-200">
          {menuItems.map((item) => {
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left block px-4 py-3 rounded-lg text-base transition-colors cursor-pointer ${
                  active
                    ? "text-gold font-bold underline decoration-gold decoration-2 underline-offset-4 bg-transparent"
                    : "text-ocean/80 hover:text-gold hover:bg-transparent font-medium"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div class="pt-4 border-t border-ocean/10 flex flex-col gap-2">
            <div class="flex items-center justify-center space-x-2 py-2 text-xs text-palm bg-palm/10 rounded-lg">
              <span class="w-2 h-2 bg-palm rounded-full animate-pulse"></span>
              <span>Réception 24h/24 – En ligne</span>
            </div>
            <a
              href="https://wa.me/237670497140"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#20ba5a] transition-all"
            >
              <span>Contacter sur WhatsApp (+237 670 49 71 40)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
