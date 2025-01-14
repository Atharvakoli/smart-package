export const testimonials = [
  {
    id: 1,
    name: "Sarah Parker",
    role: "Travel Blogger",
    content:
      "SmartPack transformed the way I pack! No more overpacking or forgetting essentials.",
    avatar: "https://avatar.iran.liara.run/public/girl",
  },
  {
    id: 2,
    name: "Michael Johnson",
    role: "Business Traveler",
    content:
      "A game-changer for frequent travelers. The weather integration is incredibly accurate.",
    avatar: "https://avatar.iran.liara.run/public/47",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Adventure Seeker",
    content:
      "The activity-based suggestions are spot-on. Perfect for planning outdoor trips!",
    avatar: "https://avatar.iran.liara.run/public/boy",
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
    title: "Clothes based on Suggestions",
    description: "Smart recommendations based on weather and activities.",
    icon: "ShoppingBag",
    route: "/suggested-clothes",
  },
  {
    id: 4,
    title: "Dynamic Packing List",
    description: "Personalized lists that adapt to your travel needs.",
    icon: "CheckSquare",
    route: "/dynamic-packing-list",
  },
];
export const mockClothingData = [
  {
    name: "T-Shirt",
    category: "Tops",
    imageUrl: "/t-shirt.jpg",
  },
  {
    name: "Jeans",
    category: "Bottoms",
    imageUrl: "/jeans.jpg",
  },
  {
    name: "Sneakers",
    category: "Footwear",
    imageUrl: "/sneakers.jpg",
  },
  {
    name: "Jacket",
    category: "Outerwear",
    imageUrl: "/jacket.jpg",
  },
  {
    name: "Dress",
    category: "Dresses",
    imageUrl: "/Dress.jpg",
  },
  {
    name: "Swimsuit",
    category: "Swimwear",
    imageUrl: "/Swimsuit.jpg",
  },
  {
    name: "Hiking Boots",
    category: "Footwear",
    imageUrl: "/Hiking Boots.jpg",
  },
  {
    name: "Scarf",
    category: "Accessories",
    imageUrl: "/scarf.jpg",
  },
];

export function getClothingSuggestions(weatherData, activityType) {
  const suggestions = [];

  if (weatherData.avgtemp_c < 5) {
    suggestions.push("Thermal underwear", "Base layer leggings", "Wool socks");
  } else if (weatherData.avgtemp_c < 10) {
    suggestions.push("Long-sleeved thermal top", "Light base layer");
  }

  if (weatherData.avgtemp_c < 0) {
    suggestions.push(
      "Puffer jacket",
      "Heavy winter coat",
      "Fleece-lined pants"
    );
  } else if (weatherData.avgtemp_c < 5) {
    suggestions.push(
      "Insulated jacket",
      "Thick sweater",
      "Water-resistant pants"
    );
  } else if (weatherData.avgtemp_c < 15) {
    suggestions.push("Light jacket or blazer", "Cardigan", "Jeans or chinos");
  } else {
    suggestions.push(
      "Short-sleeved shirt or blouse",
      "Breathable cotton trousers",
      "Comfortable shorts"
    );
  }

  if (weatherData.avgtemp_c < 0) {
    suggestions.push("Insulated boots", "Waterproof winter boots");
  } else if (weatherData.avgtemp_c < 10) {
    suggestions.push("Ankle boots", "Water-resistant sneakers");
  } else {
    suggestions.push("Light sneakers", "Sandals (if warm and dry)");
  }

  if (weatherData.avgtemp_c < 5) {
    suggestions.push(
      "Thick scarf",
      "Wool gloves",
      "Ear muffs",
      "Thermal beanie"
    );
  } else if (weatherData.avgtemp_c < 15) {
    suggestions.push("Light scarf", "Knit hat");
  }

  if (weatherData.condition.text.toLowerCase().includes("rain")) {
    suggestions.push(
      "Compact umbrella",
      "Waterproof jacket",
      "Rain boots",
      "Waterproof backpack cover"
    );
  }

  if (weatherData.condition.text.toLowerCase().includes("snow")) {
    suggestions.push(
      "Snow boots",
      "Insulated gloves",
      "Windproof jacket",
      "Snow goggles (for heavy snowfall)"
    );
  }

  if (weatherData.condition.text.toLowerCase().includes("sunny")) {
    suggestions.push("Sunglasses", "Wide-brimmed hat", "Sunscreen");
  }

  if (activityType === "business") {
    suggestions.push(
      "Business suits",
      "Dress shirts",
      "Ties or scarves",
      "Polished dress shoes",
      "Business cards",
      "Laptop bag or briefcase",
      "Formal outerwear"
    );
  } else if (activityType === "hiking") {
    suggestions.push(
      "Hiking boots",
      "Moisture-wicking socks",
      "Quick-dry clothing",
      "Lightweight jacket",
      "Backpack",
      "Water bottle"
    );
  } else if (activityType === "beach") {
    suggestions.push(
      "Swimwear",
      "Flip-flops",
      "Beach towel",
      "Sunglasses",
      "Sunscreen",
      "Light cover-up or sarong"
    );
  } else if (activityType === "casual") {
    suggestions.push(
      "Comfortable jeans or trousers",
      "Casual sneakers",
      "Graphic t-shirt or polo shirt",
      "Light hoodie or cardigan"
    );
  }

  return suggestions;
}
