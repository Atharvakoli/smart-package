"use client";

import { getClothingSuggestions } from "@/app/ui/data";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ClothinSuggestions = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const weatherData = JSON.parse(localStorage.getItem("weather"));
  const trips = JSON.parse(localStorage.getItem("trips"));
  const trip = trips?.trips.filter((trip) => trip.id === id)[0];

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handle = () => {
    const avgWeather = weatherData?.weatherForecast.forecast.forecastday.reduce(
      (acc, day) => {
        acc.avgtemp_c += day.day.avgtemp_c;
        return acc;
      },
      {
        avgtemp_c: 0,
        condition:
          weatherData?.weatherForecast.forecast.forecastday[0].day.condition,
      }
    );

    avgWeather.avgtemp_c /=
      weatherData?.weatherForecast.forecast.forecastday.length;

    const clothingSuggestions = getClothingSuggestions(
      avgWeather,
      trip?.activity_type[0]
    );

    setSuggestions(clothingSuggestions);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg text-purple-800">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Trip Information & Clothing Suggestions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Trip Details</h2>
          <p>
            <strong>Location:</strong> {trip?.location}
          </p>
          <p>
            <strong>Dates:</strong> {trip?.start_date} to {trip?.end_date}
          </p>
          <p>
            <strong>Activity:</strong> {trip?.activity_type.join(", ")}
          </p>
          <p>
            <strong>Number of People:</strong> {trip?.num_people}
          </p>
          <p>
            <strong>Gender:</strong> {trip?.sex}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Weather Forecast</h2>
          {weatherData?.weatherForecast.forecast.forecastday.map((day) => (
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
    </div>
  );
};

export default ClothinSuggestions;
