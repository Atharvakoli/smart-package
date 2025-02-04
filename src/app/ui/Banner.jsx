"use client";
import React from "react";

const Banner = () => {
  return (
    <section className="py-16 text-purple-400 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-purple-600">
            Create Your Perfect Packing List with SmartPack
          </h1>
          <p className="text-lg text-purple-500">
            Get personalized packing suggestions based on weather, activities,
            and your preferences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
