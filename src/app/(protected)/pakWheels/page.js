import Banner from '@/components/WebsiteComponents/PakWheelpageCo/Banner'
import BikesbyMake from '@/components/WebsiteComponents/PakWheelpageCo/BikesbyMake'
import CarComparisons from '@/components/WebsiteComponents/PakWheelpageCo/CarComparisons'
import CarsbyMake from '@/components/WebsiteComponents/PakWheelpageCo/CarsbyMake'
import CarsforSaleView from '@/components/WebsiteComponents/PakWheelpageCo/CarsforSaleView'
import FeaturedNewCars from '@/components/WebsiteComponents/PakWheelpageCo/FeaturedNewCars'
import ManagedbyPakWheels from '@/components/WebsiteComponents/PakWheelpageCo/ManagedbyPakWheels'
import NewsDiscussions from '@/components/WebsiteComponents/PakWheelpageCo/NewsDiscussions'
import OurVideos from '@/components/WebsiteComponents/PakWheelpageCo/OurVideos'
import PakWheels from '@/components/WebsiteComponents/PakWheelpageCo/PakWheels'
import PakWheelsOfferings from '@/components/WebsiteComponents/PakWheelpageCo/PakWheelsOfferings'
import PartsAccessories from '@/components/WebsiteComponents/PakWheelpageCo/PartsAccessories'
import PopularNewBikes from '@/components/WebsiteComponents/PakWheelpageCo/PopularNewBikes'
import UsedCars from '@/components/WebsiteComponents/PakWheelpageCo/UsedCars'

import React from 'react'

const page = () => {
  return (
    <div>
      {/* <PakWheels/> */}
      <Banner />
      <PakWheels />
      <UsedCars />
      <PakWheelsOfferings />
      <ManagedbyPakWheels />
      <CarsforSaleView />
      <FeaturedNewCars />
      <CarsbyMake />
      <CarComparisons />
      <PartsAccessories />
      <BikesbyMake />
      <PopularNewBikes />
      <OurVideos />
      <NewsDiscussions />
    </div>
  )
}

export default page