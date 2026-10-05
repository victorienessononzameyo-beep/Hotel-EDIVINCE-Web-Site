var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");
var import_vite = require("vite");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var DATA_FILE = import_path.default.resolve("./data.json");
function initDataFile() {
  if (!import_fs.default.existsSync(DATA_FILE)) {
    const roomsSeed = [];
    for (let i = 1; i <= 4; i++) {
      roomsSeed.push({
        number: `10${i}`,
        category: "confort",
        status: i === 2 ? "occupe" : i === 3 ? "nettoyage" : "libre",
        housekeeper: i % 2 === 0 ? "Florence N." : "Marie M.",
        lastCleaned: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      });
    }
    for (let i = 1; i <= 11; i++) {
      roomsSeed.push({
        number: `2${i < 10 ? "0" + i : i}`,
        category: "prestige",
        status: i % 3 === 0 ? "occupe" : i === 5 ? "maintenance" : i === 8 ? "nettoyage" : "libre",
        housekeeper: i % 2 === 0 ? "Th\xE9r\xE8se B." : "Alice O.",
        lastCleaned: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      });
    }
    for (let i = 1; i <= 12; i++) {
      roomsSeed.push({
        number: `3${i < 10 ? "0" + i : i}`,
        category: "premium",
        status: i === 12 ? "maintenance" : i % 4 === 0 ? "occupe" : i === 7 ? "nettoyage" : "libre",
        housekeeper: i % 3 === 0 ? "Florence N." : "Alice O.",
        lastCleaned: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      });
    }
    roomsSeed.push({
      number: "401",
      category: "twin",
      status: "libre",
      housekeeper: "Marie M.",
      lastCleaned: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    roomsSeed.push({
      number: "501",
      category: "junior",
      status: "occupe",
      housekeeper: "Th\xE9r\xE8se B.",
      lastCleaned: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    roomsSeed.push({
      number: "502",
      category: "junior",
      status: "libre",
      housekeeper: "Florence N.",
      lastCleaned: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    roomsSeed.push({
      number: "601",
      category: "prestige-suite",
      status: "libre",
      housekeeper: "Marie M.",
      lastCleaned: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    });
    roomsSeed.push({
      number: "701",
      category: "ocean-suite",
      status: "occupe",
      housekeeper: "Th\xE9r\xE8se B.",
      lastCleaned: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
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
          totalPrice: 275e3,
          status: "confirmed",
          segment: "Tourisme",
          createdAt: new Date(Date.now() - 4 * 24 * 3600 * 1e3).toISOString()
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
          totalPrice: 7e5,
          status: "confirmed",
          segment: "Famille",
          createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1e3).toISOString()
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
          totalPrice: 225e3,
          status: "confirmed",
          segment: "Business",
          createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1e3).toISOString()
        }
      ],
      reviews: [
        {
          id: "R-101",
          name: "Petit Bozard et son equipes",
          rating: 5,
          comment: "L'accueil est merveilleux, digne d'un palace tropical. Nous avons ador\xE9 d\xE9guster nos crevettes g\xE9antes et plats d'exception pr\xE8s de la piscine de relaxation de l'h\xF4tel !",
          roomType: "Suite Junior",
          date: "2026-08-22"
        },
        {
          id: "R-102",
          name: "Vanister ENAMA",
          rating: 5,
          comment: "Un s\xE9jour d'affaires parfait. Le Wi-Fi Starlink est d'une rapidit\xE9 incroyable et la salle de conf\xE9rence \xE9tait impeccablement \xE9quip\xE9e pour notre s\xE9minaire.",
          roomType: "Chambre Prestige",
          date: "2026-08-22"
        },
        {
          id: "R-103",
          name: "MAALHOX le VIBEUR",
          rating: 5,
          comment: "Vue splendide sur l'oc\xE9an Atlantique et la Marina de Kribi ! La chambre est immense, le service en chambre avec champagne en mer \xE9tait inoubliable.",
          roomType: "Suite Vue Mer",
          date: "2026-08-22"
        },
        {
          id: "R-104",
          name: "Victorien ESSONO NZAMEYO",
          rating: 5,
          comment: "Des souvenirs inoubliables grav\xE9s gr\xE2ce aux magnifiques prises de vue par drone et \xE0 l'attention exceptionnelle de toute l'\xE9quipe de l'H\xF4tel EDIVINCE !",
          roomType: "Suite Prestige",
          date: "2026-08-22"
        }
      ],
      rooms: roomsSeed,
      stats: {
        viewsCount: 382
      }
    };
    import_fs.default.writeFileSync(DATA_FILE, JSON.stringify(seedData, null, 2), "utf-8");
  }
}
initDataFile();
function getData() {
  try {
    return JSON.parse(import_fs.default.readFileSync(DATA_FILE, "utf-8"));
  } catch (e) {
    return { bookings: [], reviews: [], rooms: [], stats: { viewsCount: 382 } };
  }
}
function saveData(data) {
  import_fs.default.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}
var ROOM_PRICES = {
  "confort": 55e3,
  "prestige": 65e3,
  "premium": 75e3,
  "twin": 9e4,
  "junior": 1e5,
  "prestige-suite": 135e3,
  "ocean-suite": 15e4
};
var systemInstruction = `
Vous \xEAtes l'Assistant IA officiel (le concierge virtuel) de l'H\xF4tel EDIVINCE A.N situ\xE9 \xE0 Kribi, Cameroun.
Votre but est d'accueillir les visiteurs du site, de r\xE9pondre avec courtoisie et professionnalisme \xE0 toutes leurs questions sur l'h\xF4tel, ses chambres, ses tarifs, sa localisation, son restaurant "Le Mimosa", sa piscine de relaxation, et les activit\xE9s touristiques \xE0 Kribi, et de les guider vers la r\xE9servation directe.

CONTACTS OFFICIELS DE L'H\xD4TEL :
- Nom : H\xF4tel EDIVINCE A.N Kribi
- Adresse : BP 404, Face Marina, Kribi, Cameroun
- T\xE9l\xE9phone Orange : +237 696 82 66 09 (Appels & SMS)
- T\xE9l\xE9phone MTN : +237 670 49 71 40 (WhatsApp & Appels)
- Email : Hoteledivince@gmail.com
- Disponibilit\xE9 : R\xE9ception et service d'accueil ouverts 24h/24, 7j/7

INFRASTRUCTURE & SERVICES DE L'H\xD4TEL :
- Emplacement : Situ\xE9 id\xE9alement face \xE0 la Marina de Kribi, \xE0 seulement 2-3 minutes \xE0 pied de la plage. Calme, s\xE9curit\xE9 absolue avec gardiennage 24h/24, parking ferm\xE9 s\xE9curis\xE9.
- Services inclus : Wi-Fi haut d\xE9bit Starlink gratuit, Climatisation performante, t\xE9l\xE9visions \xE9cran plat c\xE2bl\xE9es, douches privatives spacieuses, nettoyage quotidien (housekeeping).
- Piscine de Relaxation : Une magnifique piscine entour\xE9e de transats, propice \xE0 la d\xE9tente et id\xE9ale pour siroter un cocktail tropical.
- Restaurant "Le Mimosa" : Notre restaurant d'exception proposant une cuisine raffin\xE9e associant gastronomie camerounaise et fruits de mer frais de la Marina. Plats phares : Ndol\xE9 aux fruits de mer, Crevettes g\xE9antes de Kribi grill\xE9es, Poisson brais\xE9 du d\xE9barcad\xE8re, brochettes de lotte.

INVENTAIRE DES CHAMBRES ET TARIFS (PMS Officiel - 32 unit\xE9s au total) :
1. Chambre Confort (4 unit\xE9s) :
   - Tarif : 55 000 FCFA / nuit.
   - Id\xE9al pour s\xE9jours agr\xE9ables et \xE9conomiques. Lit double confortable, climatisation, bureau, TV c\xE2bl\xE9e.
2. Chambre Prestige (11 unit\xE9s) :
   - Tarif : 65 000 FCFA / nuit.
   - Spacieuse et \xE9l\xE9gante, parfaite pour les couples ou voyageurs d'affaires. Lit King size, climatisation, bureau d'affaires.
3. Chambre Premium (12 unit\xE9s) :
   - Tarif : 75 000 FCFA / nuit.
   - Grand standing, espace g\xE9n\xE9reux et confort moderne sup\xE9rieur face \xE0 la Marina.
4. Chambre Twin (1 unit\xE9) :
   - Tarif : 90 000 FCFA / nuit.
   - Dispose de deux lits s\xE9par\xE9s confortables de haute qualit\xE9, id\xE9ale pour collaborateurs ou amis.
5. Suite Junior (2 unit\xE9s) :
   - Tarif : 100 000 FCFA / nuit.
   - Une suite de charme avec espace salon int\xE9gr\xE9, id\xE9ale pour les escapades en amoureux.
6. Suite Prestige (1 unit\xE9) :
   - Tarif : 135 000 FCFA / nuit.
   - Luxe tropical exceptionnel. Grand salon s\xE9par\xE9, literie haut de gamme, service sur-mesure.
7. Suite Vue Mer (1 unit\xE9) :
   - Tarif : 150 000 FCFA / nuit.
   - Le summum de l'H\xF4tel EDIVINCE. Vue panoramique spectaculaire sur l'oc\xE9an et la Marina de Kribi.

EXP\xC9RIENCES ET ATTRACTIONS \xC0 KRIBI (Guide Touristique) :
- Les Chutes de la Lob\xE9 (les cascades spectaculaires uniques au monde se jetant dans l'oc\xE9an, situ\xE9es \xE0 7.2 km - 12 min de route).
- La Plage de sable fin de Grand Batanga (authenticit\xE9, farniente).
- Le d\xE9barcad\xE8re de Kribi (achat de poissons et fruits de mer ultra frais pr\xE9par\xE9s \xE0 la braise).
- Balades en pirogue sur la Lob\xE9 et visites de villages pygm\xE9es.

TON DE CONVERSATION :
- Tr\xE8s chaleureux, poli, accueillant et digne de l'hospitalit\xE9 camerounaise ("Mbolo", "Bienvenue \xE0 Kribi !").
- R\xE9ponses fluides, claires, r\xE9dig\xE9es en fran\xE7ais ou en anglais selon la langue du client.
- Incitez poliment le client \xE0 finaliser sa r\xE9servation directe via le formulaire en ligne ou directement sur WhatsApp (+237 696 82 66 09).
- Calculez toujours avec pr\xE9cision les devis sur demande (ex: pour 3 nuits en Chambre Prestige = 3 x 65 000 = 195 000 FCFA).
`;
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array" });
    }
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
      const lastMessage = messages[messages.length - 1]?.content || "";
      const lowerMsg = lastMessage.toLowerCase();
      let reply = "Mbolo ! Bienvenue \xE0 l'H\xF4tel EDIVINCE A.N Kribi. Je suis votre assistant virtuel de conciergerie. Comment puis-je ensoleiller votre s\xE9jour aujourd'hui ?";
      if (lowerMsg.includes("chambre") || lowerMsg.includes("tarif") || lowerMsg.includes("prix") || lowerMsg.includes("h\xE9berge") || lowerMsg.includes("suite")) {
        reply = "L'H\xF4tel EDIVINCE A.N dispose de **32 unit\xE9s d'h\xE9bergement d'exception** climatis\xE9es avec Wi-Fi Starlink gratuit :\n\n1. **Chambre Confort** (4 unit\xE9s) : **55 000 FCFA / nuit** \u2014 Confort et charme essentiels.\n2. **Chambre Prestige** (11 unit\xE9s) : **65 000 FCFA / nuit** \u2014 Tr\xE8s spacieuse avec lit King Size.\n3. **Chambre Premium** (12 unit\xE9s) : **75 000 FCFA / nuit** \u2014 Confort haut de gamme et espace de travail.\n4. **Chambre Twin** (1 unit\xE9) : **90 000 FCFA / nuit** \u2014 Deux lits simples haut de gamme.\n5. **Suite Junior** (2 unit\xE9s) : **100 000 FCFA / nuit** \u2014 Espace salon douillet et charme tropical.\n6. **Suite Prestige** (1 unit\xE9) : **135 000 FCFA / nuit** \u2014 Luxe absolu avec salon s\xE9par\xE9.\n7. **Suite Vue Mer** (1 unit\xE9) : **150 000 FCFA / nuit** \u2014 Vue panoramique spectaculaire sur l'oc\xE9an.\n\nSouhaitez-vous que je v\xE9rifie les disponibilit\xE9s pour vos dates ?";
      } else if (lowerMsg.includes("contact") || lowerMsg.includes("t\xE9l\xE9phone") || lowerMsg.includes("whatsapp") || lowerMsg.includes("appel")) {
        reply = "Vous pouvez nous joindre en permanence 24h/24 et 7j/7 par WhatsApp ou appel direct aux num\xE9ros officiels :\n- **Orange : +237 696 82 66 09**\n- **MTN : +237 670 49 71 40**\n- **Email : sci.edivince@gmail.com**\n\nN'h\xE9sitez pas \xE0 nous \xE9crire directement, notre service de r\xE9ception se fera un plaisir de bloquer vos dates !";
      } else if (lowerMsg.includes("localisation") || lowerMsg.includes("adresse") || lowerMsg.includes("situe") || lowerMsg.includes("ou est")) {
        reply = "L'H\xF4tel EDIVINCE A.N est id\xE9alement implant\xE9 **en face de la Marina de Kribi** (Cameroun), BP 404. C'est l'emplacement id\xE9al, \xE0 2 minutes \xE0 pied de la plage de sable fin et \xE0 proximit\xE9 des points d'int\xE9r\xEAt phares de la cit\xE9 baln\xE9aire.";
      } else if (lowerMsg.includes("restaurant") || lowerMsg.includes("mimosa") || lowerMsg.includes("manger") || lowerMsg.includes("nourriture") || lowerMsg.includes("menu")) {
        reply = "D\xE9couvrez le restaurant d'exception de notre h\xF4tel : **Le Mimosa** ! Nous servons les sp\xE9cialit\xE9s locales de Kribi et une cuisine raffin\xE9e :\n- Le c\xE9l\xE8bre **Ndol\xE9 aux fruits de mer** (crevettes, poissons, calamars)\n- Les spectaculaires **Crevettes g\xE9antes de Kribi** grill\xE9es aux herbes tropicales\n- Le **Poisson brais\xE9** fra\xEEchement p\xEAch\xE9 \xE0 la Marina\n- Une carte de cocktails tropicaux \xE0 savourer pr\xE8s de notre piscine.\n\nLe restaurant est ouvert tous les jours de 6h30 \xE0 23h00 pour nos clients et visiteurs externes !";
      } else if (lowerMsg.includes("piscine") || lowerMsg.includes("baignade") || lowerMsg.includes("relax")) {
        reply = "Oui ! L'h\xF4tel abrite une **magnifique piscine de relaxation** entour\xE9e de verdure tropicale et de transats confortables. C'est l'endroit r\xEAv\xE9 pour vous d\xE9tendre apr\xE8s une journ\xE9e de travail ou de plage, tout en d\xE9gustant nos cocktails signature.";
      } else if (lowerMsg.includes("chute") || lowerMsg.includes("lob\xE9") || lowerMsg.includes("lobe") || lowerMsg.includes("visiter")) {
        reply = "Les majestueuses **Chutes de la Lob\xE9** se situent \xE0 seulement **12 minutes de route** (7.2 km) de l'H\xF4tel EDIVINCE. Notre r\xE9ception se fera un plaisir de vous organiser une excursion s\xE9curis\xE9e avec balade en pirogue traditionnelle sur le fleuve Lob\xE9 !";
      }
      return res.json({ reply });
    }
    const ai = new import_genai.GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
    const contents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });
    res.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Erreur de communication avec l'assistant IA" });
  }
});
app.post("/api/book", (req, res) => {
  try {
    const { guestName, guestEmail, guestPhone, roomType, checkIn, checkOut, guestsCount, segment } = req.body;
    if (!guestName || !guestPhone || !roomType || !checkIn || !checkOut) {
      return res.status(400).json({ error: "Veuillez remplir tous les champs obligatoires (Nom, T\xE9l\xE9phone, Chambre, Check-in, Check-out)" });
    }
    const dateIn = new Date(checkIn);
    const dateOut = new Date(checkOut);
    const diffTime = Math.abs(dateOut.getTime() - dateIn.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24)) || 1;
    const pricePerNight = ROOM_PRICES[roomType.toLowerCase()] || 55e3;
    const totalPrice = pricePerNight * diffDays;
    const data = getData();
    const newId = `B-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking = {
      id: newId,
      guestName,
      guestEmail: guestEmail || "non-sp\xE9cifi\xE9",
      guestPhone,
      roomType: roomType.toLowerCase(),
      checkIn,
      checkOut,
      guestsCount: Number(guestsCount) || 1,
      totalPrice,
      status: "pending",
      segment: segment || "Tourisme",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    data.bookings.push(newBooking);
    if (data.rooms) {
      const roomToOccupy = data.rooms.find((r) => r.category === roomType.toLowerCase() && r.status === "libre");
      if (roomToOccupy) {
        roomToOccupy.status = "occupe";
      }
    }
    saveData(data);
    res.json({ success: true, booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: "Impossible d'enregistrer la r\xE9servation" });
  }
});
app.get("/api/bookings", (req, res) => {
  try {
    const data = getData();
    res.json(data.bookings);
  } catch (error) {
    res.status(500).json({ error: "Impossible de r\xE9cup\xE9rer les r\xE9servations" });
  }
});
app.patch("/api/bookings/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = getData();
    const index = data.bookings.findIndex((b) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "R\xE9servation introuvable" });
    }
    const prevStatus = data.bookings[index].status;
    data.bookings[index].status = status;
    if (status === "canceled" && data.rooms) {
      const type = data.bookings[index].roomType;
      const occupiedRoom = data.rooms.find((r) => r.category === type && r.status === "occupe");
      if (occupiedRoom) {
        occupiedRoom.status = "nettoyage";
      }
    }
    saveData(data);
    res.json({ success: true, booking: data.bookings[index] });
  } catch (error) {
    res.status(500).json({ error: "Impossible de modifier la r\xE9servation" });
  }
});
app.get("/api/rooms", (req, res) => {
  try {
    const data = getData();
    if (!data.rooms || data.rooms.length === 0) {
      initDataFile();
    }
    res.json(getData().rooms || []);
  } catch (error) {
    res.status(500).json({ error: "Impossible de r\xE9cup\xE9rer les chambres du PMS" });
  }
});
app.patch("/api/rooms/:number", (req, res) => {
  try {
    const { number } = req.params;
    const { status, housekeeper } = req.body;
    const data = getData();
    if (!data.rooms) data.rooms = [];
    const index = data.rooms.findIndex((r) => r.number === number);
    if (index === -1) {
      return res.status(404).json({ error: "Chambre introuvable dans le PMS" });
    }
    if (status) data.rooms[index].status = status;
    if (housekeeper) data.rooms[index].housekeeper = housekeeper;
    if (status === "libre") {
      data.rooms[index].lastCleaned = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    }
    saveData(data);
    res.json({ success: true, room: data.rooms[index] });
  } catch (error) {
    res.status(500).json({ error: "Impossible de mettre \xE0 jour le statut PMS de la chambre" });
  }
});
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
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    data.reviews.push(newReview);
    saveData(data);
    res.json({ success: true, review: newReview });
  } catch (error) {
    res.status(500).json({ error: "Impossible d'enregistrer votre avis" });
  }
});
app.get("/api/reviews", (req, res) => {
  try {
    const data = getData();
    res.json(data.reviews);
  } catch (error) {
    res.status(500).json({ error: "Impossible de charger les avis" });
  }
});
app.get("/api/stats", (req, res) => {
  try {
    const data = getData();
    data.stats.viewsCount = (data.stats.viewsCount || 0) + 1;
    saveData(data);
    const totalReservations = data.bookings.length;
    const totalRevenue = data.bookings.filter((b) => b.status === "confirmed" || b.status === "pending").reduce((sum, b) => sum + b.totalPrice, 0);
    const roomDistribution = {
      confort: data.bookings.filter((b) => b.roomType === "confort").length,
      prestige: data.bookings.filter((b) => b.roomType === "prestige").length,
      premium: data.bookings.filter((b) => b.roomType === "premium").length,
      twin: data.bookings.filter((b) => b.roomType === "twin").length,
      junior: data.bookings.filter((b) => b.roomType === "junior").length,
      "prestige-suite": data.bookings.filter((b) => b.roomType === "prestige-suite").length,
      "ocean-suite": data.bookings.filter((b) => b.roomType === "ocean-suite").length
    };
    const segmentDistribution = {
      Tourisme: data.bookings.filter((b) => b.segment === "Tourisme" || b.segment === "Touriste").length,
      Business: data.bookings.filter((b) => b.segment === "Business").length,
      Famille: data.bookings.filter((b) => b.segment === "Famille").length
    };
    res.json({
      totalReservations,
      totalRevenue,
      viewsCount: data.stats.viewsCount,
      roomDistribution,
      segmentDistribution,
      recentBookings: [...data.bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 10)
    });
  } catch (error) {
    res.status(500).json({ error: "Impossible de g\xE9n\xE9rer le rapport BI" });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
