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
    route: "/trips/clothing-suggestions",
  },
  {
    id: 4,
    title: "Dynamic Packing List",
    description: "Personalized lists that adapt to your travel needs.",
    icon: "CheckSquare",
    route: "/dynamic-packing-list",
  },
];

interface WeatherData {
  avgtemp_c: number;
  condition: {
    text: string;
  };
}

export function getClothingSuggestions(
  weatherData: WeatherData,
  activityType: string
): string[] {
  const suggestions: string[] = [];

  // Base layers
  if (weatherData.avgtemp_c < 10) {
    suggestions.push("Thermal underwear");
  }

  // Main clothing
  if (weatherData.avgtemp_c < 5) {
    suggestions.push("Heavy winter coat");
    suggestions.push("Warm sweater");
  } else if (weatherData.avgtemp_c < 15) {
    suggestions.push("Light jacket or blazer");
    suggestions.push("Long-sleeved shirt");
  } else {
    suggestions.push("Light shirt or blouse");
  }

  suggestions.push("Comfortable business trousers or skirt");

  // Footwear
  suggestions.push("Comfortable dress shoes");

  // Accessories
  if (weatherData.avgtemp_c < 10) {
    suggestions.push("Warm scarf");
    suggestions.push("Gloves");
    suggestions.push("Warm hat");
  }

  if (weatherData.condition.text.toLowerCase().includes("rain")) {
    suggestions.push("Umbrella");
    suggestions.push("Waterproof jacket");
  }

  // Business-specific items
  if (activityType === "business") {
    suggestions.push("Business suits");
    suggestions.push("Dress shirts");
    suggestions.push("Ties");
    suggestions.push("Business cards");
    suggestions.push("Laptop bag or briefcase");
  }

  return suggestions;
}
