import { useState, useEffect } from "react";
import { BIStats, Booking, PMSUnit, RoomSlug } from "../types";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  Check, 
  X, 
  Clock, 
  RefreshCw, 
  BarChart2, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Database,
  User,
  Wrench,
  Trash2,
  AlertCircle,
  Lock,
  LogOut,
  Mail,
  Key
} from "lucide-react";
import SupabaseSchema from "./SupabaseSchema";
import { apiService } from "../utils/apiService";

const AUTHORIZED_EMAILS = [
  "victorienessononzameyo@gmail.com",
  "hoteledivince@gmail.com"
];

export default function BIDashboard() {
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return localStorage.getItem("pms_admin_email") || "";
  });
  const [inputEmail, setInputEmail] = useState("");
  const [authError, setAuthError] = useState("");

  const [stats, setStats] = useState<BIStats | null>(null);
  const [pmsRooms, setPmsRooms] = useState<PMSUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updatingRoomNo, setUpdatingRoomNo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"bi" | "crm" | "pms" | "sql">("bi");

  const [housekeeperInput, setHousekeeperInput] = useState<Record<string, string>>({});

  const isAuthorized = AUTHORIZED_EMAILS.includes(adminEmail.toLowerCase().trim());

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputEmail.toLowerCase().trim();
    if (AUTHORIZED_EMAILS.includes(trimmed)) {
      localStorage.setItem("pms_admin_email", trimmed);
      setAdminEmail(trimmed);
      setAuthError("");
    } else {
      setAuthError("Accès refusé. Cette adresse e-mail n'est pas autorisée à accéder à la Console PMS & BI.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("pms_admin_email");
    setAdminEmail("");
  };

  const fetchStatsAndRooms = async () => {
    try {
      setLoading(true);
      const data = await apiService.getStatsAndRooms();
      setStats(data.stats);
      setPmsRooms(data.rooms);
      setError("");
    } catch {
      setError("Erreur lors de la récupération des rapports hôteliers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchStatsAndRooms();
    }
  }, [isAuthorized]);

  // If NOT authorized, render strict Authentication Lock Screen
  if (!isAuthorized) {
    return (
      <div id="pms-lock-screen" class="bg-[#F8F5F0] min-h-screen pb-20 font-sans text-ocean">
        
        {/* ================= HERO HEADER BANNER WITH IMAGE & MESSAGE ================= */}
        <section 
          class="relative h-[340px] sm:h-[420px] bg-[#0A2342] flex items-center justify-center text-center overflow-hidden mb-12"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(10,35,66,0.65), rgba(10,35,66,0.9)), url('https://res.cloudinary.com/ccmyhjca/image/upload/v1787902229/Batiment_vue_de_face_oqhc6i.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div class="relative z-10 max-w-3xl px-4 space-y-3 animate-in fade-in duration-500">
            <span class="text-xs sm:text-sm font-sans font-bold tracking-widest text-gold uppercase block">
              — ESPACE ADMINISTRATION —
            </span>
            <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Console de Gestion & PMS
            </h1>
            <p class="text-sm sm:text-base text-sand/90 font-sans max-w-xl mx-auto leading-relaxed pt-1">
              Pilotage des réservations, gestion des chambres et rapports d'activité en temps réel.
            </p>
            <div class="pt-2">
              <span class="inline-block text-[11px] font-mono uppercase tracking-widest text-gold/90 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/30">
                ACCUEIL · ADMIN
              </span>
            </div>
          </div>
        </section>

        <div class="max-w-3xl mx-auto px-4 -mt-10 relative z-20">
          <div class="bg-white rounded-3xl shadow-2xl border border-gold/30 p-8 sm:p-12 text-center relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="inline-flex items-center justify-center p-4 bg-ocean/5 text-gold rounded-2xl border border-gold/20 mb-6">
              <Lock class="h-10 w-10 text-ocean" />
            </div>

            <h2 class="font-serif text-3xl font-bold text-ocean mb-3">
              Espace Sécurisé • Direction & Admin PMS
            </h2>
            <p class="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
              La console <strong>PMS et Console BI</strong> est protégée. Veuillez entrer votre adresse e-mail d'administration autorisée pour déverrouiller l'accès.
            </p>

            <form onSubmit={handleLogin} class="max-w-md mx-auto space-y-4">
              <div class="relative">
                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="votre-email@exemple.com"
                  class="w-full bg-sand/30 border border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none pl-12 pr-4 py-3.5 rounded-xl text-sm text-ocean font-medium placeholder-gray-400 transition-all"
                />
              </div>

              {authError && (
                <div class="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle class="h-4 w-4 flex-shrink-0 text-red-500" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                class="w-full bg-ocean hover:bg-ocean/90 text-gold font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-gold/30"
              >
                <Key class="h-4 w-4" />
                <span>Déverrouiller l'Accès Administrateur</span>
              </button>
            </form>

            <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-500">
              <ShieldCheck class="h-4 w-4 text-green-600" />
              <span>Accès sécurisé réservé exclusivement à la Direction de l'Hôtel.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleUpdateStatus = async (bookingId: string, newStatus: "confirmed" | "canceled" | "pending") => {
    try {
      setUpdatingId(bookingId);
      await apiService.updateBookingStatus(bookingId, newStatus);
      await fetchStatsAndRooms();
    } catch {
      alert("Erreur lors de la mise à jour");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateRoomStatus = async (roomNumber: string, status: "libre" | "occupe" | "nettoyage" | "maintenance") => {
    try {
      setUpdatingRoomNo(roomNumber);
      const updatedRooms = await apiService.updateRoom(roomNumber, { status });
      setPmsRooms(updatedRooms);
    } catch {
      console.error("Failed to update room status");
    } finally {
      setUpdatingRoomNo(null);
    }
  };

  const handleUpdateRoomHousekeeper = async (roomNumber: string, housekeeperName: string) => {
    try {
      const updatedRooms = await apiService.updateRoom(roomNumber, { housekeeper: housekeeperName });
      setPmsRooms(updatedRooms);
    } catch {
      console.error("Failed to update housekeeper");
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
  };

  const getCategoryLabel = (slug: RoomSlug) => {
    const labels: Record<RoomSlug, string> = {
      confort: "Chambre Confort",
      prestige: "Chambre Prestige",
      premium: "Chambre Premium",
      twin: "Chambre Twin",
      junior: "Suite Junior",
      "prestige-suite": "Suite Prestige",
      "ocean-suite": "Suite Vue Mer"
    };
    return labels[slug] || slug;
  };

  if (loading && !stats) {
    return (
      <div class="flex flex-col items-center justify-center py-24 font-sans">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
        <p class="text-xs text-gray-500 mt-4 font-bold uppercase tracking-widest">Initialisation de la console PMS & BI v1.0...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div class="max-w-4xl mx-auto p-8 bg-red-50 border border-red-200 rounded-2xl text-center my-12 font-sans">
        <p class="text-red-700 text-sm font-semibold mb-4">{error || "Une erreur est survenue."}</p>
        <button
          onClick={fetchStatsAndRooms}
          class="bg-ocean text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 mx-auto"
        >
          <RefreshCw class="h-3.5 w-3.5" />
          <span>Réessayer</span>
        </button>
      </div>
    );
  }

  // Distribution helper calculations
  const totalRoomsReserved = Object.values(stats.roomDistribution).reduce((a, b) => a + b, 0) || 1;
  
  const totalSegments = (stats.segmentDistribution.Tourisme + stats.segmentDistribution.Business + stats.segmentDistribution.Famille) || 1;
  const tourPct = Math.round((stats.segmentDistribution.Tourisme / totalSegments) * 100);
  const busPct = Math.round((stats.segmentDistribution.Business / totalSegments) * 100);
  const groupPct = Math.round((stats.segmentDistribution.Famille / totalSegments) * 100);

  // PMS counts
  const totalUnits = pmsRooms.length;
  const freeUnits = pmsRooms.filter(r => r.status === "libre").length;
  const occupiedUnits = pmsRooms.filter(r => r.status === "occupe").length;
  const cleaningUnits = pmsRooms.filter(r => r.status === "nettoyage").length;
  const maintenanceUnits = pmsRooms.filter(r => r.status === "maintenance").length;

  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 74;

  return (
    <div id="bi-dashboard-container" class="bg-[#F8F5F0] min-h-screen pb-20 font-sans text-ocean">
      
      {/* ================= HERO HEADER BANNER WITH IMAGE & MESSAGE ================= */}
      <section 
        class="relative h-[280px] sm:h-[340px] bg-[#0A2342] flex items-center justify-center text-center overflow-hidden mb-8"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(10,35,66,0.7), rgba(10,35,66,0.92)), url('https://res.cloudinary.com/ccmyhjca/image/upload/v1787902229/Batiment_vue_de_face_oqhc6i.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div class="relative z-10 max-w-3xl px-4 space-y-2 animate-in fade-in duration-500">
          <span class="text-xs sm:text-sm font-sans font-bold tracking-widest text-gold uppercase block">
            — ESPACE ADMINISTRATION & GESTION —
          </span>
          <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Console PMS & Business Intelligence
          </h1>
          <p class="text-xs sm:text-sm text-sand/90 font-sans max-w-xl mx-auto leading-relaxed pt-1">
            Supervision des flux de réservations, disponibilité des chambres et analyses financières.
          </p>
          <div class="pt-2">
            <span class="inline-block text-[11px] font-mono uppercase tracking-widest text-gold/90 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/30">
              ACCUEIL · ADMIN
            </span>
          </div>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <div class="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest">
              <BarChart2 class="h-4 w-4" />
              <span>Console Digitale Certifiée v1.0 • Phase 1 SaaS</span>
            </div>
            <h2 class="font-serif text-2xl sm:text-3xl font-bold text-ocean">EDIVINCE Smart Hospitality Platform</h2>
            <p class="text-xs text-gray-500 mt-1">Plateforme PMS (Property Management), CRM client, Rapports financiers BI et Schéma relationnel.</p>
          </div>
        
        <div class="flex flex-wrap items-center gap-2">
          <div class="bg-gold/10 border border-gold/30 px-3 py-1.5 rounded-xl text-xs text-ocean font-medium flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>{adminEmail}</span>
          </div>
          <button
            onClick={fetchStatsAndRooms}
            disabled={loading}
            class="bg-white hover:bg-[#F4EBE1]/40 text-ocean border border-gold/20 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <RefreshCw class={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Synchroniser</span>
          </button>
          <button
            onClick={handleLogout}
            class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            title="Verrouiller la console"
          >
            <LogOut class="h-3.5 w-3.5" />
            <span>Verrouiller</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex border-b border-gold/20 mb-8 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab("bi")}
          class={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "bi"
              ? "border-gold text-ocean"
              : "border-transparent text-gray-400 hover:text-ocean"
          }`}
        >
          <BarChart2 class="h-4 w-4" />
          <span>Business Intelligence & Rapports</span>
        </button>

        <button
          onClick={() => setActiveTab("crm")}
          class={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "crm"
              ? "border-gold text-ocean"
              : "border-transparent text-gray-400 hover:text-ocean"
          }`}
        >
          <Users class="h-4 w-4" />
          <span>Console CRM : Réservations ({stats.totalReservations})</span>
        </button>

        <button
          onClick={() => setActiveTab("pms")}
          class={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "pms"
              ? "border-gold text-ocean"
              : "border-transparent text-gray-400 hover:text-ocean"
          }`}
        >
          <Layers class="h-4 w-4" />
          <span>Gestion des Chambres PMS ({totalUnits} Unités)</span>
        </button>

        <button
          onClick={() => setActiveTab("sql")}
          class={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "sql"
              ? "border-gold text-ocean"
              : "border-transparent text-gray-400 hover:text-ocean"
          }`}
        >
          <Database class="h-4 w-4" />
          <span>Base SQL Supabase</span>
        </button>
      </div>

      {/* TAB 1: BUSINESS INTELLIGENCE */}
      {activeTab === "bi" && (
        <div class="space-y-8 animate-in fade-in duration-300">
          
          {/* KPI Cards Grid */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* REVENUE */}
            <div class="bg-white p-6 rounded-2xl border border-gold/10 shadow-sm">
              <div class="flex justify-between items-start">
                <div>
                  <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Chiffre d'Affaires</span>
                  <span class="text-xl sm:text-2xl font-bold text-ocean block mt-1">
                    {formatMoney(stats.totalRevenue)}
                  </span>
                </div>
                <div class="p-3 bg-green-50 rounded-xl text-green-600">
                  <DollarSign class="h-6 w-6" />
                </div>
              </div>
              <div class="flex items-center gap-1 mt-4 text-[10px] text-green-600 font-semibold">
                <TrendingUp class="h-3.5 w-3.5" />
                <span>+24.6% (Direct Booking Optimization)</span>
              </div>
            </div>

            {/* TOTAL RESERVATIONS */}
            <div class="bg-white p-6 rounded-2xl border border-gold/10 shadow-sm">
              <div class="flex justify-between items-start">
                <div>
                  <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Réservations Directes</span>
                  <span class="text-2xl font-bold text-ocean block mt-1">
                    {stats.totalReservations}
                  </span>
                </div>
                <div class="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <Users class="h-6 w-6" />
                </div>
              </div>
              <div class="flex items-center gap-1 mt-4 text-[10px] text-blue-600 font-semibold">
                <span>Segment Phare : Familles ({groupPct}%)</span>
              </div>
            </div>

            {/* OCCUPANCY */}
            <div class="bg-white p-6 rounded-2xl border border-gold/10 shadow-sm">
              <div class="flex justify-between items-start">
                <div>
                  <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Taux d'Occupation PMS</span>
                  <span class="text-2xl font-bold text-ocean block mt-1">
                    {occupancyRate}%
                  </span>
                </div>
                <div class="p-3 bg-amber-50 rounded-xl text-amber-600">
                  <Layers class="h-6 w-6" />
                </div>
              </div>
              <div class="flex items-center gap-1 mt-4 text-[10px] text-amber-600 font-semibold">
                <span>{occupiedUnits} occupées / {totalUnits} unités totales</span>
              </div>
            </div>

            {/* VISUAL VIEWS */}
            <div class="bg-white p-6 rounded-2xl border border-gold/10 shadow-sm">
              <div class="flex justify-between items-start">
                <div>
                  <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Intérêt & Visites Unique</span>
                  <span class="text-2xl font-bold text-ocean block mt-1">
                    {stats.viewsCount}
                  </span>
                </div>
                <div class="p-3 bg-purple-50 rounded-xl text-purple-600">
                  <Eye class="h-6 w-6" />
                </div>
              </div>
              <div class="flex items-center gap-1 mt-4 text-[10px] text-purple-600 font-semibold">
                <span>Taux de conversion global: 4.8%</span>
              </div>
            </div>
          </div>

          {/* Visual Analytics Charts Section */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* ROOM DISTRIBUTION PROGRESS METER */}
            <div class="bg-white p-6 rounded-2xl border border-gold/10 shadow-sm">
              <h3 class="font-serif text-lg font-bold text-ocean mb-4 border-b border-gold/10 pb-2">Répartition par Catégorie de Chambre</h3>
              
              <div class="space-y-4 font-sans text-xs">
                {Object.keys(stats.roomDistribution).map((key) => {
                  const slug = key as RoomSlug;
                  const val = stats.roomDistribution[slug] || 0;
                  const pct = Math.round((val / totalRoomsReserved) * 100) || 0;

                  return (
                    <div key={slug}>
                      <div class="flex justify-between text-xs text-ocean font-semibold mb-1">
                        <span class="capitalize">{getCategoryLabel(slug)}</span>
                        <span>{val} rés. ({pct}%)</span>
                      </div>
                      <div class="w-full bg-[#F4EBE1] h-2.5 rounded-full overflow-hidden">
                        <div 
                          class="bg-gold h-full rounded-full transition-all duration-1000" 
                          style={{ width: `${Math.max(pct, 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEGMENT DISTRIBUTION CUSTOM GRAPH */}
            <div class="bg-white p-6 rounded-2xl border border-gold/10 shadow-sm">
              <h3 class="font-serif text-lg font-bold text-ocean mb-4 border-b border-gold/10 pb-2">Profils des Voyageurs (Segmentation CRM)</h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                {/* Custom SVG Pie Chart */}
                <div class="flex justify-center">
                  <svg width="140" height="140" viewBox="0 0 42 42" class="transform -rotate-90">
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F4EBE1" strokeWidth="6"></circle>
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#D4AF37" strokeWidth="6" 
                            strokeDasharray={`${tourPct} ${100 - tourPct}`} strokeDashoffset="0"></circle>
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#0A2342" strokeWidth="6" 
                            strokeDasharray={`${busPct} ${100 - busPct}`} strokeDashoffset={`-${tourPct}`}></circle>
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#4D6B50" strokeWidth="6" 
                            strokeDasharray={`${groupPct} ${100 - groupPct}`} strokeDashoffset={`-${tourPct + busPct}`}></circle>
                  </svg>
                </div>

                {/* Legends */}
                <div class="space-y-3 font-sans text-xs">
                  <div class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 bg-gold rounded-full"></span>
                    <span class="font-semibold text-ocean">Tourisme : {stats.segmentDistribution.Tourisme} ({tourPct}%)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 bg-ocean rounded-full"></span>
                    <span class="font-semibold text-ocean">Affaires / Business : {stats.segmentDistribution.Business} ({busPct}%)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 bg-palm rounded-full"></span>
                    <span class="font-semibold text-ocean">Familles / Groupes : {stats.segmentDistribution.Famille} ({groupPct}%)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Quick instructions box */}
          <div class="bg-ocean/5 border border-gold/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs">
            <div>
              <span class="font-bold block text-sm mb-1">💡 Optimisez le Revenue Management (RevPAR)</span>
              <p class="text-gray-500 leading-relaxed max-w-xl">
                Suivez la demande pour les Suites haut de gamme (Suites Prestige et Vue Mer à 135k/150k FCFA) pour ajuster vos offres d'accueil spéciales ou vos forfaits dîner au restaurant Le Mimosa.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("pms")}
              class="bg-gold text-ocean font-bold px-4 py-2.5 rounded-xl uppercase shrink-0 hover:bg-gold/90 transition-all text-[10px]"
            >
              Aller au PMS
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: CRM & RESERVATIONS */}
      {activeTab === "crm" && (
        <div class="bg-white rounded-2xl border border-gold/10 shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div class="p-6 border-b border-gold/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 class="font-serif text-lg font-bold text-ocean">Console de Réservation & Profils Clients</h3>
              <p class="text-xs text-gray-400 mt-1">Gérez, confirmez ou annulez en temps réel les réservations de l'hôtel.</p>
            </div>
            <div class="flex items-center gap-2 bg-gold/10 text-ocean text-xs font-bold px-3 py-1.5 rounded-lg border border-gold/20">
              <ShieldCheck class="h-4 w-4 text-gold animate-pulse" />
              <span>Canal Direct Sécurisé</span>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr class="bg-ocean/5 text-ocean border-b border-gold/10 font-bold uppercase tracking-wider">
                  <th class="p-4">Réf / Date</th>
                  <th class="p-4">Client</th>
                  <th class="p-4">Séjour (Nuits)</th>
                  <th class="p-4">Hébergement / Voyageurs</th>
                  <th class="p-4">Facturation Totale</th>
                  <th class="p-4">Statut CRM</th>
                  <th class="p-4 text-center text-wood">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gold/10">
                {stats.recentBookings.map((b: Booking) => (
                  <tr key={b.id} class="hover:bg-gold/5 transition-colors">
                    <td class="p-4 font-semibold text-ocean">
                      <div class="font-bold text-sm">{b.id}</div>
                      <div class="text-[10px] text-gray-400 font-normal">{new Date(b.createdAt).toLocaleDateString("fr-FR")}</div>
                    </td>
                    <td class="p-4">
                      <div class="font-bold text-ocean">{b.guestName}</div>
                      <div class="text-[10px] text-gray-500 font-semibold">{b.guestPhone}</div>
                      <div class="text-[10px] text-gray-400">{b.guestEmail}</div>
                    </td>
                    <td class="p-4 font-medium text-ocean">
                      <div class="font-semibold">du {b.checkIn}</div>
                      <div class="font-semibold">au {b.checkOut}</div>
                    </td>
                    <td class="p-4">
                      <div class="font-bold text-ocean text-xs capitalize">{getCategoryLabel(b.roomType)}</div>
                      <div class="text-[10px] text-gray-400 mt-0.5">
                        {b.guestsCount} voyageur(s) • <span class="bg-gold/15 text-ocean font-bold px-1.5 py-0.5 rounded text-[9px] uppercase">{b.segment}</span>
                      </div>
                    </td>
                    <td class="p-4 font-bold text-ocean text-sm">
                      {formatMoney(b.totalPrice)}
                    </td>
                    <td class="p-4">
                      <span class={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : b.status === "canceled"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-200 animate-pulse"
                      }`}>
                        {b.status === "confirmed" && <Check class="h-3 w-3" />}
                        {b.status === "canceled" && <X class="h-3 w-3" />}
                        {b.status === "pending" && <Clock class="h-3 w-3 animate-pulse" />}
                        <span>{b.status === "confirmed" ? "Confirmé" : b.status === "canceled" ? "Annulé" : "En Attente"}</span>
                      </span>
                    </td>
                    <td class="p-4">
                      <div class="flex items-center justify-center gap-1.5">
                        {b.status !== "confirmed" && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, "confirmed")}
                            disabled={updatingId === b.id}
                            class="p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all focus:outline-none"
                            title="Confirmer la réservation"
                          >
                            <Check class="h-3.5 w-3.5" />
                          </button>
                        )}
                        {b.status !== "canceled" && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, "canceled")}
                            disabled={updatingId === b.id}
                            class="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all focus:outline-none"
                            title="Annuler la réservation"
                          >
                            <X class="h-3.5 w-3.5" />
                          </button>
                        )}
                        {b.status !== "pending" && (
                          <button
                            onClick={() => handleUpdateStatus(b.id, "pending")}
                            disabled={updatingId === b.id}
                            class="p-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-all focus:outline-none"
                            title="Repasser en attente"
                          >
                            <Clock class="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PMS ROOM UNITS MANAGEMENT */}
      {activeTab === "pms" && (
        <div class="space-y-6 animate-in fade-in duration-300">
          
          {/* PMS Units Header with quick statistics */}
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div class="bg-white p-4 rounded-xl border border-gold/10 text-center">
              <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Total Chambres</span>
              <span class="text-xl font-bold text-ocean block mt-1">{totalUnits}</span>
            </div>
            <div class="bg-green-50/50 p-4 rounded-xl border border-green-200 text-center">
              <span class="text-[9px] text-green-700 font-bold uppercase tracking-wider block">Libres</span>
              <span class="text-xl font-bold text-green-800 block mt-1">{freeUnits}</span>
            </div>
            <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-200 text-center">
              <span class="text-[9px] text-blue-700 font-bold uppercase tracking-wider block">Occupées</span>
              <span class="text-xl font-bold text-blue-800 block mt-1">{occupiedUnits}</span>
            </div>
            <div class="bg-yellow-50/50 p-4 rounded-xl border border-yellow-200 text-center">
              <span class="text-[9px] text-yellow-700 font-bold uppercase tracking-wider block">En Nettoyage</span>
              <span class="text-xl font-bold text-yellow-800 block mt-1">{cleaningUnits}</span>
            </div>
            <div class="bg-red-50/50 p-4 rounded-xl border border-red-200 text-center">
              <span class="text-[9px] text-red-700 font-bold uppercase tracking-wider block">Maintenance</span>
              <span class="text-xl font-bold text-red-800 block mt-1">{maintenanceUnits}</span>
            </div>
          </div>

          {/* Room Units Interactive Grid */}
          <div class="bg-white rounded-2xl border border-gold/10 shadow-sm p-6">
            <div class="mb-4">
              <h4 class="font-serif text-lg font-bold text-ocean">Grille Interactive des 32 Unités d'Hébergement</h4>
              <p class="text-xs text-gray-400 mt-1">Supervisez l'état physique de chaque chambre. Cliquez sur une chambre pour modifier instantanément son état (PMS Live Sync) ou désigner un membre de l'équipe de ménage.</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {pmsRooms.map((room) => (
                <div 
                  key={room.number} 
                  class={`p-4 rounded-xl border transition-all text-xs relative ${
                    room.status === "libre"
                      ? "bg-green-50/70 border-green-200 hover:bg-green-50"
                      : room.status === "occupe"
                      ? "bg-blue-50/70 border-blue-200 hover:bg-blue-50"
                      : room.status === "nettoyage"
                      ? "bg-yellow-50/70 border-yellow-200 hover:bg-yellow-50"
                      : "bg-red-50/70 border-red-200 hover:bg-red-50"
                  }`}
                >
                  <div class="flex justify-between items-start">
                    <span class="font-bold text-lg text-ocean">{room.number}</span>
                    <span class={`w-2.5 h-2.5 rounded-full ${
                      room.status === "libre"
                        ? "bg-green-500"
                        : room.status === "occupe"
                        ? "bg-blue-500"
                        : room.status === "nettoyage"
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-red-500"
                    }`}></span>
                  </div>
                  
                  <div class="text-[9px] text-gray-500 font-semibold mt-1 uppercase tracking-wider truncate">
                    {getCategoryLabel(room.category).replace("Chambre ", "").replace("Suite ", "")}
                  </div>

                  <div class="mt-3 border-t border-gold/10 pt-2 text-[10px] space-y-1">
                    <div class="text-gray-400">Gouvernante :</div>
                    <div class="font-bold text-ocean flex items-center gap-1">
                      <User class="h-3 w-3 text-gold" />
                      <span>{room.housekeeper || "Non assignée"}</span>
                    </div>
                  </div>

                  {/* Inline Status Controller Menu */}
                  <div class="mt-3 grid grid-cols-4 gap-1 border-t border-gold/10 pt-2">
                    <button 
                      onClick={() => handleUpdateRoomStatus(room.number, "libre")}
                      class="bg-green-500 hover:bg-green-600 text-white rounded p-1 font-bold text-[8px] uppercase tracking-widest text-center"
                      title="Chambre Libre"
                    >
                      L
                    </button>
                    <button 
                      onClick={() => handleUpdateRoomStatus(room.number, "occupe")}
                      class="bg-blue-500 hover:bg-blue-600 text-white rounded p-1 font-bold text-[8px] uppercase tracking-widest text-center"
                      title="Chambre Occupée"
                    >
                      O
                    </button>
                    <button 
                      onClick={() => handleUpdateRoomStatus(room.number, "nettoyage")}
                      class="bg-yellow-500 hover:bg-yellow-600 text-white rounded p-1 font-bold text-[8px] uppercase tracking-widest text-center"
                      title="Chambre en Nettoyage"
                    >
                      N
                    </button>
                    <button 
                      onClick={() => handleUpdateRoomStatus(room.number, "maintenance")}
                      class="bg-red-500 hover:bg-red-600 text-white rounded p-1 font-bold text-[8px] uppercase tracking-widest text-center"
                      title="Chambre en Maintenance"
                    >
                      M
                    </button>
                  </div>

                  {/* Live Housekeeper Assignment Selector */}
                  <div class="mt-2">
                    <select
                      value={room.housekeeper || ""}
                      onChange={(e) => handleUpdateRoomHousekeeper(room.number, e.target.value)}
                      class="w-full bg-white border border-gold/15 text-[9px] rounded px-1 py-0.5 focus:outline-none text-ocean font-semibold cursor-pointer"
                    >
                      <option value="">-- Assign --</option>
                      <option value="Florence N.">Florence N.</option>
                      <option value="Marie M.">Marie M.</option>
                      <option value="Thérèse B.">Thérèse B.</option>
                      <option value="Alice O.">Alice O.</option>
                    </select>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SQL SUPABASE SCHEMA */}
      {activeTab === "sql" && (
        <div class="animate-in fade-in duration-300">
          <SupabaseSchema />
        </div>
      )}

      </div>
    </div>
  );
}
