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
   <div className="py-8 sm:py-10 px-4 sm:px-6 lg:px-12 xl:px-20 flex justify-center bg-gray-50">
  <div className="max-w-7xl w-full">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-5 sm:mb-6 gap-3">
      <h2 className="text-xl sm:text-[22px] font-semibold text-[#434343]">
        Featured Used Cars for Sale
      </h2>
      <a
        href="#"
        className="text-[#3b6598] text-sm font-medium hover:underline whitespace-nowrap"
      >
        View All Featured Used Cars →
      </a>
    </div>

    {/* Carousel Container */}
    <div className="relative group overflow-visible">
      {/* Left Arrow – shown from sm+ */}
      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className={`hidden sm:flex absolute left-0 md:left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center shadow-lg border border-gray-200 transition-all duration-200 ${
          currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-90 hover:opacity-100'
        }`}
      >
        <span className="text-blue-500 text-xl md:text-2xl font-bold">‹</span>
      </button>

      {/* Carousel Items */}
      <div
        className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-5 md:gap-6 snap-x snap-mandatory overflow-x-auto scrollbar-hide pb-4"
        style={{ transform: `translateX(-${currentIndex * (window.innerWidth < 640 ? 100 : 280)}%)` }} // Adjust % for mobile vs desktop
      >
        {featuredCars.map((car, index) => (
          <div
            key={index}
            onClick={() => handleRedirect(car)}
            className="snap-start min-w-[85%] sm:min-w-[48%] md:min-w-[32%] lg:min-w-[245px] bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex-shrink-0"
          >
            {/* Image Section with Featured Tag */}
            <div className="relative h-40 sm:h-44 md:h-48 w-full bg-gray-100">
              <img
                src={car.image}
                alt={car.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-[#b73439] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm shadow-sm">
                Featured
              </div>
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-4">
              <h3 className="text-[#3b6598] font-bold text-sm sm:text-[15px] mb-1 hover:underline line-clamp-2">
                {car.title}
              </h3>
              <p className="text-[#3eb549] font-bold text-sm sm:text-[15px]">
                ৳ {car.buy_now_price || car.start_price}
              </p>
              <p className="text-gray-500 text-xs sm:text-[13px] mt-1 truncate">
                {car.city?.name || "City N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        disabled={currentIndex >= featuredCars.length - (window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4)}
        className={`hidden sm:flex absolute right-0 md:right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center shadow-lg border border-gray-200 transition-all duration-200 ${
          currentIndex >= featuredCars.length - (window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4) 
            ? 'opacity-0 pointer-events-none' 
            : 'opacity-90 hover:opacity-100'
        }`}
      >
        <span className="text-blue-500 text-xl md:text-2xl font-bold">›</span>
      </button>
    </div>
  </div>
</div>
  );
};

export default CarsforSaleView;