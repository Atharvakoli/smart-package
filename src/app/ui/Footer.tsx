"use client"
import React from 'react'
import { Cloud } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-white mt-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-purple-500">
            © 2024 SmartPack. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
            <Cloud className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-semibold text-purple-900">
              SmartPack
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer