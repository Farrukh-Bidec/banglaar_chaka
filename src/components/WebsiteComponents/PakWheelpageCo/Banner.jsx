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
  <section className="min-h-[480px] sm:min-h-[520px] bg-gradient-to-b from-[#03162f] to-[#073b74] flex items-center justify-center py-8 sm:py-10 md:py-12 lg:py-16">
  <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center text-white">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 leading-tight">
      Find Used Cars in Pakistan
    </h1>
    <p className="text-base sm:text-lg opacity-90 mb-8 sm:mb-10">
      With thousands of cars, we have just the right one for you
    </p>

    {/* Search Bar Container */}
    <div
      ref={wrapperRef}
      className="relative bg-white rounded-lg sm:rounded-md shadow-xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x"
    >
      {/* Make / Model Input */}
      <input
        type="text"
        placeholder="Car Make or Model"
        className="flex-1 px-5 py-4 text-gray-700 outline-none placeholder-gray-400 w-full text-base"
      />

      {/* Cities Dropdown Trigger */}
      <div
        onClick={() => {
          setCityOpen(!cityOpen);
          setPriceOpen(false);
        }}
        className="relative px-5 py-4 text-gray-700 cursor-pointer flex justify-between items-center bg-white hover:bg-gray-50 transition-colors min-w-full md:min-w-[220px]"
      >
        <span className="truncate">{selectedCity}</span>
        <span className="text-gray-400 text-xs ml-2">▼</span>

        {cityOpen && (
          <div
            className="absolute top-full left-0 w-full md:w-[280px] bg-white shadow-2xl z-[100] text-left border border-gray-200 mt-1 rounded-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 bg-gray-50 border-b">
              <input
                type="text"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                placeholder="Search cities..."
                className="w-full px-3 py-2 border border-gray-300 rounded outline-none text-gray-700 text-sm focus:border-blue-500"
                autoFocus
              />
            </div>

            <ul className="max-h-64 overflow-y-auto text-sm divide-y divide-gray-100">
              <li
                className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-blue-700 font-medium"
                onClick={() => {
                  setSelectedCity("All Cities");
                  setCityOpen(false);
                  setCitySearch("");
                }}
              >
                All Cities
              </li>

              <div className="px-5 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                Popular Cities
              </div>

              {popularCities
                .filter((c) => c.toLowerCase().includes(citySearch.toLowerCase()))
                .map((city) => (
                  <li
                    key={city}
                    className="px-5 py-3 hover:bg-gray-50 cursor-pointer text-gray-700"
                    onClick={() => {
                      setSelectedCity(city);
                      setCityOpen(false);
                      setCitySearch("");
                    }}
                  >
                    {city}
                  </li>
                ))}

              <div className="px-5 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t bg-gray-50">
                Other Cities
              </div>

              {otherCities
                .filter((c) => c.toLowerCase().includes(citySearch.toLowerCase()))
                .map((city) => (
                  <li
                    key={city}
                    className="px-5 py-3 hover:bg-gray-50 cursor-pointer text-gray-700"
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

      {/* Price Range Dropdown Trigger */}
      <div
        onClick={() => {
          setPriceOpen(!priceOpen);
          setCityOpen(false);
        }}
        className="relative px-5 py-4 text-gray-700 cursor-pointer flex justify-between items-center bg-white hover:bg-gray-50 transition-colors min-w-full md:min-w-[220px]"
      >
        <span className="truncate">
          {minPrice && maxPrice
            ? `${minPrice} - ${maxPrice} Lacs`
            : minPrice
            ? `From ${minPrice} Lacs`
            : "Price Range"}
        </span>
        <span className="text-gray-400 text-xs ml-2">▼</span>

        {priceOpen && (
          <div
            className="absolute top-full left-0 w-full md:w-[280px] bg-white shadow-2xl z-[100] border border-gray-200 mt-1 rounded-md overflow-hidden"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-3 p-4 bg-blue-50/50 border-b">
              <div className="bg-white border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700 rounded">
                Min: {minPrice ? `${minPrice} L` : "–"}
              </div>
              <div className="bg-white border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700 rounded">
                Max: {maxPrice ? `${maxPrice} L` : "–"}
              </div>
            </div>

            <ul className="max-h-64 overflow-y-auto text-sm">
              {!minPrice ? (
                prices.map((price) => (
                  <li
                    key={price}
                    className="px-5 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-0 text-gray-700"
                    onMouseDown={() => {
                      setMinPrice(price);
                      setMaxPrice(null);
                    }}
                  >
                    Up to {price} Lacs
                  </li>
                ))
              ) : (
                <>
                  {prices
                    .filter((p) => p > minPrice)
                    .map((price) => (
                      <li
                        key={price}
                        className="px-5 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-0 text-gray-700"
                        onMouseDown={() => {
                          setMaxPrice(price);
                          setPriceOpen(false);
                        }}
                      >
                        {minPrice} – {price} Lacs
                      </li>
                    ))}
                  <li
                    className="px-5 py-3 text-blue-600 font-medium hover:bg-blue-50 cursor-pointer border-t"
                    onMouseDown={() => {
                      setMinPrice(null);
                      setMaxPrice(null);
                    }}
                  >
                    ← Clear / Reset
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Search Button */}
      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-5 md:py-0 md:px-8 flex items-center justify-center transition-colors font-medium text-base md:text-lg">
        <svg
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          className="mr-2 md:mr-0"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="md:hidden">Search Cars</span>
      </button>
    </div>

    {/* Advanced Filter */}
    <div className="mt-8 sm:mt-10">
      <button className="border-2 border-white/70 text-white px-7 py-3 rounded-lg hover:bg-white hover:text-[#073b74] transition font-medium text-sm sm:text-base shadow-sm">
        Advanced Filter →
      </button>
    </div>
  </div>
</section>
  );
};

export default Banner;