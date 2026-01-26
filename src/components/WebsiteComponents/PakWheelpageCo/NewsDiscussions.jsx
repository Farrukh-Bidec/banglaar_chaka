"use client";
import React, { useState } from 'react';

const NewsDiscussions = () => {
  const [activeTab, setActiveTab] = useState('Automotive News');

  const newsItems = [
    {
      id: 1,
      title: "Honda CG 150 Now Available on Easy Installment Plans",
      date: "January 12, 2026",
      description: "Get the Honda CG 150 on easy monthly installments for up to 36 months. Explore down payment options and financing details for Atlas Honda's premium bike.",
      image: "https://static.pakwheels.com/2026/01/cg150-696x390-1.jpg",
    },
    {
      id: 2,
      title: "Unique Plates Set for Auction in Khyber Pakhtunkhwa",
      date: "January 12, 2026",
      description: "Khyber Pakhtunkhwa announces an auction of specialized tribal number plates like Afridi, Khattak, and Yousafzai on Jan 27. Base price starts at Rs. 1 million.",
      image: "https://static.pakwheels.com/2026/01/Artboard11.jpg",
    }
  ];

  const reviewItems = [
    {
      id: 1,
      title: "Happy To Buy Yaris",
      subTitle: "Toyota Yaris Sedan GLI CVT 1.3",
      rating: 4,
      author: "Ali",
      date: "Jan 07, 2026",
      description: "Exterior is awesome only back side required to be updated. Good fuel average. Smooth gear shifting due to CVT. I have used Altis 1.6 2015 and Reborn 2011 but this car isn't lesser in style and comfort.",
      image: "https://cache2.pakwheels.com/system/car_generation_pictures/8051/original/Cover.jpg?1737968957"
    },
    {
      id: 2,
      title: "French Beauty",
      subTitle: "Peugeot 2008 Active",
      rating: 4,
      author: "Khalid Bakhtyar",
      date: "Jan 07, 2026",
      description: "I have used my Peugeot for one year now. As a car owner for 5 decades, I found it the best amongst Compact SUVs of today. To get the best out of it, the owners must obtain printed copy of User's manual.",
      image: "https://cache3.pakwheels.com/system/car_generation_pictures/9124/original/Cover.jpg?1754053368"
    }
  ];

  const discussionItems = [
    {
      id: 1,
      userInitial: "S",
      title: "Registration process of a commercial vehicle in Punjab",
      author: "Sohaib.Tariq",
      replies: "5 Replies",
      category: "General Car Discussion"
    },
    {
      id: 2,
      userInitial: "M",
      title: "Best fuel additive for Honda Civic Turbo?",
      author: "M.Bilal",
      replies: "12 Replies",
      category: "Technical Maintenance"
    },
    {
      id: 3,
      userInitial: "A",
      title: "Advice needed: Buying a used Prado 2012 model",
      author: "Ahmed_Raza",
      replies: "8 Replies",
      category: "4x4 & Offroading"
    }
  ];

  return (
    <section className="bg-white py-12 px-4 flex justify-center font-sans">
      <div className="max-w-6xl w-full">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[22px] font-semibold text-[#434343]">News, Reviews & Discussions</h2>
          <button className="text-[#3b6598] text-[14px] hover:underline">
            {activeTab === 'Car Reviews' ? 'Read All Car Reviews' : 
             activeTab === 'Discussions' ? 'View All Discussions' : 'Read All Recent News'}
          </button>
        </div>

        {/* Tabs System */}
        <div className="border-b border-gray-200 mb-6 flex space-x-8">
          {['Automotive News', 'Car Reviews', 'Discussions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-[16px] transition-all ${
                activeTab === tab 
                ? "text-[#3b6598] font-semibold border-b-4 border-[#3b6598]" 
                : "text-[#434343] hover:text-[#3b6598]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Content based on Tab */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. News Tab */}
            {activeTab === 'Automotive News' && newsItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-4 group cursor-pointer">
                <div className="w-full md:w-[200px] h-[130px] flex-shrink-0 overflow-hidden rounded-sm border border-gray-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[#3b6598] text-[17px] font-semibold group-hover:underline">{item.title}</h3>
                  <span className="text-gray-400 text-[13px] my-1">{item.date}</span>
                  <p className="text-[#666] text-[14px] line-clamp-3 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}

            {/* 2. Reviews Tab */}
            {activeTab === 'Car Reviews' && reviewItems.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 group cursor-pointer">
                <div className="flex gap-4">
                  <div className="w-[120px] h-[80px] flex-shrink-0 border border-gray-200 p-1">
                    <img src={review.image} alt={review.title} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-[#3b6598] text-[17px] font-semibold group-hover:underline">{review.title}</h3>
                    <p className="text-gray-500 text-[14px]">{review.subTitle}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-orange-400 text-[14px]">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                        ))}
                      </div>
                      <span className="text-gray-700 text-[13px] font-medium">{review.author}</span>
                      <span className="text-gray-400 text-[13px]">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#666] text-[14px] mt-3 line-clamp-2 leading-relaxed italic">
                  {review.description}
                </p>
              </div>
            ))}

            {/* 3. Discussions Tab (Updated to Match Screenshot 100%) */}
            {activeTab === 'Discussions' && (
              <div className="space-y-0">
                {discussionItems.map((disc) => (
                  <div key={disc.id} className="flex items-center gap-4 py-4 border-b border-gray-100 group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[#eef3f8] flex items-center justify-center text-[#3b6598] font-bold text-lg flex-shrink-0">
                      {disc.userInitial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#333] text-[15px] font-medium group-hover:text-[#3b6598] line-clamp-1">
                        {disc.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[12px] text-gray-400 mt-1">
                        <span className="hover:underline">By {disc.author}</span>
                        <span>•</span>
                        <span className="hover:underline">{disc.category}</span>
                      </div>
                    </div>
                    <div className="text-[13px] text-gray-500 font-normal">
                      {disc.replies}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: BYD Ad */}
          <div className="lg:col-span-1">
            <div className="relative h-full min-h-[350px] rounded-sm overflow-hidden bg-gray-900 group">
              <img 
                src="https://cache2.pakwheels.com/system/car_index_social_image_pages/5865/original/The_Switch_Ad.jpg" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700" 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 bg-black/20">
                <h4 className="text-[12px] tracking-[4px] uppercase font-light">BYD Presents</h4>
                <h2 className="text-4xl font-bold italic tracking-tighter my-2">THE SWITCH</h2>
                <button className="mt-4 border border-white px-6 py-2 text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  Click to Watch
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsDiscussions;