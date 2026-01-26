"use client";
import { useHomeStore } from '@/lib/stores/homeStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const FeaturedNewCars = () => {
  const { homeData, isLoading } = useHomeStore();
  const [activeTab, setActiveTab] = useState('Popular');
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleRedirect = (car) => {
    router.push(`/motors/${car.slug}`);
  };

  if (isLoading || !homeData?.newCars) {
    return <div className="py-10 text-center">Loading...</div>; // Or a skeleton loader
  }

  const { newCars } = homeData;

  // Map API data to component structure
  // Note: The API response has 'popular' and 'newly_launched'.
  // 'Upcoming' is not in the sample response, so we might need to hide it or leave it empty.
  const carData = {
    'Popular': newCars.popular || [],
    'Upcoming': [], // No data in sample response for upcoming
    'Newly Launched': newCars.newly_launched || []
  };

  const currentCars = carData[activeTab] || [];

  const nextSlide = () => {
    if (currentIndex < currentCars.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Reset carousel position when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const renderStars = (rating) => {
    // Rating isn't in the API response yet, defaulting to 0 or hidden
    if (!rating) return null;
    return (
      <div className="flex justify-center gap-0.5 mb-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= Math.floor(rating) ? 'text-orange-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };
  return (
    <div className="bg-[#f2f3f3] py-10 px-30 flex justify-center">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[22px] font-semibold text-[#434343]">
            Featured New Cars
          </h2>
          <a href="#" className="text-[#3b6598] text-sm hover:underline">
            View All New Cars
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-10 border-b border-gray-300 mb-8">
          {['Popular', 'Upcoming', 'Newly Launched'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`pb-3 text-[17px] font-medium transition-all relative ${activeTab === tab
                ? 'text-[#232954] border-b-[3px] border-[#3b6598]'
                : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden group">
          {/* Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-[40%] -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-gray-200 transition-opacity ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
          >
            <span className="text-blue-500 text-2xl">‹</span>
          </button>

          <div
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{ transform: `translateX(-${currentIndex * 290}px)` }}
          >
            {currentCars.map((car, index) => (
              <div
                key={index}
                onClick={() => handleRedirect(car)} // ← redirect on click
                className="min-w-[245px] bg-white rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Car Image */}
                <div className="h-40 w-full flex items-center justify-center mb-4">
                  <img
                    src={car.image}
                    alt={car.title}
                    className="max-w-full max-h-full object-contain hover:scale-105 transition-transform"
                  />
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-[#3b6598] font-bold text-[16px] mb-2 hover:underline cursor-pointer">
                    {car.title}
                  </h3>
                  <p className="text-[#3eb549] font-medium text-[14px]">
                    ৳ {car.buy_now_price || car.start_price}
                  </p>
                  <div className="justify-center flex">
                    {/* <h3 className="text-[#3b6598] font-bold text-[16px] mb-1 truncate">{car.name}</h3> */}

                    {/* Rating Stars */}
                    {renderStars(car.rating)}

                    <p className="text-gray-500 text-[13px]">
                      {car.reviews ? `${car.reviews} Reviews` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-[40%] -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-gray-200 transition-opacity ${currentIndex >= currentCars.length - 4 ? 'opacity-0' : 'opacity-100'}`}
          >
            <span className="text-blue-500 text-2xl">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedNewCars;