"use client";
import { useHomeStore } from '@/lib/stores/homeStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CarsforSaleView = () => {
  const { homeData, isLoading } = useHomeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleRedirect = (car) => {
    router.push(`/motors/${car.slug}`);
    console.log(car.slug);
  };

  if (isLoading || !homeData?.usedCars) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  const featuredCars = homeData.usedCars.hot_listings || [];

  const nextSlide = () => {
    if (currentIndex < featuredCars.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className=" py-10 px-30 flex justify-center">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-5">
          <h2 className="text-[22px] font-semibold text-[#434343]">
            Featured Used Cars for Sale
          </h2>
          <a href="#" className="text-[#3b6598] text-sm hover:underline">
            View All Featured Used Cars
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative group overflow-hidden">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-200 transition-all ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
          >
            <span className="text-blue-500 text-2xl">‹</span>
          </button>

          <div
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{ transform: `translateX(-${currentIndex * 280}px)` }}
          >
            {featuredCars.map((car, index) => (
              <div
                key={index}
                onClick={() => handleRedirect(car)} // ← redirect on click
                className="min-w-[245px] bg-white rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Image Section with Featured Tag */}
                <div className="relative h-48 w-full bg-gray-100">
                  <img
                    src={car.image}
                    alt={car.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-[#b73439] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    Featured
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 bg-white">
                  <h3 className="text-[#3b6598] font-bold text-[15px] mb-1 hover:underline truncate">
                    {car.title}
                  </h3>
                  <p className="text-[#3eb549] font-bold text-[15px]">
                    ৳ {car.buy_now_price || car.start_price}
                  </p>
                  <p className="text-gray-400 text-[13px] mt-1">
                    {car.city?.name || "City N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= featuredCars.length - 4}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-200 transition-all ${currentIndex >= featuredCars.length - 4 ? 'opacity-0' : 'opacity-100'}`}
          >
            <span className="text-blue-500 text-2xl">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarsforSaleView;