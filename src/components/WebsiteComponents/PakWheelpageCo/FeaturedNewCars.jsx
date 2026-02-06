'use client';
import { useHomeStore } from '@/lib/stores/homeStore';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

const FeaturedNewCars = () => {
  // ✅ Hooks always at the top
  const { homeData, isLoading } = useHomeStore();
  const [activeTab, setActiveTab] = useState('Popular');
  const carouselRef = useRef(null);
  const router = useRouter();

  const [isScrollable, setIsScrollable] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const CARD_WIDTH = 270; // approx card width incl gap
  const SCROLL_ITEMS = 2;

  // Safe defaults so hooks always run
  const newCars = homeData?.newCars || {
    popular: [],
    upcoming: [],
    newly_launched: [],
  };

  const carData = {
    Popular: newCars.popular || [],
    // Upcoming: newCars.upcoming || [],
    'Newly Launched': newCars.newly_launched || [],
  };

  const tabs = Object.keys(carData).filter((tab) => carData[tab]?.length > 0);
  const currentCars = carData[activeTab] || [];

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRedirect = (car) => {
    router.push(`/motors/${car.slug}`);
  };

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
        <div className="border-b border-gray-300 mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex flex-nowrap md:flex-nowrap gap-6 md:gap-8 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`pb-3 px-1 text-base md:text-[17px] font-medium transition-all whitespace-nowrap relative flex-shrink-0 ${activeTab === tab
                  ? 'text-gray-900 border-b-[3px] border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
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
            <div className="flex flex-nowrap gap-4 sm:gap-5 md:gap-6 py-2 min-w-fit">
              {currentCars.map((car, index) => (
                <div
                  key={index}
                  onClick={() => handleRedirect(car)}
                  className="snap-start w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[250px] bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex-shrink-0"
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
          </div>

          {isScrollable && canScrollRight && (
            <button
              onClick={scrollRight}
              className="hidden sm:flex absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center shadow-md border border-gray-200 text-blue-400 hover:text-blue-600 transition-all"
            >
              <span className="text-xl md:text-2xl font-bold">›</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedNewCars;
