"use client";
import { CheckSquare, Cloud, ClipboardList, ShoppingBag } from "lucide-react";
import { features } from "./data";
import Link from "next/link";
import { useEffect, useState } from "react";

const iconMap = {
  ClipboardList,
  Cloud,
  ShoppingBag,
  CheckSquare,
};

export default function Features() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    }
  }, []);

  const access_token = user?.newUser?.access_token;
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-purple-700 font-bold text-center mb-12">
          Feature Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <Link
                href={`${access_token && feature.route}`}
                key={feature.id}
                className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 hover:border-purple-200 hover:shadow-lg transition-all"
              >
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg text-purple-600 font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-purple-400">{feature.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
