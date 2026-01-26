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
    <div className=" py-10 px-35 flex justify-center font-sans">
      <div className="max-w-6xl w-full">
        <h2 className="text-[22px] font-semibold text-[#434343] mb-6">
          Auto Store Car Parts & Accessories
        </h2>

        {/* Tabs */}
        <div className="flex gap-10 border-b border-gray-300 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentIndex(0); }}
              className={`pb-3 text-[17px] font-medium transition-all relative ${activeTab === tab
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
          /* Model Tab: 6 Columns Text Grid */
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-4 gap-x-2">
            {currentItems.map((model, index) => (
              <div
                key={index}
                className="text-[#3b6598] hover:underline shadow-gray-400 m-5 cursor-pointer text-[15px]"
                onClick={() => handleClick(model)}
              >                {model.name}
              </div>
            ))}
          </div>
        ) : (
          /* Other Tabs: Carousel with exactly 2 rows */
          <div className="relative group overflow-visible">
            {/* Arrows */}
            <button
              onClick={prevSlide}
              className={`absolute -left-5 top-[50%] -translate-y-1/2 z-20 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-gray-200 text-[#3b6598] transition-opacity ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
            >
              <span className="text-2xl">‹</span>
            </button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{ transform: `translateX(-${currentIndex * 196}px)` }} // 180px card + 16px gap
              >
                {/* grid-rows-2: Force only two rows
                   grid-flow-col: Fill columns first, then move right (essential for carousel)
                */}
                <div className="grid grid-rows-2 grid-flow-col gap-4">
                  {currentItems.map((item, index) => (
                    <div
                      key={index}
                      className="w-[150px] bg-white p-4 rounded-sm shadow-sm border border-transparent hover:border-[#3b6598]/30 transition-all flex flex-col items-center justify-center cursor-pointer h-30"
                    >
                      <div className="h-20 w-full flex items-center justify-center mb-3">
                        <img
                          src={item.image || item.icon || "https://img.icons8.com/ios/50/999999/car--v1.png"}
                          alt={item.name}
                          className="max-h-full max-w-[80%] object-contain hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-[14px] font-medium text-[#434343] text-center leading-tight">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={nextSlide}
              className={`absolute -right-5 top-[50%] -translate-y-1/2 z-20 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-gray-200 text-[#3b6598] transition-opacity ${currentIndex >= Math.ceil(currentItems.length / 2) - 5 ? 'opacity-0' : 'opacity-100'}`}
            >
              <span className="text-2xl">›</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartsAccessories;