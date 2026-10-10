import { Booking, BIStats, PMSUnit, Review, RoomSlug, ChatMessage } from "../types";

export const ROOM_PRICES: Record<RoomSlug, number> = {
  confort: 55000,
  prestige: 65000,
  premium: 75000,
  twin: 90000,
  junior: 100000,
  "prestige-suite": 135000,
  "ocean-suite": 150000
};

export const ROOM_NAMES: Record<RoomSlug, string> = {
  confort: "Chambre Confort — 55 000 FCFA",
  prestige: "Chambre Prestige — 65 000 FCFA",
  premium: "Chambre Premium — 75 000 FCFA",
  twin: "Chambre Twin — 90 000 FCFA",
  junior: "Suite Junior — 100 000 FCFA",
  "prestige-suite": "Suite Prestige — 135 000 FCFA",
  "ocean-suite": "Suite Vue Mer — 150 000 FCFA"
};

// Seed bookings for local storage fallback (Hostinger / offline mode)
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "B-204",
    guestName: "Jean-Pierre Mvondo",
    guestEmail: "jp.mvondo@gmail.com",
    guestPhone: "+237 696 82 66 09",
    roomType: "confort",
    checkIn: "2026-07-05",
    checkOut: "2026-07-10",
    guestsCount: 1,
    totalPrice: 275000,
    status: "confirmed",
    segment: "Tourisme",
    createdAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: "B-501",
    guestName: "Marcelle Ngono",
    guestEmail: "m.ngono@hotmail.fr",
    guestPhone: "+237 670 49 71 40",
    roomType: "junior",
    checkIn: "2026-07-15",
    checkOut: "2026-07-22",
    guestsCount: 2,
    totalPrice: 700000,
    status: "confirmed",
    segment: "Famille",
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: "B-306",
    guestName: "Christian Dupont",
    guestEmail: "c.dupont@entreprise.fr",
    guestPhone: "+33 6 12 34 56 78",
    roomType: "premium",
    checkIn: "2026-07-01",
    checkOut: "2026-07-04",
    guestsCount: 2,
    totalPrice: 225000,
    status: "confirmed",
    segment: "Business",
    createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString()
  }
];

// Seed 32 PMS rooms matching official inventory
function generateInitialRooms(): PMSUnit[] {
  const rooms: PMSUnit[] = [];
  const today = new Date().toISOString().split("T")[0];

  for (let i = 1; i <= 4; i++) {
    rooms.push({
      number: `10${i}`,
      category: "confort",
      status: i === 2 ? "occupe" : i === 3 ? "nettoyage" : "libre",
      housekeeper: i % 2 === 0 ? "Florence N." : "Marie M.",
      lastCleaned: today
    });
  }

  for (let i = 1; i <= 11; i++) {
    rooms.push({
      number: `2${i < 10 ? "0" + i : i}`,
      category: "prestige",
      status: i % 3 === 0 ? "occupe" : i === 5 ? "maintenance" : i === 8 ? "nettoyage" : "libre",
      housekeeper: i % 2 === 0 ? "Thérèse B." : "Alice O.",
      lastCleaned: today
    });
  }

  for (let i = 1; i <= 12; i++) {
    rooms.push({
      number: `3${i < 10 ? "0" + i : i}`,
      category: "premium",
      status: i === 12 ? "maintenance" : i % 4 === 0 ? "occupe" : i === 7 ? "nettoyage" : "libre",
      housekeeper: i % 3 === 0 ? "Florence N." : "Alice O.",
      lastCleaned: today
    });
  }

  rooms.push({
    number: "401",
    category: "twin",
    status: "libre",
    housekeeper: "Marie M.",
    lastCleaned: today
  });

  rooms.push({
    number: "501",
    category: "junior",
    status: "occupe",
    housekeeper: "Thérèse B.",
    lastCleaned: today
  });
  rooms.push({
    number: "502",
    category: "junior",
    status: "libre",
    housekeeper: "Florence N.",
    lastCleaned: today
  });

  rooms.push({
    number: "601",
    category: "prestige-suite",
    status: "libre",
    housekeeper: "Marie M.",
    lastCleaned: today
  });

  rooms.push({
    number: "701",
    category: "ocean-suite",
    status: "occupe",
    housekeeper: "Thérèse B.",
    lastCleaned: today
  });

  return rooms;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "R-101",
    name: "Petit Bozard et son equipes",
    rating: 5,
    comment: "L'accueil est merveilleux, digne d'un palace tropical. Nous avons adoré déguster nos crevettes géantes et plats d'exception près de la piscine de relaxation de l'hôtel !",
    roomType: "Suite Junior",
    date: "2026-08-22"
  },
  {
    id: "R-102",
    name: "Vanister ENAMA",
    rating: 5,
    comment: "Un séjour d'affaires parfait. Le Wi-Fi Starlink est d'une rapidité incroyable et la salle de conférence était impeccablement équipée pour notre séminaire.",
    roomType: "Chambre Prestige",
    date: "2026-08-22"
  },
  {
    id: "R-103",
    name: "MAALHOX le VIBEUR",
    rating: 5,
    comment: "Vue splendide sur l'océan Atlantique et la Marina de Kribi ! La chambre est immense, le service en chambre avec champagne en mer était inoubliable.",
    roomType: "Suite Vue Mer",
    date: "2026-08-22"
  },
  {
    id: "R-104",
    name: "Victorien ESSONO NZAMEYO",
    rating: 5,
    comment: "Des souvenirs inoubliables gravés grâce aux magnifiques prises de vue par drone et à l'attention exceptionnelle de toute l'équipe de l'Hôtel EDIVINCE !",
    roomType: "Suite Prestige",
    date: "2026-08-22"
  }
];

// Helper to access LocalStorage safely
function getLocalBookings(): Booking[] {
  try {
    const raw = localStorage.getItem("edivince_bookings");
    if (raw) return JSON.parse(raw);
    localStorage.setItem("edivince_bookings", JSON.stringify(INITIAL_BOOKINGS));
    return INITIAL_BOOKINGS;
  } catch {
    return INITIAL_BOOKINGS;
  }
}

function saveLocalBookings(bookings: Booking[]) {
  try {
    localStorage.setItem("edivince_bookings", JSON.stringify(bookings));
  } catch (e) {
    console.warn("Impossible d'écrire dans localStorage", e);
  }
}

function getLocalRooms(): PMSUnit[] {
  try {
    const raw = localStorage.getItem("edivince_rooms");
    if (raw) return JSON.parse(raw);
    const rooms = generateInitialRooms();
    localStorage.setItem("edivince_rooms", JSON.stringify(rooms));
    return rooms;
  } catch {
    return generateInitialRooms();
  }
}

function saveLocalRooms(rooms: PMSUnit[]) {
  try {
    localStorage.setItem("edivince_rooms", JSON.stringify(rooms));
  } catch (e) {
    console.warn("Impossible d'écrire les chambres dans localStorage", e);
  }
}

function getLocalReviews(): Review[] {
  try {
    const raw = localStorage.getItem("edivince_reviews");
    if (raw) return JSON.parse(raw);
    localStorage.setItem("edivince_reviews", JSON.stringify(INITIAL_REVIEWS));
    return INITIAL_REVIEWS;
  } catch {
    return INITIAL_REVIEWS;
  }
}

function saveLocalReviews(reviews: Review[]) {
  try {
    localStorage.setItem("edivince_reviews", JSON.stringify(reviews));
  } catch (e) {
    console.warn("Impossible d'écrire les avis dans localStorage", e);
  }
}

// Fallback generator for a new booking
export function createLocalBookingFallback(formData: {
  guestName: string;
  guestEmail?: string;
  guestPhone: string;
  roomType: RoomSlug;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  segment?: string;
}): Booking {
  const dateIn = new Date(formData.checkIn);
  const dateOut = new Date(formData.checkOut);
  const diffTime = Math.abs(dateOut.getTime() - dateIn.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 1;
  const pricePerNight = ROOM_PRICES[formData.roomType] || 55000;
  const totalPrice = pricePerNight * diffDays;

  const newId = `B-${Math.floor(100 + Math.random() * 900)}`;
  const newBooking: Booking = {
    id: newId,
    guestName: formData.guestName,
    guestEmail: formData.guestEmail || "non-spécifié",
    guestPhone: formData.guestPhone,
    roomType: formData.roomType,
    checkIn: formData.checkIn,
    checkOut: formData.checkOut,
    guestsCount: Number(formData.guestsCount) || 1,
    totalPrice,
    status: "pending",
    segment: (formData.segment as any) || "Tourisme",
    createdAt: new Date().toISOString()
  };

  // Save into LocalStorage so it persists on Hostinger
  const all = getLocalBookings();
  all.push(newBooking);
  saveLocalBookings(all);

  // Update room status in PMS
  const rooms = getLocalRooms();
  const freeRoom = rooms.find(r => r.category === formData.roomType && r.status === "libre");
  if (freeRoom) {
    freeRoom.status = "occupe";
    saveLocalRooms(rooms);
  }

  return newBooking;
}

// Main API Service with automatic fallback
export const apiService = {
  // 1. CREATE BOOKING (Resilient for Hostinger)
  async createBooking(formData: {
    guestName: string;
    guestEmail?: string;
    guestPhone: string;
    roomType: RoomSlug;
    checkIn: string;
    checkOut: string;
    guestsCount: number;
    segment?: string;
  }): Promise<{ success: boolean; booking: Booking; error?: string }> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      // Check if response is valid JSON and ok
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          if (result && result.success && result.booking) {
            // Also store copy in localStorage
            const local = getLocalBookings();
            if (!local.some(b => b.id === result.booking.id)) {
              local.push(result.booking);
              saveLocalBookings(local);
            }
            return { success: true, booking: result.booking };
          }
        }
      }
      
      // If we got here, server returned non-JSON, 404, or error (typical on static Hostinger)
      console.info("Hébergement Hostinger statique détecté ou API injoignable: activation du stockage autonome.");
      const fallbackBooking = createLocalBookingFallback(formData);
      return { success: true, booking: fallbackBooking };
    } catch (err) {
      // Network failure, offline, or Hostinger 404
      console.info("Mode autonome activé pour la réservation (Hostinger/offline) :", err);
      const fallbackBooking = createLocalBookingFallback(formData);
      return { success: true, booking: fallbackBooking };
    }
  },

  // 2. GET BOOKINGS
  async getBookings(): Promise<Booking[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch("/api/bookings", { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            saveLocalBookings(data);
            return data;
          }
        }
      }
    } catch {
      // fallback
    }
    return getLocalBookings();
  },

  // 3. UPDATE BOOKING STATUS
  async updateBookingStatus(bookingId: string, newStatus: "confirmed" | "canceled" | "pending"): Promise<boolean> {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // also update locally
        const bookings = getLocalBookings();
        const b = bookings.find(item => item.id === bookingId);
        if (b) {
          b.status = newStatus;
          saveLocalBookings(bookings);
        }
        return true;
      }
    } catch {
      // fallback
    }
    const bookings = getLocalBookings();
    const b = bookings.find(item => item.id === bookingId);
    if (b) {
      b.status = newStatus;
      saveLocalBookings(bookings);
      return true;
    }
    return false;
  },

  // 4. GET STATS AND ROOMS (FOR BI DASHBOARD)
  async getStatsAndRooms(): Promise<{ stats: BIStats; rooms: PMSUnit[] }> {
    let stats: BIStats | null = null;
    let rooms: PMSUnit[] | null = null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const [statsRes, roomsRes] = await Promise.all([
        fetch("/api/stats", { signal: controller.signal }),
        fetch("/api/rooms", { signal: controller.signal })
      ]);
      clearTimeout(timeoutId);

      if (statsRes.ok && roomsRes.ok) {
        const statsType = statsRes.headers.get("content-type");
        const roomsType = roomsRes.headers.get("content-type");
        if (statsType?.includes("application/json") && roomsType?.includes("application/json")) {
          stats = await statsRes.json();
          rooms = await roomsRes.json();
        }
      }
    } catch {
      // fallback
    }

    if (!rooms || rooms.length === 0) {
      rooms = getLocalRooms();
    } else {
      saveLocalRooms(rooms);
    }

    if (!stats) {
      const bookings = getLocalBookings();
      const totalReservations = bookings.length;
      const totalRevenue = bookings
        .filter(b => b.status === "confirmed" || b.status === "pending")
        .reduce((sum, b) => sum + b.totalPrice, 0);

      stats = {
        totalReservations,
        totalRevenue,
        viewsCount: 382 + Math.floor(Math.random() * 20),
        roomDistribution: {
          confort: bookings.filter(b => b.roomType === "confort").length,
          prestige: bookings.filter(b => b.roomType === "prestige").length,
          premium: bookings.filter(b => b.roomType === "premium").length,
          twin: bookings.filter(b => b.roomType === "twin").length,
          junior: bookings.filter(b => b.roomType === "junior").length,
          "prestige-suite": bookings.filter(b => b.roomType === "prestige-suite").length,
          "ocean-suite": bookings.filter(b => b.roomType === "ocean-suite").length
        },
        segmentDistribution: {
          Tourisme: bookings.filter(b => b.segment === "Tourisme").length,
          Business: bookings.filter(b => b.segment === "Business").length,
          Famille: bookings.filter(b => b.segment === "Famille").length
        },
        recentBookings: [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 10)
      };
    }

    return { stats, rooms };
  },

  // 5. UPDATE ROOM (PMS)
  async updateRoom(roomNumber: string, updates: { status?: "libre" | "occupe" | "nettoyage" | "maintenance"; housekeeper?: string }): Promise<PMSUnit[]> {
    try {
      const res = await fetch(`/api/rooms/${roomNumber}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const roomsRes = await fetch("/api/rooms");
        if (roomsRes.ok) {
          const fresh = await roomsRes.json();
          saveLocalRooms(fresh);
          return fresh;
        }
      }
    } catch {
      // fallback
    }

    // LocalStorage fallback
    const rooms = getLocalRooms();
    const target = rooms.find(r => r.number === roomNumber);
    if (target) {
      if (updates.status) target.status = updates.status;
      if (updates.housekeeper) target.housekeeper = updates.housekeeper;
      if (updates.status === "libre") {
        target.lastCleaned = new Date().toISOString().split("T")[0];
      }
      saveLocalRooms(rooms);
    }
    return rooms;
  },

  // 6. GET REVIEWS
  async getReviews(): Promise<Review[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch("/api/reviews", { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const type = res.headers.get("content-type");
        if (type?.includes("application/json")) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            saveLocalReviews(data);
            return data;
          }
        }
      }
    } catch {
      // fallback
    }
    return getLocalReviews();
  },

  // 7. SUBMIT REVIEW
  async submitReview(reviewData: { name: string; rating: number; comment: string; roomType?: string }): Promise<{ success: boolean; review: Review }> {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData)
      });
      if (res.ok) {
        const type = res.headers.get("content-type");
        if (type?.includes("application/json")) {
          const result = await res.json();
          if (result && result.success && result.review) {
            const list = getLocalReviews();
            list.unshift(result.review);
            saveLocalReviews(list);
            return result;
          }
        }
      }
    } catch {
      // fallback
    }

    const newRev: Review = {
      id: `R-${Math.floor(100 + Math.random() * 900)}`,
      name: reviewData.name,
      rating: reviewData.rating,
      comment: reviewData.comment,
      roomType: reviewData.roomType || "Chambre Confort",
      date: new Date().toISOString().split("T")[0]
    };
    const list = getLocalReviews();
    list.unshift(newRev);
    saveLocalReviews(list);
    return { success: true, review: newRev };
  },

  // 8. SEND CHAT MESSAGE (AI CONCIERGE)
  async sendChatMessage(messages: ChatMessage[]): Promise<string> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const type = res.headers.get("content-type");
        if (type?.includes("application/json")) {
          const data = await res.json();
          if (data && data.reply) return data.reply;
        }
      }
    } catch {
      // fallback
    }

    // Rich built-in concierge knowledge fallback for Hostinger / static
    const lastMsg = messages[messages.length - 1]?.content.toLowerCase() || "";
    if (lastMsg.includes("chambre") || lastMsg.includes("tarif") || lastMsg.includes("prix") || lastMsg.includes("h\xE9berge") || lastMsg.includes("suite") || lastMsg.includes("nuit")) {
      return "L'Hôtel EDIVINCE A.N dispose de **32 unités d'hébergement d'exception** climatisées avec Wi-Fi Starlink gratuit :\n\n" +
        "1. **Chambre Confort** (4 unités) : **55 000 FCFA / nuit** — Confort et charme essentiels.\n" +
        "2. **Chambre Prestige** (11 unités) : **65 000 FCFA / nuit** — Spacieuse avec grand lit King Size.\n" +
        "3. **Chambre Premium** (12 unités) : **75 000 FCFA / nuit** — Grand standing avec espace bureau.\n" +
        "4. **Chambre Twin** (1 unité) : **90 000 FCFA / nuit** — Deux lits simples haut de gamme.\n" +
        "5. **Suite Junior** (2 unités) : **100 000 FCFA / nuit** — Espace salon douillet et charme tropical.\n" +
        "6. **Suite Prestige** (1 unité) : **135 000 FCFA / nuit** — Luxe absolu avec salon séparé.\n" +
        "7. **Suite Vue Mer** (1 unité) : **150 000 FCFA / nuit** — Vue panoramique spectaculaire sur l'océan.\n\n" +
        "Vous pouvez réserver directement en ligne avec confirmation immédiate sur notre formulaire !";
    }

    if (lastMsg.includes("contact") || lastMsg.includes("téléphone") || lastMsg.includes("telephone") || lastMsg.includes("whatsapp") || lastMsg.includes("appel") || lastMsg.includes("joindre")) {
      return "Vous pouvez nous joindre 24h/24 et 7j/7 directement :\n" +
        "- **WhatsApp & Appels MTN : +237 670 49 71 40**\n" +
        "- **Appels & SMS Orange : +237 696 82 66 09**\n" +
        "- **Email : Hoteledivince@gmail.com**\n\n" +
        "Notre réception est ouverte en permanence pour répondre à vos demandes et valider vos séjours.";
    }

    if (lastMsg.includes("localisation") || lastMsg.includes("adresse") || lastMsg.includes("situe") || lastMsg.includes("ou est") || lastMsg.includes("trouver")) {
      return "L'Hôtel EDIVINCE A.N est idéalement situé **en face de la Marina de Kribi** (BP 404), à 2 minutes de marche de la plage. Calme, sécurisé avec parking gardé 24h/24.";
    }

    if (lastMsg.includes("restaurant") || lastMsg.includes("mimosa") || lastMsg.includes("manger") || lastMsg.includes("menu") || lastMsg.includes("repas") || lastMsg.includes("petit dej")) {
      return "Notre restaurant **Le Mimosa** vous accueille tous les jours de 6h30 à 23h00 avec une carte raffinée :\n" +
        "- **Crevettes sautées de Kribi** (à l'ail ou à la Kribienne) : 6 500 FCFA\n" +
        "- **Gambas royales au Gingembre** : 10 000 FCFA\n" +
        "- **Filets de Bar ou Capitaine au Poivre de Penja** : 5 000 FCFA\n" +
        "- **Ndolé authentique aux Crevettes/Viande** : 6 500 FCFA\n" +
        "- **Pizzas gourmandes au feu de bois** : dès 7 500 FCFA\n" +
        "- **Cocktails tropicaux et bières fraîches** à déguster au bord de notre piscine !";
    }

    if (lastMsg.includes("piscine") || lastMsg.includes("baignade") || lastMsg.includes("detente") || lastMsg.includes("relax")) {
      return "Oui ! L'hôtel abrite une **magnifique piscine de relaxation** entourée de transats confortables et de palmiers, réservée à nos hôtes pour un séjour de pure détente.";
    }

    if (lastMsg.includes("chute") || lastMsg.includes("lobé") || lastMsg.includes("lobe") || lastMsg.includes("visite") || lastMsg.includes("tourisme")) {
      return "Les célèbres **Chutes de la Lobé** (les cascades uniques qui se jettent directement dans l'océan Atlantique) sont situées à seulement **12 minutes de route** (7 km) de l'Hôtel EDIVINCE. Notre réception peut vous assister pour une excursion guidée en pirogue !";
    }

    return "Mbolo ! Bienvenue à l'Hôtel EDIVINCE A.N Kribi. Je suis votre concierge virtuel. Comment puis-je vous aider pour votre séjour (chambres, restaurant Le Mimosa, piscine, visites à Kribi ou réservation) ?";
  }
};
