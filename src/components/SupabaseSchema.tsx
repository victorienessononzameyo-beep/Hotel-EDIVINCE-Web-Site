import { useState } from "react";
import { Database, ShieldAlert, Code, Check, Copy, HelpCircle, Server, Info } from "lucide-react";

export default function SupabaseSchema() {
  const [copied, setCopied] = useState(false);

  const sqlCode = `-- ==========================================
-- 🏨 EDIVINCE SMART HOSPITALITY PLATFORM
-- 🧱 DATABASE SCHEMA FOR SUPABASE / POSTGRESQL
-- Phase 1 SaaS Hôtelier (Production Ready)
-- ==========================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define Custom Enum Types
CREATE TYPE user_role AS ENUM ('admin', 'reception', 'housekeeping', 'direction');
CREATE TYPE room_status AS ENUM ('libre', 'occupe', 'nettoyage', 'maintenance');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'canceled');
CREATE TYPE traveler_segment AS ENUM ('Tourisme', 'Business', 'Famille');

-- 1. USERS & STAFF MANAGEMENT
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'reception',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. GUESTS / CRM PROFILE
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50) NOT NULL,
    nationality VARCHAR(100),
    segment traveler_segment DEFAULT 'Tourisme' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ROOM TYPES (PMS SOURCE CONFIG)
CREATE TABLE IF NOT EXISTS public.room_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'confort', 'prestige'
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price_fcfa INT NOT NULL,
    capacity_text VARCHAR(50) NOT NULL,
    bed_type VARCHAR(100) NOT NULL,
    size_sqm INT NOT NULL,
    units_total INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. INDIVIDUAL ROOM UNITS (PMS LIVE TRACKING)
CREATE TABLE IF NOT EXISTS public.rooms (
    number VARCHAR(10) PRIMARY KEY, -- e.g. '101', '302'
    room_type_id UUID REFERENCES public.room_types(id) ON DELETE CASCADE NOT NULL,
    status room_status NOT NULL DEFAULT 'libre',
    housekeeper_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    last_cleaned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. RESERVATIONS ENGINE
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_ref VARCHAR(20) UNIQUE NOT NULL, -- e.g. 'B-104'
    guest_id UUID REFERENCES public.guests(id) ON DELETE CASCADE NOT NULL,
    room_number VARCHAR(10) REFERENCES public.rooms(number) ON DELETE SET NULL,
    room_type_id UUID REFERENCES public.room_types(id) ON DELETE CASCADE NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests_count INT NOT NULL DEFAULT 1,
    total_price_fcfa INT NOT NULL,
    status booking_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. PAYMENTS / REVENUE AUDIT
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_id UUID REFERENCES public.reservations(id) ON DELETE CASCADE NOT NULL,
    amount_fcfa INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- 'Mobile Money', 'Cash', 'Card'
    transaction_ref VARCHAR(100),
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. REVIEWS & BRAND MANAGEMENT
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_name VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    room_type_label VARCHAR(100),
    is_verified BOOLEAN DEFAULT true,
    created_at DATE DEFAULT CURRENT_DATE NOT NULL
);

-- 8. SECURITY AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    record_id VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 🔐 ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- Staff Read Access Policy
CREATE POLICY "Allow authenticated staff to read all tables" 
    ON public.rooms FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow public users to insert guest and bookings" 
    ON public.reservations FOR INSERT WITH CHECK (true);

-- ==========================================
-- ⚡ PERFORMANCE OPTIMIZING INDEXES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_rooms_status ON public.rooms(status);
CREATE INDEX IF NOT EXISTS idx_reservations_dates ON public.reservations(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_reservations_ref ON public.reservations(booking_ref);
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="supabase-schema-panel" class="bg-white p-6 rounded-2xl border border-gold/15 shadow-sm space-y-6">
      
      {/* Header */}
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#F4EBE1]">
        <div>
          <div class="flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-widest">
            <Database class="h-4 w-4" />
            <span>Architecture Relrelationnelle PostgreSQL</span>
          </div>
          <h3 class="font-serif text-lg sm:text-xl font-bold text-ocean mt-1">Schéma Supabase (Phase 1 & 2 Ready)</h3>
          <p class="text-xs text-gray-500 mt-0.5">Le schéma certifié de base de données relationnelle conçu pour l'Hôtel EDIVINCE.</p>
        </div>

        <button
          onClick={handleCopy}
          class="bg-ocean text-white hover:bg-ocean/90 border border-gold/25 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
        >
          {copied ? <Check class="h-3.5 w-3.5 text-green-400" /> : <Copy class="h-3.5 w-3.5" />}
          <span>{copied ? "Copié !" : "Copier le SQL DDL"}</span>
        </button>
      </div>

      {/* Conceptual DB visual map */}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans">
        <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-200/50">
          <div class="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
            <Server class="h-3.5 w-3.5 text-blue-600" />
            <span>1. CRM & Profils</span>
          </div>
          <p class="text-[10px] text-gray-500 mb-2">Suivi des clients fidèles.</p>
          <div class="space-y-1 font-mono text-[9px] text-blue-800 bg-white/70 p-2 rounded border border-blue-100">
            <div>⚙ users (roles)</div>
            <div>⚙ guests (CRM)</div>
          </div>
        </div>

        <div class="bg-amber-50/50 p-4 rounded-xl border border-amber-200/50">
          <div class="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
            <Server class="h-3.5 w-3.5 text-amber-600" />
            <span>2. Inventaire PMS</span>
          </div>
          <p class="text-[10px] text-gray-500 mb-2">32 chambres hôtelières.</p>
          <div class="space-y-1 font-mono text-[9px] text-amber-800 bg-white/70 p-2 rounded border border-amber-100">
            <div>⚙ room_types (prices)</div>
            <div>⚙ rooms (pms statuses)</div>
          </div>
        </div>

        <div class="bg-green-50/50 p-4 rounded-xl border border-green-200/50">
          <div class="font-bold text-green-900 flex items-center gap-1.5 mb-1">
            <Server class="h-3.5 w-3.5 text-green-600" />
            <span>3. Moteur Rés.</span>
          </div>
          <p class="text-[10px] text-gray-500 mb-2">Calendriers et flux.</p>
          <div class="space-y-1 font-mono text-[9px] text-green-800 bg-white/70 p-2 rounded border border-green-100">
            <div>⚙ reservations (refs)</div>
            <div>⚙ payments (momo, cash)</div>
          </div>
        </div>

        <div class="bg-purple-50/50 p-4 rounded-xl border border-purple-200/50">
          <div class="font-bold text-purple-900 flex items-center gap-1.5 mb-1">
            <Server class="h-3.5 w-3.5 text-purple-600" />
            <span>4. Marque & Audit</span>
          </div>
          <p class="text-[10px] text-gray-500 mb-2">Témoignages et traces.</p>
          <div class="space-y-1 font-mono text-[9px] text-purple-800 bg-white/70 p-2 rounded border border-purple-100">
            <div>⚙ reviews (verified)</div>
            <div>⚙ audit_logs (security)</div>
          </div>
        </div>
      </div>

      {/* SQL Editor Area */}
      <div class="relative bg-ocean/5 border border-[#F4EBE1] rounded-2xl overflow-hidden text-xs">
        <div class="bg-ocean px-4 py-2 text-[10px] text-sand/80 font-mono flex items-center justify-between border-b border-gold/10">
          <span>supabase_schema.sql</span>
          <span class="bg-gold/20 text-gold px-2 py-0.5 rounded font-bold uppercase">PostgreSQL 15</span>
        </div>
        <pre class="overflow-x-auto p-4 font-mono text-[10px] sm:text-xs text-ocean/90 leading-relaxed max-h-[400px]">
          {sqlCode}
        </pre>
      </div>

      {/* Warning Box */}
      <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3 text-xs text-yellow-800">
        <ShieldAlert class="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
        <div>
          <span class="font-bold block">Sécurité d'Accès de Données (RLS) :</span>
          Dans Supabase, assurez-vous d'activer l'option <strong>Row Level Security (RLS)</strong> sur chaque table de production pour interdire aux clients du navigateur de modifier d'autres profils que les leurs sans jeton JWT de réception valide.
        </div>
      </div>

    </div>
  );
}
