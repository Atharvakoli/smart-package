"use client";
import { useState, useEffect } from "react";
import { mockClothingData } from "./data";
import Image from "next/image";
import Photos from "./Photos";

export default function ClothesRecommendation({
  photosDetails,
  setPhotosDetails,
  loading,
  errors,
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userPreferencesDetails = JSON.parse(
        localStorage.getItem("user-preferences")
      );
      setPhotosDetails(userPreferencesDetails);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">
        Recommended Clothes
      </h2>
      <p className="mb-4 text-purple-600">
        Based on your preferences and travel
      </p>
      {loading ? (
        <p className="mb-4 text-purple-600">Loading...</p>
      ) : (
        <Photos photosData={photosDetails?.photos} errors={errors} />
      )}
    </div>
  );
}
