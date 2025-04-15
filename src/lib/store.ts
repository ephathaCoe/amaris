import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Product = {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  specifications: Record<string, string | number>;
  features: string[];
  applications: string[];
  images: string[];
  priceRange: string;
};

type QuoteStore = {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearItems: () => void;
  isInQuote: (productId: string) => boolean;
};

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const isAlreadyInQuote = get().isInQuote(product.id);
        if (!isAlreadyInQuote) {
          set((state) => ({ items: [...state.items, product] }));
        }
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      clearItems: () => set({ items: [] }),
      isInQuote: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: 'quote-storage',
    }
  )
);

// Mock data for products
export const products: Product[] = [
  {
    id: "gen-001",
    name: "PowerMax 500kW Generator",
    category: "generators",
    subcategory: "industrial",
    description: "High-capacity industrial generator suitable for manufacturing facilities and large construction sites. Provides reliable power in the most demanding environments.",
    specifications: {
      power: "500kW",
      fuel: "Diesel",
      runtime: "72 hours",
      noise: "75dB",
      dimensions: "4.5m x 2.2m x 2.5m",
      weight: "8500kg"
    },
    features: [
      "Auto start/stop functionality",
      "Remote monitoring capability",
      "Weatherproof enclosure",
      "Low fuel consumption",
      "Advanced control panel"
    ],
    applications: [
      "Manufacturing facilities",
      "Construction sites",
      "Mining operations",
      "Emergency backup power"
    ],
    images: ["/images/generator-1.jpg", "/images/generator-1-alt.jpg"],
    priceRange: "$75,000 - $95,000"
  },
  {
    id: "exc-001",
    name: "EarthMover X450 Excavator",
    category: "excavators",
    subcategory: "heavy",
    description: "Powerful tracked excavator designed for the toughest digging and earthmoving tasks. Combines power with precision control.",
    specifications: {
      operatingWeight: "45000kg",
      enginePower: "290kW",
      bucketCapacity: "2.5m³",
      digDepth: "7.8m",
      breakoutForce: "265kN",
      dimensions: "11.2m x 3.4m x 3.7m"
    },
    features: [
      "Advanced hydraulic system",
      "Climate-controlled cabin",
      "360° camera system",
      "GPS positioning",
      "Eco mode for fuel efficiency"
    ],
    applications: [
      "Mining operations",
      "Heavy construction",
      "Demolition",
      "Land clearing"
    ],
    images: ["/images/excavator-1.jpg", "/images/excavator-1-alt.jpg"],
    priceRange: "$380,000 - $450,000"
  },
  {
    id: "ldr-001",
    name: "FrontLoad Pro 950 Wheel Loader",
    category: "loaders",
    subcategory: "wheel",
    description: "Versatile wheel loader with excellent maneuverability and lifting capacity. Perfect for material handling in construction and industrial settings.",
    specifications: {
      operatingWeight: "18500kg",
      enginePower: "195kW",
      bucketCapacity: "3.5m³",
      liftingCapacity: "5800kg",
      breakoutForce: "175kN",
      dimensions: "8.1m x 3.0m x 3.4m"
    },
    features: [
      "Articulated steering",
      "Hydrostatic transmission",
      "Quick-attach system",
      "Ride control system",
      "Ergonomic operator station"
    ],
    applications: [
      "Construction sites",
      "Quarries",
      "Recycling centers",
      "Snow removal"
    ],
    images: ["/images/loader-1.jpg", "/images/loader-1-alt.jpg"],
    priceRange: "$220,000 - $260,000"
  },
  {
    id: "crn-001",
    name: "SkyLift T120 Mobile Crane",
    category: "cranes",
    subcategory: "mobile",
    description: "Telescopic mobile crane with exceptional lifting capacity and reach. Designed for versatility across multiple job sites.",
    specifications: {
      liftingCapacity: "120 tonnes",
      maxReach: "60m",
      enginePower: "350kW",
      counterweight: "40 tonnes",
      transportDimensions: "14.5m x 3m x 4m",
      operatingWeight: "60000kg"
    },
    features: [
      "Telescopic boom",
      "All-terrain capability",
      "Computerized load management",
      "Outrigger monitoring",
      "Wind speed sensors"
    ],
    applications: [
      "Construction of tall structures",
      "Bridge installation",
      "Industrial maintenance",
      "Port operations"
    ],
    images: ["/images/crane-1.jpg", "/images/crane-1-alt.jpg"],
    priceRange: "$850,000 - $1,200,000"
  },
  {
    id: "drl-001",
    name: "DeepCore D750 Drilling Rig",
    category: "drilling",
    subcategory: "rotary",
    description: "High-performance rotary drilling rig for deep foundation work and mineral exploration. Combines power with advanced drilling technology.",
    specifications: {
      drillDepth: "750m",
      enginePower: "420kW",
      torque: "120kNm",
      pullback: "350kN",
      dimensions: "12m x 3.2m x 18m (erected)",
      weight: "65000kg"
    },
    features: [
      "Automated pipe handling",
      "Advanced control system",
      "Noise reduction technology",
      "Self-erecting mast",
      "Data logging capabilities"
    ],
    applications: [
      "Mineral exploration",
      "Water well drilling",
      "Geothermal installations",
      "Foundation work"
    ],
    images: ["/images/drilling-1.jpg", "/images/drilling-1-alt.jpg"],
    priceRange: "$1,200,000 - $1,500,000"
  },
  {
    id: "gen-002",
    name: "MobilePower 100kW Generator",
    category: "generators",
    subcategory: "portable",
    description: "Compact yet powerful generator designed for mobility and reliability in medium-sized construction projects and events.",
    specifications: {
      power: "100kW",
      fuel: "Diesel",
      runtime: "24 hours",
      noise: "68dB",
      dimensions: "2.8m x 1.2m x 1.8m",
      weight: "2200kg"
    },
    features: [
      "Trailer-mounted design",
      "Sound-attenuated enclosure",
      "Digital control panel",
      "Automatic voltage regulation",
      "Fuel efficiency system"
    ],
    applications: [
      "Construction sites",
      "Outdoor events",
      "Temporary facilities",
      "Backup power for small businesses"
    ],
    images: ["/images/generator-2.jpg", "/images/generator-2-alt.jpg"],
    priceRange: "$35,000 - $45,000"
  },
  {
    id: "exc-002",
    name: "CompactDig X80 Mini Excavator",
    category: "excavators",
    subcategory: "compact",
    description: "Versatile mini excavator perfect for urban construction, landscaping, and utility work in confined spaces.",
    specifications: {
      operatingWeight: "8000kg",
      enginePower: "45kW",
      bucketCapacity: "0.3m³",
      digDepth: "3.8m",
      breakoutForce: "65kN",
      dimensions: "5.6m x 2.3m x 2.5m"
    },
    features: [
      "Zero tail swing",
      "Expandable undercarriage",
      "Proportional auxiliary hydraulics",
      "Comfortable operator station",
      "Quick coupler system"
    ],
    applications: [
      "Urban construction",
      "Landscaping",
      "Utility installation",
      "Indoor demolition"
    ],
    images: ["/images/excavator-2.jpg", "/images/excavator-2-alt.jpg"],
    priceRange: "$85,000 - $110,000"
  },
  {
    id: "ldr-002",
    name: "SkidMaster S200 Skid Steer Loader",
    category: "loaders",
    subcategory: "skid",
    description: "Agile and powerful skid steer loader with excellent maneuverability and a wide range of attachment compatibility.",
    specifications: {
      operatingWeight: "3500kg",
      enginePower: "55kW",
      ratedCapacity: "900kg",
      tippingLoad: "1800kg",
      hydraulicFlow: "90 L/min",
      dimensions: "3.4m x 1.7m x 2.0m"
    },
    features: [
      "Vertical lift path",
      "High-flow hydraulics option",
      "Pressurized cab with AC",
      "Self-leveling bucket",
      "Ride control system"
    ],
    applications: [
      "Construction cleanup",
      "Material handling",
      "Landscaping",
      "Snow removal"
    ],
    images: ["/images/loader-2.jpg", "/images/loader-2-alt.jpg"],
    priceRange: "$45,000 - $65,000"
  }
];

// Helper function to get products by category
export const getProductsByCategory = (category: string | null) => {
  if (!category) return products;
  return products.filter(product => product.category === category);
};

// Helper function to get a product by ID
export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

// Get all available categories
export const getCategories = () => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};