// Mock users data
export const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@amaris.com",
    role: "admin",
    active: true,
  },
  {
    id: 2,
    name: "Sales Manager",
    email: "sales@amaris.com",
    role: "sales",
    active: true,
  },
  {
    id: 3,
    name: "CEO",
    email: "ceo@amaris.com",
    role: "executive",
    active: true,
  },
  {
    id: 4,
    name: "Sales Representative",
    email: "rep1@amaris.com",
    role: "sales",
    active: true,
  },
  {
    id: 5,
    name: "Former Employee",
    email: "former@amaris.com",
    role: "sales",
    active: false,
  },
];

// Mock orders data
export const mockOrders = [
  {
    id: 1001,
    date: "2023-05-15T10:30:00",
    customerName: "John Smith",
    customerEmail: "john@constructionco.com",
    customerPhone: "+1 (555) 123-4567",
    company: "Construction Co Ltd",
    items: [
      {
        id: "gen-001",
        name: "PowerMax 500kW Generator",
        category: "generators",
        image: "/images/generator-1.jpg",
        priceRange: "$75,000 - $95,000"
      },
      {
        id: "exc-001",
        name: "EarthMover X450 Excavator",
        category: "excavators",
        image: "/images/excavator-1.jpg",
        priceRange: "$380,000 - $450,000"
      }
    ],
    total: 525000,
    status: "completed",
    message: "Need these items delivered to our main construction site by the end of the month."
  },
  {
    id: 1002,
    date: "2023-06-02T14:15:00",
    customerName: "Sarah Johnson",
    customerEmail: "sarah@miningops.com",
    customerPhone: "+1 (555) 987-6543",
    company: "Mining Operations Inc",
    items: [
      {
        id: "drl-001",
        name: "DeepCore D750 Drilling Rig",
        category: "drilling",
        image: "/images/drilling-1.jpg",
        priceRange: "$1,200,000 - $1,500,000"
      }
    ],
    total: 1350000,
    status: "processing",
    message: "Looking for financing options for this purchase."
  },
  {
    id: 1003,
    date: "2023-06-10T09:45:00",
    customerName: "Michael Brown",
    customerEmail: "michael@buildright.com",
    customerPhone: "+1 (555) 456-7890",
    company: "BuildRight Construction",
    items: [
      {
        id: "ldr-002",
        name: "SkidMaster S200 Skid Steer Loader",
        category: "loaders",
        image: "/images/loader-2.jpg",
        priceRange: "$45,000 - $65,000"
      }
    ],
    total: 55000,
    status: "pending",
    message: "Need more information about warranty and service plans."
  },
  {
    id: 1004,
    date: "2023-06-15T11:20:00",
    customerName: "Emily Davis",
    customerEmail: "emily@factoryplus.com",
    customerPhone: "+1 (555) 234-5678",
    company: "Factory Plus Manufacturing",
    items: [
      {
        id: "gen-002",
        name: "MobilePower 100kW Generator",
        category: "generators",
        image: "/images/generator-2.jpg",
        priceRange: "$35,000 - $45,000"
      }
    ],
    total: 40000,
    status: "completed",
    message: "This is a repeat order. Please use the same delivery instructions as last time."
  },
  {
    id: 1005,
    date: "2023-06-20T15:30:00",
    customerName: "Robert Wilson",
    customerEmail: "robert@cityworks.gov",
    customerPhone: "+1 (555) 345-6789",
    company: "City Works Department",
    items: [
      {
        id: "exc-002",
        name: "CompactDig X80 Mini Excavator",
        category: "excavators",
        image: "/images/excavator-2.jpg",
        priceRange: "$85,000 - $110,000"
      },
      {
        id: "ldr-001",
        name: "FrontLoad Pro 950 Wheel Loader",
        category: "loaders",
        image: "/images/loader-1.jpg",
        priceRange: "$220,000 - $260,000"
      }
    ],
    total: 350000,
    status: "cancelled",
    message: "This order is part of our Q2 equipment upgrade project."
  },
  {
    id: 1006,
    date: "2023-06-25T10:00:00",
    customerName: "Jennifer Lee",
    customerEmail: "jennifer@harborconstruction.com",
    customerPhone: "+1 (555) 567-8901",
    company: "Harbor Construction",
    items: [
      {
        id: "crn-001",
        name: "SkyLift T120 Mobile Crane",
        category: "cranes",
        image: "/images/crane-1.jpg",
        priceRange: "$850,000 - $1,200,000"
      }
    ],
    total: 975000,
    status: "processing",
    message: "We need this crane for our harbor expansion project starting next month."
  }
];