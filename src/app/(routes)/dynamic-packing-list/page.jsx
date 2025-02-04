"use client";
import ClothesRecommendation from "../../ui/ClothesRecommendations";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TravelPreferencesForm() {
  const [homeCity, setHomeCity] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userPreferences, setUserPreferences] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activityPreferences, setActivityPreferences] = useState({
    outdoor: [],
    indoor: [],
    seasonal: [],
  });
  const [travelHistory, setTravelHistory] = useState([]);
  const [newActivity, setNewActivity] = useState({ type: "outdoor", name: "" });
  const [photosDetails, setPhotosDetails] = useState(null);

  const handleActivityAdd = () => {
    if (newActivity.name) {
      setActivityPreferences((prev) => ({
        ...prev,
        [newActivity.type]: [...prev[newActivity.type], newActivity.name],
      }));
      setNewActivity({ type: "outdoor", name: "" });
    }
  };

  const handleTravelHistoryAdd = () => {
    setTravelHistory((prev) => [
      ...prev,
      { destination: "", start_date: "", end_date: "", purpose: "" },
    ]);
  };

  const handleTravelHistoryChange = (index, field, value) => {
    setTravelHistory((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setSuccessMessage("");
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.post("/v1/api/user-preferences/create", {
        user_id: user?.user?.id,
        home_city: homeCity,
        activity_preferences: activityPreferences,
        travel_history: travelHistory,
      });
      const { user_id, id, activity_preferences, ...userpreferences } =
        response?.data?.newUserPreferences;
      setUserPreferences(userpreferences);
      setSuccessMessage(
        response.data.message || "Preferences saved successfully!"
      );
      getClothesPhotos(Object.values(activity_preferences).join(","));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrors(
          error.response.data.error ||
            "An error occurred while saving preferences."
        );
      } else {
        setErrors("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getClothesPhotos = async (userPreferences) => {
    if (!userPreferences) return;
    try {
      setLoading(true);
      const response = await axios.get(`/v1/api/photos/${userPreferences}`);
      setPhotosDetails(response.data);
      localStorage.setItem("user-preferences", JSON.stringify(response.data));
    } catch (error) {
      setErrors(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl text-purple-700 mx-auto p-6 space-y-8"
      >
        {errors && <div className="text-red-600 font-bold">{errors}</div>}
        {successMessage && (
          <div className="text-green-600 font-bold">{successMessage}</div>
        )}
        <div>
          <label
            htmlFor="home-city"
            className="block text-sm font-medium text-purple-700"
          >
            Home City
          </label>
          <input
            type="text"
            id="home-city"
            value={homeCity}
            onChange={(e) => setHomeCity(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <h2 className="text-lg font-medium text-purple-900">
            Activity Preferences
          </h2>
          <div className="mt-4 flex items-center space-x-2 text-purple-700">
            <select
              value={newActivity.type}
              onChange={(e) =>
                setNewActivity((prev) => ({ ...prev, type: e.target.value }))
              }
              className="rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
            >
              <option value="outdoor">Outdoor</option>
              <option value="indoor">Indoor</option>
              <option value="seasonal">Seasonal</option>
            </select>
            <input
              type="text"
              value={newActivity.name}
              onChange={(e) =>
                setNewActivity((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Activity name"
              className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-purple-700"
            />
            <button
              type="button"
              onClick={handleActivityAdd}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {Object.entries(activityPreferences).map(([type, activities]) => (
              <div key={type}>
                <h3 className="text-md font-medium text-gray-700 capitalize">
                  {type}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {activities.map((activity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900">Travel</h2>
          {travelHistory.map((trip, index) => (
            <div
              key={index}
              className="mt-4 p-4 border border-gray-200 rounded-md"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={trip.destination}
                    onChange={(e) =>
                      handleTravelHistoryChange(
                        index,
                        "destination",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Purpose
                  </label>
                  <input
                    type="text"
                    value={trip.purpose}
                    onChange={(e) =>
                      handleTravelHistoryChange(
                        index,
                        "purpose",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={trip.start_date}
                    onChange={(e) =>
                      handleTravelHistoryChange(
                        index,
                        "start_date",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={trip.end_date}
                    onChange={(e) =>
                      handleTravelHistoryChange(
                        index,
                        "end_date",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleTravelHistoryAdd}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Add Travel
          </button>
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Generating List..." : "Generate packing list"}
          </button>
        </div>
      </form>
      <ClothesRecommendation
        photosDetails={photosDetails}
        setPhotosDetails={setPhotosDetails}
        loading={loading}
        errors={errors}
      />
    </>
  );
}
