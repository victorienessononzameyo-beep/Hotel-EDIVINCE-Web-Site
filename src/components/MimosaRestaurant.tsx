import { useState, useEffect, useRef } from "react";
import { 
  Utensils, 
  Search, 
  ShoppingBag, 
  Calendar, 
  Download, 
  Sparkles, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Check,
  ChevronRight,
  Flame,
  Coffee,
  Wine,
  Phone,
  Printer,
  FileText
} from "lucide-react";
import { RESTAURANT_CATEGORIES, RESTAURANT_ITEMS, MenuItem } from "../data/restaurantMenuData";

interface CartItem {
  id: string;
  item: MenuItem;
  displayName: string;
  unitPrice: number;
  variant?: "bouteille" | "verre";
  quantity: number;
}

export default function MimosaRestaurant() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [printCategory, setPrintCategory] = useState<string>("all");
  const [tableNumber, setTableNumber] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("20:00");
  const [bookingGuests, setBookingGuests] = useState<string>("2");
  const [bookingNotes, setBookingNotes] = useState<string>("");
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuSectionRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered items based on Category and Search Query
  const filteredItems = RESTAURANT_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Items to display in printable document
  const printableCategories = RESTAURANT_CATEGORIES.filter((c) => {
    if (c.id === "all") return false;
    if (printCategory === "all") return true;
    return c.id === printCategory;
  });

  // Cart operations
  const addToCart = (item: MenuItem, variant?: "bouteille" | "verre") => {
    const cartItemId = variant ? `${item.id}-${variant}` : item.id;
    const unitPrice = variant === "verre" ? (item.glassPrice || item.price) : item.price;
    const displayName = variant === "verre" ? `${item.name} (Au verre)` : variant === "bouteille" ? `${item.name} (Bouteille)` : item.name;

    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) => 
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { id: cartItemId, item, displayName, unitPrice, variant, quantity: 1 }];
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const totalCartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);
  const totalCartPrice = cart.reduce((acc, ci) => acc + ci.unitPrice * ci.quantity, 0);

  const handleSendOrderWhatsApp = () => {
    if (cart.length === 0) return;
    
    let itemsText = cart
      .map((ci) => `• ${ci.quantity}x ${ci.displayName} (${(ci.unitPrice * ci.quantity).toLocaleString()} XAF)`)
      .join("\n");
    
    const msg = encodeURIComponent(
      `*Commande Restaurant Le Mimosa — Hôtel EDIVINCE A.N*\n\n` +
      `📍 *Table / Chambre :* ${tableNumber || "Non précisé (Sur place)"}\n` +
      `👤 *Client :* ${customerName || "Client Restaurant"}\n` +
      `📞 *Contact :* ${customerPhone || "Direct"}\n\n` +
      `🍽️ *Détail de la commande :*\n${itemsText}\n\n` +
      `💰 *Total à régler :* ${totalCartPrice.toLocaleString()} XAF\n` +
      `💳 *Modes acceptés :* Espèces, Mobile Money (OM / MoMo), Carte Bancaire\n\n` +
      `Merci de préparer ma commande !`
    );

    window.open(`https://wa.me/237670497140?text=${msg}`, "_blank");
  };

  const handleTableBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*Réservation de Table — Restaurant Le Mimosa (Hôtel EDIVINCE A.N)*\n\n` +
      `👤 *Nom :* ${customerName}\n` +
      `📞 *Téléphone :* ${customerPhone}\n` +
      `📅 *Date :* ${bookingDate}\n` +
      `⏰ *Heure :* ${bookingTime}\n` +
      `👥 *Nombre de personnes :* ${bookingGuests}\n` +
      `📝 *Notes / Préférences :* ${bookingNotes || "Aucune"}`
    );
    window.open(`https://wa.me/237670497140?text=${msg}`, "_blank");
    setBookingSuccess(true);
  };

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenPrintModal = (catId: string = "all") => {
    setPrintCategory(catId);
    setIsDownloadModalOpen(true);
  };

  const triggerDirectPrint = () => {
    window.print();
  };

  const handleOpenPrintInNewTab = () => {
    // Generate clean printable standalone page HTML
    const selectedCats = RESTAURANT_CATEGORIES.filter((c) => {
      if (c.id === "all") return false;
      if (printCategory === "all") return true;
      return c.id === printCategory;
    });

    const itemsHtml = selectedCats.map((cat) => {
      const itemsInCat = RESTAURANT_ITEMS.filter((i) => i.category === cat.id);
      if (itemsInCat.length === 0) return "";

      const rows = itemsInCat.map((item) => `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; page-break-inside:avoid; border-bottom: 1px dashed #e5e0d8; padding-bottom: 8px;">
          <div style="max-width:72%;">
            <div style="font-weight:700; font-size:14px; color:#0A2342; font-family:'Playfair Display', Georgia, serif;">${item.name}</div>
            ${item.desc ? `<div style="font-size:11px; color:#555; margin-top:2px;">${item.desc}</div>` : ""}
          </div>
          <div style="text-align:right; white-space:nowrap;">
            <div style="font-weight:700; font-size:14px; color:#0A2342;">${item.price.toLocaleString()} <span style="font-size:10px; color:#777;">XAF</span></div>
            ${item.glassPrice ? `<div style="font-size:11px; color:#8C7322; font-weight:600;">Verre: ${item.glassPrice.toLocaleString()} XAF</div>` : ""}
          </div>
        </div>
      `).join("");

      return `
        <div style="margin-bottom:24px; page-break-inside:avoid;">
          <div style="font-family:'Playfair Display', Georgia, serif; font-size:17px; font-weight:700; color:#0A2342; text-transform:uppercase; letter-spacing:1px; border-bottom:2px solid #D4AF37; padding-bottom:4px; margin-bottom:12px;">
            ${cat.label.replace("★ ", "")}
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; column-gap: 28px;">
            ${rows}
          </div>
        </div>
      `;
    }).join("");

    const fullDoc = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="utf-8">
        <title>Menu Officiel - Restaurant Le Mimosa (Hôtel EDIVINCE A.N)</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
        <style>
          @page { size: A4 portrait; margin: 12mm 10mm; }
          body {
            font-family: 'Montserrat', sans-serif;
            color: #0A2342;
            background: #fff;
            margin: 0;
            padding: 20px 30px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #D4AF37;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .badge {
            display: inline-block;
            background: #F4EBE1;
            color: #8C7322;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            padding: 4px 12px;
            border-radius: 20px;
            margin-bottom: 8px;
          }
          h1 {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 28px;
            margin: 0 0 6px 0;
            letter-spacing: 1px;
            color: #0A2342;
          }
          .subtitle {
            font-family: 'Playfair Display', Georgia, serif;
            font-style: italic;
            color: #8C7322;
            font-size: 14px;
            margin: 0 0 10px 0;
          }
          .info {
            font-size: 11px;
            color: #666;
            display: flex;
            justify-content: center;
            gap: 15px;
          }
          .footer {
            border-top: 2px solid #D4AF37;
            margin-top: 30px;
            padding-top: 12px;
            text-align: center;
            font-size: 11px;
            color: #555;
            page-break-inside: avoid;
          }
          @media print {
            .no-print-bar { display: none !important; }
            body { padding: 0; }
          }
          .no-print-bar {
            background: #0A2342;
            color: white;
            padding: 12px 20px;
            margin: -20px -30px 20px -30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .btn-print {
            background: #D4AF37;
            color: #0A2342;
            font-weight: 700;
            border: none;
            padding: 8px 18px;
            border-radius: 8px;
            cursor: pointer;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 1px;
          }
        </style>
      </head>
      <body>
        <div class="no-print-bar">
          <span style="font-weight:600; font-size:13px;">Aperçu Impression Menu • Restaurant Le Mimosa</span>
          <button class="btn-print" onclick="window.print()">Imprimer la carte</button>
        </div>
        <div class="header">
          <div class="badge">Hôtel EDIVINCE A.N — Kribi</div>
          <h1>RESTAURANT LE MIMOSA</h1>
          <div class="subtitle">« Une table d'exception — Saveurs raffinées & Spécialités de Kribi »</div>
          <div class="info">
            <span>📍 Face à la Marina / Chutes de la Lobé</span>
            <span>•</span>
            <span>📞 +237 670 497 140</span>
            <span>•</span>
            <span>⏰ 06h30 — 23h00</span>
          </div>
        </div>
        ${itemsHtml}
        <div class="footer">
          <div style="font-family:'Playfair Display', Georgia, serif; font-style:italic; font-weight:700; margin-bottom:4px; font-size:12px;">
            Tous nos prix sont exprimés en Francs CFA (XAF) — Service & Taxes compris.
          </div>
          <div>Paiements acceptés : Espèces (XAF/EUR), Mobile Money (OM / MoMo), Cartes Bancaires.</div>
          <div style="color:#888; font-size:10px; margin-top:4px;">Hôtel EDIVINCE A.N • Kribi, Cameroun • Réservations : +237 670 497 140</div>
        </div>
        <script>
          setTimeout(function() {
            window.print();
          }, 400);
        </script>
      </body>
      </html>
    `;

    const printWin = window.open("", "_blank");
    if (printWin) {
      printWin.document.open();
      printWin.document.write(fullDoc);
      printWin.document.close();
    } else {
      // Fallback if popup blocked
      window.print();
    }
  };

  return (
    <div id="restaurant-view" class="bg-[#F8F5F0] min-h-screen pb-24 font-sans text-ocean">
      
      {/* ================= HERO HEADER BANNER ================= */}
      <section 
        class="relative h-[360px] sm:h-[450px] bg-[#0A2342] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(10,35,66,0.65), rgba(10,35,66,0.88)), url('https://res.cloudinary.com/ccmyhjca/image/upload/v1788238658/WhatsApp_Image_2026-08-31_at_18.02.03_3_jgqp5b.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div class="relative z-10 max-w-3xl px-4 space-y-4 animate-in fade-in duration-500">
          <span class="text-xs sm:text-sm font-sans font-bold tracking-widest text-gold uppercase block">
            — RESTAURANT LE MIMOSA —
          </span>
          <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Une table d'exception
          </h1>
          <p class="text-sm sm:text-lg text-sand/90 font-sans max-w-xl mx-auto leading-relaxed">
            Des saveurs raffinées dans un cadre chaleureux.
          </p>

          {/* 3 ACTIONS BUTTONS AS REQUESTED */}
          <div class="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={scrollToMenu}
              class="bg-gold hover:bg-gold/90 text-ocean font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Utensils class="h-4 w-4" />
              <span>Voir le menu</span>
            </button>

            <button
              onClick={() => setIsTableModalOpen(true)}
              class="bg-white/15 hover:bg-white/25 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider border border-white/30 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar class="h-4 w-4 text-gold" />
              <span>Réserver une table</span>
            </button>

            <button
              onClick={() => handleOpenPrintModal("all")}
              class="bg-white/10 hover:bg-white/20 text-sand hover:text-white font-semibold px-5 py-3 rounded-xl text-xs uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Printer class="h-4 w-4 text-gold" />
              <span>Imprimer</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= SEARCH BAR & CART FLOATING TRIGGER ================= */}
      <div ref={menuSectionRef} class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div class="bg-white rounded-2xl p-3 sm:p-4 shadow-lg border border-gold/25 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Bar with ⌘K Indicator */}
          <div class="relative w-full md:max-w-xl">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un plat, une boisson..."
              class="w-full pl-11 pr-14 py-3 bg-[#F8F5F0] border border-gray-200 focus:border-gold rounded-xl text-xs sm:text-sm text-ocean outline-none transition-all placeholder:text-gray-400"
            />
            <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 bg-white px-2 py-1 rounded border border-gray-200 text-[10px] font-mono text-gray-400 pointer-events-none">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>

          {/* Quick Actions (Print & Cart Buttons) */}
          <div class="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => handleOpenPrintModal(activeCategory !== "all" ? activeCategory : "all")}
              class="flex-1 md:flex-initial bg-sand/80 hover:bg-sand text-ocean font-bold px-4 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-gold/30 transition-all cursor-pointer"
              title="Imprimer la carte ou enregistrer en PDF"
            >
              <Printer class="h-4 w-4 text-gold" />
              <span>Imprimer</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              class="flex-1 md:flex-initial bg-ocean hover:bg-ocean/90 text-gold font-bold px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-md transition-all cursor-pointer relative"
            >
              <ShoppingBag class="h-5 w-5" />
              <span>Panier</span>
              {totalCartCount > 0 && (
                <span class="bg-gold text-ocean font-bold text-xs px-2 py-0.5 rounded-full shadow-sm">
                  {totalCartCount} · {totalCartPrice.toLocaleString()} XAF
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ================= CATEGORIES HORIZONTAL NAVIGATION TABS ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none no-scrollbar">
          {RESTAURANT_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery("");
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap uppercase tracking-wider transition-all cursor-pointer border ${
                  isActive
                    ? "text-gold border-gold bg-transparent underline decoration-gold decoration-2 underline-offset-8 shadow-sm"
                    : "bg-white text-ocean/80 border-gold/15 hover:border-gold/40 hover:text-gold"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= DISHES & ITEMS GRID (EVERY DISH HAS A VISUAL) ================= */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Results Counter / Title & Category Print Button */}
        <div class="flex items-center justify-between mb-6 pb-2 border-b border-gold/20">
          <div>
            <h2 class="font-serif text-2xl sm:text-3xl font-bold text-ocean">
              {RESTAURANT_CATEGORIES.find((c) => c.id === activeCategory)?.label.replace("★ ", "") || "Notre Carte"}
            </h2>
            <p class="text-xs text-gray-500 mt-0.5">
              {filteredItems.length} suggestion{filteredItems.length > 1 ? "s" : ""} disponible{filteredItems.length > 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={() => handleOpenPrintModal(activeCategory !== "all" ? activeCategory : "all")}
            class="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-sand/60 text-ocean text-xs font-bold rounded-xl border border-gold/30 shadow-xs transition-all cursor-pointer"
            title="Imprimer cette section ou tout le menu"
          >
            <Printer class="h-3.5 w-3.5 text-gold" />
            <span>Imprimer la sélection</span>
          </button>
        </div>

        {/* The Grid */}
        {filteredItems.length > 0 ? (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const inCartSingle = cart.find((ci) => ci.id === item.id);
              const inCartBottle = cart.find((ci) => ci.id === `${item.id}-bouteille`);
              const inCartGlass = cart.find((ci) => ci.id === `${item.id}-verre`);
              const hasGlass = typeof item.glassPrice === "number";

              return (
                <div
                  key={item.id}
                  class="bg-white rounded-2xl overflow-hidden border border-gold/20 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  {/* Visual Image for EVERY single dish & bottle */}
                  <div class="h-48 relative overflow-hidden bg-ocean">
                    <img
                      src={item.image}
                      alt={item.name}
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Price badges */}
                    <div class="absolute top-2.5 right-2.5 flex flex-col items-end gap-1">
                      <div class="bg-black/75 backdrop-blur-sm text-gold font-bold text-xs px-2.5 py-1 rounded-lg border border-gold/30 shadow">
                        {item.price.toLocaleString()} XAF
                      </div>
                      {hasGlass && (
                        <div class="bg-ocean/90 backdrop-blur-sm text-white font-medium text-[10px] px-2 py-0.5 rounded-md border border-gold/30">
                          Verre : <span class="text-gold font-bold">{item.glassPrice?.toLocaleString()} XAF</span>
                        </div>
                      )}
                    </div>

                    <div class="absolute bottom-2 left-2.5 bg-white/95 backdrop-blur-xs text-ocean text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                      {item.categoryName}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div class="p-4 space-y-2 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 class="font-serif font-bold text-base text-ocean group-hover:text-gold transition-colors leading-snug">
                        {item.name}
                      </h3>
                      {item.desc && (
                        <p class="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-1">
                          {item.desc}
                        </p>
                      )}
                    </div>

                    {/* Pricing breakdown and Action Buttons */}
                    <div class="pt-3 border-t border-gray-100 space-y-2">
                      {hasGlass ? (
                        <div class="space-y-2">
                          <div class="flex items-center justify-between text-[11px]">
                            <span class="text-gray-500 font-medium">Bouteille : <strong class="text-ocean font-bold">{item.price.toLocaleString()} XAF</strong></span>
                            <span class="text-gray-500 font-medium">Au verre : <strong class="text-gold font-bold">{item.glassPrice?.toLocaleString()} XAF</strong></span>
                          </div>

                          <div class="grid grid-cols-2 gap-2">
                            {/* Bottle Button */}
                            {inCartBottle ? (
                              <div class="flex items-center justify-between bg-[#F4EBE1] p-1 rounded-xl border border-gold/30">
                                <button
                                  onClick={() => updateQuantity(`${item.id}-bouteille`, -1)}
                                  class="w-6 h-6 bg-white text-ocean rounded-md flex items-center justify-center font-bold text-xs hover:bg-gold transition-colors cursor-pointer"
                                >
                                  <Minus class="h-3 w-3" />
                                </button>
                                <span class="font-bold text-[11px] text-ocean">
                                  {inCartBottle.quantity} Bout.
                                </span>
                                <button
                                  onClick={() => updateQuantity(`${item.id}-bouteille`, 1)}
                                  class="w-6 h-6 bg-gold text-ocean rounded-md flex items-center justify-center font-bold text-xs hover:bg-gold/80 transition-colors cursor-pointer"
                                >
                                  <Plus class="h-3 w-3" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(item, "bouteille")}
                                class="bg-ocean hover:bg-ocean/90 text-gold border border-gold/30 font-bold px-2 py-2 rounded-xl text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Plus class="h-3 w-3" />
                                <span>Bouteille</span>
                              </button>
                            )}

                            {/* Glass Button */}
                            {inCartGlass ? (
                              <div class="flex items-center justify-between bg-[#F4EBE1] p-1 rounded-xl border border-gold/30">
                                <button
                                  onClick={() => updateQuantity(`${item.id}-verre`, -1)}
                                  class="w-6 h-6 bg-white text-ocean rounded-md flex items-center justify-center font-bold text-xs hover:bg-gold transition-colors cursor-pointer"
                                >
                                  <Minus class="h-3 w-3" />
                                </button>
                                <span class="font-bold text-[11px] text-ocean">
                                  {inCartGlass.quantity} Verre
                                </span>
                                <button
                                  onClick={() => updateQuantity(`${item.id}-verre`, 1)}
                                  class="w-6 h-6 bg-gold text-ocean rounded-md flex items-center justify-center font-bold text-xs hover:bg-gold/80 transition-colors cursor-pointer"
                                >
                                  <Plus class="h-3 w-3" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(item, "verre")}
                                class="bg-gold hover:bg-gold/90 text-ocean font-bold px-2 py-2 rounded-xl text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Plus class="h-3 w-3" />
                                <span>Au Verre</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div class="flex items-center justify-between">
                          <div class="font-bold text-sm text-ocean font-sans">
                            {item.price.toLocaleString()} <span class="text-[10px] font-normal text-gray-500">XAF</span>
                          </div>

                          {inCartSingle ? (
                            <div class="flex items-center gap-1.5 bg-[#F4EBE1] p-1 rounded-xl border border-gold/30">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                class="w-7 h-7 bg-white text-ocean rounded-lg flex items-center justify-center font-bold text-sm hover:bg-gold transition-colors cursor-pointer"
                              >
                                <Minus class="h-3.5 w-3.5" />
                              </button>
                              <span class="font-bold text-xs text-ocean px-1.5 min-w-[20px] text-center">
                                {inCartSingle.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                class="w-7 h-7 bg-gold text-ocean rounded-lg flex items-center justify-center font-bold text-sm hover:bg-gold/80 transition-colors cursor-pointer"
                              >
                                <Plus class="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item)}
                              class="bg-gold hover:bg-gold/90 text-ocean font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Plus class="h-3.5 w-3.5" />
                              <span>Sélectionner</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div class="text-center py-16 bg-white rounded-3xl border border-gold/20 p-8 space-y-3">
            <Utensils class="h-12 w-12 text-gold/40 mx-auto" />
            <h4 class="font-serif text-xl font-bold text-ocean">Aucun plat trouvé</h4>
            <p class="text-xs text-gray-500 max-w-sm mx-auto">
              Essayez un autre mot-clé ou sélectionnez une autre catégorie ci-dessus.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              class="bg-ocean text-gold font-bold px-5 py-2 rounded-xl text-xs uppercase tracking-wider mt-2 cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

      </div>

      {/* ================= SECTION LIVRAISON & PAIEMENT ================= */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-gold/25 shadow-sm space-y-8">
          
          <div class="border-b border-gold/20 pb-4">
            <span class="text-xs uppercase font-bold tracking-widest text-gold block">
              Informations Pratiques
            </span>
            <h3 class="font-serif text-2xl sm:text-3xl font-bold text-ocean mt-1">
              Livraison & paiement
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Livraison */}
            <div class="bg-[#F8F5F0] p-5 rounded-2xl border border-gold/15 space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Livraison
              </span>
              <div class="font-serif text-lg font-bold text-ocean flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span>Livraison non disponible</span>
              </div>
              <p class="text-xs text-gray-500">Service exclusif sur place et en chambre VIP.</p>
            </div>

            {/* 2. À emporter */}
            <div class="bg-[#F8F5F0] p-5 rounded-2xl border border-gold/15 space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                À emporter
              </span>
              <div class="font-serif text-lg font-bold text-ocean flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span>À emporter non disponible</span>
              </div>
              <p class="text-xs text-gray-500">Dégustation sur place face à la Marina.</p>
            </div>

            {/* 3. Paiement */}
            <div class="bg-[#F8F5F0] p-5 rounded-2xl border border-gold/15 space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Paiement
              </span>
              <div class="font-serif text-lg font-bold text-ocean">
                Modes acceptés
              </div>
              <ul class="text-xs text-gray-600 space-y-1 font-medium">
                <li class="flex items-center gap-1.5"><Banknote class="h-3.5 w-3.5 text-gold" /> Espèces (XAF / EUR)</li>
                <li class="flex items-center gap-1.5"><Smartphone class="h-3.5 w-3.5 text-palm" /> Mobile Money (OM / MoMo)</li>
                <li class="flex items-center gap-1.5"><CreditCard class="h-3.5 w-3.5 text-ocean" /> Carte bancaire (Visa / Master)</li>
              </ul>
            </div>

            {/* 4. Horaires & Commande depuis votre table */}
            <div class="bg-[#F8F5F0] p-5 rounded-2xl border border-gold/15 space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Horaires
              </span>
              <div class="font-serif text-lg font-bold text-ocean flex items-center gap-1.5">
                <Clock class="h-4 w-4 text-gold" />
                <span>06h30 — 23h00</span>
              </div>
              <div class="pt-1">
                <span class="text-xs font-bold text-palm block">Commande depuis votre table</span>
                <span class="text-[11px] text-gray-500 block">Via notre système ou WhatsApp direct</span>
              </div>
            </div>

          </div>

          {/* Quick contact summary */}
          <div class="bg-[#0A2342] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="space-y-1 text-center sm:text-left">
              <span class="text-xs font-bold uppercase tracking-wider text-gold">Hôtel EDIVINCE A.N — Kribi</span>
              <p class="text-xs text-sand/80">Tél. +237 670 497 140 / +237 657 077 656 • WW62+99, 111, Kribi, Cameroun, SUD</p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              class="bg-gold hover:bg-gold/90 text-ocean font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow cursor-pointer whitespace-nowrap"
            >
              Commander depuis votre table
            </button>
          </div>

        </div>
      </section>

      {/* ================= MODAL PANIER / SHOPPING CART ================= */}
      {isCartOpen && (
        <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-gold/30 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left font-sans text-ocean">
            <button
              onClick={() => setIsCartOpen(false)}
              class="absolute top-4 right-4 text-gray-400 hover:text-ocean text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <div class="border-b border-gray-100 pb-3">
              <span class="text-xs text-gold font-bold uppercase tracking-widest block">
                Votre Sélection
              </span>
              <h3 class="font-serif text-2xl font-bold text-ocean">
                Panier Restaurant
              </h3>
            </div>

            {cart.length > 0 ? (
              <>
                {/* List of items */}
                <div class="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-gray-100">
                  {cart.map((ci) => (
                    <div key={ci.id} class="pt-2 flex items-center justify-between gap-3">
                      <div class="flex items-center gap-3">
                        <img
                          src={ci.item.image}
                          alt={ci.displayName}
                          class="w-12 h-12 rounded-xl object-cover border border-gold/20 flex-shrink-0"
                        />
                        <div>
                          <h4 class="font-serif font-bold text-xs sm:text-sm text-ocean leading-tight">
                            {ci.displayName}
                          </h4>
                          <span class="text-xs text-gold font-semibold">
                            {(ci.unitPrice * ci.quantity).toLocaleString()} XAF
                          </span>
                        </div>
                      </div>

                      <div class="flex items-center gap-2">
                        <div class="flex items-center gap-1 bg-[#F4EBE1] p-1 rounded-lg border border-gold/20">
                          <button
                            onClick={() => updateQuantity(ci.id, -1)}
                            class="w-6 h-6 bg-white rounded flex items-center justify-center text-xs font-bold hover:bg-gold cursor-pointer"
                          >
                            <Minus class="h-3 w-3" />
                          </button>
                          <span class="text-xs font-bold px-1">{ci.quantity}</span>
                          <button
                            onClick={() => updateQuantity(ci.id, 1)}
                            class="w-6 h-6 bg-gold text-ocean rounded flex items-center justify-center text-xs font-bold hover:bg-gold/80 cursor-pointer"
                          >
                            <Plus class="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(ci.id)}
                          class="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                        >
                          <Trash2 class="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Table and Client info */}
                <div class="bg-[#F8F5F0] p-4 rounded-2xl space-y-2.5 border border-gold/15 text-xs">
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <label class="block text-gray-700 font-semibold mb-1">N° de Table / Chambre</label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="Ex: Table 4 / Ch. 201"
                        class="w-full p-2 bg-white rounded-lg border border-gray-300 focus:border-gold outline-none"
                      />
                    </div>
                    <div>
                      <label class="block text-gray-700 font-semibold mb-1">Votre Nom</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ex: M. Dupont"
                        class="w-full p-2 bg-white rounded-lg border border-gray-300 focus:border-gold outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Total & Action */}
                <div class="space-y-3 pt-2">
                  <div class="flex items-center justify-between text-base font-bold text-ocean border-t border-gray-200 pt-2">
                    <span>Total à régler :</span>
                    <span class="text-gold font-sans text-xl">{totalCartPrice.toLocaleString()} XAF</span>
                  </div>

                  <button
                    onClick={handleSendOrderWhatsApp}
                    class="w-full bg-gold hover:bg-gold/90 text-ocean font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send class="h-4 w-4" />
                    <span>Envoyer la commande (WhatsApp)</span>
                  </button>
                </div>
              </>
            ) : (
              <div class="text-center py-10 space-y-3">
                <ShoppingBag class="h-12 w-12 text-gray-300 mx-auto" />
                <h4 class="font-serif text-lg font-bold text-ocean">Votre panier est vide</h4>
                <p class="text-xs text-gray-500">
                  Cliquez sur "Sélectionner" sur vos plats ou boissons préférés pour les ajouter à votre commande.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  class="bg-gold text-ocean font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider mt-2 cursor-pointer"
                >
                  Découvrir les plats
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL RÉSERVER UNE TABLE ================= */}
      {isTableModalOpen && (
        <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-gold/30 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left font-sans text-ocean">
            <button
              onClick={() => {
                setIsTableModalOpen(false);
                setBookingSuccess(false);
              }}
              class="absolute top-4 right-4 text-gray-400 hover:text-ocean text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {!bookingSuccess ? (
              <>
                <div class="border-b border-gray-100 pb-3">
                  <span class="text-xs text-gold font-bold uppercase tracking-widest block">
                    Restaurant Le Mimosa
                  </span>
                  <h3 class="font-serif text-2xl font-bold text-ocean">
                    Réserver une table
                  </h3>
                  <p class="text-xs text-gray-500 mt-1">
                    Cadre chaleureux face à la Marina de Kribi.
                  </p>
                </div>

                <form onSubmit={handleTableBooking} class="space-y-3 text-xs">
                  <div>
                    <label class="block text-gray-700 font-semibold mb-1">Votre Nom & Prénom *</label>
                    <input
                      required
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: Paul Martin"
                      class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none"
                    />
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-gray-700 font-semibold mb-1">Téléphone / WhatsApp *</label>
                      <input
                        required
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+237 6..."
                        class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none"
                      />
                    </div>
                    <div>
                      <label class="block text-gray-700 font-semibold mb-1">Date *</label>
                      <input
                        required
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-gray-700 font-semibold mb-1">Heure de service *</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none bg-white"
                      >
                        <option value="12:00">12:00 (Déjeuner)</option>
                        <option value="13:00">13:00 (Déjeuner)</option>
                        <option value="19:30">19:30 (Dîner)</option>
                        <option value="20:00">20:00 (Dîner)</option>
                        <option value="21:00">21:00 (Dîner)</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-gray-700 font-semibold mb-1">Nombre de convives *</label>
                      <input
                        required
                        type="number"
                        min="1"
                        max="30"
                        value={bookingGuests}
                        onChange={(e) => setBookingGuests(e.target.value)}
                        class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-gray-700 font-semibold mb-1">Demandes spéciales / Emplacement souhaité</label>
                    <textarea
                      rows={2}
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      placeholder="Terrasse extérieure, bord de piscine, anniversaire..."
                      class="w-full p-3 rounded-xl border border-gray-300 focus:border-gold outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    class="w-full bg-gold hover:bg-gold/90 text-ocean font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send class="h-4 w-4" />
                    <span>Confirmer la réservation (WhatsApp)</span>
                  </button>
                </form>
              </>
            ) : (
              <div class="text-center py-8 space-y-4">
                <div class="w-14 h-14 bg-palm/10 text-palm rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 class="h-8 w-8" />
                </div>
                <h4 class="font-serif text-2xl font-bold text-ocean">Demande envoyée !</h4>
                <p class="text-xs text-gray-600">
                  Votre réservation a été transmise à notre maître d'hôtel. Une confirmation vous sera adressée par WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setIsTableModalOpen(false);
                    setBookingSuccess(false);
                  }}
                  class="bg-ocean text-gold font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL TÉLÉCHARGER / IMPRIMER LE MENU ================= */}
      {isDownloadModalOpen && (
        <div class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto no-print">
          <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-gold/30 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left font-sans text-ocean">
            
            {/* Modal Top Bar (Sticky) */}
            <div class="p-4 sm:p-5 border-b border-gold/20 flex flex-wrap items-center justify-between gap-3 bg-[#0A2342] text-white rounded-t-3xl">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold border border-gold/30">
                  <Printer class="h-5 w-5" />
                </div>
                <div>
                  <span class="text-[10px] sm:text-xs text-gold font-bold uppercase tracking-widest block">
                    Carte Officielle — Impression & Export PDF
                  </span>
                  <h3 class="font-serif text-lg sm:text-xl font-bold text-white">
                    Imprimer le Menu — Restaurant Le Mimosa
                  </h3>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button
                  onClick={triggerDirectPrint}
                  class="bg-gold hover:bg-gold/90 text-ocean font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow cursor-pointer"
                  title="Imprimer directement"
                >
                  <Printer class="h-4 w-4" />
                  <span>Imprimer / PDF</span>
                </button>

                <button
                  onClick={handleOpenPrintInNewTab}
                  class="bg-white/15 hover:bg-white/25 text-white font-semibold px-3 py-2 rounded-xl text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Ouvrir dans un nouvel onglet"
                >
                  <FileText class="h-3.5 w-3.5 text-gold" />
                  <span class="hidden sm:inline">Nouvel onglet</span>
                </button>

                <button
                  onClick={() => setIsDownloadModalOpen(false)}
                  class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer ml-1"
                  title="Fermer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Category Filter Toolbar inside Modal */}
            <div class="bg-[#F4EBE1]/60 px-4 sm:px-6 py-2.5 border-b border-gold/20 flex items-center justify-between gap-3 overflow-x-auto text-xs">
              <span class="font-bold text-ocean/80 whitespace-nowrap text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <span>Sélection à imprimer :</span>
              </span>
              <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <button
                  onClick={() => setPrintCategory("all")}
                  class={`px-3 py-1 rounded-lg font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                    printCategory === "all"
                      ? "bg-ocean text-gold shadow-sm"
                      : "bg-white text-ocean/80 border border-gold/20 hover:border-gold"
                  }`}
                >
                  Tout le menu (Complet)
                </button>
                {RESTAURANT_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setPrintCategory(cat.id)}
                    class={`px-3 py-1 rounded-lg font-semibold text-xs whitespace-nowrap transition-all cursor-pointer ${
                      printCategory === cat.id
                        ? "bg-ocean text-gold shadow-sm"
                        : "bg-white text-ocean/80 border border-gold/20 hover:border-gold"
                    }`}
                  >
                    {cat.label.replace("★ ", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body: Elegant Printable Menu Canvas */}
            <div id="printable-menu-document" class="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#FBF9F5]">
              
              {/* Header inside Document */}
              <div class="text-center space-y-2 border-b-2 border-gold/30 pb-6 print-header">
                <div class="inline-block px-3 py-1 bg-gold/15 rounded-full text-gold font-bold text-xs tracking-widest uppercase mb-1">
                  Hôtel EDIVINCE A.N — Kribi
                </div>
                <h1 class="font-serif text-3xl sm:text-4xl font-extrabold text-ocean tracking-tight">
                  RESTAURANT LE MIMOSA
                </h1>
                <p class="font-serif italic text-sm sm:text-base text-gold font-medium print-gold-text">
                  « Une table d'exception — Saveurs raffinées & Spécialités de Kribi »
                </p>
                <div class="text-[11px] text-gray-500 font-sans flex items-center justify-center gap-3 pt-2">
                  <span>📍 Face à la Marina / Chutes de la Lobé</span>
                  <span>•</span>
                  <span>📞 +237 670 497 140</span>
                  <span>•</span>
                  <span>⏰ 06h30 — 23h00</span>
                </div>
              </div>

              {/* Categorized Menu Items */}
              {printableCategories.map((cat) => {
                const itemsInCat = RESTAURANT_ITEMS.filter((i) => i.category === cat.id);
                if (itemsInCat.length === 0) return null;

                return (
                  <div key={cat.id} class="space-y-4 print-category-container">
                    {/* Category Title Banner */}
                    <div class="flex items-center gap-3 border-b border-gold/25 pb-2 print-category-header">
                      <h3 class="font-serif text-lg sm:text-xl font-extrabold text-ocean uppercase tracking-wider">
                        {cat.label.replace("★ ", "")}
                      </h3>
                      <div class="flex-grow h-[1px] bg-gradient-to-r from-gold/40 to-transparent"></div>
                    </div>

                    {/* Items List in 2 Columns */}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {itemsInCat.map((item) => (
                        <div key={item.id} class="flex items-start justify-between gap-3 group pb-2 border-b border-gray-100/70 print-item">
                          <div class="space-y-0.5 max-w-[70%]">
                            <h4 class="font-serif font-bold text-sm text-ocean group-hover:text-gold transition-colors">
                              {item.name}
                            </h4>
                            {item.desc && (
                              <p class="text-xs text-gray-500 leading-relaxed font-sans">
                                {item.desc}
                              </p>
                            )}
                          </div>

                          <div class="text-right flex-shrink-0 font-sans">
                            <div class="font-bold text-sm text-ocean">
                              {item.price.toLocaleString()} <span class="text-[10px] font-semibold text-gray-500">XAF</span>
                            </div>
                            {item.glassPrice && (
                              <div class="text-[10px] text-gold font-bold print-gold-text">
                                Verre : {item.glassPrice.toLocaleString()} XAF
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Document Footer */}
              <div class="border-t-2 border-gold/30 pt-6 text-center space-y-2 text-xs text-gray-600 print-footer">
                <p class="font-serif italic text-ocean font-semibold text-sm">
                  Tous nos prix sont exprimés en Francs CFA (XAF) — Service & Taxes compris.
                </p>
                <p>
                  Modes de paiement acceptés : Espèces (XAF/EUR), Mobile Money (Orange Money, MTN MoMo), Cartes Bancaires.
                </p>
                <p class="text-[11px] text-gray-400">
                  Hôtel EDIVINCE A.N • WW62+99, 111, Kribi, Cameroun, SUD • WhatsApp Réservations : +237 670 497 140
                </p>
              </div>

            </div>

            {/* Modal Bottom Bar */}
            <div class="p-4 bg-white border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-b-3xl">
              <span class="text-xs text-gray-500 text-center sm:text-left">
                💡 <span class="font-semibold text-ocean">Astuce PDF :</span> Sélectionnez <em>« Enregistrer au format PDF »</em> dans la fenêtre d'impression pour télécharger le document.
              </span>
              <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleOpenPrintInNewTab}
                  class="bg-sand/80 hover:bg-sand text-ocean font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all border border-gold/30 cursor-pointer flex-1 sm:flex-initial"
                >
                  Ouvrir plein écran
                </button>
                <button
                  onClick={triggerDirectPrint}
                  class="bg-gold hover:bg-gold/90 text-ocean font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow cursor-pointer flex-1 sm:flex-initial"
                >
                  <Printer class="h-4 w-4" />
                  <span>Lancer l'impression</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= DEDICATED STANDALONE PRINT CONTAINER (FOR NATIVE CTRL+P) ================= */}
      <div id="printable-container" class="hidden print:block">
        <div class="text-center space-y-2 border-b-2 border-gold/30 pb-6 print-header">
          <div class="inline-block px-3 py-1 bg-gold/15 rounded-full text-gold font-bold text-xs tracking-widest uppercase mb-1">
            Hôtel EDIVINCE A.N — Kribi
          </div>
          <h1 class="font-serif text-3xl font-extrabold text-ocean tracking-tight">
            RESTAURANT LE MIMOSA
          </h1>
          <p class="font-serif italic text-sm text-gold font-medium print-gold-text">
            « Une table d'exception — Saveurs raffinées & Spécialités de Kribi »
          </p>
          <div class="text-[11px] text-gray-500 font-sans flex items-center justify-center gap-3 pt-2">
            <span>📍 Face à la Marina / Chutes de la Lobé</span>
            <span>•</span>
            <span>📞 +237 670 497 140</span>
            <span>•</span>
            <span>⏰ 06h30 — 23h00</span>
          </div>
        </div>

        {RESTAURANT_CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
          const itemsInCat = RESTAURANT_ITEMS.filter((i) => i.category === cat.id);
          if (itemsInCat.length === 0) return null;

          return (
            <div key={cat.id} class="space-y-4 print-category-container">
              <div class="flex items-center gap-3 border-b border-gold/25 pb-2 print-category-header">
                <h3 class="font-serif text-lg font-extrabold text-ocean uppercase tracking-wider">
                  {cat.label.replace("★ ", "")}
                </h3>
              </div>

              <div class="grid grid-cols-2 gap-x-8 gap-y-3">
                {itemsInCat.map((item) => (
                  <div key={item.id} class="flex items-start justify-between gap-3 pb-2 border-b border-gray-100/70 print-item">
                    <div class="space-y-0.5 max-w-[70%]">
                      <h4 class="font-serif font-bold text-sm text-ocean">
                        {item.name}
                      </h4>
                      {item.desc && (
                        <p class="text-xs text-gray-500 leading-relaxed font-sans">
                          {item.desc}
                        </p>
                      )}
                    </div>

                    <div class="text-right flex-shrink-0 font-sans">
                      <div class="font-bold text-sm text-ocean">
                        {item.price.toLocaleString()} <span class="text-[10px] font-semibold text-gray-500">XAF</span>
                      </div>
                      {item.glassPrice && (
                        <div class="text-[10px] text-gold font-bold print-gold-text">
                          Verre : {item.glassPrice.toLocaleString()} XAF
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div class="border-t-2 border-gold/30 pt-6 text-center space-y-2 text-xs text-gray-600 print-footer">
          <p class="font-serif italic text-ocean font-semibold text-sm">
            Tous nos prix sont exprimés en Francs CFA (XAF) — Service & Taxes compris.
          </p>
          <p>
            Modes de paiement acceptés : Espèces (XAF/EUR), Mobile Money (Orange Money, MTN MoMo), Cartes Bancaires.
          </p>
          <p class="text-[11px] text-gray-400">
            Hôtel EDIVINCE A.N • WW62+99, 111, Kribi, Cameroun, SUD • WhatsApp Réservations : +237 670 497 140
          </p>
        </div>
      </div>

    </div>
  );
}
