"use client"
import { useHomeStore } from '@/lib/stores/homeStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const PopularNewBikes = () => {
  const { homeData } = useHomeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleBikeClick = (bike) => {
    router.push(`/motors/${bike.slug}`);
  };

  const bikes = homeData?.bikes?.popular_bikes || [];

  const nextSlide = () => {
    if (currentIndex < bikes.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
  <section className="py-10 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 flex justify-center font-sans">
  <div className="max-w-7xl w-full">
    {/* Header Section */}
    <div className="flex justify-between items-end mb-6">
      <h2 className="text-[22px] font-semibold text-[#434343]">Popular New Bikes</h2>
      <button className="text-[#3b6598] text-[14px] hover:underline">View All New Bikes</button>
    </div>

    {/* Carousel Wrapper */}
    <div className="relative group">
      {/* Left Arrow – hidden on mobile */}
      <button
        onClick={prevSlide}
        className={`
          hidden sm:flex absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10
          bg-white w-9 sm:w-10 h-9 sm:h-10 rounded-full items-center justify-center
          shadow-md border border-gray-200 text-[#3b6598] transition-all
          ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-70 hover:opacity-100 hover:bg-gray-50'}
        `}
      >
        <span className="text-2xl sm:text-3xl font-light">‹</span>
      </button>

      {/* Cards Container */}
      <div className={`
        overflow-x-auto sm:overflow-hidden pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
        snap-x snap-mandatory sm:snap-none
      `}>
        <div
          className={`
            inline-flex sm:flex transition-transform duration-500 ease-in-out gap-3 sm:gap-4
            sm:min-w-full
          `}
          style={{
            // Only apply translate on sm+ (desktop arrows mode)
            transform: window.innerWidth >= 640 ? `translateX(-${currentIndex * 25}%)` : 'none',
          }}
        >
          {bikes.map((bike, index) => (
            <div
              key={index}
              className={`
                min-w-[calc(100%-1.5rem)] sm:min-w-[calc(50%-0.75rem)] md:min-w-[calc(33.333%-1rem)] lg:min-w-[calc(25%-1rem)]
                bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col items-center
                hover:shadow-lg transition-shadow cursor-pointer group snap-center sm:snap-align-none
              `}
              onClick={() => handleBikeClick(bike)}
            >
              {/* Image Section – slightly shorter on mobile */}
              <div className="h-36 sm:h-40 w-full flex items-center justify-center mb-3 sm:mb-4 px-2 sm:px-0">
                <img
                  src={bike.image}
                  alt={bike.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content Section */}
              <div className="text-center w-full pb-3 sm:pb-0">
                <h3 className="text-[#3b6598] font-semibold text-[15px] sm:text-[16px] mb-1 group-hover:underline">
                  {bike.title}
                </h3>
                <p className="text-[#3eb549] font-bold text-[14px] sm:text-[15px] mb-2">
                  ৳ {bike.buy_now_price || bike.start_price}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center justify-center gap-1 mt-1 sm:mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-[13px] sm:text-[14px] ${i < (bike.rating || 0) ? 'text-[#ff9100]' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500 text-[12px] sm:text-[13px] ml-1">
                    {bike.reviews ? `${bike.reviews} Reviews` : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow – hidden on mobile */}
      <button
        onClick={nextSlide}
        className={`
          hidden sm:flex absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10
          bg-white w-9 sm:w-10 h-9 sm:h-10 rounded-full items-center justify-center
          shadow-md border border-gray-200 text-[#3b6598] transition-all
          ${currentIndex >= bikes.length - 4 ? 'opacity-0 pointer-events-none' : 'opacity-70 hover:opacity-100 hover:bg-gray-50'}
        `}
      >
        <span className="text-2xl sm:text-3xl font-light">›</span>
      </button>
    </div>
  </div>
</section>
  );
};

export default PopularNewBikes;