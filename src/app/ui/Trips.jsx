"use client";
import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Activity,
  Repeat,
  User,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

const Trips = ({ trip, contactNumber, email, name, id }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const weatherData = JSON.parse(localStorage.getItem("weather"));
      setWeatherData(weatherData);
    }
  }, []);

  return (
    <div className="cursor-pointer gap-2 max-w-4xl bg-gray-100 py-12 text-purple-600">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-purple-600 text-white p-4">
            <h2 className="text-2xl font-bold">{name}&apos;s Trip</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Name:</span> {name}
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Email: </span> {email}
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Contact:</span>{" "}
                  {contactNumber}
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Location:</span>{" "}
                  {trip.location}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Start Date:</span>{" "}
                  {trip.start_date}
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">End Date:</span>{" "}
                  {trip.end_date}
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Number of People:</span>{" "}
                  {trip.num_people}
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Sex:</span> {trip.sex}
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-start space-x-2">
                <Activity className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <span className="font-semibold">Activities:</span>
                  <ul className="list-disc list-inside ml-4">
                    {trip.activity_type.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Repeat className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Frequency:</span>{" "}
                {trip.frequency}
              </div>
            </div>
          </div>
          <Link
            href={{
              pathname: weatherData
                ? `/trips/clothing-suggestions`
                : `/weather-data`,
              query: { id },
            }}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Clothes for your trip
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Trips;
