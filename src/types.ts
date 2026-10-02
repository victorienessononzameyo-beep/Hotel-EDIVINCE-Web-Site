export type ViewType = 
  | "home" 
  | "hebergements" 
  | "galerie" 
  | "guide" 
  | "services" 
  | "restaurant" 
  | "admin"
  | "chambres" 
  | "mimosa" 
  | "dashboard" 
  | "reviews";

export type RoomSlug = "confort" | "prestige" | "premium" | "twin" | "junior" | "prestige-suite" | "ocean-suite";

export interface RoomGalleryItem {
  type: "image" | "video";
  url: string;
  title?: string;
}

export interface Room {
  id: string;
  name: string;
  slug: RoomSlug;
  description: string;
  price: number; // in FCFA
  features: string[];
  capacity: string;
  bedType: string;
  size: string;
  image: string;
  gallery?: RoomGalleryItem[];
  unitsCount: number;
}

export interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomType: RoomSlug;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "canceled";
  segment: "Tourisme" | "Business" | "Famille";
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  roomType: string;
  date: string;
}

export interface PMSUnit {
  number: string;
  category: RoomSlug;
  status: "libre" | "occupe" | "nettoyage" | "maintenance";
  housekeeper?: string;
  lastCleaned?: string;
}

export interface BIStats {
  totalReservations: number;
  totalRevenue: number;
  viewsCount: number;
  roomDistribution: Record<RoomSlug, number>;
  segmentDistribution: {
    Tourisme: number;
    Business: number;
    Famille: number;
  };
  recentBookings: Booking[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
