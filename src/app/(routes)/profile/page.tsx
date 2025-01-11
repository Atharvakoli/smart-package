"use client";
import { useAuth } from "@/app/auth-context/AuthContext";
import Image from "next/image";
import React from "react";

const Profile = () => {
  const { state, logout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?.id || state?.user?.id;

  const handleLogOut = async () => {
    try {
      await logout(userId);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-purple-600">Your Profile</h2>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Profile"
              className="w-32 h-32 rounded-full mr-6"
              height={50}
              width={50}
            />
            <div>
              <h3 className="text-2xl font-semibold text-purple-600">John Doe</h3>
              <p className="text-purple-600">Smart Pack Customer</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-purple-600">
                Personal Information
              </h4>
              <p className="text-purple-700">
                <span className="font-medium">Email:</span> john.doe@example.com
              </p>
              <p className="text-purple-700">
                <span className="font-medium">Phone:</span> +1 (555) 123-4567
              </p>
              <p className="text-purple-700">
                <span className="font-medium">Location:</span> New York, USA
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-purple-600">
                Account Details
              </h4>
              <p className="text-purple-700">
                <span className="font-medium">Member Since:</span> January 2022
              </p>
              <p className="text-purple-700">
                <span className="font-medium">Plan:</span> Premium
              </p>
              <p className="text-purple-700">
                <span className="font-medium">Last Order:</span> #12345 (May 15,
                2023)
              </p>
            </div>
          </div>
          <div className="mt-6 text-purple-600">
            <h4 className="text-lg font-semibold mb-2">Recent Activity</h4>
            <ul className="list-disc list-inside text-pupurple-700">
              <li>Updated shipping address (2 days ago)</li>
              <li>Placed order #12345 (1 week ago)</li>
              <li>Changed password (2 weeks ago)</li>
            </ul>
          </div>
          <div className="mt-6 flex justify-between">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 h-9 px-4 py-2">
              Edit Profile
            </button>
            <button
              onClick={handleLogOut}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 h-9 px-4 py-2"
            >
              {state.loading ? "Loading..." : "Logout"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
