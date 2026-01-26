"use client";
import React from 'react';
import { useRouter } from "next/navigation";

const PakWheelsOfferings = () => {
    const router = useRouter();
const handleRedirect = (item) => {
  router.push(`/motors?service=${encodeURIComponent(item.title)}`);
};

  const offerings = [
    {
      title: 'SELL IT FOR ME',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIkCKtktjQ0reWE6c-6N1bwKU_02TQDWFxjA&s', // Replace with your local assets
    },
    {
      title: 'AUCTION SHEET VERIFICATION',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzaNf6l-yk_FIh1OhoQN4P6OrWpPMiyCoYsw&s',
    },
    {
      title: 'CAR INSPECTION',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7GovfcBbsvcXKskPFE2gFksKmII51bfPtUA&s',
    },
    {
      title: 'CAR INSURANCE',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUvJNPCGUc3ENvRyFKwWWLt7A80hyunrVIcA&s',
    },
    {
      title: 'CAR FINANCE',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVyj7RNT-2ANmNg_blChqismtZCfyagngvw&s',
    },
    {
      title: 'CAR REGISTRATION',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ3qUGMWHhi2moNHL5ZKgDA8dbpTPBDfSoIQ&s',
    },
    {
      title: 'OWNERSHIP TRANSFER',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQChb-JWMwckTRfv6BXZLjQc-PtevCiwwU5HA&s',
    },
  ];

  return (
    <section className="py-12 px-4 md:px-0">
      <div className="max-w-6xl mx-auto px-10">
        {/* Main Heading */}
        <h2 className="text-[22px] font-semibold text-[#434343] mb-8">
          PakWheels Offerings
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offerings.map((item, index) => (
            <div
  key={index}
  onClick={() => handleRedirect(item)}
  className="bg-white border border-gray-200 rounded-sm p-4 flex items-center gap-6 hover:shadow-lg transition-shadow cursor-pointer"
>

              {/* Image Container */}
              <div className="w-28 flex-shrink-0">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Text Content */}
              <div>
                <p className="text-[#3b6598] text-[15px] font-bold mb-1">
                  PakWheels
                </p>
                <h3 className="text-[#434343] text-lg font-bold leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PakWheelsOfferings;