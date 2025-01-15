"use client";
import React, { useState, useEffect } from "react";
import Trips from "../../ui/Trips";
import axios from "axios";

const Trip = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [trips, setTrips] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);

      const storedTrips = localStorage.getItem("trips");
      setTrips(storedTrips ? JSON.parse(storedTrips) : []);
    }
  }, []);

  useEffect(() => {
    if (user?.user?.id) {
      const handleFetch = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `/v1/api/travel/get/${user.user.id}`
          );
          const newTrips = response.data;
          setTrips(newTrips);
          localStorage.setItem("trips", JSON.stringify(newTrips));
        } catch (error) {
          setErrors(error?.response?.data?.error || "Failed to fetch trips");
        } finally {
          setIsLoading(false);
        }
      };
      handleFetch();
    }
  }, [user?.user?.id]);

  return (
    <>
      {errors && <p className="text-red-500 mb-4">{errors}</p>}
      {isLoading ? (
        <p className="text-green-500 mb-4">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 p-2">
          {trips?.trips?.length > 0 ? (
            trips.trips.map((trip) => (
              <Trips
                key={trip.id}
                trip={trip}
                contactNumber={trips?.contactNumber}
                name={trips?.name}
                email={trips?.email}
                id={trip.id}
              />
            ))
          ) : (
            <p>No trips available.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Trip;
