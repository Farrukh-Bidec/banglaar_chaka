"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ManagedbyPakWheels = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const handleRedirect = (car) => {
    router.push(`/motors?car=${encodeURIComponent(car.name)}`);
  };
  const cars = [
    {
      name: "Toyota Crown 2004",
      price: "৳ 5,500,000",
      location: "Peshawar",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZSNz0JPeTDlNOMP4ECSotaazZFZjQ7dxUw&s", // Replace with real image
      featured: true
    },
    {
      name: "Haval H6 2025",
      price: "৳ 11,500,000",
      location: "Faisalabad",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZSNz0JPeTDlNOMP4ECSotaazZFZjQ7dxUw&s",
      featured: true
    },
    {
      name: "Toyota Corolla 2002",
      price: "৳ 3,500,000",
      location: "Peshawar",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThbetA7BVO6b35NqNQnLeGrZmbAHyi12lJ4Q&s",
      featured: true
    },
    {
      name: "Toyota Premio 2007",
      price: "৳ 4,000,000",
      location: "Peshawar",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ6DW3v2Y2IAR_a8-n7VxfTZvKEU4pXjUXlg&s",
      featured: true
    },
    {
      name: "Honda Civic 2022",
      price: "৳ 8,500,000",
      location: "Lahore",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2rXmVbGKGlIDQ0lnQwBbX5rMYWIFNr4p1wg&s",
      featured: true
    },
    {
      name: "Honda Civic 2022",
      price: "৳ 8,500,000",
      location: "Lahore",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO1fSnWMDkt6nD5kdvWvwrPebDKeD2LN0H2Q&s",
      featured: true
    },
    {
      name: "Honda Civic 2022",
      price: "৳ 8,500,000",
      location: "Lahore",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUvJNPCGUc3ENvRyFKwWWLt7A80hyunrVIcA&s",
      featured: true
    }
  ];

  const nextSlide = () => {
    if (currentIndex < cars.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="bg-[#f2f3f3] py-10 px-10 sm:px-35 flex justify-center">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[22px] font-semibold text-[#434343]">
            Managed by PakWheels
          </h2>
          <a href="#" className="text-[#3b6598] text-sm hover:underline">
            View All Managed By PakWheels Cars
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden group">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute top-1/2 -translate-y-1/2 z-1 bg-white w-10 h-10 rounded-full  flex items-center justify-center shadow-md border border-gray-200 transition-all ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
          >
            <span className="text-blue-500 text-2xl">‹</span>
          </button>

          <div
            className="flex transition-transform duration-500 ease-out gap-4"
            style={{ transform: `translateX(-${currentIndex * 265}px)` }}
          >
            {cars.map((car, index) => (
              <div
                key={index}
                onClick={() => handleRedirect(car)}
                className="min-w-[245px] bg-white rounded-sm overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Image & Tag */}
                <div className="relative h-44 bg-gray-200">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                  {car.featured && (
                    <div className="absolute top-0 left-0 bg-[#b73439] text-white text-[10px] font-bold px-2 py-0.5 uppercase">
                      Featured
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-3">
                  <h3 className="text-[#3b6598] font-bold text-[15px] truncate">
                    {car.name}
                  </h3>
                  <p className="text-[#3eb549] font-bold text-[14px] mt-1">
                    {car.price}
                  </p>
                  <p className="text-gray-400 text-[13px] mt-1 font-medium">
                    {car.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= cars.length - 4}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-gray-200 transition-all ${currentIndex >= cars.length - 4 ? 'opacity-0' : 'opacity-100'}`}
          >
            <span className="text-blue-500 text-2xl">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagedbyPakWheels;