"use client";

import { useState } from "react";
import { sampleWeatherData } from "./data";

export default function TravelForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    startDate: "",
    endDate: "",
    sex: "",
    travelers: 1,
    activityType: [],
    frequency: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        activityType: checked
          ? [...prev.activityType, value]
          : prev.activityType.filter((activity) => activity !== value),
      }));
    }
    else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      frequency: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    console.log("Form Data:", formData);
    console.log("Weather data:", sampleWeatherData);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
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
              htmlFor="startDate"
              className="block text-sm font-medium text-purple-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              required
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-purple-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-purple-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              required
              value={formData.endDate}
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
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="travelers"
              className="block text-sm font-medium text-purple-600"
            >
              Number of Travelers
            </label>
            <input
              type="number"
              id="travelers"
              name="travelers"
              min="1"
              required
              value={formData.travelers}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-purple-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="activityType"
            className="block text-sm font-medium text-purple-700"
          >
            Activity Type
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {["Business", "Leisure", "Adventure"].map((activity) => (
              <label key={activity} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="activityType"
                  value={activity.toLowerCase()}
                  onChange={handleChange}
                  checked={formData.activityType.includes(
                    activity.toLowerCase()
                  )}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-purple-700">{activity}</span>
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
              <label key={frequency} className="inline-flex items-center mr-4">
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

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Generating Trip..." : "Add Trip"}
        </button>
      </div>
    </form>
  );
}
