import React from 'react';

const OurVideos = () => {
  // YouTube Thumbnail URL format: https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg
  const mainVideo = {
    title: "First look at Ferrari 296 GTB | Hybrid Ferrari ka kiya hi maza h...",
    thumbnail: "https://img.youtube.com/vi/teAleRkTKSQ/maxresdefault.jpg",
    link: "https://youtu.be/teAleRkTKSQ"
  };

  const sideVideos = [
    {
      title: "A daily driven GTR owner revie...",
      thumbnail: "https://img.youtube.com/vi/eDojseQ0LK4/mqdefault.jpg",
      link: "https://youtu.be/eDojseQ0LK4"
    },
    {
      title: "Mercedes SLK 320 Restoration | ...",
      thumbnail: "https://img.youtube.com/vi/46mGOez5j3g/mqdefault.jpg",
      link: "https://youtu.be/46mGOez5j3g"
    },
    {
      title: "Ferrari 296 GTB Drive Review | ...",
      thumbnail: "https://img.youtube.com/vi/VqPHIkG67gI/mqdefault.jpg",
      link: "https://youtu.be/VqPHIkG67gI"
    },
    {
      title: "Audi A5 owner Review: Design, ...",
      thumbnail: "https://img.youtube.com/vi/SJ9YcIOWasw/mqdefault.jpg",
      link: "https://youtu.be/SJ9YcIOWasw"
    }
  ];

  return (
    <section className="bg-[#f2f3f3] py-12 px-4 flex justify-center font-sans">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-[22px] font-semibold text-[#434343]">Browse Our Videos</h2>
          <button className="text-[#3b6598] text-[14px] hover:underline">View All Videos</button>
        </div>

        {/* Videos Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Left Side: Large Main Video */}
          <a href={mainVideo.link} target="_blank" rel="noreferrer" className="bg-white rounded-sm overflow-hidden shadow-sm border border-gray-200 group cursor-pointer">
            <div className="relative aspect-video">
              <img 
                src={mainVideo.thumbnail} 
                alt="Main Video" 
                className="w-full h-full object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center border-2 border-white/80">
                  <div className="ml-1 border-y-[10px] border-y-transparent border-l-[18px] border-l-white"></div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-[#3b6598] text-[15px] font-medium truncate group-hover:underline">
                {mainVideo.title}
              </h3>
            </div>
          </a>

          {/* Right Side: 2x2 Small Videos Grid */}
          <div className="grid grid-cols-2 gap-4">
            {sideVideos.map((video, index) => (
              <a key={index} href={video.link} target="_blank" rel="noreferrer" className="bg-white rounded-sm overflow-hidden shadow-sm border border-gray-200 group cursor-pointer">
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover"
                  />
                  {/* Small Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                    <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center border border-white/80">
                      <div className="ml-1 border-y-[6px] border-y-transparent border-l-[10px] border-l-white"></div>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-[#3b6598] text-[13px] font-medium line-clamp-1 group-hover:underline">
                    {video.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurVideos;