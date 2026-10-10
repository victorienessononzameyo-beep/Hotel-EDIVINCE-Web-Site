import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// CORS & Hostinger reverse-proxy compatibility
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Path to data file
const DATA_FILE = path.resolve("./data.json");

// Define PMS rooms category helper
const CATEGORIES = ["confort", "prestige", "premium", "twin", "junior", "prestige-suite", "ocean-suite"] as const;

// Ensure data file exists with seed data matching 32-unit PMS inventory
function initDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    // Generate 32 distinct room units for the PMS system
    const roomsSeed: any[] = [];
    
    // 4 Chambres Confort (Rooms 101 - 104)
    for (let i = 1; i <= 4; i++) {
      roomsSeed.push({
        number: `10${i}`,
        category: "confort",
        status: i === 2 ? "occupe" : i === 3 ? "nettoyage" : "libre",
        housekeeper: i % 2 === 0 ? "Florence N." : "Marie M.",
        lastCleaned: new Date().toISOString().split("T")[0]
      });
    }

    // 11 Chambres Prestige (Rooms 201 - 211)
    for (let i = 1; i <= 11; i++) {
      roomsSeed.push({
        number: `2${i < 10 ? "0" + i : i}`,
        category: "prestige",
        status: i % 3 === 0 ? "occupe" : i === 5 ? "maintenance" : i === 8 ? "nettoyage" : "libre",
        housekeeper: i % 2 === 0 ? "Thérèse B." : "Alice O.",
        lastCleaned: new Date().toISOString().split("T")[0]
      });
    }

    // 12 Chambres Premium (Rooms 301 - 312)
    for (let i = 1; i <= 12; i++) {
      roomsSeed.push({
        number: `3${i < 10 ? "0" + i : i}`,
        category: "premium",
        status: i === 12 ? "maintenance" : i % 4 === 0 ? "occupe" : i === 7 ? "nettoyage" : "libre",
        housekeeper: i % 3 === 0 ? "Florence N." : "Alice O.",
        lastCleaned: new Date().toISOString().split("T")[0]
      });
    }

    // 1 Chambre Twin (Room 401)
    roomsSeed.push({
      number: "401",
      category: "twin",
      status: "libre",
      housekeeper: "Marie M.",
      lastCleaned: new Date().toISOString().split("T")[0]
    });

    // 2 Suites Junior (Rooms 501 - 502)
    roomsSeed.push({
      number: "501",
      category: "junior",
      status: "occupe",
      housekeeper: "Thérèse B.",
      lastCleaned: new Date().toISOString().split("T")[0]
    });
    roomsSeed.push({
      number: "502",
      category: "junior",
      status: "libre",
      housekeeper: "Florence N.",
      lastCleaned: new Date().toISOString().split("T")[0]
    });

    // 1 Suite Prestige (Room 601)
    roomsSeed.push({
      number: "601",
      category: "prestige-suite",
      status: "libre",
      housekeeper: "Marie M.",
      lastCleaned: new Date().toISOString().split("T")[0]
    });

    // 1 Suite Vue Mer (Room 701)
    roomsSeed.push({
      number: "701",
      category: "ocean-suite",
      status: "occupe",
      housekeeper: "Thérèse B.",
      lastCleaned: new Date().toISOString().split("T")[0]
    });

    const seedData = {
      bookings: [
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
      ],
      reviews: [
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
      ],
      rooms: roomsSeed,
      stats: {
        viewsCount: 382
      }
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(seedData, null, 2), "utf-8");
  }
}
initDataFile();

function getData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch (e) {
    return { bookings: [], reviews: [], rooms: [], stats: { viewsCount: 382 } };
  }
}

function saveData(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Pricing mapping from inventory (Source PMS)
const ROOM_PRICES: Record<string, number> = {
  "confort": 55000,
  "prestige": 65000,
  "premium": 75000,
  "twin": 90000,
  "junior": 100000,
  "prestige-suite": 135000,
  "ocean-suite": 150000
};

// System Instruction for Gemini
const systemInstruction = `
Vous êtes l'Assistant IA officiel (le concierge virtuel) de l'Hôtel EDIVINCE A.N situé à Kribi, Cameroun.
Votre but est d'accueillir les visiteurs du site, de répondre avec courtoisie et professionnalisme à toutes leurs questions sur l'hôtel, ses chambres, ses tarifs, sa localisation, son restaurant "Le Mimosa", sa piscine de relaxation, et les activités touristiques à Kribi, et de les guider vers la réservation directe.

CONTACTS OFFICIELS DE L'HÔTEL :
- Nom : Hôtel EDIVINCE A.N Kribi
- Adresse : BP 404, Face Marina, Kribi, Cameroun
- Téléphone Orange : +237 696 82 66 09 (Appels & SMS)
- Téléphone MTN : +237 670 49 71 40 (WhatsApp & Appels)
- Email : Hoteledivince@gmail.com
- Disponibilité : Réception et service d'accueil ouverts 24h/24, 7j/7

INFRASTRUCTURE & SERVICES DE L'HÔTEL :
- Emplacement : Situé idéalement face à la Marina de Kribi, à seulement 2-3 minutes à pied de la plage. Calme, sécurité absolue avec gardiennage 24h/24, parking fermé sécurisé.
- Services inclus : Wi-Fi haut débit Starlink gratuit, Climatisation performante, télévisions écran plat câblées, douches privatives spacieuses, nettoyage quotidien (housekeeping).
- Piscine de Relaxation : Une magnifique piscine entourée de transats, propice à la détente et idéale pour siroter un cocktail tropical.
- Restaurant "Le Mimosa" : Notre restaurant d'exception proposant une cuisine raffinée associant gastronomie camerounaise et fruits de mer frais de la Marina. Plats phares : Ndolé aux fruits de mer, Crevettes géantes de Kribi grillées, Poisson braisé du débarcadère, brochettes de lotte.

INVENTAIRE DES CHAMBRES ET TARIFS (PMS Officiel - 32 unités au total) :
1. Chambre Confort (4 unités) :
   - Tarif : 55 000 FCFA / nuit.
   - Idéal pour séjours agréables et économiques. Lit double confortable, climatisation, bureau, TV câblée.
2. Chambre Prestige (11 unités) :
   - Tarif : 65 000 FCFA / nuit.
   - Spacieuse et élégante, parfaite pour les couples ou voyageurs d'affaires. Lit King size, climatisation, bureau d'affaires.
3. Chambre Premium (12 unités) :
   - Tarif : 75 000 FCFA / nuit.
   - Grand standing, espace généreux et confort moderne supérieur face à la Marina.
4. Chambre Twin (1 unité) :
   - Tarif : 90 000 FCFA / nuit.
   - Dispose de deux lits séparés confortables de haute qualité, idéale pour collaborateurs ou amis.
5. Suite Junior (2 unités) :
   - Tarif : 100 000 FCFA / nuit.
   - Une suite de charme avec espace salon intégré, idéale pour les escapades en amoureux.
6. Suite Prestige (1 unité) :
   - Tarif : 135 000 FCFA / nuit.
   - Luxe tropical exceptionnel. Grand salon séparé, literie haut de gamme, service sur-mesure.
7. Suite Vue Mer (1 unité) :
   - Tarif : 150 000 FCFA / nuit.
   - Le summum de l'Hôtel EDIVINCE. Vue panoramique spectaculaire sur l'océan et la Marina de Kribi.

EXPÉRIENCES ET ATTRACTIONS À KRIBI (Guide Touristique) :
- Les Chutes de la Lobé (les cascades spectaculaires uniques au monde se jetant dans l'océan, situées à 7.2 km - 12 min de route).
- La Plage de sable fin de Grand Batanga (authenticité, farniente).
- Le débarcadère de Kribi (achat de poissons et fruits de mer ultra frais préparés à la braise).
- Balades en pirogue sur la Lobé et visites de villages pygmées.

TON DE CONVERSATION :
- Très chaleureux, poli, accueillant et digne de l'hospitalité camerounaise ("Mbolo", "Bienvenue à Kribi !").
- Réponses fluides, claires, rédigées en français ou en anglais selon la langue du client.
- Incitez poliment le client à finaliser sa réservation directe via le formulaire en ligne ou directement sur WhatsApp (+237 696 82 66 09).
- Calculez toujours avec précision les devis sur demande (ex: pour 3 nuits en Chambre Prestige = 3 x 65 000 = 195 000 FCFA).
`;

// --- API ROUTES ---

// Chat IA Concierge Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array" });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
      // Return high-fidelity answers matching the official 32-unit PMS system
      const lastMessage = messages[messages.length - 1]?.content || "";
      const lowerMsg = lastMessage.toLowerCase();
      let reply = "Mbolo ! Bienvenue à l'Hôtel EDIVINCE A.N Kribi. Je suis votre assistant virtuel de conciergerie. Comment puis-je ensoleiller votre séjour aujourd'hui ?";
      
      if (lowerMsg.includes("chambre") || lowerMsg.includes("tarif") || lowerMsg.includes("prix") || lowerMsg.includes("héberge") || lowerMsg.includes("suite")) {
        reply = "L'Hôtel EDIVINCE A.N dispose de **32 unités d'hébergement d'exception** climatisées avec Wi-Fi Starlink gratuit :\n\n" +
                "1. **Chambre Confort** (4 unités) : **55 000 FCFA / nuit** — Confort et charme essentiels.\n" +
                "2. **Chambre Prestige** (11 unités) : **65 000 FCFA / nuit** — Très spacieuse avec lit King Size.\n" +
                "3. **Chambre Premium** (12 unités) : **75 000 FCFA / nuit** — Confort haut de gamme et espace de travail.\n" +
                "4. **Chambre Twin** (1 unité) : **90 000 FCFA / nuit** — Deux lits simples haut de gamme.\n" +
                "5. **Suite Junior** (2 unités) : **100 000 FCFA / nuit** — Espace salon douillet et charme tropical.\n" +
                "6. **Suite Prestige** (1 unité) : **135 000 FCFA / nuit** — Luxe absolu avec salon séparé.\n" +
                "7. **Suite Vue Mer** (1 unité) : **150 000 FCFA / nuit** — Vue panoramique spectaculaire sur l'océan.\n\n" +
                "Souhaitez-vous que je vérifie les disponibilités pour vos dates ?";
      } else if (lowerMsg.includes("contact") || lowerMsg.includes("téléphone") || lowerMsg.includes("whatsapp") || lowerMsg.includes("appel")) {
        reply = "Vous pouvez nous joindre en permanence 24h/24 et 7j/7 par WhatsApp ou appel direct aux numéros officiels :\n" +
                "- **Orange : +237 696 82 66 09**\n" +
                "- **MTN : +237 670 49 71 40**\n" +
                "- **Email : sci.edivince@gmail.com**\n\n" +
                "N'hésitez pas à nous écrire directement, notre service de réception se fera un plaisir de bloquer vos dates !";
      } else if (lowerMsg.includes("localisation") || lowerMsg.includes("adresse") || lowerMsg.includes("situe") || lowerMsg.includes("ou est")) {
        reply = "L'Hôtel EDIVINCE A.N est idéalement implanté **en face de la Marina de Kribi** (Cameroun), BP 404. C'est l'emplacement idéal, à 2 minutes à pied de la plage de sable fin et à proximité des points d'intérêt phares de la cité balnéaire.";
      } else if (lowerMsg.includes("restaurant") || lowerMsg.includes("mimosa") || lowerMsg.includes("manger") || lowerMsg.includes("nourriture") || lowerMsg.includes("menu")) {
        reply = "Découvrez le restaurant d'exception de notre hôtel : **Le Mimosa** ! Nous servons les spécialités locales de Kribi et une cuisine raffinée :\n" +
                "- Le célèbre **Ndolé aux fruits de mer** (crevettes, poissons, calamars)\n" +
                "- Les spectaculaires **Crevettes géantes de Kribi** grillées aux herbes tropicales\n" +
                "- Le **Poisson braisé** fraîchement pêché à la Marina\n" +
                "- Une carte de cocktails tropicaux à savourer près de notre piscine.\n\n" +
                "Le restaurant est ouvert tous les jours de 6h30 à 23h00 pour nos clients et visiteurs externes !";
      } else if (lowerMsg.includes("piscine") || lowerMsg.includes("baignade") || lowerMsg.includes("relax")) {
        reply = "Oui ! L'hôtel abrite une **magnifique piscine de relaxation** entourée de verdure tropicale et de transats confortables. C'est l'endroit rêvé pour vous détendre après une journée de travail ou de plage, tout en dégustant nos cocktails signature.";
      } else if (lowerMsg.includes("chute") || lowerMsg.includes("lobé") || lowerMsg.includes("lobe") || lowerMsg.includes("visiter")) {
        reply = "Les majestueuses **Chutes de la Lobé** se situent à seulement **12 minutes de route** (7.2 km) de l'Hôtel EDIVINCE. Notre réception se fera un plaisir de vous organiser une excursion sécurisée avec balade en pirogue traditionnelle sur le fleuve Lobé !";
      }
      
      return res.json({ reply });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const contents = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Erreur de communication avec l'assistant IA" });
  }
});

// Book Room Endpoint
app.post("/api/book", (req, res) => {
  try {
    const { guestName, guestEmail, guestPhone, roomType, checkIn, checkOut, guestsCount, segment } = req.body;
    
    if (!guestName || !guestPhone || !roomType || !checkIn || !checkOut) {
      return res.status(400).json({ error: "Veuillez remplir tous les champs obligatoires (Nom, Téléphone, Chambre, Check-in, Check-out)" });
    }

    const dateIn = new Date(checkIn);
    const dateOut = new Date(checkOut);
    const diffTime = Math.abs(dateOut.getTime() - dateIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    const pricePerNight = ROOM_PRICES[roomType.toLowerCase()] || 55000;
    const totalPrice = pricePerNight * diffDays;

    const data = getData();
    const newId = `B-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking = {
      id: newId,
      guestName,
      guestEmail: guestEmail || "non-spécifié",
      guestPhone,
      roomType: roomType.toLowerCase(),
      checkIn,
      checkOut,
      guestsCount: Number(guestsCount) || 1,
      totalPrice,
      status: "pending",
      segment: segment || "Tourisme",
      createdAt: new Date().toISOString()
    };

    data.bookings.push(newBooking);

    // If possible, mark one free room of this category as "occupé" in our PMS simulation
    if (data.rooms) {
      const roomToOccupy = data.rooms.find((r: any) => r.category === roomType.toLowerCase() && r.status === "libre");
      if (roomToOccupy) {
        roomToOccupy.status = "occupe";
      }
    }

    saveData(data);

    res.json({ success: true, booking: newBooking });
  } catch (error: any) {
    res.status(500).json({ error: "Impossible d'enregistrer la réservation" });
  }
});

// Get Bookings Endpoint
app.get("/api/bookings", (req, res) => {
  try {
    const data = getData();
    res.json(data.bookings);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer les réservations" });
  }
});

// Update Booking Status Endpoint (Cancel / Confirm)
app.patch("/api/bookings/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = getData();
    const index = data.bookings.findIndex((b: any) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Réservation introuvable" });
    }
    
    const prevStatus = data.bookings[index].status;
    data.bookings[index].status = status;

    // Handle PMS state side effects
    if (status === "canceled" && data.rooms) {
      // Change one occupied room of this type to "nettoyage"
      const type = data.bookings[index].roomType;
      const occupiedRoom = data.rooms.find((r: any) => r.category === type && r.status === "occupe");
      if (occupiedRoom) {
        occupiedRoom.status = "nettoyage";
      }
    }
    
    saveData(data);
    res.json({ success: true, booking: data.bookings[index] });
  } catch (error) {
    res.status(500).json({ error: "Impossible de modifier la réservation" });
  }
});

// --- PMS ROOM API ---
// Fetch all PMS room states
app.get("/api/rooms", (req, res) => {
  try {
    const data = getData();
    if (!data.rooms || data.rooms.length === 0) {
      // Re-trigger initialization if empty
      initDataFile();
    }
    res.json(getData().rooms || []);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer les chambres du PMS" });
  }
});

// Update single PMS room status / housekeeping assignment
app.patch("/api/rooms/:number", (req, res) => {
  try {
    const { number } = req.params;
    const { status, housekeeper } = req.body;
    const data = getData();
    
    if (!data.rooms) data.rooms = [];
    const index = data.rooms.findIndex((r: any) => r.number === number);
    
    if (index === -1) {
      return res.status(404).json({ error: "Chambre introuvable dans le PMS" });
    }
    
    if (status) data.rooms[index].status = status;
    if (housekeeper) data.rooms[index].housekeeper = housekeeper;
    if (status === "libre") {
      data.rooms[index].lastCleaned = new Date().toISOString().split("T")[0];
    }
    
    saveData(data);
    res.json({ success: true, room: data.rooms[index] });
  } catch (error) {
    res.status(500).json({ error: "Impossible de mettre à jour le statut PMS de la chambre" });
  }
});

// Reviews Endpoint (POST)
app.post("/api/reviews", (req, res) => {
  try {
    const { name, rating, comment, roomType } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ error: "Veuillez remplir le nom, la note et le commentaire" });
    }

    const data = getData();
    const newReview = {
      id: `R-${Math.floor(100 + Math.random() * 900)}`,
      name,
      rating: Number(rating),
      comment,
      roomType: roomType || "Chambre Confort",
      date: new Date().toISOString().split("T")[0]
    };

    data.reviews.push(newReview);
    saveData(data);

    res.json({ success: true, review: newReview });
  } catch (error) {
    res.status(500).json({ error: "Impossible d'enregistrer votre avis" });
  }
});

// Reviews Endpoint (GET)
app.get("/api/reviews", (req, res) => {
  try {
    const data = getData();
    res.json(data.reviews);
  } catch (error) {
    res.status(500).json({ error: "Impossible de charger les avis" });
  }
});

// Stats Endpoint (Business Intelligence Dashboard)
app.get("/api/stats", (req, res) => {
  try {
    const data = getData();
    
    // Increment view count
    data.stats.viewsCount = (data.stats.viewsCount || 0) + 1;
    saveData(data);

    const totalReservations = data.bookings.length;
    const totalRevenue = data.bookings
      .filter((b: any) => b.status === "confirmed" || b.status === "pending")
      .reduce((sum: number, b: any) => sum + b.totalPrice, 0);

    const roomDistribution = {
      confort: data.bookings.filter((b: any) => b.roomType === "confort").length,
      prestige: data.bookings.filter((b: any) => b.roomType === "prestige").length,
      premium: data.bookings.filter((b: any) => b.roomType === "premium").length,
      twin: data.bookings.filter((b: any) => b.roomType === "twin").length,
      junior: data.bookings.filter((b: any) => b.roomType === "junior").length,
      "prestige-suite": data.bookings.filter((b: any) => b.roomType === "prestige-suite").length,
      "ocean-suite": data.bookings.filter((b: any) => b.roomType === "ocean-suite").length
    };

    const segmentDistribution = {
      Tourisme: data.bookings.filter((b: any) => b.segment === "Tourisme" || b.segment === "Touriste").length,
      Business: data.bookings.filter((b: any) => b.segment === "Business").length,
      Famille: data.bookings.filter((b: any) => b.segment === "Famille").length
    };

    res.json({
      totalReservations,
      totalRevenue,
      viewsCount: data.stats.viewsCount,
      roomDistribution,
      segmentDistribution,
      recentBookings: [...data.bookings].sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt)).slice(0, 10)
    });
  } catch (error) {
    res.status(500).json({ error: "Impossible de générer le rapport BI" });
  }
});

// --- VITE MIDDLEWARE / STATIC FILES SERVING ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
