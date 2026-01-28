"use client";
import { useHomeStore } from '@/lib/stores/homeStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const BikesbyMake = () => {
  const { homeData } = useHomeStore();
  const router = useRouter();
  const bikeMakes = homeData?.autoStore?.categories?.by_make || [];


  const handleRedirect = (make) => {
    router.push(`/motors?make=${encodeURIComponent(make.name)}`);
  };
  const ITEMS_PER_CLICK = 6;
const [visibleCount, setVisibleCount] = useState(ITEMS_PER_CLICK);

useEffect(() => {
  setVisibleCount(ITEMS_PER_CLICK);
}, [bikeMakes.length]);


  // User requested to use 'autoStore.categories.by_make' for BikesbyMake.
  // Note: This data was also used in PartsAccessories for 'Make' tab.

  return (
    <section className="bg-[#f2f3f3] py-10 px-5 sm:px-35 mt-10 flex justify-center">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <h2 className="text-[22px] font-semibold text-[#434343] mb-8 text-center sm:text-start">
          New Bikes by Make
        </h2>

        {/* Grid Container - 5 items per row on desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-4">
          {bikeMakes.slice(0, visibleCount).map((make, index) => (
            <div
              key={index}
              onClick={() => handleRedirect(make)} // ← redirect on click
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Circular Logo Container */}
              <div className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow duration-300 overflow-hidden p-4">
                <img
                  src={make.logo || make.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(make.name)}&background=random`}
                  alt={make.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=' + make.name }}
                />
              </div>

              {/* Brand Name */}
              <p className="mt-3 text-[15px]  font-bold text-[#3b6598] transition-colors">
                {make.name}
              </p>
            </div>
          ))}
        </div>
        {visibleCount < bikeMakes.length && (
  <button
    onClick={() =>
      setVisibleCount((prev) =>
        Math.min(prev + ITEMS_PER_CLICK, bikeMakes.length)
      )
    }
    className="flex sm:hidden mx-auto mt-8 bg-[#3eb549] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all"
  >
    View More
  </button>
)}

      </div>
      
    </section>
  );
};

export default BikesbyMake;