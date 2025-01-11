"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Cloud } from "lucide-react";
import Banner from "./Banner";
import { useAuth } from "../auth-context/AuthContext";
import Image from "next/image";

const Navbar = () => {
  const { state } = useAuth();
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const access_token = sessionStorage.getItem("access_token");
      setToken(access_token);
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="bg-gradient-to-b from-purple-50 to-white">
        <header className="border-b bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Cloud className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-semibold text-purple-900">
                SmartPack
              </span>
            </Link>
            <nav className="md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-sm font-medium text-purple-400 hover:text-purple-600"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-purple-400 hover:text-purple-600"
              >
                About
              </Link>
              {token && (
                <Link
                  href="/trips"
                  className="text-sm font-medium text-purple-400 hover:text-purple-600"
                >
                  Trips
                </Link>
              )}
              <Link
                href="/contact"
                className="text-sm font-medium text-purple-400 hover:text-purple-600"
              >
                Contact
              </Link>
              {token || state?.user ? (
                <>
                  <Link href="/profile">
                    <Image
                      src={`https://avatar.iran.liara.run/username?username=${
                        user?.user?.name.split(" ")[0] +
                        user?.user?.name.split(" ")[1]
                      }`}
                      alt="Profile"
                      className="w-10 h-10 rounded-full inline-flex items-center justify-center text-sm font-medium  text-white"
                      height={50}
                      width={50}
                    />
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/sign-up">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 h-9 px-4 py-2">
                      Sign Up
                    </button>
                  </Link>
                  <Link href="/auth/sign-in">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 h-9 px-4 py-2">
                      Sign In
                    </button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
      </div>
      <Banner />
    </>
  );
};

export default Navbar;
