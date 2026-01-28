"use client";
import { useHomeStore } from '@/lib/stores/homeStore';
import { useRouter } from 'next/navigation';
import React from 'react';

const CarsbyMake = () => {
  const { homeData } = useHomeStore();
  const router = useRouter();

  const handleRedirect = (brand) => {
    router.push(`/motors?make=${encodeURIComponent(brand.name)}`);
  };

  // Use API data or fallback to empty array (or keep hardcoded if user wants mixed? "populate brands... reference... response" implies use API).
  // The API response for brand doesn't seem to have an icon url. 
  // I will use a placeholder or check if there's a way to get icons. 
  // For now, I'll assume we render what we have.
  const brands = homeData?.newCars?.new_cars_by_brand || [];


  return (
   <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-12 xl:px-20 bg-white">
  <div className="max-w-7xl mx-auto">
    {/* Title */}
    <h2 className="text-xl sm:text-[22px] font-semibold text-[#434343] mb-6 sm:mb-8 text-center sm:text-left">
      New Cars by Make
    </h2>

    {/* Grid Container */}
    <div className="
  grid  xs:grid-cols-3 
  sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 
  gap-5 sm:gap-6 md:gap-7 lg:gap-8
  justify-items-center sm:justify-items-start
">

      {brands.map((make, index) => (
        <div
          key={index}
          onClick={() => handleRedirect(make)}
          className="flex flex-col items-center group cursor-pointer transition-transform active:scale-95 sm:active:scale-100"
        >
          <div className="
            w-20 h-20 sm:w-24 sm:h-24 
            bg-white rounded-full 
            flex items-center justify-center 
            shadow-sm border border-gray-100 
            group-hover:shadow-md group-hover:border-gray-200 
            transition-all duration-300 
            overflow-hidden mb-3 sm:mb-4
          ">
            <img
              src={make.image || make.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(make.name)}&background=random`}
              alt={make.name}
              className="
                w-12 h-12 sm:w-14 sm:h-14 
                object-contain 
                group-hover:scale-110 
                transition-transform duration-300
              "
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/60?text=' + encodeURIComponent(make.name.charAt(0));
              }}
            />
          </div>

          {/* Brand Name */}
          <p className="
            text-[#3b6598] text-sm sm:text-[15px] 
            font-medium text-center 
            group-hover:underline 
            line-clamp-1 px-1
          ">
            {make.name}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default CarsbyMake;