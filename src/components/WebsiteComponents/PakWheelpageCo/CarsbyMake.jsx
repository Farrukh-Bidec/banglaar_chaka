import { useHomeStore } from '@/lib/stores/homeStore';
import { useRouter } from 'next/navigation';
import React from 'react';

const CarsbyMake = () => {
  const { homeData } = useHomeStore();
  const router = useRouter();

  const handleRedirect = (brand) => {
    router.push(`/motors?make=${encodeURIComponent(brand.name)}`);
  };

  // Use API data or fallback to empty array (or keep hardcoded if user wants mixed? "populate brands... reference... response" implies use API).
  // The API response for brand doesn't seem to have an icon url. 
  // I will use a placeholder or check if there's a way to get icons. 
  // For now, I'll assume we render what we have.
  const brands = homeData?.newCars?.new_cars_by_brand || [];


  return (
    <section className="py-10 px-30">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-[22px] font-semibold text-[#434343] mb-8">
          New Cars by Make
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-7 ">
          {brands.map((make, index) => (
            <div
              key={index}
              onClick={() => handleRedirect(make)} // ← redirect on click
              className="flex flex-col items-center group cursor-pointer"
            >

              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow duration-300 overflow-hidden mb-3">
                <img
                  src={make.image || make.icon || `https://ui-avatars.com/api/?name=${encodeURIComponent(make.name)}&background=random`}
                  alt={make.name}
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=' + make.name }}
                />
              </div>

              {/* Brand Name */}
              <p className="text-[#3b6598] text-[15px] font-medium group-hover:underline">
                {make.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarsbyMake;