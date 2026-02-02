'use client';
import { useHomeStore } from '@/lib/stores/homeStore';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

const PartsAccessories = () => {
  const { homeData } = useHomeStore();
  const [activeTab, setActiveTab] = useState('Sub Category');
  const carouselRef = useRef(null);
  const router = useRouter();

  const [isScrollable, setIsScrollable] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const CARD_WIDTH = 170; // approx card width incl gap
  const SCROLL_ITEMS = 2;

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

  const updateScrollButtons = () => {
    const el = carouselRef.current;
    if (!el) return;
    if (window.innerWidth < 640) {
      setIsScrollable(false);
      return;
    }

    const scrollable = el.scrollWidth > el.clientWidth;
    setIsScrollable(scrollable);

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.scrollTo({left: 0,behavior: 'smooth',});
    }
    updateScrollButtons();
  }, [activeTab]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    updateScrollButtons();

    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -CARD_WIDTH * SCROLL_ITEMS,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: CARD_WIDTH * SCROLL_ITEMS,
      behavior: 'smooth',
    });
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
          {isScrollable && canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="hidden sm:flex absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center shadow-md border border-gray-200 text-blue-400 hover:text-blue-600 transition-all"
            >
              <span className="text-xl md:text-2xl font-bold">‹</span>
            </button>
          )}

          <div
            ref={carouselRef}
            className="overflow-x-hidden sm:overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          >
            <div className="flex flex-wrap sm:flex-nowrap gap-4 py-2 min-w-fit">
              {currentItems.map((item, index) => (
                <div
                  key={index}
                  className="snap-start w-[calc(50%-0.5rem)] sm:w-[calc(33.33%-1rem)] md:w-[150px] lg:w-[160px] h-[150px] sm:h-[160px] flex-shrink-0"
                >
                  <div
                    onClick={() => handleClick(item)}
                    className="bg-white p-3 sm:p-4 h-full rounded-sm shadow-sm border border-transparent hover:border-[#3b6598]/30 transition-all flex flex-col items-center justify-center cursor-pointer group/card"
                  >
                    <div className="h-16 sm:h-20 w-full flex items-center justify-center mb-2 sm:mb-3">
                      <img
                        src={item.image || item.icon || "https://img.icons8.com/ios/50/999999/car--v1.png"}
                        alt={item.name}
                        className="max-h-full max-w-[80%] object-contain hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-[13px] sm:text-[14px] font-medium text-[#434343] text-center leading-tight line-clamp-2">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isScrollable && canScrollRight && (
            <button
              onClick={scrollRight}
              className="hidden sm:flex absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center shadow-md border border-gray-200 text-blue-400 hover:text-blue-600 transition-all"
            >
              <span className="text-xl md:text-2xl font-bold">›</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartsAccessories;
