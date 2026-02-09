import { fetchAllCategories } from "@/lib/api/category.server";
import {
  fetchAllListingsByFilter,
} from "@/lib/api/listings.server";
import MotorsClient from "./MotorsClient";
import { filterApi } from "@/lib/api/filter";

export const metadata = {
  title: "Cars, Bikes & Vehicles for Sale in Saudi Arabia | Ma3rood Motors",
  description:
    "Discover the latest cars, bikes, and commercial vehicles for sale in Saudi Arabia. Find new and used vehicles from trusted sellers across major cities with Ma3rood Motors.",
};

export default async function page({ searchParams }) {
  const params = await searchParams;
  const { category_id, make_id, model_id, city_id, body_id, budget_id, city, make, model, body_type,
    min_price, max_price, year, transmission, fuel_type, condition } = params;
  console.log("searchParams", params);
  const obj = Object.entries(params).map(([key, value]) => {
    return { key, value };
  });
  console.log("finalobj", obj);
  // Create a payload from all params
  const payload = {
    listing_type: "motors",
    pagination: {
      page: 1,
      per_page: 30
    }
  };

  // Map 'search' param or fallback to 'make' if 'search' is missing (handling legacy url)
  if (params.search) payload.search = params.search;
  else if (params.make) payload.search = params.make;

  // Handle City
  if (params.city && params.city !== "All Cities" && params.city !== "null") {
    payload.city = params.city;
  }

  // Handle Prices (parse to Int and ignore "null")
  const minPrice = params.min_price || params.min;
  if (minPrice && minPrice !== "null") payload.min_price = parseInt(minPrice);

  const maxPrice = params.max_price || params.max;
  if (maxPrice && maxPrice !== "null") payload.max_price = parseInt(maxPrice);

  // Pass other filters if valid
  if (params.category_id) payload.category_id = params.category_id;
  if (params.body_type) payload.body_type = params.body_type;
  if (params.year) payload.year = params.year;
  if (params.transmission) payload.transmission = params.transmission;
  if (params.fuel_type) payload.fuel_type = params.fuel_type;
  if (params.condition) payload.condition = params.condition;

  console.log("Final Payload for API:", payload);
  const listings = await filterApi.getAllFilters(payload);
  console.log("Listings Response:", listings);
  // },[])


  const [catResult,] = await Promise.all([
    fetchAllCategories(),

  ]);
  const pagination = {
    currentPage: listings?.pagination?.current_page || 1,
    totalPages: listings?.pagination?.last_page || 5,
    perPage: listings?.pagination?.per_page || 10,
    totalItems: listings?.pagination?.total || 1000,
  };

  const { categories, isLoading, error } = catResult;

  return (
    <div className="bg-white min-h-screen">

      <MotorsClient
        category={catResult}
        initialProducts={listings?.data || []}
        pagination={pagination}
        initialFilters={{
          category_id,
          city,
          make,
          model,
          body_type,
          min_price,
          max_price,
          year,
          transmission,
          fuel_type,
          condition,
          search: params.search || params.make,
        }}
      />
    </div>
  );
};
