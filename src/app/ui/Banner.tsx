"use client";
import React from "react";
import { useAuth } from "../auth-context/AuthContext";

const Banner = () => {
  const { state } = useAuth();
  const access_token = sessionStorage.getItem("access_token");

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <section className="py-16 text-purple-400 relative">
      <h1
        className={`absolute bottom-100 bg-purple-400 text-white p-2 rounded-lg ${
          state.user?.message || state.user?.error ? "block" : "hidden"
        }`}
      >
        {state.user?.message && state.user?.message}
        {state.user?.error && state.user?.error}
      </h1>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-purple-600">
            <strong className="text-4xl sm:text-5xl text-purple-900">
              {user?.user?.name && access_token
                ? user?.user?.name.toUpperCase() + ", "
                : ""}
            </strong>
            Create Your Perfect Packing List with SmartPack
          </h1>
          <p className="text-lg text-purple-400">
            Get personalized packing suggestions based on weather, activities,
            and your preferences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
