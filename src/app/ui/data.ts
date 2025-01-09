export const testimonials = [
  {
    id: 1,
    name: "Sarah Parker",
    role: "Travel Blogger",
    content:
      "SmartPack transformed the way I pack! No more overpacking or forgetting essentials.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Michael Johnson",
    role: "Business Traveler",
    content:
      "A game-changer for frequent travelers. The weather integration is incredibly accurate.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Adventure Seeker",
    content:
      "The activity-based suggestions are spot-on. Perfect for planning outdoor trips!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export const features = [
  {
    id: 1,
    title: "Input Form",
    description:
      "Easy-to-use form for travel details, preferences, and trip specifications.",
    icon: "ClipboardList",
    route: "/add-trip",
  },
  {
    id: 2,
    title: "Weather Data Integration",
    description:
      "Real-time weather forecasts for accurate packing suggestions.",
    icon: "Cloud",
    route: "/weather-data",
  },
  {
    id: 3,
    title: "Clothing Suggestion Engine",
    description: "Smart recommendations based on weather and activities.",
    icon: "ShoppingBag",
    route: "/clothing-suggestions",
  },
  {
    id: 4,
    title: "Dynamic Packing List",
    description: "Personalized lists that adapt to your travel needs.",
    icon: "CheckSquare",
    route: "/dynamic-packing-list",
  },
];

export type WeatherData = {
  location: string;
  dates: string[];
  forecasts: {
    date: string;
    temp: number;
    condition: string;
  }[];
};

export const sampleWeatherData: WeatherData = {
  location: "New York, NY",
  dates: ["2024-02-01", "2024-02-07"],
  forecasts: [
    { date: "2024-02-01", temp: 72, condition: "Sunny" },
    { date: "2024-02-02", temp: 68, condition: "Partly Cloudy" },
    { date: "2024-02-03", temp: 65, condition: "Rain" },
    { date: "2024-02-04", temp: 70, condition: "Sunny" },
    { date: "2024-02-05", temp: 73, condition: "Clear" },
    { date: "2024-02-06", temp: 71, condition: "Partly Cloudy" },
    { date: "2024-02-07", temp: 69, condition: "Cloudy" },
  ],
};
