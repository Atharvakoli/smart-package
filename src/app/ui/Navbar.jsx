"use client";
import Link from "next/link";
import React from "react";
import { Cloud } from "lucide-react";
import Banner from "./Banner";

const Navbar = () => {
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

              <Link
                href="/trips"
                className="text-sm font-medium text-purple-400 hover:text-purple-600"
              >
                Trips
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-purple-400 hover:text-purple-600"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>
      </div>
      <Banner />
    </>
  );
};

export default Navbar;
