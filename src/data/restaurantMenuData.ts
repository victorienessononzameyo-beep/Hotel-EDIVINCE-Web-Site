import guinnessImg from "../assets/images/guinness_bottle_photo_1788247365652.jpg";
import heinekenImg from "../assets/images/heineken_bottle_photo_1788247384896.jpg";
import coronaImg from "../assets/images/corona_bottle_photo_1788247400170.jpg";
import export33Img from "../assets/images/export33_bottle_photo_1788247414585.jpg";
import kadjiImg from "../assets/images/kadji_bottle_photo_1788247429645.jpg";
import beaufortLagerImg from "../assets/images/beaufort_bottle_photo_1788247447933.jpg";
import beaufortLightImg from "../assets/images/beaufort_light_photo_1788247488437.jpg";
import castelImg from "../assets/images/castel_bottle_photo_1788247471883.jpg";
import maltaGuinnessImg from "../assets/images/malta_guinness_bottle_1788247505918.jpg";
import {
  guinnessStoutImg,
  beaufortLagerImgUrl,
  export33ImgUrl,
  boosterColaImgUrl,
  beaufortLightImgData,
  kadjiBeerImgData
} from "./beerImages";

export interface MenuItem {
  id: string;
  name: string;
  desc?: string;
  price: number;
  glassPrice?: number;
  unit?: string;
  category: string;
  categoryName: string;
  image: string;
  popular?: boolean;
}

export const RESTAURANT_CATEGORIES = [
  { id: "all", label: "★ Tout" },
  { id: "petit-dejeuners", label: "PETIT-DÉJEUNERS & OMELETTES" },
  { id: "boissons-chaudes", label: "BOISSONS CHAUDES" },
  { id: "boissons-fraiches", label: "BOISSONS FRAÎCHES & JUS" },
  { id: "entrees", label: "ENTRÉES & SALADES" },
  { id: "fruits-de-mer", label: "FRUITS DE MER & POISSONS" },
  { id: "camerounaise", label: "SPÉCIALITÉS CAMEROUNAISES" },
  { id: "viandes-grillades", label: "VIANDES & GRILLADES" },
  { id: "pates-riz", label: "PÂTES & RÉSISTANCES" },
  { id: "nos-pizzas", label: "NOS PIZZAS" },
  { id: "restauration-rapide", label: "RESTAURATION RAPIDE" },
  { id: "desserts", label: "DESSERTS" },
  { id: "champagnes", label: "CHAMPAGNES" },
  { id: "whisky-spiritueux", label: "WHISKY ET SPIRITUEUX" },
  { id: "vins-rouges", label: "VINS ROUGES" },
  { id: "vins-blancs", label: "VINS BLANCS ET MOELLEUX" },
  { id: "bieres", label: "BIÈRES" },
  { id: "cocktails", label: "COCKTAILS" }
];

export const RESTAURANT_ITEMS: MenuItem[] = [
  // ================= PETIT-DÉJEUNERS & OMELETTES =================
  {
    id: "pd-simple",
    name: "PETIT DÉJEUNER SIMPLE",
    desc: "Boisson chaude, micro-beurre, micro-confiture, assiette de fruits frais",
    price: 4000,
    category: "petit-dejeuners",
    categoryName: "PETIT-DÉJEUNERS & OMELETTES",
    image: "https://tse4.mm.bing.net/th/id/OIP.E4Z2Dms4hkFuN-9k9w9IhwHaEL?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    popular: true
  },
  {
    id: "pd-edvince",
    name: "PETIT DÉJEUNER EDVINCE",
    desc: "Boisson chaude, pain croustillant, croissant, micro-beurre, micro-confiture, assiette de fruits frais, omelette au choix",
    price: 5000,
    category: "petit-dejeuners",
    categoryName: "PETIT-DÉJEUNERS & OMELETTES",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80",
    popular: true
  },
  {
    id: "pd-conti",
    name: "PETIT DÉJEUNER CONTI",
    desc: "Croissant frais, confiture artisanale, omelette garnie, jus naturel de saison et boisson chaude au choix",
    price: 6500,
    category: "petit-dejeuners",
    categoryName: "PETIT-DÉJEUNERS & OMELETTES",
    image: "https://tse4.mm.bing.net/th/id/OIP.2MQUWu6DTwgQK_SUtTyHqAHaEx?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "om-herbes",
    name: "OMELETTE AUX FINES HERBES",
    desc: "Omelette baveuse ou bien cuite parfumée aux fines herbes fraîches du jardin",
    price: 2000,
    category: "petit-dejeuners",
    categoryName: "PETIT-DÉJEUNERS & OMELETTES",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "om-nature",
    name: "OMELETTE NATURE",
    desc: "Omelette traditionnelle préparée minute selon votre cuisson préférée",
    price: 2000,
    category: "petit-dejeuners",
    categoryName: "PETIT-DÉJEUNERS & OMELETTES",
    image: "https://tse3.mm.bing.net/th/id/OIP.bDgqick2WFu6lf9QRwSzLAHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "om-saucisson",
    name: "OMELETTE SAUCISSON",
    desc: "Omelette généreuse garnie de tranches de saucisson poêlé",
    price: 2500,
    category: "petit-dejeuners",
    categoryName: "PETIT-DÉJEUNERS & OMELETTES",
    image: "https://mandolina.co/wp-content/uploads/2024/06/tortillas-con-jamon-1024x654.jpg"
  },
  {
    id: "om-sardine",
    name: "OMELETTE SARDINE",
    desc: "Omelette savoureuse garnie de sardines relevées aux oignons et tomates",
    price: 2500,
    category: "petit-dejeuners",
    categoryName: "PETIT-DÉJEUNERS & OMELETTES",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "om-legumes",
    name: "OMELETTE AUX LÉGUMES",
    desc: "Omelette santé aux poivrons, tomates fraîches, oignons émincés et fines herbes",
    price: 2500,
    category: "petit-dejeuners",
    categoryName: "PETIT-DÉJEUNERS & OMELETTES",
    image: "https://tse3.mm.bing.net/th/id/OIP.5H0JDcUFoZ5XMvaV-J-3TQHaD4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "om-fromage",
    name: "OMELETTE AU FROMAGE",
    desc: "Omelette fondante et coulante au fromage râpé fondant",
    price: 2500,
    category: "petit-dejeuners",
    categoryName: "PETIT-DÉJEUNERS & OMELETTES",
    image: "https://tse2.mm.bing.net/th/id/OIP.LtL5iR2ivmqhAhRwSGPpxAHaEA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "oeuf-plat",
    name: "OEUF AU PLAT (LA PAIRE)",
    desc: "Deux œufs sur le plat dorés au beurre avec sel et poivre moulu",
    price: 2000,
    category: "petit-dejeuners",
    categoryName: "PETIT-DÉJEUNERS & OMELETTES",
    image: "https://tse1.mm.bing.net/th/id/OIP.nvZd4KrM3r88JqaTOTCr3wHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "oeuf-brouille-saucisson",
    name: "OEUF BROUILLÉ AU SAUCISSON",
    desc: "Oeufs brouillés onctueux et crémeux sautés aux dés de saucisson",
    price: 2500,
    category: "petit-dejeuners",
    categoryName: "PETIT-DÉJEUNERS & OMELETTES",
    image: "https://tse4.mm.bing.net/th/id/OIP.kT7H8FGodtnTrXOelNvFNwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // ================= BOISSONS CHAUDES =================
  {
    id: "bc-the-menthe",
    name: "THÉ À LA MENTHE",
    desc: "Infusion de thé vert et feuilles de menthe fraîche parfumée",
    price: 1500,
    category: "boissons-chaudes",
    categoryName: "BOISSONS CHAUDES",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bc-the-citron",
    name: "THÉ AU CITRON",
    desc: "Thé noir ou vert aromatisé aux rondelles de citron frais",
    price: 1500,
    category: "boissons-chaudes",
    categoryName: "BOISSONS CHAUDES",
    image: "https://th.bing.com/th/id/R.74f9b4c88ada07b4786b2a642e73eec3?rik=5OHhpJveBUA%2bPA&riu=http%3a%2f%2fwww.fourchette-et-bikini.fr%2fsites%2fdefault%2ffiles%2fthe_citron.jpg&ehk=39TbhdpDm5QMut6IRJTk4tB1ulvAI2MNN%2biX8GEyvuI%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    id: "bc-cafe-lait",
    name: "CAFÉ AU LAIT",
    desc: "Café fraîchement moulu avec lait chaud onctueux",
    price: 2000,
    category: "boissons-chaudes",
    categoryName: "BOISSONS CHAUDES",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bc-chocolat-lait",
    name: "CHOCOLAT AU LAIT",
    desc: "Chocolat chaud crémeux et réconfortant",
    price: 2000,
    category: "boissons-chaudes",
    categoryName: "BOISSONS CHAUDES",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bc-citronnelle",
    name: "INFUSION CITRONNELLE LOCALE",
    desc: "Infusion parfumée de tiges de citronnelle fraîche de Kribi",
    price: 1500,
    category: "boissons-chaudes",
    categoryName: "BOISSONS CHAUDES",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bc-cafe-expresso",
    name: "CAFÉ EXPRESSO",
    desc: "Expresso court et intense issu de grains torréfiés d'exception",
    price: 1500,
    category: "boissons-chaudes",
    categoryName: "BOISSONS CHAUDES",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop&q=80"
  },

  // ================= BOISSONS FRAICHES & JUS =================
  {
    id: "bf-jus-naturel",
    name: "JUS DE FRUITS NATUREL (ANANAS, PAPAYE, PASTÈQUE)",
    desc: "Jus 100% pur fruit pressé minute au choix : Ananas doux, Papaye fondante ou Pastèque fraîche",
    price: 2500,
    category: "boissons-fraiches",
    categoryName: "BOISSONS FRAÎCHES & JUS",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80",
    popular: true
  },
  {
    id: "bf-cocktail-fruits",
    name: "COCKTAIL DE FRUITS FRAIS PRESSÉS",
    desc: "Mélange tonique et vitaminé de fruits tropicaux frais de Kribi",
    price: 3000,
    category: "boissons-fraiches",
    categoryName: "BOISSONS FRAÎCHES & JUS",
    image: "https://res.cloudinary.com/ccmyhjca/image/upload/v1788238658/WhatsApp_Image_2026-08-31_at_18.02.03_3_jgqp5b.jpg"
  },
  {
    id: "bf-eau-minerale",
    name: "EAU MINÉRALE NATURELLE 1.5L / 0.5L",
    desc: "Bouteille servie fraîche et désaltérante",
    price: 1000,
    category: "boissons-fraiches",
    categoryName: "BOISSONS FRAÎCHES & JUS",
    image: "https://images.unsplash.com/photo-1559839914-17aae19cec71?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bf-coca",
    name: "COCA-COLA / FANTA / SPRITE",
    desc: "Canette ou bouteille fraîche 33cl",
    price: 1500,
    category: "boissons-fraiches",
    categoryName: "BOISSONS FRAÎCHES & JUS",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80"
  },

  // ================= ENTRÉES & SALADES =================
  {
    id: "en-meli-melo",
    name: "MÉLI-MÉLO D'AVOCAT ET CREVETTES DE KRIBI",
    desc: "Avocat crémeux, crevettes fraîches de Kribi nappées de notre sauce cocktail maison",
    price: 5000,
    category: "entrees",
    categoryName: "ENTRÉES & SALADES",
    image: "https://i.pinimg.com/736x/27/24/0b/27240ba01edfc4e4ff9db62dd4ebc0ba.jpg",
    popular: true
  },
  {
    id: "en-salade-crudites",
    name: "SALADE DE CRUDITÉS",
    desc: "Tomates fraîches, oignons, maïs doux, concombre, carottes râpées, œuf dur et salade croquante",
    price: 4000,
    category: "entrees",
    categoryName: "ENTRÉES & SALADES",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "en-oeufs-poches",
    name: "OEUFS POCHÉS - COCKTAIL DE MACÉDOINE & AVOCAT",
    desc: "Oeufs pochés fondants sur lit de macédoine de légumes croquants et lamelles d'avocat",
    price: 3500,
    category: "entrees",
    categoryName: "ENTRÉES & SALADES",
    image: "https://lesbonnesrecettes.fr/images/recettes-512/toasts-gourmands-aux-oeufs-poches-et-avocat-cremeux-8615.webp"
  },
  {
    id: "en-peche-tempura",
    name: "PÊCHE DE PETITE PIROGUE EN TEMPURA SAUCE PIQUANTE",
    desc: "Petits poissons locaux frits en tempura croustillante servis avec trempette piquante",
    price: 3500,
    category: "entrees",
    categoryName: "ENTRÉES & SALADES",
    image: "https://i.pinimg.com/736x/e6/82/87/e68287998d1db332955fea37f385ed42.jpg"
  },
  {
    id: "en-salade-edivince",
    name: "SALADE EDIVINCE",
    desc: "Émincé de poulet doré, œuf dur, tomates charnues, salade du jardin et sauce veloutée au parmesan",
    price: 3500,
    category: "entrees",
    categoryName: "ENTRÉES & SALADES",
    image: "https://tse3.mm.bing.net/th/id/OIP.vsU_-_WlV04YYWlQnIfFAAHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "en-salade-maraichere",
    name: "SALADE MARAÎCHÈRE COULEUR DE TROPIQUE",
    desc: "Assortiment coloré de légumes du marché tropical, agrumes et vinaigrette parfumée",
    price: 3500,
    category: "entrees",
    categoryName: "ENTRÉES & SALADES",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "en-tartare-avocat",
    name: "TARTARE D'AVOCAT",
    desc: "Avocat écrasé aux échalotes, coriandre, jus de citron vert et dés de tomates",
    price: 3500,
    category: "entrees",
    categoryName: "ENTRÉES & SALADES",
    image: "https://tse3.mm.bing.net/th/id/OIP.0rTZQx5HFmm7N9SfquIOkwHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "en-salade-thai",
    name: "SALADE THAÏ AU POULET",
    desc: "Poulet mariné, carottes, chou croquant, cacahuètes torréfiées et vinaigrette aigre-douce",
    price: 5000,
    category: "entrees",
    categoryName: "ENTRÉES & SALADES",
    image: "https://tse3.mm.bing.net/th/id/OIP.sYEJVFQyxuf5DNf2f7fWBwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "en-des-poisson-pesto",
    name: "DÉS DE POISSON AU PESTO ET AU PARMESAN",
    desc: "Dés de poisson blanc snackés au pesto maison de basilic et copeaux de parmesan affiné",
    price: 6500,
    category: "entrees",
    categoryName: "ENTRÉES & SALADES",
    image: "https://tse1.mm.bing.net/th/id/OIP.l8UisqT-5q68ZlabU0Mi6gHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "en-rouleau-printemps",
    name: "ROULEAU DE PRINTEMPS",
    desc: "Galette de riz garnie de légumes croquants, herbes fraîches et vermicelles",
    price: 2500,
    category: "entrees",
    categoryName: "ENTRÉES & SALADES",
    image: "https://tse2.mm.bing.net/th/id/OIP.GpoWN-rrmbehBq9qjJRLdgHaEs?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "en-rouleau-saumon",
    name: "ROULEAU DE SAUMON CRÈME MAISON",
    desc: "Fines tranches de saumon roulées à la crème d'herbes et ciboulette",
    price: 6500,
    category: "entrees",
    categoryName: "ENTRÉES & SALADES",
    image: "https://tse1.mm.bing.net/th/id/OIP.BGGcSiCYcmI9ckvCRcQJ-AHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "en-cassolette-crevette",
    name: "CASSOLETTE DE CREVETTES",
    desc: "Crevettes sautées servies bien chaudes en cassolette parfumée",
    price: 5000,
    category: "entrees",
    categoryName: "ENTRÉES & SALADES",
    image: "https://tse1.mm.bing.net/th/id/OIP.KJ6vl8s9H1TEYFQaCmecLQHaE3?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // ================= FRUITS DE MER & POISSONS =================
  {
    id: "fm-crevette-ail",
    name: "CREVETTES SAUTÉES À L'AIL",
    desc: "Crevettes fraîches de Kribi sautées à l'ail doré, persil et beurre noisette",
    price: 6500,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://recettemoderne.com/wp-content/uploads/2024/01/vaprincipal_STYLE_Close-up_Shot_right_view__EMOTION_realistic_a_269c4c90-7898-4fd4-8852-7f40020da2df.png",
    popular: true
  },
  {
    id: "fm-crevette-kribienne",
    name: "CREVETTES SAUTÉES À LA KRIBIENNE",
    desc: "Recette traditionnelle de Kribi aux épices locales, tomates et aromates",
    price: 6500,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://kribi-cameroun.com/wp-content/uploads/2024/08/plat_de_crevettes_sautees_avec_epices_et_riz_se_d972f16f-37f9-4cb1-9d85-2d7c0c721dbb.jpg"
  },
  {
    id: "fm-crevette-coco",
    name: "CREVETTES AU LAIT DE COCO",
    desc: "Crevettes mijotées dans un onctueux lait de coco infusé aux épices douces",
    price: 8000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://www.papillesetpupilles.fr/wp-content/uploads/2007/08/Crevettes-au-lait-de-coco-1.jpg"
  },
  {
    id: "fm-gambas-sautees",
    name: "GAMBAS SAUTÉES",
    desc: "Grosses gambas de la côte atlantique saisies à feu vif aux aromates",
    price: 12000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://tse2.mm.bing.net/th/id/OIP.6WBnwxr_NuNVhhTXRsygtQHaJ4?r=0&w=480&h=640&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "fm-gambas-gingembre",
    name: "GAMBAS AU GINGEMBRE",
    desc: "Gambas marinées et sautées au gingembre frais et petits légumes sautés",
    price: 10000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://guide-du-gourmet.com/wp-content/uploads/2026/02/gambas-sautees-gingembre-img-1.jpg"
  },
  {
    id: "fm-gambas-balsamique",
    name: "GAMBAS SAUTÉES AU VINAIGRE BALSAMIQUE",
    desc: "Gambas déglacées au vinaigre balsamique réduit, touche sucrée-salée",
    price: 9000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://tse4.mm.bing.net/th/id/OIP.U0gdk_BYGV1rAs5TBZpmlAHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "fm-gambas-edvince",
    name: "GAMBAS EDVINCE SPÉCIALE",
    desc: "Notre recette signature : gambas royales enrobées de sauce épicée secrète du Chef",
    price: 10000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://i.pinimg.com/736x/a4/65/46/a465464c8677ffebc9a9064dd0be9f10.jpg",
    popular: true
  },
  {
    id: "fm-gambas-flambee",
    name: "GAMBAS FLAMBÉES",
    desc: "Grosses gambas flambées au cognac sous vos yeux, chair tendre et parfumée",
    price: 15000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://img.cuisineaz.com/660x660/2023/05/31/i194140-gambas-flambees.jpg"
  },
  {
    id: "fm-langouste-flambee",
    name: "LANGOUSTE FLAMBÉE ROYALE",
    desc: "Langouste entière grillée et flambée au grand alcool, servie avec beurre d'ail citronné",
    price: 15000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://img.cuisineaz.com/660x660/2013/12/20/i23025-photo-de-langoustes-au-cognac-et-a-la-creme.jpeg",
    popular: true
  },
  {
    id: "fm-calamar-saute",
    name: "CALAMAR SAUTÉ",
    desc: "Anneaux de calamars tendres sautés à l'ail, piment doux et persil frais",
    price: 7500,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://ffcuisine.fr/wp-content/uploads/2025/01/1735460838-petits-calamars-sautes-a-lail-et-au-persil-recette-savoureuse.jpg"
  },
  {
    id: "fm-pagha",
    name: "PAGHA BRAISÉ / SAUTÉ",
    desc: "Poisson Pagha réputé pour sa chair délicate, braisé ou sauté minute",
    price: 8000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://margeplus.app/storage/menu/MTAxMTc3M18w.jpg"
  },
  {
    id: "fm-crevettes-ail-edvince",
    name: "CREVETTES SAUTÉES À L'AIL FAÇON EDIVINCE",
    desc: "Grande assiette de crevettes sautées façon maison avec ail confit et fines herbes",
    price: 8000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://tse2.mm.bing.net/th/id/OIP.u52nWTcXTpOi7ctNdQhmrwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "fm-retour-peche",
    name: "RETOUR DE PÊCHE DU DÉBARCADÈRE DE KRIBI",
    desc: "Bar, Sole, Turbo, Barracuda au choix — Grillé au feu de bois, Poêlé ou en Ebandja",
    price: 8000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://th.bing.com/th/id/R.7044feede596bfa9b2508cee179152b0?rik=7bufVVAI0%2fcFvg&pid=ImgRaw&r=0",
    popular: true
  },
  {
    id: "fm-filet-capitaine-agrumes",
    name: "FILET DE CAPITAINE - SAUCE CRÈME AUX AGRUMES",
    desc: "Pavé de capitaine poêlé nappé d'une onctueuse sauce crème aux zestes d'agrumes",
    price: 6500,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://tse3.mm.bing.net/th/id/OIP.8bc-FTEInR5b4MXrcrzNRgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "fm-filet-capitaine-penja",
    name: "FILET DE CAPITAINE AU POIVRE DE PENJA",
    desc: "Filet de capitaine snacké rehaussé du célèbre poivre blanc de Penja",
    price: 5000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://mccormick.widen.net/content/mpdh7tt81g/original/filets_de_bar_au_poivre_de_penja_et_sa_puree_truffee_800x800.jpg"
  },
  {
    id: "fm-filet-capitaine-champignons",
    name: "FILET DE CAPITAINE SAUTÉ AUX CHAMPIGNONS",
    desc: "Filet de poisson tendre revenu avec poêlée de champignons de Paris",
    price: 5000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://www.recettesdunet.com/wp-content/uploads/2025/03/Filet-de-poisson-a-la-creme-et-aux-champignons-1024x683.jpg"
  },
  {
    id: "fm-filet-bar-bonne-femme",
    name: "FILET DE BAR BONNE FEMME",
    desc: "Filet de bar blanc poché au vin blanc, échalotes et champignons",
    price: 5000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://live.staticflickr.com/6018/6014763428_1465759710_b.jpg"
  },
  {
    id: "fm-filet-bar-curry",
    name: "FILET DE BAR AU CURRY",
    desc: "Filet de bar mijoté dans une sauce curry douce et parfumée",
    price: 6000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://comptoirdesaromes.com/wp-content/uploads/2024/05/Firefly-recette-de-filet-de-bar-au-lait-de-coco-avec-du-curry-breton-et-du-riz-22895.jpeg"
  },
  {
    id: "fm-sole-meuniere",
    name: "SOLE À LA BELLE MEUNIÈRE",
    desc: "Sole entière dorée au beurre meunière, jus de citron et persil frais",
    price: 6000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://tse2.mm.bing.net/th/id/OIP.PTxeJkyIpw18HpVspErAYwHaEJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "fm-medaillon-sole-imperiale",
    name: "MÉDAILLON DE SOLE À L'IMPÉRIALE",
    desc: "Médaillons de sole délicatement roulés et cuits avec garniture noble",
    price: 5500,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://i.pinimg.com/736x/aa/65/1b/aa651bff2fd0b0a89cbb808fa3b4985f.jpg"
  },
  {
    id: "fm-filet-poisson",
    name: "FILET DE POISSON DU CHEF",
    desc: "Filet de poisson frais du jour servi avec accompagnement au choix",
    price: 6000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://cheffryer.fr/wp-content/uploads/2025/09/Filet-de-poisson-au-air-fryer-1024x683.webp"
  },
  {
    id: "fm-brochette-poisson",
    name: "BROCHETTE DE POISSON",
    desc: "Brochettes de morceaux de poisson mariné et légumes grillés",
    price: 6500,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://tse1.mm.bing.net/th/id/OIP.Qei1AXdaq5qU1BL35U5WbQHaEk?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "fm-poisson-meuniere",
    name: "POISSON MEUNIÈRE ENTIER",
    desc: "Poisson entier poêlé au beurre, citron pressé et herbes",
    price: 7500,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://tse4.mm.bing.net/th/id/OIP.mWaU3rrxpY5IKKYqO5BhFgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "fm-ebandjiya",
    name: "EBANDJIYA TRADITIONNEL",
    desc: "Spécialité côtière de poisson cuit à l'étouffée dans les feuilles de bananier aux épices",
    price: 7500,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://www.camerdish.com/wp-content/uploads/2021/03/20200220_184220.jpg"
  },
  {
    id: "fm-sole-bar-carpe-arrivage",
    name: "SOLE - BAR - CARPE BRAISÉE (SELON ARRIVAGE)",
    desc: "Poisson frais entier braisé aux épices de Kribi (Tarif selon calibre : 7 500 à 10 000 XAF)",
    price: 7500,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://www.citycenter.cm/restaurant/images/CARPE-braise.jpg"
  },
  {
    id: "fm-soupe-poisson",
    name: "SOUPE DE POISSON MAISON",
    desc: "Bouillon riche et parfumé de poissons de roche et fruits de mer",
    price: 5000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://moninstantgourmand.fr/wp-content/uploads/2025/05/recette-de-soupe-de-poisson.png"
  },
  {
    id: "fm-veloute-tomates",
    name: "VELOUTÉ DE TOMATES AU BASILIC",
    desc: "Soupe onctueuse de tomates gorgées de soleil et basilic frais",
    price: 2500,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://tse4.mm.bing.net/th/id/OIP.EmDJC5AU95UMVkZKa6hZOwHaHO?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "fm-soupe-poireau",
    name: "SOUPE DE POIREAUX",
    desc: "Soupe traditionnelle et douce de poireaux et pommes de terre",
    price: 2500,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://www.droledepain.fr/wp-content/uploads/2025/11/Soupe-poireaux-pomme-de-terre-recette-saine-et-facile-a-preparer.jpg"
  },

  // ================= SPÉCIALITÉS CAMEROUNAISES =================
  {
    id: "cam-ndole-viande-crevettes",
    name: "NDOLÉ VIANDE ET CREVETTES DE KRIBI",
    desc: "Le plat emblématique camerounais aux feuilles de ndolé amères, pâte d'arachide, viande tendre et crevettes fraîches",
    price: 7000,
    category: "camerounaise",
    categoryName: "SPÉCIALITÉS CAMEROUNAISES",
    image: "https://tse4.mm.bing.net/th/id/OIP.UOatwqotjqADsGquSMgA9AHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    popular: true
  },
  {
    id: "cam-ndole-poisson-fume",
    name: "NDOLÉ VIANDE & POISSON FUMÉ",
    desc: "Ndolé onctueux aux morceaux de viande et poisson fumé de l'Atlantique",
    price: 6500,
    category: "camerounaise",
    categoryName: "SPÉCIALITÉS CAMEROUNAISES",
    image: "https://tse4.mm.bing.net/th/id/OIP.MU0YeInN7D15kHUXe4Uc8AHaEE?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "cam-ndole-simple",
    name: "NDOLÉ VIANDE OU CREVETTES (PORTION SIMPLE)",
    desc: "Plat traditionnel servi chaud avec miondo, plantain ou riz",
    price: 6500,
    category: "camerounaise",
    categoryName: "SPÉCIALITÉS CAMEROUNAISES",
    image: "https://www.camerdish.com/wp-content/uploads/2025/08/Ndole-1-800x840.png"
  },
  {
    id: "cam-folon-poisson-fume",
    name: "FOLON SAUTÉ AU POISSON FUMÉ",
    desc: "Feuilles de folon sautées à la tomate, oignons et émietté de poisson fumé",
    price: 6500,
    category: "camerounaise",
    categoryName: "SPÉCIALITÉS CAMEROUNAISES",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyIIs4hWP44_erWc62o73LKm-QW4spYt229lxaJ7zRpPfoWdb7vqZgaqUR9cA15SH93pWFxovUDxylPXFtW_II7NumL9-48DoIZNkPS7nRl3K-iCZVN2XBIsi6ioV7yHqJrNVt-_QPSFMo/s1600/legumes+saut%25C3%25A9s.jpg",
    popular: true
  },
  {
    id: "cam-folon-simple",
    name: "FOLON SAUTÉ TRADITIONNEL",
    desc: "Légumes folon du village revenus aux aromates locaux",
    price: 6000,
    category: "camerounaise",
    categoryName: "SPÉCIALITÉS CAMEROUNAISES",
    image: "https://i.pinimg.com/736x/5e/a3/07/5ea3075f3a4be0397a782e0c92ccef13.jpg"
  },
  {
    id: "cam-thieboudienne",
    name: "THIÉBOUDIENNE ROYALE",
    desc: "Célèbre riz au poisson sénégalais mijoté aux légumes du soleil et épices",
    price: 7000,
    category: "camerounaise",
    categoryName: "SPÉCIALITÉS CAMEROUNAISES",
    image: "https://i.pinimg.com/originals/9a/7a/3e/9a7a3e9d592f0fe863e19e4ad51f52b6.jpg"
  },

  // ================= VIANDES & GRILLADES =================
  {
    id: "vg-steak-zebu",
    name: "STEAK DE ZÉBU AU POIVRE DE PENJA",
    desc: "Pièce de filet de zébu tendre saisie avec sauce crémeuse au poivre de Penja",
    price: 7500,
    category: "viandes-grillades",
    categoryName: "VIANDES & GRILLADES",
    image: "https://tse3.mm.bing.net/th/id/OIP.uiVwJ8jnv_Vx0bRxv4Om_gHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    popular: true
  },
  {
    id: "vg-cote-porc-237",
    name: "CÔTE DE PORC À LA 237",
    desc: "Côte de porc marinée aux épices locales camerounaises et grillée à point",
    price: 8000,
    category: "viandes-grillades",
    categoryName: "VIANDES & GRILLADES",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "vg-cotelette-porc-grillee",
    name: "CÔTELETTE DE PORC GRILLÉE",
    desc: "Côtelette de porc juteuse grillée au feu de bois",
    price: 7000,
    category: "viandes-grillades",
    categoryName: "VIANDES & GRILLADES",
    image: "https://tse3.mm.bing.net/th/id/OIP.a3Oe9tkc07FckFTT5_jncAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "vg-porc-fume-saute",
    name: "PORC FUMÉ SAUTÉ",
    desc: "Morceaux de porc fumé sautés aux oignons, poivrons et piments doux",
    price: 7500,
    category: "viandes-grillades",
    categoryName: "VIANDES & GRILLADES",
    image: "https://le-bien-aime.com/wp-content/uploads/2023/11/recette-saute-de-porc.jpg"
  },
  {
    id: "vg-mixed-grille",
    name: "MIXED GRILL DU CARNIVORE",
    desc: "Assortiment de viandes grillées : bœuf, porc, poulet et saucisses",
    price: 9000,
    category: "viandes-grillades",
    categoryName: "VIANDES & GRILLADES",
    image: "https://blogsupplementler.mncdn.com/wp-content/uploads/2025/03/mixed-grilled-meat-lamb-ribs-chicken-potato-side-view_11zon.webp"
  },
  {
    id: "vg-poulet-caramelise-miel",
    name: "1/4 POULET CARAMÉLISÉ AU MIEL",
    desc: "Cuisse ou blanc de poulet rôti laqué au miel de brousse et sésame",
    price: 5500,
    category: "viandes-grillades",
    categoryName: "VIANDES & GRILLADES",
    image: "https://i.pinimg.com/originals/e3/ec/cb/e3eccbb93e58f689430b228d0855c11f.jpg"
  },
  {
    id: "vg-poulet-fermier-demi",
    name: "DEMI POULET FERMIER RÔTI FAÇON BBQ",
    desc: "Demi-poulet fermier rôti à la peau croustillante avec marinade barbecue",
    price: 7000,
    category: "viandes-grillades",
    categoryName: "VIANDES & GRILLADES",
    image: "https://i.pinimg.com/736x/d5/fc/f9/d5fcf9e24a30f0e9085d2ee61f2ed540.jpg"
  },
  {
    id: "vg-poulet-fermier-entier",
    name: "POULET FERMIER ENTIER RÔTI FAÇON BBQ",
    desc: "Poulet fermier entier braisé au barbecue pour 3 à 4 personnes",
    price: 13000,
    category: "viandes-grillades",
    categoryName: "VIANDES & GRILLADES",
    image: "https://i.pinimg.com/736x/d5/fc/f9/d5fcf9e24a30f0e9085d2ee61f2ed540.jpg"
  },
  {
    id: "vg-fricassee-volaille",
    name: "FRICASSÉE DE VOLAILLE AUX CHAMPIGNONS DE BAFOU",
    desc: "Émincé de volaille fermière mijoté à la crème et champignons sauvages de Bafou",
    price: 6500,
    category: "viandes-grillades",
    categoryName: "VIANDES & GRILLADES",
    image: "https://tse4.mm.bing.net/th/id/OIP.uomzVkN-qyGJ516UPzOssgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "vg-parmentier-boeuf",
    name: "HACHIS PARMENTIER DE BOEUF",
    desc: "Purée maison gratinée au four et effiloché de bœuf braisé",
    price: 7500,
    category: "viandes-grillades",
    categoryName: "VIANDES & GRILLADES",
    image: "https://th.bing.com/th/id/R.0b4d2f43e8d88ba3c004c99c7984f740?rik=12Q3kJtCAN2g4g&riu=http%3a%2f%2ficu.linter.fr%2f750%2f10002140%2f1350802479%2fhachis-parmentier.jpg&ehk=IpOoOBWVFRz0Hm4IohcWDHq7HWGHpgxV2bsT5o%2f14%2fg%3d&risl=&pid=ImgRaw&r=0"
  },

  // ================= PÂTES & RÉSISTANCES =================
  {
    id: "pa-zarsuela",
    name: "ZARZUELA DE FRUITS DE MER",
    desc: "Ragoût noble espagnol de poissons de Kribi, gambas, calamars et moules mijotés au safran",
    price: 8000,
    category: "pates-riz",
    categoryName: "PÂTES & RÉSISTANCES",
    image: "https://mrrecette.com/cdn-cgi/image/fit=contain,width=480,format=auto/assets/images/1777993290485-i8fkx9yg.jpg",
    popular: true
  },
  {
    id: "pa-spaghetti-carbonara",
    name: "SPAGHETTI CARBONARA",
    desc: "Spaghetti al dente, crème onctueuse, lardons dorés et jaune d'œuf",
    price: 6000,
    category: "pates-riz",
    categoryName: "PÂTES & RÉSISTANCES",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pa-spaghetti-bolognaise",
    name: "SPAGHETTI BOLOGNAISE",
    desc: "Sauce tomate mijotée à la viande hachée pur bœuf, herbes aromatiques et parmesan",
    price: 5500,
    category: "pates-riz",
    categoryName: "PÂTES & RÉSISTANCES",
    image: "https://static.vecteezy.com/system/resources/previews/002/799/747/non_2x/spaghetti-bolognese-pork-or-spaghetti-with-minced-pork-tomato-sauce-italian-food-style-free-photo.jpg"
  },
  {
    id: "pa-bolo-pecheur",
    name: "BOLO DU PÊCHEUR",
    desc: "Pâtes en sauce bolognaise marine aux crevettes, dés de poisson et calamars",
    price: 7000,
    category: "pates-riz",
    categoryName: "PÂTES & RÉSISTANCES",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80"
  },

  // ================= NOS PIZZAS =================
  {
    id: "pz-oceania",
    name: "PIZZA OCEANIA",
    desc: "Sauce tomate, mozzarella fondante, crevettes fraîches de Kribi, calamars et origan",
    price: 6500,
    category: "nos-pizzas",
    categoryName: "NOS PIZZAS",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
    popular: true
  },
  {
    id: "pz-trois-fromages",
    name: "PIZZA TROIS FROMAGES",
    desc: "Mozzarella, gorgonzola, emmental fondant et filet d'huile d'olive",
    price: 7500,
    category: "nos-pizzas",
    categoryName: "NOS PIZZAS",
    image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pz-calzone",
    name: "PIZZA CALZONE (CHAUSSON)",
    desc: "Pizza pliée farcie au jambon, mozzarella, œuf et champignons",
    price: 8000,
    category: "nos-pizzas",
    categoryName: "NOS PIZZAS",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pz-vegetarienne",
    name: "PIZZA VÉGÉTARIENNE",
    desc: "Sauce tomate, mozzarella, poivrons grillés, oignons, champignons et olives",
    price: 7500,
    category: "nos-pizzas",
    categoryName: "NOS PIZZAS",
    image: "https://tse4.mm.bing.net/th/id/OIP.Lgy7H3W1Klb5-L5JxO3clgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "pz-margarita",
    name: "PIZZA MARGARITA",
    desc: "Sauce tomate maison, mozzarella fondante et feuilles de basilic frais",
    price: 5000,
    category: "nos-pizzas",
    categoryName: "NOS PIZZAS",
    image: "https://veenaazmanov.com/wp-content/uploads/2020/04/Classic-Pizza-Margherita1.jpg"
  },
  {
    id: "pz-royale",
    name: "PIZZA ROYALE",
    desc: "Sauce tomate, mozzarella, jambon supérieur et champignons frais de Paris",
    price: 8500,
    category: "nos-pizzas",
    categoryName: "NOS PIZZAS",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pz-china",
    name: "PIZZA CHINA SPICY",
    desc: "Poulet mariné, poivrons, oignons rouges, piments doux et sauce relevée",
    price: 8500,
    category: "nos-pizzas",
    categoryName: "NOS PIZZAS",
    image: "https://tse3.mm.bing.net/th/id/OIP.vTdG6LaO2opxulP6Y3AOGQHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "pz-napolitaine",
    name: "PIZZA NAPOLITAINE",
    desc: "Sauce tomate, mozzarella, anchois, câpres et origan",
    price: 6500,
    category: "nos-pizzas",
    categoryName: "NOS PIZZAS",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pz-kribienne",
    name: "PIZZA KRIBIENNE SPÉCIALE",
    desc: "Sauce tomate, mozzarella, crevettes de Kribi, poisson émietté, oignons et piment doux",
    price: 7500,
    category: "nos-pizzas",
    categoryName: "NOS PIZZAS",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8OdQhpLMvuD6d2S9N4iq3OeA_aigv2mBJ02aV58KX6vtQBbrzEoKO4cgEtwRqQM92ew-UYGTlwP3oiaJyJMqRbgQJ-Et3hyphenhyphensi0P1Dcsok4eKznZm96Lu_JbdbjOULgX9euKInncwNwO0/s1600/IMG_4883.JPG",
    popular: true
  },

  // ================= RESTAURATION RAPIDE =================
  {
    id: "rr-sandwich",
    name: "SANDWICH CLUB JAMBON / POULET",
    desc: "Pain toasté garni de poulet émincé ou jambon, œuf dur, tomate, salade et frites croustillantes",
    price: 3000,
    category: "restauration-rapide",
    categoryName: "RESTAURATION RAPIDE",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "rr-crepe-confiture",
    name: "CRÊPE CONFITURE / SUCRE",
    desc: "Deux crêpes fines maison servies chaudes avec confiture de fruits",
    price: 3000,
    category: "restauration-rapide",
    categoryName: "RESTAURATION RAPIDE",
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "rr-salade-fraicheur",
    name: "SALADE FRAÎCHEUR RAPIDE",
    desc: "Concombres, tomates du jardin, maïs et vinaigrette légère au citron",
    price: 4000,
    category: "restauration-rapide",
    categoryName: "RESTAURATION RAPIDE",
    image: "https://tse1.mm.bing.net/th/id/OIP.rIbtzQ7aTsxWGoMT6B63EwHaFE?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "rr-omelette-legume-express",
    name: "OMELETTE NATURE LÉGUMES",
    desc: "Omelette minute accompagnée de salade verte ou frites",
    price: 3000,
    category: "restauration-rapide",
    categoryName: "RESTAURATION RAPIDE",
    image: "https://tse1.mm.bing.net/th/id/OIP.eKk8qfJDaIKSSczFzYaXhAHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // ================= DESSERTS =================
  {
    id: "de-assiette-fruits",
    name: "ASSIETTE DE FRUITS FRAIS DE SAISON",
    desc: "Tranches rafraîchissantes de pastèque, papaye mûre et ananas sucré de Kribi",
    price: 2500,
    category: "desserts",
    categoryName: "DESSERTS",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80",
    popular: true
  },
  {
    id: "de-salade-fruits-3500",
    name: "GRANDE SALADE DE FRUITS TROPICAUX",
    desc: "Salade généreuse de fruits locaux coupés en dés au coulis de mangue",
    price: 3500,
    category: "desserts",
    categoryName: "DESSERTS",
    image: "https://www.carolinescooking.com/wp-content/uploads/2020/05/tropical-fruit-salad-photo.jpg"
  },
  {
    id: "de-tartare-fruits",
    name: "TARTARE DE FRUITS EXOTIQUES",
    desc: "Brunoise fine de fruits de saison parfumée à la menthe et vanille Bourbon",
    price: 3000,
    category: "desserts",
    categoryName: "DESSERTS",
    image: "https://www.exprecettes.com/wp-content/uploads/2025/07/tartare-de-fruits-exotiques-1.jpg"
  },
  {
    id: "de-tarte-citron",
    name: "TARTE AU CITRON MERINGUÉE",
    desc: "Pâte sablée croustillante, crème au citron acidulée et meringue italienne dorée",
    price: 3500,
    category: "desserts",
    categoryName: "DESSERTS",
    image: "https://th.bing.com/th/id/R.a56df74c4bbc7318672723db814ba755?rik=LYscB4rFFeDDMg&riu=http%3a%2f%2fgateaux-et-delices.com%2fwp-content%2fuploads%2f2015%2f11%2fTarte-au-citron-meringu%c3%a9e1.jpeg&ehk=KdONJ7b9enh5aJVe6EYf%2bBW5PdEFHjl6HyEVbRvIILk%3d&risl=&pid=ImgRaw&r=0",
    popular: true
  },
  {
    id: "de-tarte-pommes",
    name: "TARTE AUX POMMES DORÉE",
    desc: "Tarte fine aux lamelles de pommes caramélisées à la cannelle",
    price: 3500,
    category: "desserts",
    categoryName: "DESSERTS",
    image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "de-tarte-coco",
    name: "TARTE À LA NOIX DE COCO",
    desc: "Tarte exotique parfumée à la noix de coco râpée et crème onctueuse",
    price: 3500,
    category: "desserts",
    categoryName: "DESSERTS",
    image: "https://tse1.mm.bing.net/th/id/OIP.iPBiYBlUruMgodk7y5uu6AHaFX?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "de-tarte-menagere-trois",
    name: "TARTE GOURMANDE MÉNAGÈRE À TROIS",
    desc: "Tarte gourmande à partager aux trois saveurs fruitées",
    price: 3500,
    category: "desserts",
    categoryName: "DESSERTS",
    image: "https://i.pinimg.com/originals/f2/5d/95/f25d952f301c9620761d65ad99008965.jpg"
  },
  {
    id: "de-fondant-chocolat",
    name: "FONDANT AU CHOCOLAT CŒUR COULANT",
    desc: "Gâteau au chocolat noir intense avec cœur fondant servi chaud",
    price: 3500,
    category: "desserts",
    categoryName: "DESSERTS",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "de-mousse-exotique",
    name: "MOUSSE EXOTIQUE LÉGÈRE",
    desc: "Mousse aérée au fruit de la passion et mangue",
    price: 3000,
    category: "desserts",
    categoryName: "DESSERTS",
    image: "https://tse3.mm.bing.net/th/id/OIP.ma-tZlWkSh_Jd1dDKbLdMAHaEO?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "de-crepe-maison",
    name: "CRÊPE MAISON AU CHOCOLAT OU SUCRE",
    desc: "Crêpe tiède roulée et nappée au choix de chocolat noir ou sucre",
    price: 2500,
    category: "desserts",
    categoryName: "DESSERTS",
    image: "https://tse1.explicit.bing.net/th/id/OIP.NpN-PFA-X_Tp1BaRFYaC1wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // ================= ACCOMPAGNEMENTS & SUGGESTION =================
  {
    id: "acc-1",
    name: "ACCOMPAGNEMENT AU CHOIX",
    desc: "Riz parfumé, Plantain frit (Alloco) ou vapeur, Pommes frites maison, Légumes grillés ou Igname bouillie",
    price: 1500,
    category: "restauration-rapide",
    categoryName: "RESTAURATION RAPIDE",
    image: "https://www.amourdecuisine.fr/wp-content/uploads/2021/10/idees-plats-et-legumes-daccompagnement.jpg"
  },
  {
    id: "sug-jour",
    name: "SUGGESTION DU CHEF DU JOUR",
    desc: "Création gourmande selon le marché du matin et l'arrivage de pêche fraîche",
    price: 7000,
    category: "fruits-de-mer",
    categoryName: "FRUITS DE MER & POISSONS",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    popular: true
  },

  // ================= CHAMPAGNES (BOUTEILLES & AU VERRE) =================
  {
    id: "ch-1",
    name: "MOËT & CHANDON BRUT IMPÉRIAL",
    desc: "Bouteille 75cl — Champagne d'exception aux arômes de fruits blancs, brioche et agrumes",
    price: 85000,
    glassPrice: 15000,
    unit: "Bouteille 75cl",
    category: "champagnes",
    categoryName: "CHAMPAGNES",
    image: "https://tse4.mm.bing.net/th/id/OIP.Gtv1FexA1baVQcX1xQf9fwHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    popular: true
  },
  {
    id: "ch-2",
    name: "VEUVE CLICQUOT BRUT CARTE JAUNE",
    desc: "Bouteille 75cl — Équilibre parfait entre puissance et finesse, bulles fines et persistantes",
    price: 95000,
    glassPrice: 18000,
    unit: "Bouteille 75cl",
    category: "champagnes",
    categoryName: "CHAMPAGNES",
    image: "https://www.clos19.com/on/demandware.static/-/Sites-mh-master/default/dw86d09375/images/large/veuve_clicquot/packshots/VEUVE-CLICQUOT-CHAMPAGNE-YELLOW-LABEL-GIFTBOX-UPDATE-1080718_1.jpg?",
    popular: true
  },
  {
    id: "ch-3",
    name: "DOM PÉRIGNON VINTAGE PRESTIGE",
    desc: "Bouteille 75cl — Millésime d'anthologie, complexité minérale et éclat soyeux",
    price: 250000,
    unit: "Bouteille 75cl",
    category: "champagnes",
    categoryName: "CHAMPAGNES",
    image: "https://s1.img.bidsquare.com/item/xl/3400/34007590.jpeg?t=1VoEuy"
  },
  {
    id: "ch-4",
    name: "LAURENT-PERRIER LA CUVÉE BRUT",
    desc: "Bouteille 75cl — Fraîcheur éclatante, notes florales et élégance aérienne",
    price: 90000,
    glassPrice: 16000,
    unit: "Bouteille 75cl",
    category: "champagnes",
    categoryName: "CHAMPAGNES",
    image: "https://images.alko.fi/images/cs_srgb,f_auto,t_medium/cdn/008621/laurent-perrier-la-cuvee-champagne-brut.jpg"
  },
  {
    id: "ch-5",
    name: "RUINART BLANC DE BLANCS",
    desc: "Bouteille 75cl — 100% Chardonnay d'une pureté aromatique absolue",
    price: 140000,
    unit: "Bouteille 75cl",
    category: "champagnes",
    categoryName: "CHAMPAGNES",
    image: "https://tse1.mm.bing.net/th/id/OIP.AKjwA21QawLYS6qgrqWsIAHaJ4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "ch-6",
    name: "COUPE DE CHAMPAGNE PRESTIGE (VERRE)",
    desc: "Coupe servie fraîche et pétillante à table ou au bar",
    price: 12000,
    unit: "Au verre / Coupe",
    category: "champagnes",
    categoryName: "CHAMPAGNES",
    image: "https://media-prod-eu-1.mirakl.net/SOURCE/b9a91606392648b6a7a96abc71e7b7dc"
  },

  // ================= WHISKY ET SPIRITUEUX (BOUTEILLES & AU VERRE) =================
  {
    id: "wh-1",
    name: "CHIVAS REGAL 12 ANS",
    desc: "Bouteille 70cl — Scotch Whisky d'exception vieilli 12 ans en fûts de chêne",
    price: 55000,
    glassPrice: 5000,
    unit: "Bouteille 70cl",
    category: "whisky-spiritueux",
    categoryName: "WHISKY ET SPIRITUEUX",
    image: "https://www.cdiscount.com/pdt2/8/7/5/1/700x700/auc8253961477875/rw/chivas-regal-12-ans-blended-scotch-whisky-700-ml.jpg",
    popular: true
  },
  {
    id: "wh-2",
    name: "CHIVAS REGAL 18 ANS GOLD SIGNATURE",
    desc: "Bouteille 75cl — Blended Scotch d'une richesse exceptionnelle aux 85 saveurs",
    price: 95000,
    glassPrice: 9000,
    unit: "Bouteille 75cl",
    category: "whisky-spiritueux",
    categoryName: "WHISKY ET SPIRITUEUX",
    image: "https://thecentralwhisky.com/cdn/shop/products/image_089831af-4265-4e76-b5d3-07d6c3946750.jpg?v=1673436671&width=1946"
  },
  {
    id: "wh-3",
    name: "JOHNNIE WALKER BLACK LABEL 12 ANS",
    desc: "Bouteille 70cl — Légendaire whisky écossais aux notes fumées et fruitées",
    price: 50000,
    glassPrice: 5000,
    unit: "Bouteille 70cl",
    category: "whisky-spiritueux",
    categoryName: "WHISKY ET SPIRITUEUX",
    image: "https://amorivini.com/wp-content/uploads/Johnnie_Walker_Black_Label_70cl_Bouteille_Etui_Face-scaled.jpg",
    popular: true
  },
  {
    id: "wh-4",
    name: "JOHNNIE WALKER BLUE LABEL RARE CASK",
    desc: "Bouteille 75cl — L'excellence suprême, sélection des fûts les plus rares au monde",
    price: 280000,
    glassPrice: 25000,
    unit: "Bouteille 75cl",
    category: "whisky-spiritueux",
    categoryName: "WHISKY ET SPIRITUEUX",
    image: "https://content.thirtyonewhiskey.com/wp-content/uploads/2023/02/27082533/PXL_20230226_211353648.PORTRAIT-scaled.jpg"
  },
  {
    id: "wh-5",
    name: "JACK DANIEL'S OLD NO. 7 TENNESSEE",
    desc: "Bouteille 70cl — Douceur et filtration au charbon de bois d'érable",
    price: 45000,
    glassPrice: 4500,
    unit: "Bouteille 70cl",
    category: "whisky-spiritueux",
    categoryName: "WHISKY ET SPIRITUEUX",
    image: "https://www.excaliburshop.com/uploads/item/10508/template/108/images/0-jack-daniel-s-single-barrel-100-proof-0-7l-50-100181.jpg"
  },
  {
    id: "wh-6",
    name: "GLENFIDDICH 12 ANS SINGLE MALT",
    desc: "Bouteille 70cl — Single Malt emblématique du Speyside aux notes de poire fraîche",
    price: 65000,
    glassPrice: 6000,
    unit: "Bouteille 70cl",
    category: "whisky-spiritueux",
    categoryName: "WHISKY ET SPIRITUEUX",
    image: "https://tse3.mm.bing.net/th/id/OIP.vm5ZEn3N-dO92WNr8YUl3QHaOj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "wh-7",
    name: "THE MACALLAN 12 ANS DOUBLE CASK",
    desc: "Bouteille 70cl — Vieilli en fûts de chêne américain et européen assaisonnés au xérès",
    price: 110000,
    glassPrice: 10000,
    unit: "Bouteille 70cl",
    category: "whisky-spiritueux",
    categoryName: "WHISKY ET SPIRITUEUX",
    image: "https://tse2.mm.bing.net/th/id/OIP.9CGP2gwuXp8X_ZGHi8T0SQHaNK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "wh-8",
    name: "JAMESON IRISH WHISKEY",
    desc: "Bouteille 70cl — Triple distillation irlandaise, rondeur et légèreté",
    price: 35000,
    glassPrice: 4000,
    unit: "Bouteille 70cl",
    category: "whisky-spiritueux",
    categoryName: "WHISKY ET SPIRITUEUX",
    image: "https://www.jamesonwhiskey.com/wp-content/uploads/2022/03/PRIR2010_JAMESON_18Y_Scen_3-aspect-ratio-960-730.jpg"
  },
  {
    id: "wh-9",
    name: "GRANT'S TRIPLE WOOD 12 ANS",
    desc: "Bouteille 70cl — Blended Scotch Whisky d'une grande rondeur",
    price: 45000,
    glassPrice: 4000,
    unit: "Bouteille 70cl",
    category: "whisky-spiritueux",
    categoryName: "WHISKY ET SPIRITUEUX",
    image: "https://cdn-prd-02.pnp.co.za/sys-master/images/h4f/hc7/11033447661598/silo-product-image-v2-30Nov2022-180146-5010327204444-Angle_D-75143-2110_400Wx400H"
  },
  {
    id: "wh-10",
    name: "HENNESSY V.S COGNAC",
    desc: "Bouteille 70cl — Cognac Very Special aux arômes boisés et fruités intenses",
    price: 65000,
    glassPrice: 6000,
    unit: "Bouteille 70cl",
    category: "whisky-spiritueux",
    categoryName: "WHISKY ET SPIRITUEUX",
    image: "https://tse1.mm.bing.net/th/id/OIP.yKAkBn6nY_4uc1jJgW-3VAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "wh-11",
    name: "VODKA ABSOLUT ORIGINAL",
    desc: "Bouteille 70cl — Vodka suédoise pure élaborée à partir de blé d'hiver",
    price: 35000,
    glassPrice: 3500,
    unit: "Bouteille 70cl",
    category: "whisky-spiritueux",
    categoryName: "WHISKY ET SPIRITUEUX",
    image: "https://www.raschvin.com/wp-content/uploads/2024/04/64584eefaefea21af62577c5369c0d07f81cb26eac79f01147f5fcaee8b244d9.jpg"
  },

  // ================= VINS ROUGES (BOUTEILLES & AU VERRE) =================
  {
    id: "vr-1",
    name: "CHÂTEAU PIED D'ARGENT BORDEAUX",
    desc: "Bouteille 75cl — Grand vin rouge harmonieux, charpenté et rond en bouche",
    price: 20000,
    glassPrice: 4000,
    unit: "Bouteille 75cl",
    category: "vins-rouges",
    categoryName: "VINS ROUGES",
    image: "https://th.bing.com/th/id/R.d386b3ea33bcb0ee6f08b67731a16c60?rik=wODuTzK7BgBQnw&riu=http%3a%2f%2fwww.blackmarket.co.nz%2fcdn%2fshop%2ffiles%2fChateauPiedd_ArgentBellevueBordeauxNV_France_f0ab25d2-4221-4791-ab0c-d34cdc0b48e5.jpg%3fv%3d1753744613&ehk=AznY1UMV78q3olEpV2oE3Ry9mg0m5xMt5MEwB9%2bzAA8%3d&risl=&pid=ImgRaw&r=0",
    popular: true
  },
  {
    id: "vr-2",
    name: "CHÂTEAU LES GRAVES DE RAMBAUD",
    desc: "Bouteille 75cl — Notes intenses de fruits rouges mûrs, épices et tanins soyeux",
    price: 15000,
    glassPrice: 3500,
    unit: "Bouteille 75cl",
    category: "vins-rouges",
    categoryName: "VINS ROUGES",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "vr-3",
    name: "CHÂTEAU HAUTS MARCIEUX 2020",
    desc: "Bouteille 75cl — Robe rubis profond, grande élégance bordelaise et notes boisées",
    price: 25000,
    glassPrice: 5000,
    unit: "Bouteille 75cl",
    category: "vins-rouges",
    categoryName: "VINS ROUGES",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "vr-4",
    name: "SAINT-ÉMILION GRAND CRU RÉSERVE",
    desc: "Bouteille 75cl — Grand cru d'exception, tanins fondus et persistance aromatique remarquable",
    price: 45000,
    glassPrice: 8000,
    unit: "Bouteille 75cl",
    category: "vins-rouges",
    categoryName: "VINS ROUGES",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "vr-5",
    name: "BARON DE LESTAC BORDEAUX SUPÉRIEUR",
    desc: "Bouteille 75cl — Élevé en fûts de chêne, équilibré et expressif",
    price: 18000,
    glassPrice: 4000,
    unit: "Bouteille 75cl",
    category: "vins-rouges",
    categoryName: "VINS ROUGES",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "vr-6",
    name: "ROOIBERG PINOTAGE AFRIQUE DU SUD",
    desc: "Bouteille 75cl — Arômes de mûre sauvage, prune et subtiles touches de vanille",
    price: 18000,
    glassPrice: 4000,
    unit: "Bouteille 75cl",
    category: "vins-rouges",
    categoryName: "VINS ROUGES",
    image: "https://rooiberg.co.za/wp-content/uploads/2022/11/Sauv-Blanc-box-2.jpg"
  },

  // ================= VINS BLANCS ET MOELLEUX (BOUTEILLES & AU VERRE) =================
  {
    id: "vb-1",
    name: "CHÂTEAU PIQUES SEGUE BLANC MOELLEUX",
    desc: "Bouteille 75cl — Vin blanc moelleux doux et fruité d'exception aux arômes d'agrumes confits",
    price: 25000,
    glassPrice: 5000,
    unit: "Bouteille 75cl",
    category: "vins-blancs",
    categoryName: "VINS BLANCS ET MOELLEUX",
    image: "https://www.chateaupiquesegue.com/6-pdt_540/chateau-pique-segue-blanc-2019.jpg",
    popular: true
  },
  {
    id: "vb-2",
    name: "LES ORMES DE CAMBRAS SAUVIGNON",
    desc: "Bouteille 75cl — Fraîcheur vive, rondeur et délicatesse florale en bouche",
    price: 15000,
    glassPrice: 3500,
    unit: "Bouteille 75cl",
    category: "vins-blancs",
    categoryName: "VINS BLANCS ET MOELLEUX",
    image: "https://tse4.mm.bing.net/th/id/OIP.qSadiEtGp1Lu8_GAEy5P2QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "vb-3",
    name: "CHABLIS DOMAINE GRAND VIN BLANC",
    desc: "Bouteille 75cl — Pureté minérale, vivacité légendaire de Bourgogne",
    price: 40000,
    glassPrice: 7500,
    unit: "Bouteille 75cl",
    category: "vins-blancs",
    categoryName: "VINS BLANCS ET MOELLEUX",
    image: "https://tse1.mm.bing.net/th/id/OIP.C4Wvgbk1YmGEdHvEqba2VgHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "vb-4",
    name: "BARON D'ARIGNAC BLANC DOUX MOELLEUX",
    desc: "Bouteille 75cl — Vin blanc suave et gourmand aux arômes fruités",
    price: 12000,
    glassPrice: 3000,
    unit: "Bouteille 75cl",
    category: "vins-blancs",
    categoryName: "VINS BLANCS ET MOELLEUX",
    image: "https://tse4.mm.bing.net/th/id/OIP.RoJDRZWMnfME54KL_HKQ0QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: "vb-5",
    name: "CÔTES DE PROVENCE ROSÉ PRESTIGE",
    desc: "Bouteille 75cl — Robe pâle cristalline, notes de pêche blanche et de pamplemousse",
    price: 22000,
    glassPrice: 4500,
    unit: "Bouteille 75cl",
    category: "vins-blancs",
    categoryName: "VINS BLANCS ET MOELLEUX",
    image: "https://resources.vino.com/data/offertaFileFile/offertaFileFile-398023.jpg"
  },

  // ================= BIÈRES =================
  {
    id: "bi-1",
    name: "33 EXPORT",
    desc: "Bière blonde 65cl servie glacée",
    price: 2000,
    unit: "65cl",
    category: "bieres",
    categoryName: "BIÈRES",
    image: export33ImgUrl
  },
  {
    id: "bi-2",
    name: "KADJI BEER",
    desc: "Bière blonde camerounaise de tradition 65cl",
    price: 2000,
    unit: "65cl",
    category: "bieres",
    categoryName: "BIÈRES",
    image: kadjiBeerImgData,
    popular: true
  },
  {
    id: "bi-3",
    name: "BEAUFORT LAGER",
    desc: "Bière blonde premium raffinée 65cl",
    price: 2000,
    unit: "65cl",
    category: "bieres",
    categoryName: "BIÈRES",
    image: beaufortLagerImgUrl
  },
  {
    id: "bi-4",
    name: "CASTEL BEER",
    desc: "Bière blonde historique rafraîchissante 65cl",
    price: 2000,
    unit: "65cl",
    category: "bieres",
    categoryName: "BIÈRES",
    image: castelImg
  },
  {
    id: "bi-5",
    name: "BEAUFORT LIGHT",
    desc: "Légère et désaltérante 50cl",
    price: 2000,
    unit: "50cl",
    category: "bieres",
    categoryName: "BIÈRES",
    image: beaufortLightImgData
  },
  {
    id: "bi-6",
    name: "GUINNESS STOUT",
    desc: "Bière brune extra stout riche et crémeuse 65cl",
    price: 2500,
    unit: "65cl",
    category: "bieres",
    categoryName: "BIÈRES",
    image: guinnessStoutImg,
    popular: true
  },
  {
    id: "bi-7",
    name: "HEINEKEN",
    desc: "Bière blonde internationale pur malt 33cl",
    price: 2500,
    unit: "33cl",
    category: "bieres",
    categoryName: "BIÈRES",
    image: heinekenImg,
    popular: true
  },
  {
    id: "bi-8",
    name: "CORONA EXTRA",
    desc: "Servie avec tranche de citron vert frais 33cl",
    price: 3000,
    unit: "33cl",
    category: "bieres",
    categoryName: "BIÈRES",
    image: coronaImg
  },
  {
    id: "bi-9",
    name: "BOOSTER COLA",
    desc: "Boisson maltée alcoolisée aromatisée 65cl",
    price: 2000,
    unit: "65cl",
    category: "bieres",
    categoryName: "BIÈRES",
    image: boosterColaImgUrl
  },
  {
    id: "bi-10",
    name: "MALTA GUINNESS",
    desc: "Boisson maltée sans alcool enrichie en vitamines 33cl",
    price: 1500,
    unit: "33cl",
    category: "bieres",
    categoryName: "BIÈRES",
    image: maltaGuinnessImg
  },

  // ================= COCKTAILS =================
  {
    id: "ck-1",
    name: "MOJITO ROYAL KRIBI",
    desc: "Rhum blanc, menthe fraîche, citron vert pressé, sucre de canne et trait d'eau pétillante",
    price: 6000,
    category: "cocktails",
    categoryName: "COCKTAILS",
    image: "https://tse2.mm.bing.net/th/id/OIP.uq3j7LxhlmrzU4LuobJ4EgHaEc?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    popular: true
  },
  {
    id: "ck-2",
    name: "PIÑA COLADA TROPICALE",
    desc: "Rhum ambré, pur jus d'ananas frais de Kribi et crème de noix de coco onctueuse",
    price: 7000,
    category: "cocktails",
    categoryName: "COCKTAILS",
    image: "https://premiumcookingrecipes.com/storage/2024/11/study_of_past_events.jpg",
    popular: true
  },
  {
    id: "ck-3",
    name: "SEX ON THE BEACH",
    desc: "Vodka, liqueur de pêche, jus d'orange frais et jus de canneberge",
    price: 7000,
    category: "cocktails",
    categoryName: "COCKTAILS",
    image: "https://hips.hearstapps.com/hmg-prod/images/sex-on-the-beach-vertical-6441a9dbe3bd2.jpg?crop=0.835xw:1.00xh;0.107xw,0&resize=980:*"
  },
  {
    id: "ck-4",
    name: "VIRGIN MOJITO (SANS ALCOOL)",
    desc: "Menthe fraîche pilée, quartier de citron vert, sucre roux et soda pétillant glacé",
    price: 5000,
    category: "cocktails",
    categoryName: "COCKTAILS",
    image: "https://tse2.mm.bing.net/th/id/OIP.gyQ0PpBGnhuVwHFb5lfXEAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  }
];
