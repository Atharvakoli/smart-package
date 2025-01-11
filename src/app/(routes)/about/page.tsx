"use client";
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8 text-purple-500">
        <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-purple-500 mb-4">
            Smart Pack is a cutting-edge logistics company dedicated to
            revolutionizing the way goods are packed and shipped. Our innovative
            solutions combine advanced technology with sustainable practices to
            ensure efficient and eco-friendly packaging.
          </p>
          <p className="text-purple-700 mb-4">
            Founded in 2025, we`&apos;`ve quickly grown to become a leader in
            smart packaging solutions. Our team of experts is constantly pushing
            the boundaries of what possible in the world of logistics.
          </p>
          <h3 className="text-xl font-semibold mb-2 text-purple-900">
            Our Mission
          </h3>
          <p className="text-purple-700 mb-4">
            To provide intelligent, sustainable, and cost-effective packaging
            solutions that optimize supply chains and reduce environmental
            impact.
          </p>
          <h3 className="text-xl font-semibold mb-2 text-purple-900">
            Our Values
          </h3>
          <ul className="list-disc list-inside text-purple-400">
            <li>Innovation</li>
            <li>Sustainability</li>
            <li>Efficiency</li>
            <li>Customer-centricity</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default About;
