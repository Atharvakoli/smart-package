"use client";

import { useState, useEffect } from "react";
import { mockClothingData } from "./data";
import Image from "next/image";

type ClothingItem = {
  name: string;
  category: string;
  imageUrl: string;
};

type UserPreferences = {
  home_city: string;
  activity_preferences: {
    outdoor: string[];
    indoor: string[];
    seasonal: string[];
  };
  travel_history: {
    destination: string;
    start_date: string;
    end_date: string;
    purpose: string;
  }[];
};

export default function ClothesRecommendation({ userPreferences}) {
  const [recommendedClothes, setRecommendedClothes] = useState<ClothingItem[]>(
    []
  );

  useEffect(() => {
    if (userPreferences) {
      const recommendations: ClothingItem[] = [];

      if (userPreferences?.activity_preferences?.outdoor?.length > 0) {
        recommendations.push(
          mockClothingData.find((item) => item.name === "Hiking Boots")!
        );
      }

      if (userPreferences?.activity_preferences?.indoor?.includes("meditation")) {
        recommendations.push(
          mockClothingData.find((item) => item.name === "T-Shirt")!
        );
      }

      if (
        userPreferences?.travel_history?.some(
          (trip) => new Date(trip.start_date) > new Date("2023-06-01")
        )
      ) {
        recommendations.push(
          mockClothingData.find((item) => item.name === "Swimsuit")!
        );
      }
      recommendations.push(
        mockClothingData.find((item) => item.name === "Jeans")!
      );
      recommendations.push(
        mockClothingData.find((item) => item.name === "Jacket")!
      );

      setRecommendedClothes(recommendations);
    }
  }, [userPreferences]);

  if (!userPreferences) {
    return (
      <div className="text-center text-gray-600">Loading preferences...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">
        Recommended Clothes
      </h2>
      <p className="mb-4 text-gray-600">
        Based on your preferences and travel history
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendedClothes.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 flex flex-col items-center"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              className="w-32 h-32 object-cover mb-2 rounded"
              width={50}
              height={50}
            />
            <h3 className="font-semibold text-purple-700">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
