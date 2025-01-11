"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";

type WeatherData = {
  avgtemp_c: number;
  condition: {
    text: string;
  };
};

type ClothingSuggestion = {
  name: string;
  imageUrl: string;
};

function getClothingSuggestions(weatherData: WeatherData): string[] {
  const suggestions: string[] = [];

  if (weatherData?.avgtemp_c < 5) {
    suggestions.push("Thermal underwear", "Base layer leggings", "Wool socks");
  } else if (weatherData?.avgtemp_c < 10) {
    suggestions.push("Long-sleeved thermal top", "Light base layer");
  }

  if (weatherData?.avgtemp_c < 0) {
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
  } else if (weatherData?.avgtemp_c < 15) {
    suggestions.push("Light jacket or blazer", "Cardigan", "Jeans or chinos");
  } else {
    suggestions.push(
      "Short-sleeved shirt or blouse",
      "Breathable cotton trousers",
      "Comfortable shorts"
    );
  }

  if (weatherData?.avgtemp_c < 0) {
    suggestions.push("Insulated boots", "Waterproof winter boots");
  } else if (weatherData?.avgtemp_c < 10) {
    suggestions.push("Ankle boots", "Water-resistant sneakers");
  } else {
    suggestions.push("Light sneakers", "Sandals (if warm and dry)");
  }

  if (weatherData?.avgtemp_c < 5) {
    suggestions.push(
      "Thick scarf",
      "Wool gloves",
      "Ear muffs",
      "Thermal beanie"
    );
  } else if (weatherData?.avgtemp_c < 15) {
    suggestions.push("Light scarf", "Knit hat");
  }

  if (weatherData?.condition?.text.toLowerCase().includes("rain")) {
    suggestions.push(
      "Compact umbrella",
      "Waterproof jacket",
      "Rain boots",
      "Waterproof backpack cover"
    );
  }

  if (weatherData?.condition?.text.toLowerCase().includes("snow")) {
    suggestions.push(
      "Snow boots",
      "Insulated gloves",
      "Windproof jacket",
      "Snow goggles (for heavy snowfall)"
    );
  }

  if (weatherData?.condition?.text.toLowerCase().includes("sunny")) {
    suggestions.push("Sunglasses", "Wide-brimmed hat", "Sunscreen");
  }

  if (weatherData?.activity === "business") {
    suggestions.push(
      "Business suits",
      "Dress shirts",
      "Ties or scarves",
      "Polished dress shoes",
      "Business cards",
      "Laptop bag or briefcase",
      "Formal outerwear"
    );
  } else if (weatherData?.activity === "hiking") {
    suggestions.push(
      "Hiking boots",
      "Moisture-wicking socks",
      "Quick-dry clothing",
      "Lightweight jacket",
      "Backpack",
      "Water bottle"
    );
  } else if (weatherData?.activity === "beach") {
    suggestions.push(
      "Swimwear",
      "Flip-flops",
      "Beach towel",
      "Sunglasses",
      "Sunscreen",
      "Light cover-up or sarong"
    );
  } else if (weatherData?.activity === "casual") {
    suggestions.push(
      "Comfortable jeans or trousers",
      "Casual sneakers",
      "Graphic t-shirt or polo shirt",
      "Light hoodie or cardigan"
    );
  }

  return suggestions;
}

function getImageUrl(item: string): string {
  return `https://via.placeholder.com/150?text=${encodeURIComponent(item)}`;
}

export default function ClothingSuggestions() {
  const [suggestions, setSuggestions] = useState<ClothingSuggestion[]>([]);
  const searchParams = useSearchParams();
  const weatherData = searchParams?.data
    ? JSON.parse(searchParams?.data)
    : null;

  useEffect(() => {
    const clothingSuggestions = getClothingSuggestions(weatherData);
    const suggestionsWithImages = clothingSuggestions.map((item) => ({
      name: item,
      imageUrl: getImageUrl(item),
    }));
    setSuggestions(suggestionsWithImages);
  }, [weatherData]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
        Clothing Suggestions
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={item.imageUrl}
              width={200}
              height={200}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
