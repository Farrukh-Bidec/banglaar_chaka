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
  const entries = Object.entries(params);
  const [lastKey, lastValue] = entries[entries.length - 1] || [];
  console.log("Last key:", lastKey, "Last value:", lastValue);
  const lastObj = entries.length ? { [entries[entries.length - 1][0]]: entries[entries.length - 1][1] } : {};
  console.log("Last object:", lastObj);




  console.log("makeaasas_id", category_id, make_id, model_id, city_id, body_id, budget_id);
  console.log("make_id", make_id);

  // const [listings] = await Promise.all([filterApi.getAllFilters(lastObj)]);
  // useEffect(()=> {
  const payload = lastKey ? {
    [lastKey]: lastValue
  } : {};
  console.log("payload", payload);
  const listings = await filterApi.getAllFilters(payload);
  console.log("listings", listings);
  // },[])


  const [catResult,] = await Promise.all([
    fetchAllCategories(),
    // fetchAllListingsByFilter({
    //   listing_type: "motors",
    //   pagination: {
    //     page: 1,
    //   },
    //   category_id,
    //   city,
    //   make,
    //   model,
    //   body_type,
    //   min_price,
    //   max_price,
    //   year,
    //   transmission,
    //   fuel_type,
    //   condition,
    // }),

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
        }}
      />
    </div>
  );
};
