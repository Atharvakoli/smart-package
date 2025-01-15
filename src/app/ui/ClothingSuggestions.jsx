"use client";

import { getClothingSuggestions } from "./data";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Photos from "./Photos";

const ClothingSuggestions = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [trips, setTrips] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [displayedData, setDisplayedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [photosData, setPhotosData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const weather = JSON.parse(localStorage.getItem("weather") || "{}");
      const storedTrip = JSON.parse(localStorage.getItem("trips") || "{}");
      setWeatherData(weather);
      setTrips(storedTrip);
      const photosDetails = JSON.parse(localStorage.getItem("photos"));
      setPhotosData(photosDetails);
    }
  }, []);

  const trip = trips?.trips?.find((trip) => trip.id === id);

  useEffect(() => {
    if (!weatherData || !trip) return;

    const forecastDays =
      weatherData?.weatherForecast?.forecast?.forecastday || [];
    if (!forecastDays.length) return;

    const avgWeather = forecastDays.reduce(
      (acc, day) => {
        acc.avgtemp_c += day.day?.avgtemp_c || 0;
        return acc;
      },
      { avgtemp_c: 0, condition: forecastDays[0]?.day?.condition }
    );

    avgWeather.avgtemp_c /= forecastDays.length;

    const clothingSuggestions = getClothingSuggestions(
      avgWeather,
      trip?.activity_type[0]
    );

    setSuggestions(clothingSuggestions);

    const dataToSend = {
      location: trip?.location,
      dates: `${trip?.start_date} to ${trip?.end_date}`,
      activity: trip?.activity_type.join(", "),
      numPeople: trip?.num_people,
      gender: trip?.sex,
      weather: forecastDays
        .map(
          (day) =>
            `${day?.date}: ${day?.day?.avgtemp_c.toFixed(1)}°C, ${
              day?.day?.condition?.text
            }`
        )
        .join("|"),
      suggestions: clothingSuggestions.join("|"),
    };

    setDisplayedData(Object.values(dataToSend).join(",").replace(",", ""));
  }, [weatherData, trip]);

  if (!trip) {
    return <p className="text-center text-red-500">No trip found.</p>;
  }

  const getClothesPhotos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/v1/api/photos/${displayedData}`);
      console.log(response.data);
      setPhotosData(response.data);
      localStorage.setItem("photos", JSON.stringify(response.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrors(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg text-purple-800">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Trip Information & Clothing Suggestions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Trip Details</h2>
            <p>
              <strong>Location:</strong> {trip.location}
            </p>
            <p>
              <strong>Dates:</strong> {trip.start_date} to {trip.end_date}
            </p>
            <p>
              <strong>Activity:</strong> {trip.activity_type.join(", ")}
            </p>
            <p>
              <strong>Number of People:</strong> {trip.num_people}
            </p>
            <p>
              <strong>Gender:</strong> {trip.sex}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Weather Forecast</h2>
            {weatherData?.weatherForecast?.forecast?.forecastday?.map((day) => (
              <div key={day.date} className="mb-2">
                <p>
                  <strong>{day.date}:</strong> {day.day.avgtemp_c.toFixed(1)}°C,{" "}
                  {day.day.condition.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Clothing Suggestions</h2>
          <ul className="list-disc pl-5">
            {suggestions.map((item, index) => (
              <li key={index} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <button
            onClick={getClothesPhotos}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 h-9 px-4 py-2"
          >
            Create packing list
          </button>
        </div>
      </div>
      {loading && <p className="text-center">Loading photos...</p>}
      {photosData && <Photos photosData={photosData?.photos} errors={errors} />}
    </>
  );
};

export default ClothingSuggestions;
