"use client";

import ClothingSuggestions from "@/app/ui/ClothingSuggestions";
import React, { Suspense } from "react";

const Clothing = () => {
  return (
    <Suspense fallback={<div>Loading Clothing Suggestions...</div>}>
      <ClothingSuggestions />
    </Suspense>
  );
};

export default Clothing;
