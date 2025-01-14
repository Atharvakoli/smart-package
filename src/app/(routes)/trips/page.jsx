"use client";
import React, { useState, useEffect } from "react";
import Trips from "../../ui/Trips";
import axios from "axios";

const Trip = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [trips, setTrips] = useState([]);
  const [errors, setErrors] = useState("");
  useEffect(() => {
    const storedTrips = localStorage.getItem("trips");
    if (storedTrips) {
      setTrips(JSON.parse(storedTrips));
    }
  }, []);

  useEffect(() => {
    const handlefetch = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/v1/api/travel/get/${user?.user?.id}`
        );
        const newTrips = response.data;
        setTrips(newTrips);
        localStorage.setItem("trips", JSON.stringify(newTrips));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrors(error?.response?.data?.error);
      }
    };
    handlefetch();
  }, [user?.user?.id]);

  return (
    <>
      {isLoading && <p className=" text-green-500 mb-4">Loading...</p>}
      {errors && <p className=" text-red-500 mb-4">{errors}</p>}
      <div className="grid grid-cols-2 p-2">
        {trips && trips?.trips?.length > 0 ? (
          trips?.trips.map((trip) => (
            <Trips
              key={trip.id}
              trip={trip}
              contactNumber={trips.contactNumber}
              name={trips.name}
              email={trips.email}
              id={trip.id}
            />
          ))
        ) : (
          <p>No trips available.</p>
        )}
      </div>
    </>
  );
};

export default Trip;
