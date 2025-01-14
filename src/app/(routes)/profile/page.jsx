"use client";

import { useAuth } from "@/app/auth-context/AuthContext";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { state, logout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?.id || state?.user?.id;
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    contactNumber: user?.user?.contactNumber || "",
  });

  const handleLogOut = async () => {
    try {
      await logout(userId);
      setIsLogoutModalOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    try {
      setLoading(true);
      const response = axios.put("/v1/api/user/update", formData);
      setUserData(response?.data);
      localStorage.setItem("user", JSON.stringify(response?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrors(error?.response?.data?.error);
    }
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-purple-600 text-white py-2 rounded-lg">
          Your Profile
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <Image
              src={`https://avatar.iran.liara.run/username?username=${
                user?.user?.name.split(" ")[0] + user?.user?.name.split(" ")[1]
              }`}
              alt="Profile"
              className="w-32 h-32 rounded-full mr-6"
              height={50}
              width={50}
            />
            <div>
              <h3 className="text-2xl font-semibold text-purple-600">
                {user?.user?.name}
              </h3>
              <p className="text-purple-600">Smart Pack Customer</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-purple-600">
                Personal Information
              </h4>
              <p className="text-purple-700">
                <span className="font-medium">Email:</span> {user?.user?.email}
              </p>
              <p className="text-purple-700">
                <span className="font-medium">Phone:</span>{" "}
                {user?.user?.contactNumber}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-purple-600">
                Account Details
              </h4>
              <p className="text-purple-700">
                <span className="font-medium">Member Since:</span> January{" "}
                {new Date().getFullYear()}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 h-9 px-4 py-2"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 h-9 px-4 py-2"
            >
              Logout
            </button>
          </div>
        </div>
      </main>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">
              Edit Profile
            </h3>
            <form onSubmit={handleSubmit}>
              {errors && errors}
              {userData?.message && userData?.message}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">
              Confirm Logout
            </h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to log out,{" "}
              <strong>You will loose your data...</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleLogOut}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {state.loading ? "Logging out..." : "Confirm Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
