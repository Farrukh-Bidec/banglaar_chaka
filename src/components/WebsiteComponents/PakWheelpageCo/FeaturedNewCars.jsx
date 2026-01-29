'use client';
import { useHomeStore } from '@/lib/stores/homeStore';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

const FeaturedNewCars = () => {
  // ✅ Hooks always at the top
  const { homeData, isLoading } = useHomeStore();
  const [activeTab, setActiveTab] = useState('Popular');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const carouselRef = useRef(null);
  const router = useRouter();

  // Safe defaults so hooks always run
  const newCars = homeData?.newCars || {
    popular: [],
    upcoming: [],
    newly_launched: [],
  };

  const carData = {
    Popular: newCars.popular || [],
    Upcoming: newCars.upcoming || [],
    'Newly Launched': newCars.newly_launched || [],
  };

  const tabs = Object.keys(carData).filter((tab) => carData[tab]?.length > 0);
  const currentCars = carData[activeTab] || [];

  // Tab change handler
 const handleTabChange = (tab) => {
  setActiveTab(tab);
  setCurrentIndex(0); // ensures first card is visible
};


  const handleRedirect = (car) => {
    router.push(`/motors/${car.slug}`);
  };

  // Calculate card width & visible cards
  useEffect(() => {
  const updateCardWidth = () => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.querySelector('.slide-card');
    if (!firstCard) return;

    const width = firstCard.getBoundingClientRect().width;
    setCardWidth(width);

    const containerWidth = carouselRef.current.offsetWidth;
    const visible = Math.max(1, Math.floor(containerWidth / width));
    setVisibleCards(visible);

    // Reset currentIndex if it's out of bounds
    setCurrentIndex((prev) =>
      prev > currentCars.length - visible ? 0 : prev
    );
  };

  updateCardWidth();
  window.addEventListener('resize', updateCardWidth);
  return () => window.removeEventListener('resize', updateCardWidth);
}, [currentCars]);

  const nextSlide = () => {
    if (currentIndex < currentCars.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const renderStars = (rating) => {
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

  // Loading or empty states
  if (isLoading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (!currentCars || currentCars.length === 0) {
    return <div className="py-10 text-center">No cars available.</div>;
  }

  return (
    <div className="bg-[#f2f3f3] py-8 sm:py-10 px-4 sm:px-6 lg:px-12 xl:px-20 flex justify-center">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-5 gap-3">
          <h2 className="text-xl sm:text-[22px] font-semibold text-[#434343]">Featured New Cars</h2>
          <a
            href="#"
            className="text-[#3b6598] text-sm font-medium hover:underline whitespace-nowrap"
          >
            View All New Cars →
          </a>
        </div>

        {/* Tabs */}
        <div className="overflow-x-auto scrollbar-hide mb-6 sm:mb-8 border-b border-gray-300">
          <div className="flex gap-6 sm:gap-10 pb-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`pb-3 px-1 text-base sm:text-[17px] font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab
                    ? 'text-[#232954] border-b-[3px] border-[#3b6598]'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-auto">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className={`hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center shadow-md border border-gray-200 transition-opacity duration-200 ${
              currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-90 hover:opacity-100'
            }`}
          >
            <span className="text-blue-500 text-xl md:text-2xl font-bold">‹</span>
          </button>

          {/* Items */}
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-5 md:gap-6"
            style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
          >
            {currentCars.map((car, index) => (
              <div
                key={index}
                onClick={() => handleRedirect(car)}
                className="slide-card snap-start min-w-[85%] xs:min-w-[70%] sm:min-w-[48%] md:min-w-[32%] lg:min-w-[245px] bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex-shrink-0"
              >
                <div className="relative h-40 sm:h-44 md:h-48 w-full flex items-center justify-center bg-gray-50 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.title}
                    className="max-w-[85%] max-h-[85%] sm:max-w-[90%] object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 sm:p-4 text-center">
                  <h3 className="text-[#3b6598] font-bold text-sm sm:text-[16px] mb-2 hover:underline line-clamp-2">{car.title}</h3>
                  <p className="text-[#3eb549] font-medium text-sm sm:text-[14px] mb-2">৳ {car.buy_now_price || car.start_price}</p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {renderStars(car.rating)}
                    {car.reviews && <p className="text-gray-500 text-xs sm:text-[13px]">{car.reviews} Reviews</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className={`hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center shadow-md border border-gray-200 transition-opacity duration-200 ${
              currentIndex >= currentCars.length - visibleCards
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

export default FeaturedNewCars;
