import Image from "next/image";
import React from "react";

const Photos = ({ photosData, errors }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {errors && <p className="text-red-400 text-sm"></p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.isArray(photosData)
          ? photosData.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-64 md:h-80">
                  <Image
                    src={photo.src.large || "/placeholder.svg"}
                    alt={photo.alt}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl text-purple-900 font-semibold mb-2">
                    {photo.photographer}
                  </h2>
                  <p className="text-purple-600 mb-4">{photo.alt}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Photos;
