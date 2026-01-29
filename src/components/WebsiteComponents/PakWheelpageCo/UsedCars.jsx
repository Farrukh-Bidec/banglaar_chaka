'use client';
import { useHomeStore } from "@/lib/stores/homeStore";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const UsedCars = () => {
  const { homeData } = useHomeStore();
  const [activeTab, setActiveTab] = useState("Category");
  const carouselRef = useRef(null);
  const router = useRouter();

  const [isScrollable, setIsScrollable] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const ITEMS_PER_CLICK = 4;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_CLICK);

  const updateScrollButtons = () => {
    const el = carouselRef.current;
    if (!el) return;

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

    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const handleRedirect = (item) => {
    let query = `?tab=${activeTab}&value=${encodeURIComponent(item.name)}`;

    if (activeTab === "Category" && item.id) {
      query += `&category_id=${item.id}`;
    } else if (activeTab === "Make") {
      query += `&make=${encodeURIComponent(item.name)}`;
    } else if (activeTab === "Model") {
      query += `&model=${encodeURIComponent(item.name)}`;
    } else if (activeTab === "City") {
      query += `&city=${encodeURIComponent(item.name)}`;
    } else if (activeTab === "Body Type") {
      query += `&body_type=${encodeURIComponent(item.name)}`;
    } else if (activeTab === "Budget") {
      if (item.min !== undefined) query += `&min_price=${item.min}`;
      if (item.max !== undefined) query += `&max_price=${item.max}`;
    }

    router.push(`/motors${query}`);
  };

  const categories = homeData?.usedCars?.by_category || [];
  const brands = homeData?.usedCars?.make || [];
  const BodyType = homeData?.usedCars?.body_type || [];
  const Model = homeData?.usedCars?.model || [];
  const cities = homeData?.usedCars?.city || [];
  const Budget = homeData?.usedCars?.by_budget || [];

  const tabs = ["Category", "City", "Make", "Model", "Budget", "Body Type"];

  const getItems = () => {
    if (activeTab === "Make") return brands;
    if (activeTab === "City") return cities;
    if (activeTab === "Model") return Model;
    if (activeTab === "Budget") return Budget;
    if (activeTab === "Body Type") return BodyType;
    return categories;
  };
  const items = getItems();

  const visibleItems = items.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_CLICK); // reset on tab change
  }, [activeTab]);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: "smooth" });
  };

  return (
    <div className="bg-[#f2f3f3] py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-12 xl:px-20 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">
          Browse Used Cars
        </h2>

        {/* Tabs */}
        <div className="border-b border-gray-300 mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex flex-nowrap md:flex-wrap gap-6 md:gap-8 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-base md:text-[17px] font-medium transition-all whitespace-nowrap relative flex-shrink-0 ${
                  activeTab === tab
                    ? "text-gray-900 border-b-[3px] border-blue-500"
                    : "text-gray-600 hover:text-gray-900"
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

          <div ref={carouselRef} className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
            <div className="flex flex-wrap gap-4 py-2 min-w-fit md:min-w-fit">
              {visibleItems.map((item, index) => (
                <div
                  key={index}
                  className="snap-start w-[calc(50%-0.5rem)] sm:w-[calc(33.33%-1rem)] md:w-[145px] lg:w-[160px] h-[110px] sm:h-[130px] md:h-[120px] flex-shrink-0"
                >
                  {activeTab === "Model" || activeTab === "Budget" || activeTab === "City" ? (
                    <div className="h-full flex items-center justify-center text-center px-2">
                      <p
                        onClick={() => handleRedirect(item)}
                        className="text-sm md:text-[15px] font-medium text-gray-700 hover:text-blue-500 cursor-pointer line-clamp-2"
                      >
                        {item.name}
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleRedirect(item)}
                      className="bg-white p-3 sm:p-4 h-full rounded-lg shadow-sm border border-transparent hover:border-blue-300 hover:shadow-md transition-all flex flex-col items-center justify-center cursor-pointer group/card"
                    >
                      <div className="h-12 sm:h-14 flex items-center justify-center mb-2 sm:mb-3">
                        <img
                          src={item.image_url || item.icon || "https://img.icons8.com/ios/50/999999/car--v1.png"}
                          alt={item.name}
                          className="w-10 sm:w-12 opacity-70 group-hover/card:opacity-100 transition-opacity object-contain"
                        />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-700 text-center line-clamp-2">
                        {item.name}
                      </p>
                    </div>
                  )}
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

        {/* View More / View Less */}
        <div className="flex justify-center mt-4 sm:hidden gap-3">
          {visibleCount < items.length && (
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + ITEMS_PER_CLICK, items.length)
                )
              }
              className="bg-[#3eb549] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all"
            >
              View More
            </button>
          )}
          {visibleCount > ITEMS_PER_CLICK && (
            <button
              onClick={() => setVisibleCount(ITEMS_PER_CLICK)}
              className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg text-sm font-medium transition-all"
            >
              View Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsedCars;
