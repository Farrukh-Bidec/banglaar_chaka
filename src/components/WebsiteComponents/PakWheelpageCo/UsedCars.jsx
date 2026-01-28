"use client";
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
  // const [showAll, setShowAll] = useState(false);
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
console.log("categories",categories);

  const brands = homeData?.usedCars?.make || [
    { name: "Toyota", slug: "toyota", image_url: "https://img.icons8.com/color/48/000000/toyota.png" },
    { name: "Honda", slug: "honda", image_url: "https://img.icons8.com/color/48/000000/honda.png" },
    { name: "Nissan", slug: "nissan", image_url: "https://img.icons8.com/color/48/000000/nissan.png" },
    { name: "Suzuki", slug: "suzuki", image_url: "https://img.icons8.com/color/48/000000/suzuki.png" },
    { name: "Kia", slug: "kia", image_url: "https://img.icons8.com/color/48/000000/kia.png" },
    { name: "Hyundai", slug: "hyundai", image_url: "https://img.icons8.com/color/48/000000/hyundai.png" },
    { name: "Toyota", slug: "toyota", image_url: "https://img.icons8.com/color/48/000000/toyota.png" },
    { name: "Honda", slug: "honda", image_url: "https://img.icons8.com/color/48/000000/honda.png" },
    { name: "Nissan", slug: "nissan", image_url: "https://img.icons8.com/color/48/000000/nissan.png" },
    { name: "Suzuki", slug: "suzuki", image_url: "https://img.icons8.com/color/48/000000/suzuki.png" },
    { name: "Kia", slug: "kia", image_url: "https://img.icons8.com/color/48/000000/kia.png" },
    { name: "Hyundai", slug: "hyundai", image_url: "https://img.icons8.com/color/48/000000/hyundai.png" },
  ];

  const BodyType = homeData?.usedCars?.body_type || [
    { name: "Sedan", icon: "https://img.icons8.com/ios/50/999999/sedan.png" },
    { name: "Hatchback", icon: "https://img.icons8.com/ios/50/999999/hatchback.png" },
    { name: "SUV", icon: "https://img.icons8.com/ios/50/999999/suv.png" },
    { name: "Coupe", icon: "https://img.icons8.com/ios/50/999999/coupe.png" },
    { name: "Convertible", icon: "https://img.icons8.com/ios/50/999999/convertible.png" },
    { name: "Minivan", icon: "https://img.icons8.com/ios/50/999999/minivan.png" },
    { name: "Pickup Truck", icon: "https://img.icons8.com/ios/50/999999/pickup-truck.png" },
    { name: "Station Wagon", icon: "https://img.icons8.com/ios/50/999999/station-wagon.png" },
    { name: "Crossover", icon: "https://img.icons8.com/ios/50/999999/crossover.png" },
    { name: "Electric", icon: "https://img.icons8.com/ios/50/999999/electric-car.png" },
    { name: "Hybrid", icon: "https://img.icons8.com/ios/50/999999/hybrid-car.png" },
    { name: "Luxury", icon: "https://img.icons8.com/ios/50/999999/luxury-car.png" },
  ];

  const Model = homeData?.usedCars?.model || [
    { name: "Toyota", slug: "toyota" }, { name: "Honda", slug: "honda" }, { name: "Suzuki", slug: "suzuki" }, { name: "Kia", slug: "kia" }, { name: "Nissan", slug: "nissan" }, { name: "Hyundai", slug: "hyundai" },
    { name: "Mitsubishi", slug: "mitsubishi" }, { name: "Mazda", slug: "mazda" }, { name: "Subaru", slug: "subaru" }, { name: "Lexus", slug: "lexus" }, { name: "Infiniti", slug: "infiniti" }, { name: "Acura", slug: "acura" },
    { name: "Chevrolet", slug: "chevrolet" }, { name: "Ford", slug: "ford" }, { name: "BMW", slug: "bmw" }, { name: "Mercedes", slug: "mercedes" }, { name: "Audi", slug: "audi" }, { name: "Volkswagen", slug: "volkswagen" },
    { name: "Honda Civic", slug: "honda-civic" }, { name: "Toyota Corolla", slug: "toyota-corolla" }, { name: "Suzuki Swift", slug: "suzuki-swift" }, { name: "Kia Sportage", slug: "kia-sportage" }, { name: "Nissan Altima", slug: "nissan-altima" }, { name: "Hyundai Elantra", slug: "hyundai-elantra" }
  ];

  const cities = homeData?.usedCars?.city || [
    { name: "Karachi", slug: "karachi" }, { name: "Lahore", slug: "lahore" }, { name: "Islamabad", slug: "islamabad" }, { name: "Peshawar", slug: "peshawar" }, { name: "Quetta", slug: "quetta" }, { name: "Multan", slug: "multan" },
    { name: "Faisalabad", slug: "faisalabad" }, { name: "Rawalpindi", slug: "rawalpindi" }, { name: "Sialkot", slug: "sialkot" }, { name: "Gujranwala", slug: "gujranwala" }, { name: "Bahawalpur", slug: "bahawalpur" }, { name: "Sukkur", slug: "sukkur" }
  ];

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
  setVisibleCount(ITEMS_PER_CLICK);
}, [activeTab]);



  console.log("brands", brands);

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

    {/* Tabs – scrollable on mobile */}
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

    {/* Carousel Container */}
    <div className="relative group">
      {/* Left Arrow – hidden on very small screens */}
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
        className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
      >
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

      {/* Right Arrow */}
      {isScrollable && canScrollRight && (
  <button
    onClick={scrollRight}
    className="hidden sm:flex absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 md:w-10 md:h-10 rounded-full items-center justify-center shadow-md border border-gray-200 text-blue-400 hover:text-blue-600 transition-all"
  >
    <span className="text-xl md:text-2xl font-bold">›</span>
  </button>
)}

    </div>

    {/* Dots – simple pagination indicator (update logic if you have real pages) */}
    {/* <div className="flex justify-center mt-6 sm:mt-8 gap-2.5">
      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 cursor-pointer"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer"></div>
    </div> */}
    {visibleCount < items.length && (
  <button
    onClick={() =>
      setVisibleCount((prev) =>
        Math.min(prev + ITEMS_PER_CLICK, items.length)
      )
    }
    className="flex sm:hidden mx-auto my-4 bg-[#3eb549] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all"
  >
    View More
  </button>
)}


  </div>
</div>
  );
};

export default UsedCars;