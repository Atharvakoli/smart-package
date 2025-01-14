"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

function getClothingSuggestions(weatherData) {
  const suggestions = [];

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
  } else if (weatherData?.avgtemp_c < 5) {
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

function getImageUrl(item) {
  return `https://placehold.co/200x200/png?text=${encodeURIComponent(item)}`;
}

export default function ClothingSuggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = () => {
      const weatherDataString = localStorage.getItem("displayed_data");
      if (weatherDataString) {
        try {
          const weatherData = JSON.parse(weatherDataString);
          const clothingSuggestions = getClothingSuggestions(weatherData);
          const suggestionsWithImages = clothingSuggestions.map((item) => ({
            name: item,
            imageUrl: getImageUrl(item),
          }));
          setSuggestions(suggestionsWithImages);
        } catch (error) {
          console.error("Error parsing weather data:", error);
        }
      }
    };

    fetchSuggestions();

    window.addEventListener("storage", fetchSuggestions);

    return () => {
      window.removeEventListener("storage", fetchSuggestions);
    };
  }, []);

  if (suggestions.length === 0) {
    return (
      <div className="text-center p-6">No clothing suggestions available.</div>
    );
  }

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
            <div className="relative w-full h-40">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
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
