"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth-context/AuthContext";

const Banner = () => {
  const { state } = useAuth();
  const [access_token, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  console.log(state?.user);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (state.user?.message || state.user?.error) {
      setMessage(state.user?.message || state.user?.error);
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.user?.message, state.user?.error]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const access_token = sessionStorage.getItem("access_token");
      const storedUser = localStorage.getItem("user");
      setUser(JSON.parse(storedUser));
      setAccessToken(access_token);
    }
  }, []);

  return (
    <section className="py-16 text-purple-400 relative">
      {showMessage && (
        <div className="absolute top-0 left-0 right-0 bg-purple-900 text-white p-2 text-center transition-opacity duration-500 ease-in-out">
          {message}
        </div>
      )}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-purple-600">
            <strong className="text-4xl sm:text-5xl text-purple-900">
              {user?.user?.name || access_token
                ? user?.user?.name.toUpperCase() + ", "
                : ""}
            </strong>
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
