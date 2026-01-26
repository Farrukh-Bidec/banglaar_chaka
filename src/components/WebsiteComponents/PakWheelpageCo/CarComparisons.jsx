"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const CarComparisons = () => {
     const router = useRouter();
  const sideComparisons = [
    { car1: "Prince Pearl", car2: "United Alpha" },
    { car1: "Changan Oshan X7", car2: "Hyundai Tucson" }
  ];
    const handleRedirect = (car1, car2) => {
    router.push(`/motors?compare=${encodeURIComponent(car1)}_vs_${encodeURIComponent(car2)}`);
  };

  return (
    <section className="bg-[#f2f3f3] py-5 px-4">
      {/* Container ko max-width de kar left par rakha hai jaisa image mein hai */}
      <div className="max-w-4xl mx-auto md:mx-0 md:ml-20"> 
        
        {/* Header - Tight spacing */}
        <div className="flex justify-between items-baseline mb-3 max-w-[700px]">
          <h2 className="text-[20px] font-semibold text-[#434343]">
            Car Comparisons
          </h2>
          <a href="#" className="text-[#3b6598] text-[13px] hover:underline">
            All Car Comparisons
          </a>
        </div>

        {/* Main Comparison Box - Reduced size and tight padding */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col md:flex-row max-w-[700px]">
          
          {/* Left Section (Featured) - Reduced padding */}
          <div className="flex-[1.8] relative p-4 border-r border-gray-100">
            {/* Featured Tag - Exact position */}
            <div className="absolute top-0 left-0 bg-[#b73439] text-white text-[12px] font-bold px-2 p-5 py-0.5 uppercase">
              Featured
            </div>

            <div className="flex items-center justify-between mt-4 mb-6 relative px-10">
              {/* Car 1 */}
              <div className="text-center">
                <img 
                  src="https://cache2.pakwheels.com/system/car_generation_pictures/6006/original/Revo_-_PNG.png?1635483853" 
                  alt="Toyota Hilux" 
                  className="w-40 h-auto object-contain mx-auto"
                />
                <p className="text-[#3b6598] font-bold text-[14px] mt-2">Toyota Hilux</p>
              </div>

              {/* VS Circle - Exact size and position */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#b73439] text-white font-bold text-xs w-12 h-12 rounded-full flex items-center justify-center border-[3px] border-white shadow-sm z-10">
                VS
              </div>

              {/* Car 2 */}
              <div className="text-center">
                <img 
                  src="https://cache2.pakwheels.com/system/car_generation_pictures/7897/original/Cover_%281%29.jpg?1735900279" 
                  alt="JAC T9" 
                  className="w-40 h-auto object-contain mx-auto"
                />
                <p className="text-[#3b6598] font-bold text-[14px] mt-2">JAC T9</p>
              </div>
            </div>

            {/* Button - Exact styling */}
            <div className="flex justify-center mb-1">
               <button 
                onClick={() => handleRedirect("Toyota Hilux", "JAC T9")}
                className="border border-[#3b6598] text-[#3b6598] text-sm py-1.5 px-12 rounded-sm hover:bg-[#3b6598] hover:text-white transition-all"
              >
                View Comparison
              </button>
            </div>
          </div>

          {/* Right Section (List) - Tight vertical spacing */}
          <div className="flex-1 flex flex-col">
            {sideComparisons.map((item, index) => (
              <div 
                key={index} 
                className={`flex-1 flex flex-col items-center justify-center py-4 cursor-pointer hover:bg-gray-50 transition-colors ${index === 0 ? 'border-b border-gray-100' : ''}`}
              >
                <p className="text-[#434343] text-[14px] mb-1">{item.car1}</p>
                <div className="bg-[#b73439] text-white font-bold text-[8px] w-5 h-5 rounded-full flex items-center justify-center mb-1">
                  VS
                </div>
                <p className="text-[#434343] text-[14px]">{item.car2}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CarComparisons;