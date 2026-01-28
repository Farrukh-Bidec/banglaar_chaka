"use client"
import { useHomeStore } from '@/lib/stores/homeStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const PartsAccessories = () => {
  const { homeData } = useHomeStore();
  const [activeTab, setActiveTab] = useState('Sub Category');
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

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

  // 'Brand' is not in API response sample (autoStore.categories has by_category, by_make, by_model).
  // I will only include tabs that have data or are expected.
  // If user insists on 'Brand' but no data, it will be empty.
  const tabs = ['Sub Category', 'Make', 'Model'];

  const categories = homeData?.autoStore?.categories || {};

  const data = {
    'Sub Category': categories.by_category || [],
    'Make': categories.by_make || [],
    'Model': categories.by_model || [], // Now returns objects {name, slug}
    // 'Brand': [] 
  };

  const currentItems = data[activeTab];

  // Carousel logic: Move by 1 column at a time
  const nextSlide = () => {
    // Total columns are half of total items (because 2 rows)
    const totalCols = Math.ceil(currentItems.length / 2);
    if (currentIndex < totalCols - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 flex justify-center font-sans">
  <div className="max-w-7xl w-full">    {/* slightly wider container is fine */}

    <h2 className="text-[22px] font-semibold text-[#434343] mb-6">
      Auto Store Car Parts & Accessories
    </h2>

    {/* Tabs – responsive gap + wrap */}
    <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-10 border-b border-gray-300 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => { setActiveTab(tab); setCurrentIndex(0); }}
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

    {/* Dynamic Content */}
    {activeTab === 'Model' ? (
      /* Model Tab: responsive columns */
      <div className="
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        xl:grid-cols-6 gap-y-5 gap-x-3 sm:gap-x-4
      ">
        {currentItems.map((model, index) => (
          <div
            key={index}
            className="text-[#3b6598] hover:underline shadow-gray-400 cursor-pointer text-[14px] sm:text-[15px] py-2 px-1 text-center"
            onClick={() => handleClick(model)}
          >
            {model.name}
          </div>
        ))}
      </div>
    ) : (
      /* Carousel – becomes scroll-snap on mobile, arrows hidden on small screens */
      <div className="relative group">
        {/* Left Arrow – hidden < 640px */}
        <button
          onClick={prevSlide}
          className={`
            hidden sm:flex absolute -left-2 lg:-left-5 top-1/2 -translate-y-1/2 z-20
            bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center
            shadow-md border border-gray-200 text-[#3b6598] transition-opacity
            ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <span className="text-2xl sm:text-3xl">‹</span>
        </button>

        {/* Scroll container */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent -mx-1 px-1">
          <div
            className={`
              inline-flex transition-transform duration-500 ease-in-out gap-3 sm:gap-4
              ${currentIndex > 0 ? '' : 'snap-start'}
            `}
            style={{ 
              // Keep transform logic for desktop arrows
              transform: window.innerWidth >= 640 ? `translateX(-${currentIndex * 196}px)` : 'none'
            }}
          >
            {/* 2-row forced layout – works for both scroll & transform */}
            <div className="grid grid-rows-2 grid-flow-col gap-3 sm:gap-4 auto-cols-[minmax(130px,1fr)] sm:auto-cols-[150px]">
              {currentItems.map((item, index) => (
                <div
                  key={index}
                  className="
                    w-[130px] xs:w-[140px] sm:w-[150px] min-w-[120px] max-w-[180px]
                    bg-white p-3 sm:p-4 rounded-sm shadow-sm border border-transparent 
                    hover:border-[#3b6598]/30 transition-all 
                    flex flex-col items-center justify-center cursor-pointer h-[140px] sm:h-32
                    snap-center
                  "
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

        {/* Right Arrow – hidden < 640px */}
        <button
          onClick={nextSlide}
          className={`
            hidden sm:flex absolute -right-2 lg:-right-5 top-1/2 -translate-y-1/2 z-20
            bg-white w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center
            shadow-md border border-gray-200 text-[#3b6598] transition-opacity
            ${currentIndex >= Math.ceil(currentItems.length / 2) - 5 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <span className="text-2xl sm:text-3xl">›</span>
        </button>
      </div>
    )}
  </div>
</div>
  );
};

export default PartsAccessories;