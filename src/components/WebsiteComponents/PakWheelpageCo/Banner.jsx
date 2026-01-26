"use client";
import { useState, useRef, useEffect } from "react";

const citiesList = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Peshawar",
  "Quetta",
  "Multan",
  "Faisalabad",
  "Hyderabad",
];

const Banner = () => {
  const [cityOpen, setCityOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const wrapperRef = useRef(null);
  const prices = [5, 10, 15, 20, 25, 30];
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setCityOpen(false);
        setPriceOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const popularCities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar"];

  const otherCities = citiesList.filter((c) => !popularCities.includes(c));

  return (
    <section className="min-h-[520px] bg-gradient-to-b from-[#03162f] to-[#073b74] flex items-center justify-center py-10">
      <div className="w-full max-w-6xl px-4 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-semibold mb-3 leading-tight">
          Find Used Cars in Pakistan
        </h1>
        <p className="text-base md:text-lg opacity-90 mb-10">
          With thousands of cars, we have just the right one for you
        </p>

        {/* Search Bar Container - Mobile Responsive */}
        <div
          ref={wrapperRef}
          className="relative bg-white rounded-md flex flex-col md:flex-row items-stretch md:items-center overflow-visible max-w-4xl mx-auto shadow-lg"
        >
          {/* Make / Model Input */}
          <input
            type="text"
            placeholder="Car Make or Model"
            className="flex-1 px-5 py-4 text-gray-700 outline-none border-b md:border-b-0 md:border-r rounded-t-md md:rounded-t-none md:rounded-l-md"
          />

          {/* Cities Dropdown */}
          <div
            onClick={() => {
              setCityOpen(!cityOpen);
              setPriceOpen(false);
            }}
            className="relative px-5 py-4 text-gray-700 border-b md:border-b-0 md:border-r min-w-full md:min-w-[200px] cursor-pointer flex justify-between items-center bg-white"
          >
            <span>{selectedCity}</span>
            <span className="text-xs">▼</span>

            {cityOpen && (
              <div
                className="absolute top-full left-0 w-full bg-white shadow-2xl z-50 text-left border border-gray-100 mt-0.5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2 bg-[#f2f5fb] border-b border-gray-200">
                  <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 outline-none text-gray-700 text-sm rounded-sm"
                    autoFocus
                  />
                </div>

                <ul className="max-h-60 overflow-y-auto">
                  <li
                    className="px-4 py-2 hover:bg-[#e9f1ff] cursor-pointer text-[#4d6ba3] text-sm"
                    onClick={() => {
                      setSelectedCity("All Cities");
                      setCityOpen(false);
                      setCitySearch("");
                    }}
                  >
                    All Cities
                  </li>

                  <li className="px-4 py-2 text-[13px] font-bold text-gray-800">
                    Popular Cities
                  </li>

                  {popularCities
                    .filter((c) => c.toLowerCase().includes(citySearch.toLowerCase()))
                    .map((city) => (
                      <li
                        key={city}
                        className="px-6 py-1.5 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm"
                        onClick={() => {
                          setSelectedCity(city);
                          setCityOpen(false);
                          setCitySearch("");
                        }}
                      >
                        {city}
                      </li>
                    ))}

                  <li className="px-4 py-2 text-[13px] font-bold text-gray-800 border-t mt-1">
                    Other Cities
                  </li>

                  {otherCities
                    .filter((c) => c.toLowerCase().includes(citySearch.toLowerCase()))
                    .map((city) => (
                      <li
                        key={city}
                        className="px-6 py-1.5 hover:bg-gray-100 cursor-pointer text-gray-600 text-sm"
                        onClick={() => {
                          setSelectedCity(city);
                          setCityOpen(false);
                          setCitySearch("");
                        }}
                      >
                        {city}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          {/* Price Range Dropdown */}
          <div
            onClick={() => {
              setPriceOpen(!priceOpen);
              setCityOpen(false);
            }}
            className="relative px-5 py-4 text-gray-700 min-w-full md:min-w-[200px] cursor-pointer flex justify-between items-center bg-white"
          >
            <span className="truncate">
              {minPrice && maxPrice ? `${minPrice} - ${maxPrice} Lacs` : "Price Range"}
            </span>
            <span className="text-xs">▼</span>

            {priceOpen && (
              <div
                className="absolute top-full left-0 w-full bg-white shadow-2xl z-50 border border-gray-200 mt-0.5"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="grid grid-cols-2 gap-2 p-3 bg-[#eef3ff] border-b">
                  <div className="bg-white border px-2 py-1 text-xs md:text-sm">
                    Min: {minPrice ? `${minPrice} L` : "-"}
                  </div>
                  <div className="bg-white border px-2 py-1 text-xs md:text-sm">
                    Max: {maxPrice ? `${maxPrice} L` : "-"}
                  </div>
                </div>

                {!minPrice && (
                  <ul className="max-h-56 overflow-y-auto text-sm">
                    {prices.map((price) => (
                      <li
                        key={price}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onMouseDown={() => {
                          setMinPrice(price);
                          setMaxPrice(null);
                        }}
                      >
                        {price} Lacs
                      </li>
                    ))}
                  </ul>
                )}

                {minPrice && (
                  <ul className="max-h-56 overflow-y-auto text-sm">
                    {prices
                      .filter((p) => p > minPrice)
                      .map((price) => (
                        <li
                          key={price}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onMouseDown={() => {
                            setMaxPrice(price);
                            setPriceOpen(false);
                          }}
                        >
                          {price} Lacs
                        </li>
                      ))}
                    <li 
                      className="px-4 py-2 text-blue-600 font-bold hover:bg-gray-100 cursor-pointer border-t"
                      onMouseDown={() => setMinPrice(null)}
                    >
                      ← Reset Min
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button className="bg-green-500 hover:bg-green-600 p-5 md:px-7 rounded-b-md md:rounded-b-none md:rounded-r-md flex items-center justify-center transition-colors">
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="md:hidden ml-2 font-semibold">Search Cars</span>
          </button>
        </div>

        {/* Advanced Filter Button */}
        <div className="mt-8">
          <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-[#073b74] transition font-medium text-sm md:text-base">
            Advanced Filter →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;