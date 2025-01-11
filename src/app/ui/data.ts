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
    imageUrl:
      "https://ih1.redbubble.net/image.3945097984.9485/ssrco,classic_tee,mens,101010:01c5ca27c6,front_alt,square_product,600x600.jpg",
  },
  {
    name: "Jeans",
    category: "Bottoms",
    imageUrl:
      "https://ih1.redbubble.net/image.929488109.7111/leggings,m,x540,front-pad,600x600,f8f8f8.u1.jpg",
  },
  {
    name: "Sneakers",
    category: "Footwear",
    imageUrl:
      "https://ih1.redbubble.net/image.1423979471.9899/st,small,507x507-pad,600x600,f8f8f8.jpg",
  },
  {
    name: "Jacket",
    category: "Outerwear",
    imageUrl:
      "https://ih1.redbubble.net/image.3130792598.0368/st,small,507x507-pad,600x600,f8f8f8.jpg",
  },
  {
    name: "Dress",
    category: "Dresses",
    imageUrl:
      "https://ih1.redbubble.net/image.848005003.4718/aldr,x1440,front-c,168,326,600,600-bg,f8f8f8.jpg",
  },
  {
    name: "Swimsuit",
    category: "Swimwear",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSjAuZEpJZZ0f93_vL2uCAvbedQvB0R-wMcOCF6ALfHcLHAryeP6_hkQCIpPzecHTsRW40ewVb5G-DkAHRT4mYpzGLI3pddTFurFA0nDjHN&usqp=CAE",
  },
  {
    name: "Hiking Boots",
    category: "Footwear",
    imageUrl:
      "https://cdn.runrepeat.com/storage/gallery/buying_guide_primary/43/best-lightweight-hiking-boots-20020534-main.jpg",
  },
  {
    name: "Scarf",
    category: "Accessories",
    imageUrl:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTwFWcsc7fKEOGMCJ2nS6tRUM6pOveIvFD6arLFyAwymap-iqKFzRMGwQ1mAKRWXD4tVURnz0U6kBLV-NejTYugR5fIP-3mcA&usqp=CAE",
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
