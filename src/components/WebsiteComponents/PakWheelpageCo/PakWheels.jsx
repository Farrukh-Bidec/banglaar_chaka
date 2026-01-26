"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const PakWheels = () => {
  const router = useRouter();

  const handleRedirect = (type) => {
    // type se decide hoga ke kaunsa button click hua
    router.push(`/motors?service=${encodeURIComponent(type)}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-5xl bg-white rounded-sm overflow-hidden">
        {/* Main Heading */}
        <div className="text-center py-6 border-b border-gray-100">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
            Sell Your Car on PakWheels and Get the Best Price
          </h2>
        </div>

        <div className="flex flex-col md:flex-row relative">
          {/* Left Section */}
          <div className="flex-1 p-8 md:p-12">
            <h3 className="text-xl font-bold text-blue-900 mb-6">Sell It Myself!</h3>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span className="text-gray-700">Post an ad in 2 minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span className="text-gray-700">20 million users</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span className="text-gray-700">Connect directly with buyers</span>
              </li>
            </ul>
            <button
              onClick={() => handleRedirect("Sell It Myself")}
              className="bg-[#b73439] hover:bg-[#a02e32] text-white font-semibold py-3 px-10 rounded-md transition-colors text-lg"
            >
              Post Your Ad
            </button>
          </div>

          {/* OR Divider */}
          <div className="hidden md:flex items-center justify-center absolute inset-0 pointer-events-none">
            <div className="h-4/5 w-[1px] bg-gray-200 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-4">
                <span className="text-gray-400 font-bold text-xl tracking-tighter">OR</span>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center justify-center py-4">
            <div className="w-full h-[1px] bg-gray-200 flex items-center justify-center">
              <span className="bg-white px-4 text-gray-400 font-bold">OR</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 p-8 md:p-12">
            <h3 className="text-xl font-bold text-blue-900 mb-6">Sell It For Me</h3>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span className="text-gray-700">Sell your car without hassle</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span className="text-gray-700">Free Inspection & Featured ad</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span className="text-gray-700">Maximize offer with sales agent</span>
              </li>
            </ul>
            <button
              onClick={() => handleRedirect("Sell It For Me")}
              className="bg-[#518ecb] hover:bg-[#457db5] text-white font-semibold py-3 px-6 rounded-md transition-colors text-lg"
            >
              Help Me Sell My Car!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PakWheels;
