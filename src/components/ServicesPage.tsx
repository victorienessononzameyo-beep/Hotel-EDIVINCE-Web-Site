import { useState } from "react";
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Car, 
  ShieldCheck, 
  Wifi, 
  Utensils, 
  Waves, 
  Compass, 
  Calendar, 
  Phone, 
  ChevronRight, 
  CheckCircle2, 
  Check, 
  HelpCircle,
  X,
  Send,
  Coffee,
  Users,
  Award,
  Zap,
  Flame,
  Camera,
  Heart
} from "lucide-react";

interface ServiceBookingModalProps {
  serviceTitle: string;
  servicePrice: string;
  onClose: () => void;
}

function ServiceBookingModal({ serviceTitle, servicePrice, onClose }: ServiceBookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState("2");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = encodeURIComponent(
      `*Demande de Réservation d'Activité / Prestation — Hôtel EDIVINCE A.N*\n\n` +
      `📌 *Activité / Service :* ${serviceTitle}\n` +
      `💰 *Tarif :* ${servicePrice}\n` +
      `👤 *Nom & Prénom :* ${name}\n` +
      `📞 *Téléphone / WhatsApp :* ${phone}\n` +
      `📅 *Date souhaitée :* ${date}\n` +
      `👥 *Nombre de personnes :* ${participants}\n` +
      `📝 *Notes / Précisions :* ${notes || "Aucune"}`
    );
    window.open(`https://wa.me/237670497140?text=${whatsappMsg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-gold/30 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left font-sans text-ocean">
        <button
          onClick={onClose}
          class="absolute top-4 right-4 text-gray-400 hover:text-ocean text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <div class="space-y-1">
              <span class="text-xs text-gold font-bold uppercase tracking-widest block">
                Réservation Activité & Prestation
              </span>
              <h3 class="font-serif text-2xl font-bold text-ocean">
                {serviceTitle}
              </h3>
              <p class="text-xs text-gold font-semibold">
                {servicePrice}
              </p>
            </div>

            <form onSubmit={handleSubmit} class="space-y-3 text-xs">
              <div>
                <label class="block text-gray-700 font-semibold mb-1">Votre Nom & Prénom *</label>
                <input 
                  required 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: M. / Mme ..." 
                  class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none" 
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-gray-700 font-semibold mb-1">Téléphone / WhatsApp *</label>
                  <input 
                    required 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+237 6..." 
                    class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none" 
                  />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-1">Date souhaitée *</label>
                  <input 
                    required 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none" 
                  />
                </div>
              </div>

              <div>
                <label class="block text-gray-700 font-semibold mb-1">Nombre de participants *</label>
                <input 
                  required 
                  type="number" 
                  min="1" 
                  max="50" 
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none" 
                />
              </div>

              <div>
                <label class="block text-gray-700 font-semibold mb-1">Précisions ou requêtes spécifiques</label>
                <textarea 
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Horaire préféré, transport depuis l'hôtel..." 
                  class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none resize-none" 
                />
              </div>

              <button
                type="submit"
                class="w-full bg-gold hover:bg-gold/90 text-ocean font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send class="h-4 w-4" />
                <span>Confirmer la demande via WhatsApp</span>
              </button>
            </form>
          </>
        ) : (
          <div class="text-center py-6 space-y-4">
            <div class="w-14 h-14 bg-palm/10 text-palm rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 class="h-8 w-8" />
            </div>
            <h4 class="font-serif text-2xl font-bold text-ocean">Demande transmise !</h4>
            <p class="text-xs text-gray-600">
              Votre demande a été envoyée à notre équipe d'animation et conciergerie. Nous vous recontacterons très rapidement.
            </p>
            <button
              onClick={onClose}
              class="bg-ocean text-gold font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<{ title: string; price: string } | null>(null);

  const handleBook = (title: string, price: string) => {
    setSelectedService({ title, price });
  };

  return (
    <div id="services-view" class="bg-[#F8F5F0] min-h-screen pb-20 font-sans text-ocean">
      
      {/* ================= HERO HEADER BANNER ================= */}
      <section 
        class="relative h-[340px] sm:h-[420px] bg-[#0A2342] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(10,35,66,0.65), rgba(10,35,66,0.9)), url('https://res.cloudinary.com/ccmyhjca/image/upload/v1784189325/chutes_de_la_lobe_hd_enhanced_byeydq.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div class="relative z-10 max-w-3xl px-4 space-y-3 animate-in fade-in duration-500">
          <span class="text-xs sm:text-sm font-sans font-bold tracking-widest text-gold uppercase block">
            — NOS PRESTATIONS & ACTIVITÉS —
          </span>
          <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Services & Aventures
          </h1>
          <p class="text-sm sm:text-base text-sand/90 font-sans max-w-xl mx-auto leading-relaxed pt-1">
            Activités 100% sensations, massages relaxants en chambre ou au bord de la piscine, excursions et conciergerie VIP à Kribi.
          </p>
          <div class="pt-2">
            <span class="inline-block text-[11px] font-mono uppercase tracking-widest text-gold/90 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/30">
              ACCUEIL · SERVICES & AVENTURES
            </span>
          </div>
        </div>
      </section>

      {/* ================= SECTION AVENTURE: VIVEZ L'AVENTURE 100% SENSATIONS ================= */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div class="bg-[#0A2342] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-gold/40 relative overflow-hidden">
          <div class="absolute -right-20 -top-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div class="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1.5 rounded-full text-xs uppercase font-bold tracking-widest border border-gold/30">
              <Zap class="h-4 w-4" />
              <span>Vivez l'aventure</span>
            </div>
            <h2 class="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              « SENTEZ L'ADRÉNALINE, CRÉEZ DES SOUVENIRS »
            </h2>
            <p class="text-sm sm:text-base text-gold font-bold font-sans tracking-wide">
              À KRIBI — CHUTES DE LA LOBÉ & MARINA
            </p>
            <p class="text-xs sm:text-sm text-sand/80 max-w-xl mx-auto">
              Découvrez nos activités <strong>100% sensations</strong>. Tout en un, au même endroit, encadré par des professionnels certifiés.
            </p>
          </div>

          {/* 3 CARDS ACTIVITÉS SENSATIONS */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. JET-SKI */}
            <div class="bg-white/10 backdrop-blur-md border border-gold/30 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/15 hover:border-gold transition-all group">
              <div class="space-y-4">
                <div class="h-44 rounded-2xl overflow-hidden relative bg-black/40">
                  <img
                    src="https://i.ytimg.com/vi/j2YIQL-yHnI/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLDCN7nWNBPd9p-bHJE5Qw3STm0xzw"
                    alt="Jet-Ski Kribi"
                    referrerPolicy="no-referrer"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                    100% Sensations
                  </div>
                  <div class="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-gold text-xs font-bold px-3 py-1 rounded-lg">
                    KAWASAKI / YAMAHA
                  </div>
                </div>

                <div>
                  <h3 class="font-serif text-2xl font-black text-white tracking-wide">
                    JET-SKI
                  </h3>
                  <p class="text-xs font-bold text-gold uppercase tracking-wider mt-0.5">
                    SENSATIONS GARANTIES !
                  </p>
                  <p class="text-xs text-sand/80 mt-2 leading-relaxed">
                    Glissez à pleine vitesse sur les vagues de l'océan Atlantique face aux chutes et à la marina avec nos motomarines haute performance.
                  </p>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-gray-300 block uppercase">À partir de</span>
                  <span class="font-bold text-lg text-gold font-sans">10 000 FCFA</span>
                  <span class="text-[10px] text-gray-300 block">la session</span>
                </div>
                <button
                  onClick={() => handleBook("Jet-Ski à Kribi (Sensations Garanties)", "10 000 FCFA la session")}
                  class="bg-gold hover:bg-gold/90 text-ocean font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider shadow transition-all cursor-pointer"
                >
                  Réserver
                </button>
              </div>
            </div>

            {/* 2. QUAD */}
            <div class="bg-white/10 backdrop-blur-md border border-gold/30 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/15 hover:border-gold transition-all group">
              <div class="space-y-4">
                <div class="h-44 rounded-2xl overflow-hidden relative bg-black/40">
                  <img
                    src="https://cdn.seneguide.com/images/cache/meetus_1200/images/meetus/gallery/quad-plage-6989e9614a4ad764080100.webp"
                    alt="Randonnée en Quad Tout-Terrain à Kribi"
                    referrerPolicy="no-referrer"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute top-3 right-3 bg-palm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                    Piste & Plage
                  </div>
                  <div class="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-gold text-xs font-bold px-3 py-1 rounded-lg">
                    EXPLORATION TT
                  </div>
                </div>

                <div>
                  <h3 class="font-serif text-2xl font-black text-white tracking-wide">
                    QUAD
                  </h3>
                  <p class="text-xs font-bold text-gold uppercase tracking-wider mt-0.5">
                    PARCOUREZ, EXPLOREZ, VIBREZ !
                  </p>
                  <p class="text-xs text-sand/80 mt-2 leading-relaxed">
                    Randonnées tout-terrain sur le sable fin des plages, les sentiers côtiers et les pistes bordant la forêt équatoriale de Kribi.
                  </p>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-gray-300 block uppercase">À partir de</span>
                  <span class="font-bold text-lg text-gold font-sans">5 000 FCFA</span>
                  <span class="text-[10px] text-gray-300 block">la session</span>
                </div>
                <button
                  onClick={() => handleBook("Randonnée en Quad (Explorez & Vibrez)", "5 000 FCFA la session")}
                  class="bg-gold hover:bg-gold/90 text-ocean font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider shadow transition-all cursor-pointer"
                >
                  Réserver
                </button>
              </div>
            </div>

            {/* 3. BOUÉE TRACTÉE */}
            <div class="bg-white/10 backdrop-blur-md border border-gold/30 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/15 hover:border-gold transition-all group">
              <div class="space-y-4">
                <div class="h-44 rounded-2xl overflow-hidden relative bg-black/40">
                  <img
                    src="https://contents.mediadecathlon.com/p1633891/k$a4d27cd9cc0615f7c31eeac0b01ee1f5/1800x0/1250pt1175/2500xcr1875/bouee-tractee-3-personnes.jpg?format=auto"
                    alt="Bouée Tractée en Mer à Kribi"
                    referrerPolicy="no-referrer"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                    Fous Rires
                  </div>
                  <div class="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-gold text-xs font-bold px-3 py-1 rounded-lg">
                    GROUPE & DUO
                  </div>
                </div>

                <div>
                  <h3 class="font-serif text-2xl font-black text-white tracking-wide">
                    BOUÉE TRACTÉE
                  </h3>
                  <p class="text-xs font-bold text-gold uppercase tracking-wider mt-0.5">
                    FOUS RIRES ET SENSATIONS FORTES !
                  </p>
                  <p class="text-xs text-sand/80 mt-2 leading-relaxed">
                    Accrochez-vous en solo, en duo ou entre amis pour une session palpitante tractée par bateau rapide au large des côtes kribiennes.
                  </p>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-gray-300 block uppercase">À partir de</span>
                  <span class="font-bold text-lg text-gold font-sans">25 000 FCFA</span>
                  <span class="text-[10px] text-gray-300 block">la session</span>
                </div>
                <button
                  onClick={() => handleBook("Bouée Tractée (Sensations Fortes & Fous Rires)", "25 000 FCFA la session")}
                  class="bg-gold hover:bg-gold/90 text-ocean font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider shadow transition-all cursor-pointer"
                >
                  Réserver
                </button>
              </div>
            </div>

          </div>

          {/* AVANTAGES & ENGAGEMENTS AVENTURE */}
          <div class="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div class="p-3 bg-white/5 rounded-2xl border border-white/10">
              <ShieldCheck class="h-6 w-6 text-gold mx-auto mb-1.5" />
              <div class="text-xs font-bold uppercase tracking-wider text-white">MATÉRIEL SÉCURISÉ</div>
              <p class="text-[10px] text-sand/70 mt-0.5">Gilets & équipements certifiés</p>
            </div>
            <div class="p-3 bg-white/5 rounded-2xl border border-white/10">
              <Award class="h-6 w-6 text-gold mx-auto mb-1.5" />
              <div class="text-xs font-bold uppercase tracking-wider text-white">ENCADREMENT PROFESSIONNEL</div>
              <p class="text-[10px] text-sand/70 mt-0.5">Moniteurs & sauveteurs qualifiés</p>
            </div>
            <div class="p-3 bg-white/5 rounded-2xl border border-white/10">
              <Compass class="h-6 w-6 text-gold mx-auto mb-1.5" />
              <div class="text-xs font-bold uppercase tracking-wider text-white">CADRE NATUREL EXCEPTIONNEL</div>
              <p class="text-[10px] text-sand/70 mt-0.5">Marina & Chutes de la Lobé</p>
            </div>
            <div class="p-3 bg-white/5 rounded-2xl border border-white/10">
              <Camera class="h-6 w-6 text-gold mx-auto mb-1.5" />
              <div class="text-xs font-bold uppercase tracking-wider text-white">PHOTOS & VIDÉOS DISPONIBLES</div>
              <p class="text-[10px] text-sand/70 mt-0.5">GoPro & prises de vue souvenir</p>
            </div>
          </div>

          <div class="mt-6 text-center">
            <span class="inline-block text-xs font-serif italic text-gold/90">
              Aventure — Nature — Plaisir : Tout en un, au même endroit ! Venez vivre une expérience inoubliable !
            </span>
          </div>
        </div>
      </section>

      {/* ================= SECTION PRESTATIONS EXCLUSIVES : BALADE EN BATEAU & MASSAGE ================= */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div class="text-center mb-10">
          <span class="text-xs text-gold font-bold uppercase tracking-widest block">
            Prestations Privilèges
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-ocean mt-1">
            Balades Nautiques & Massages Sur Mesure
          </h2>
          <p class="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mt-2">
            Des moments d'exception pensés pour votre bien-être et votre plaisir lors de votre séjour à l'Hôtel EDIVINCE A.N.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 1. BALADE EN BATEAU */}
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-gold/25 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div class="space-y-4">
              <div class="h-52 rounded-2xl overflow-hidden relative bg-ocean">
                <img 
                  src="https://res.cloudinary.com/ccmyhjca/image/upload/v1787899955/WhatsApp_Image_2026-08-22_at_12.55.59_draegp.jpg" 
                  alt="Accueil Chaleureux & Balade en bateau à Kribi" 
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-3 right-3 bg-gold text-ocean font-bold text-xs px-3 py-1 rounded-full shadow">
                  Sur Mesure
                </div>
                <div class="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
                  <Waves class="h-3 w-3 text-gold" />
                  <span>Départ Marina Kribi</span>
                </div>
              </div>

              <div>
                <span class="text-xs uppercase font-bold tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                  Excursion Nautique
                </span>
                <h3 class="font-serif text-2xl font-bold text-ocean mt-2">
                  Balade en bateau & Yachting
                </h3>
                <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                  Embarquez depuis la Marina pour une croisière inoubliable sur l'océan Atlantique. Admirez le coucher du soleil, longez la côte sauvage, découvrez les embouchures fluviales et célébrez avec un service de champagne à bord.
                </p>
                <div class="mt-3 flex flex-wrap gap-2 text-xs text-palm font-medium">
                  <span class="bg-palm/10 px-2.5 py-1 rounded-lg flex items-center gap-1"><Check class="h-3.5 w-3.5" /> Pirogues & Bateaux rapides</span>
                  <span class="bg-palm/10 px-2.5 py-1 rounded-lg flex items-center gap-1"><Check class="h-3.5 w-3.5" /> Champagne & Rafraîchissements</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span class="text-[11px] text-gray-500">Tarif par heure (1h) · Départ Marina</span>
                <div class="text-base font-bold text-gold font-sans">À partir de 100 000 FCFA / 1h</div>
              </div>
              <button
                onClick={() => handleBook("Balade en Bateau à Kribi (Croisière Marina & Côtes)", "À partir de 100 000 FCFA / 1h")}
                class="bg-ocean hover:bg-ocean/90 text-gold font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Réserver
              </button>
            </div>
          </div>

          {/* 2. MASSAGE À DOMICILE / EN CHAMBRE / PISCINE */}
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-gold/25 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div class="space-y-4">
              <div class="h-52 rounded-2xl overflow-hidden relative bg-ocean">
                <img 
                  src="https://tse3.mm.bing.net/th/id/OIP.oU2D5VUGNu5K9LScudzvuQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" 
                  alt="Massage de relaxation à domicile, en chambre ou piscine" 
                  referrerPolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-3 right-3 bg-palm text-white font-bold text-xs px-3 py-1 rounded-full shadow">
                  100% Relaxation
                </div>
                <div class="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
                  <Heart class="h-3 w-3 text-gold" />
                  <span>Chambre VIP ou Bord Piscine</span>
                </div>
              </div>

              <div>
                <span class="text-xs uppercase font-bold tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                  Bien-être & Spa
                </span>
                <h3 class="font-serif text-2xl font-bold text-ocean mt-2">
                  Massage à domicile, en chambre ou au bord de la piscine
                </h3>
                <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                  Profitez de soins relaxants, massages aux huiles essentielles locales, gommages et rituels de relaxation personnalisés directement dans l'intimité de votre suite ou sous la brise marine au bord de la piscine.
                </p>
                <div class="mt-3 flex flex-wrap gap-2 text-xs text-palm font-medium">
                  <span class="bg-palm/10 px-2.5 py-1 rounded-lg flex items-center gap-1"><Check class="h-3.5 w-3.5" /> Praticiennes qualifiées</span>
                  <span class="bg-palm/10 px-2.5 py-1 rounded-lg flex items-center gap-1"><Check class="h-3.5 w-3.5" /> Huiles précieuses & Sérénité</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span class="text-[11px] text-gray-500">Séance 45 min / 1 heure</span>
                <div class="text-base font-bold text-gold font-sans">À partir de 20 000 FCFA</div>
              </div>
              <button
                onClick={() => handleBook("Massage personnalisé (En Chambre VIP ou Bord Piscine)", "À partir de 20 000 FCFA")}
                class="bg-gold hover:bg-gold/90 text-ocean font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow cursor-pointer"
              >
                Réserver
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION EXCURSIONS TOURISTIQUES ================= */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div class="text-center mb-10">
          <span class="text-xs text-gold font-bold uppercase tracking-widest block">
            Découverte du Littoral
          </span>
          <h2 class="font-serif text-3xl sm:text-4xl font-bold text-ocean mt-1">
            Les Excursions Incontournables
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Chutes de la Lobé */}
          <div class="bg-white rounded-3xl overflow-hidden border border-gold/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div class="h-48 relative overflow-hidden bg-ocean">
              <img 
                src="https://res.cloudinary.com/ccmyhjca/image/upload/v1784189325/chutes_de_la_lobe_hd_enhanced_byeydq.jpg" 
                alt="Les Chutes de la Lobé" 
                class="w-full h-full object-cover"
              />
              <div class="absolute top-3 right-3 bg-gold text-ocean font-bold text-xs px-3 py-1 rounded-full shadow">
                5 000 XAF / pers.
              </div>
            </div>
            <div class="p-5 space-y-3 flex-grow flex flex-col justify-between">
              <div>
                <h4 class="font-serif text-lg font-bold text-ocean">
                  Les Chutes de la Lobé en Pirogue
                </h4>
                <p class="text-xs text-gray-600 mt-1 leading-relaxed">
                  Le spectacle saisissant des chutes se jetant dans l'océan. Dégustation de crevettes fraîches sur la plage.
                </p>
              </div>
              <button
                onClick={() => handleBook("Excursion Chutes de la Lobé", "5 000 XAF / pers.")}
                class="w-full bg-ocean text-gold hover:bg-ocean/90 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer mt-2"
              >
                Réserver
              </button>
            </div>
          </div>

          {/* Phare Historique */}
          <div class="bg-white rounded-3xl overflow-hidden border border-gold/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div class="h-48 relative overflow-hidden bg-ocean">
              <img 
                src="https://res.cloudinary.com/ccmyhjca/image/upload/v1787900037/WhatsApp_Image_2026-08-28_at_07.59.39_dapw42.jpg" 
                alt="Le Phare Historique de Kribi" 
                class="w-full h-full object-cover"
              />
              <div class="absolute top-3 right-3 bg-gold text-ocean font-bold text-xs px-3 py-1 rounded-full shadow">
                5 000 XAF / pers.
              </div>
            </div>
            <div class="p-5 space-y-3 flex-grow flex flex-col justify-between">
              <div>
                <h4 class="font-serif text-lg font-bold text-ocean">
                  Le Phare Historique de Kribi (1906)
                </h4>
                <p class="text-xs text-gray-600 mt-1 leading-relaxed">
                  Visite patrimoniale et vue panoramique surplombant l'embouchure de la Kienké et l'océan.
                </p>
              </div>
              <button
                onClick={() => handleBook("Visite du Phare Historique", "5 000 XAF / pers.")}
                class="w-full bg-ocean text-gold hover:bg-ocean/90 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer mt-2"
              >
                Réserver
              </button>
            </div>
          </div>

          {/* Village des Pygmées */}
          <div class="bg-white rounded-3xl overflow-hidden border border-gold/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div class="h-48 relative overflow-hidden bg-ocean">
              <img 
                src="https://yengafrica.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-04-at-12.49.22.jpeg" 
                alt="Village des Pygmées" 
                referrerPolicy="no-referrer"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-3 right-3 bg-gold text-ocean font-bold text-xs px-3 py-1 rounded-full shadow">
                20 000 XAF / pers.
              </div>
            </div>
            <div class="p-5 space-y-3 flex-grow flex flex-col justify-between">
              <div>
                <h4 class="font-serif text-lg font-bold text-ocean">
                  Village des Pygmées (Bakola/Bayédi)
                </h4>
                <p class="text-xs text-gray-600 mt-1 leading-relaxed">
                  Trajet en pirogue sur la rivière Lobé et immersion authentique au cœur de la forêt équatoriale.
                </p>
              </div>
              <button
                onClick={() => handleBook("Excursion Village des Pygmées", "20 000 XAF / pers.")}
                class="w-full bg-ocean text-gold hover:bg-ocean/90 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer mt-2"
              >
                Réserver
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION SERVICES SIGNATURE HÔTEL ================= */}
      <section class="bg-[#F4EBE1]/60 py-16 border-t border-b border-gold/15 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-12">
            <span class="text-xs text-gold font-bold uppercase tracking-widest block">
              Prestations Hôtelières
            </span>
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-ocean mt-1">
              Nos Services Hôteliers de Prestige
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div class="bg-white p-6 rounded-2xl border border-gold/20 shadow-sm space-y-2">
              <Car class="h-6 w-6 text-gold" />
              <h4 class="font-serif text-lg font-bold text-ocean">Navette Privée & Transferts</h4>
              <p class="text-xs text-gray-600 leading-relaxed">Prise en charge personnalisée à l'aéroport ou en gare et déplacements dans Kribi.</p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-gold/20 shadow-sm space-y-2">
              <ShieldCheck class="h-6 w-6 text-gold" />
              <h4 class="font-serif text-lg font-bold text-ocean">Parking Privé Sécurisé</h4>
              <p class="text-xs text-gray-600 leading-relaxed">Gardiennage 24h/24 et caméras pour la sérénité totale de vos véhicules.</p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-gold/20 shadow-sm space-y-2">
              <Sparkles class="h-6 w-6 text-gold" />
              <h4 class="font-serif text-lg font-bold text-ocean">Blanchisserie & Pressing</h4>
              <p class="text-xs text-gray-600 leading-relaxed">Service soigné pour vos vêtements délicats avec retour express sous 12h/24h.</p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-gold/20 shadow-sm space-y-2">
              <Wifi class="h-6 w-6 text-gold" />
              <h4 class="font-serif text-lg font-bold text-ocean">WiFi Starlink Haut Débit</h4>
              <p class="text-xs text-gray-600 leading-relaxed">Connexion internet ultra rapide et stable disponible dans tout l'hôtel.</p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-gold/20 shadow-sm space-y-2">
              <Utensils class="h-6 w-6 text-gold" />
              <h4 class="font-serif text-lg font-bold text-ocean">Service Traiteur & Événements</h4>
              <p class="text-xs text-gray-600 leading-relaxed">Organisation de banquets, anniversaires, mariages et cocktails d'entreprise.</p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-gold/20 shadow-sm space-y-2">
              <Coffee class="h-6 w-6 text-gold" />
              <h4 class="font-serif text-lg font-bold text-ocean">Room Service 24h/24</h4>
              <p class="text-xs text-gray-600 leading-relaxed">Vos plats du Mimosa et rafraîchissements servis directement dans votre suite.</p>
            </div>

          </div>

          {/* STATS COUNTERS */}
          <div class="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-14 text-center">
            <div class="bg-white p-6 rounded-2xl border border-gold/20 shadow-sm">
              <div class="font-serif text-4xl sm:text-5xl font-black text-ocean">30+</div>
              <div class="text-xs uppercase tracking-widest text-gold font-bold mt-1">Hébergements</div>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-gold/20 shadow-sm">
              <div class="font-serif text-4xl sm:text-5xl font-black text-ocean">25+</div>
              <div class="text-xs uppercase tracking-widest text-gold font-bold mt-1">Services & Activités</div>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-gold/20 shadow-sm">
              <div class="font-serif text-4xl sm:text-5xl font-black text-ocean">100%</div>
              <div class="text-xs uppercase tracking-widest text-gold font-bold mt-1">Sensations & Détente</div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION CONCIERGERIE ================= */}
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div class="bg-[#0A2342] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-gold/30 relative overflow-hidden">
          <div class="relative z-10 space-y-3">
            <span class="text-xs text-gold font-bold uppercase tracking-widest block">
              Conciergerie VIP
            </span>
            <h3 class="font-serif text-3xl sm:text-4xl font-bold text-white">
              Une envie particulière à Kribi ?
            </h3>
            <p class="text-xs sm:text-sm text-sand/80 max-w-xl mx-auto leading-relaxed">
              Notre équipe est à votre écoute pour organiser vos sessions Jet-Ski, Quad, sorties en bateau, massages ou réservations exclusives.
            </p>
            <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/237670497140?text=Bonjour,%20je%20souhaite%20contacter%20la%20conciergerie%20pour%20une%20activité%20ou%20prestation."
                target="_blank"
                rel="noopener noreferrer"
                class="w-full sm:w-auto bg-gold hover:bg-gold/90 text-ocean font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone class="h-4 w-4" />
                <span>Contacter la Conciergerie (WhatsApp)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Booking Modal */}
      {selectedService && (
        <ServiceBookingModal
          serviceTitle={selectedService.title}
          servicePrice={selectedService.price}
          onClose={() => setSelectedService(null)}
        />
      )}

    </div>
  );
}
