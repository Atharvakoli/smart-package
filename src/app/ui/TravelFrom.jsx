// components/TravelForm.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const TravelForm = () => {
  const [user, setUser] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const [formData, setFormData] = useState({
    location: "",
    start_date: "",
    end_date: "",
    sex: "",
    num_people: 1,
    activity_type: [],
    frequency: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const weather = JSON.parse(localStorage.getItem("weather"));

      setUser(storedUser);
      setWeatherData(weather);
    }
  }, [formData]);

  const [errors, setErrors] = useState("");
  const [tripDetails, setTripDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        activity_type: checked
          ? [...prev.activity_type, value]
          : prev.activity_type.filter((activity) => activity !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
        user_id: user?.user.id,
      }));
    }
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      frequency: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/v1/api/travel/create", formData);
      const newTrip = response.data;
      setTripDetails(newTrip);
      setFormData({
        location: "",
        start_date: "",
        end_date: "",
        sex: "",
        num_people: 1,
        activity_type: [],
        frequency: "",
      });
      setIsLoading(false);

      router.push("/trips");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setErrors(error?.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      {errors && (
        <p className="text-center text-red-400 text-error-500 mb-4">{errors}</p>
      )}
      {tripDetails?.message && (
        <p className="text-center text-green-500 mb-4">
          {tripDetails?.message}
        </p>
      )}
      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-purple-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-purple-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              placeholder="Enter destination"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="start_date"
                className="block text-sm font-medium text-purple-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                required
                value={formData.start_date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-purple-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="end_date"
                className="block text-sm font-medium text-purple-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                required
                value={formData.end_date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-purple-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-purple-700"
              >
                Sex
              </label>
              <select
                id="sex"
                name="sex"
                required
                value={formData.sex}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-purple-500 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label
                htmlFor=" num_people"
                className="block text-sm font-medium text-purple-600"
              >
                Number of num_people
              </label>
              <input
                type="number"
                id="num_people"
                name="num_people"
                min="1"
                required
                value={formData.num_people}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-purple-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="activity_type"
              className="block text-sm font-medium text-purple-700"
            >
              Activity Type
            </label>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {["Business", "Leisure", "Adventure"].map((activity) => (
                <label key={activity} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="activity_type"
                    value={activity.toLowerCase()}
                    onChange={handleChange}
                    checked={formData.activity_type.includes(
                      activity.toLowerCase()
                    )}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-purple-700">
                    {activity}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700">
              Frequency of Activity
            </label>
            <div className="mt-2 space-y-2">
              {["Light", "Moderate", "Intensive"].map((frequency) => (
                <label
                  key={frequency}
                  className="inline-flex items-center mr-4"
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={frequency.toLowerCase()}
                    onChange={handleRadioChange}
                    checked={formData.frequency === frequency.toLowerCase()}
                    className="border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-purple-700">
                    {frequency}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Generating Trip..." : "Add Trip"}
      </button>
    </form>
  );
};

export default TravelForm;
