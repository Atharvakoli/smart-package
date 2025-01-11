"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    uv: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      }>;
    }>;
  };
}

export default function WeatherApp() {
  const [query, setQuery] = useState("");
  const [days, setDays] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedWeather = localStorage.getItem("weather");
    if (storedWeather) {
      setWeatherData(JSON.parse(storedWeather));
    }
  }, []);

  const handleFetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/v1/api/weather-forecast/${query}/${days}`
      );
      const data = await response.data;
      setWeatherData(data);
      localStorage.setItem("weather", JSON.stringify(data));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/trips");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">
              Weather Data
            </h1>
            <div className="space-y-4">
              <label className="block">
                <span className="text-purple-700">Location:</span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter location"
                  className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-purple-700"
                />
              </label>
              <label className="block">
                <span className="text-purple-700">Days:</span>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  min={1}
                  max={10}
                  className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-purple-700"
                />
              </label>
              <button
                onClick={handleFetch}
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Get Weather"}
              </button>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>

          {weatherData?.weatherForecast && (
            <>
              <header className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-3xl font-bold text-purple-800">
                  {weatherData?.weatherForecast.location.name},{" "}
                  {weatherData?.weatherForecast.location.region}
                </h2>
                <p className="text-purple-600">
                  {weatherData?.weatherForecast.location.country} -{" "}
                  {weatherData?.weatherForecast.location.localtime}
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-purple-800">
                    Current Weather
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-5xl font-bold text-purple-700">
                        {weatherData?.weatherForecast.current.temp_c}°C
                      </p>
                      <p className="text-xl text-purple-600">
                        {weatherData?.weatherForecast.current.condition.text}
                      </p>
                    </div>
                    <Image
                      src={`https:${weatherData?.weatherForecast.current.condition.icon}`}
                      alt={weatherData?.weatherForecast.current.condition.text}
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-purple-600">Feels Like</p>
                      <p className="text-lg font-semibold text-purple-800">
                        {weatherData?.weatherForecast?.current.feelslike_c}°C
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-purple-600">Humidity</p>
                      <p className="text-lg font-semibold text-purple-800">
                        {weatherData?.weatherForecast?.current.humidity}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-purple-600">Wind</p>
                      <p className="text-lg font-semibold text-purple-800">
                        {weatherData?.weatherForecast.current.wind_kph} km/h
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-purple-600">UV Index</p>
                      <p className="text-lg font-semibold text-purple-800">
                        {weatherData?.weatherForecast.current.uv}
                      </p>
                    </div>
                  </div>
                </div>

                {weatherData?.weatherForecast.forecast.forecastday.map(
                  (day, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-6"
                    >
                      <h3 className="text-2xl font-semibold mb-4 text-purple-800">
                        {index === 0 ? "Today's" : `Day ${index + 1}`} Forecast
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-purple-600">High</p>
                          <p className="text-lg font-semibold text-purple-800">
                            {day.day.maxtemp_c}°C
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-600">Low</p>
                          <p className="text-lg font-semibold text-purple-800">
                            {day.day.mintemp_c}°C
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-600">Avg</p>
                          <p className="text-lg font-semibold text-purple-800">
                            {day.day.avgtemp_c}°C
                          </p>
                        </div>
                        <Image
                          src={`https:${day.day.condition.icon}`}
                          alt={day.day.condition.text}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-purple-600">Condition</p>
                        <p className="text-lg font-semibold text-purple-800">
                          {day.day.condition.text}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {weatherData?.weatherForecast.forecast.forecastday.map(
                (day, index) => (
                  <div key={index} className="mb-6">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                      <h3 className="text-2xl font-semibold mb-4 text-purple-800">
                        {index === 0 ? "Today's" : `Day ${index + 1}`}{" "}
                        Astronomical Information
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-purple-600">Sunrise</p>
                          <p className="text-lg font-semibold text-purple-800">
                            {day.astro.sunrise}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-600">Sunset</p>
                          <p className="text-lg font-semibold text-purple-800">
                            {day.astro.sunset}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-600">Moonrise</p>
                          <p className="text-lg font-semibold text-purple-800">
                            {day.astro.moonrise}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-600">Moonset</p>
                          <p className="text-lg font-semibold text-purple-800">
                            {day.astro.moonset}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
                      <h3 className="text-2xl font-semibold mb-4 text-purple-800">
                        {index === 0 ? "Today's" : `Day ${index + 1}`} Hourly
                        Forecast
                      </h3>
                      <div className="flex space-x-6">
                        {day.hour.map((hour, hourIndex) => (
                          <div
                            key={hourIndex}
                            className="flex flex-col items-center"
                          >
                            <p className="text-sm text-purple-600">
                              {hour.time.split(" ")[1]}
                            </p>
                            <Image
                              src={`https:${hour.condition.icon}`}
                              alt={hour.condition.text}
                              width={32}
                              height={32}
                            />
                            <p className="text-lg font-semibold text-purple-800">
                              {hour.temp_c}°C
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
