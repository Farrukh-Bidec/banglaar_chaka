'use client';
import { useHomeStore } from '@/lib/stores/homeStore';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

const PartsAccessories = () => {
  const { homeData } = useHomeStore();
  const [activeTab, setActiveTab] = useState('Sub Category');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const router = useRouter();
  const carouselRef = useRef(null);

  const handleClick = (item) => {
    if (activeTab === 'Sub Category' && item.id) {
      router.push(`/motors?category_id=${item.id}`);
    } else if (activeTab === 'Make') {
      router.push(`/motors?make=${encodeURIComponent(item.name)}`);
    } else if (activeTab === 'Model') {
      router.push(`/motors?model=${encodeURIComponent(item.name)}`);
    } else {
      router.push(`/motors?search=${encodeURIComponent(item.name)}`);
    }
  };

  const tabs = ['Sub Category', 'Make', 'Model'];
  const categories = homeData?.autoStore?.categories || {};
  const data = {
    'Sub Category': categories.by_category || [],
    'Make': categories.by_make || [],
    'Model': categories.by_model || [],
  };
  const currentItems = data[activeTab];

  // Calculate card width
  useEffect(() => {
    const updateCardWidth = () => {
      if (!carouselRef.current) return;
      const firstCard = carouselRef.current.querySelector('.carousel-card');
      if (!firstCard) return;
      const gap = parseInt(getComputedStyle(carouselRef.current).gap || 0);
      setCardWidth(firstCard.offsetWidth + gap);
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, [currentItems, activeTab]);

  // Reset index when tab changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  const nextSlide = () => {
    if (!cardWidth || !carouselRef.current) return;
    const containerWidth = carouselRef.current.offsetWidth;
    const visibleCols = Math.floor(containerWidth / cardWidth);
    const totalCols = Math.ceil(currentItems.length / 2);
    if (currentIndex < totalCols - visibleCols) setCurrentIndex(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="py-8 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 flex justify-center font-sans">
      <div className="max-w-7xl w-full">
        <h2 className="text-[22px] font-semibold text-[#434343] mb-6">
          Auto Store Car Parts & Accessories
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-10 border-b border-gray-300 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[16px] sm:text-[17px] font-medium transition-all relative whitespace-nowrap
                ${activeTab === tab
                  ? 'text-[#232954] border-b-[3px] border-[#3b6598]'
                  : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative group">
          <button
            onClick={prevSlide}
            className={`hidden sm:flex absolute -left-2 lg:-left-5 top-1/2 -translate-y-1/2 z-20
              bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center
              shadow-md border border-gray-200 text-[#3b6598] transition-opacity
              ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
          >
            <span className="text-2xl sm:text-3xl">‹</span>
          </button>

          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent -mx-1 px-1">
            <div
              ref={carouselRef}
              className="inline-flex transition-transform duration-500 ease-in-out gap-3 sm:gap-4"
              style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
            >
              <div className="grid grid-rows-2 grid-flow-col gap-3 sm:gap-4 auto-cols-[minmax(130px,1fr)] sm:auto-cols-[150px]">
                {currentItems.map((item, index) => (
                  <div
                    key={index}
                    className="carousel-card w-[130px] xs:w-[140px] sm:w-[150px] min-w-[120px] max-w-[180px]
                      bg-white p-3 sm:p-4 rounded-sm shadow-sm border border-transparent 
                      hover:border-[#3b6598]/30 transition-all 
                      flex flex-col items-center justify-center cursor-pointer h-[140px] sm:h-32 snap-center"
                    onClick={() => handleClick(item)}
                  >
                    <div className="h-16 sm:h-20 w-full flex items-center justify-center mb-2 sm:mb-3">
                      <img
                        src={item.image || item.icon || "https://img.icons8.com/ios/50/999999/car--v1.png"}
                        alt={item.name}
                        className="max-h-full max-w-[80%] object-contain hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-[13px] sm:text-[14px] font-medium text-[#434343] text-center leading-tight">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={nextSlide}
            className={`hidden sm:flex absolute -right-2 lg:-right-5 top-1/2 -translate-y-1/2 z-20
              bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center
              shadow-md border border-gray-200 text-[#3b6598] transition-opacity
              ${currentIndex >= Math.ceil(currentItems.length / 2) - Math.floor((carouselRef.current?.offsetWidth || 0)/cardWidth)
                ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
          >
            <span className="text-2xl sm:text-3xl">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartsAccessories;
