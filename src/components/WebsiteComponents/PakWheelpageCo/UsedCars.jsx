"use client";
import { useHomeStore } from "@/lib/stores/homeStore";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const UsedCars = () => {
  const { homeData } = useHomeStore();
  const [activeTab, setActiveTab] = useState("Category");
  const carouselRef = useRef(null);
  const router = useRouter();

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

  console.log("brands", brands);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: "smooth" });
  };

  return (
    <div className="bg-[#f2f3f3] py-12 px-40 min-h-screen flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Browse Used Cars</h2>

        {/* Tabs */}
        <div className="border-b border-gray-300 mb-8 flex flex-wrap gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[17px] font-medium transition-all relative ${activeTab === tab
                ? "text-gray-900 border-b-[3px] border-blue-500"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <button
            onClick={scrollLeft}
            className="absolute -left-5 top-[35%] -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-gray-200 text-blue-400 hover:text-blue-600 transition-all"
          >
            <span className="text-xl font-bold">‹</span>
          </button>


          <div
            ref={carouselRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
          >
            <div className="flex flex-col flex-wrap h-[380px] w-fit gap-4 py-2">
              {getItems().map((item, index) => (
                <div
                  key={index}
                  className="w-[145px] h-[120px]" // Fixed width to ensure 6 columns fit well
                >
                  {activeTab === "Model" || activeTab === "Budget" || activeTab === "City" ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <p onClick={() => handleRedirect(item)} className="text-sm font-medium text-gray-700 hover:text-blue-500 cursor-pointer">
                        {item.name}
                      </p>
                    </div>
                  ) : (
                    <div onClick={() => handleRedirect(item)} className="bg-white p-4 h-full rounded-md shadow-sm border border-transparent hover:border-blue-300 hover:shadow-md transition-all flex flex-col items-center justify-center cursor-pointer group/card">
                      <div className="h-14 flex items-center justify-center mb-3">
                        <img
                          src={item.image_url || item.icon || "https://img.icons8.com/ios/50/999999/car--v1.png"}
                          alt={item.name}
                          className="w-12 opacity-70 group-hover/card:opacity-100 transition-opacity object-contain"
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-700 text-center">
                        {item.name}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollRight}
            className="absolute -right-4 top-[35%] -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-gray-200 text-blue-400 hover:text-blue-600 transition-all"
          >
            <span className="text-xl font-bold">›</span>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 cursor-pointer"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default UsedCars;