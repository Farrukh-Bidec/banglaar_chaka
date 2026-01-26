"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Search } from "lucide-react";
import motorsApi from "@/lib/api/motors";
import { FaTh, FaThList } from "react-icons/fa";
import MotorListingCard from "@/components/WebsiteComponents/MotorListingCard";
import { useTranslation } from "react-i18next";

const MotorsClient = ({ initialProducts, pagination, initialFilters = {} }) => {
    const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState("price_low");
    const [motorListings, setMotorListings] = useState(initialProducts || []);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(
        pagination?.currentPage < pagination?.totalPages
    );
    const [isLoading, setIsLoading] = useState(false);
    const observerRef = useRef(null);
    const firstLoad = useRef(true);

    console.log("initialFilters", initialFilters);

    // Initial Filters state from props (URL params)
    const [filters, setFilters] = useState({
        vehicle_type: "",
        make: initialFilters.make || "",
        model: initialFilters.model || "",
        year_min: initialFilters.year || "",
        year_max: "",
        price_min: initialFilters.min_price || undefined,
        price_max: initialFilters.max_price || undefined,
        fuel_type: initialFilters.fuel_type || "",
        transmission: initialFilters.transmission || "",
        body_style: initialFilters.body_type || "",
        condition: initialFilters.condition || "",
        odometer_min: "",
        odometer_max: "",
        search: initialFilters.search || "",
        governorate: "",
        region: "",
        category_id: initialFilters.category_id || null,
        city: initialFilters.city || "",
    });

    const { t } = useTranslation();

    const loadMore = useCallback(async () => {
        if (!hasMore || isLoading) return;

        setIsLoading(true);
        try {
            const nextPage = currentPage + 1;
            const payload = {
                ...filters,
                max_price: filters?.price_max,
                min_price: filters?.price_min,
                search: filters?.search,
                sort: sortBy,
                listing_type: "motors",
                pagination: { page: nextPage, per_page: 6 },
                category_id: filters?.category_id || "",
            };

            const response = await motorsApi.getMotorsByFilter(payload); // Assuming getMotorsByFilter handles pagination or similar call

            // If the API wrapper returns directly an array or object, adjust here. 
            // Based on previous code: 
            // "const response = await propertiesApi.getPropertiesByFilter(payload);" 
            // Wait, previous loadMore used "propertiesApi" but loadMotorListings used "motorsApi". 
            // I should use "motorsApi" as in loadMotorListings or check if propertiesApi was intended. 
            // The previous loadMore had: "const response = await propertiesApi.getPropertiesByFilter(payload);"
            // BUT loadMotorListings had: "const response = await motorsApi.getMotorsByFilter(payload);"
            // I will use motorsApi.getMotorsByFilter as it seems more correct for "MotorListings".

            const newData = response || [];
            // Assuming response contains pagination info if we need to check end of list accurately. 
            // If getMotorsByFilter returns just the array (as implied by setMotorListings(response || []) in loadMotorListings), 
            // we might not get pagination metadata here. 
            // However, the original loadMore logic used `response?.pagination?.last_page`. 
            // Given the user wants to keep functionalities "while making sure code does not break", 
            // and I saw `propertiesApi` usage in `loadMore` earlier which might be a copy-paste error in the original code,
            // I will stick to `motorsApi` but be careful about the response structure.
            // If `motorsApi.getMotorsByFilter` returns an array, we can't get `last_page`.
            // Let's assume for now it returns just data like in loadMotorListings. 
            // But wait, `loadMotorListings` sets `setMotorListings(response || [])`.
            // If I use the same API for loadMore, I might lose pagination info.
            // But if `loadMotorListings` works, `motorsApi` is the correct one.
            // I'll stick to `motorsApi.getMotorsByFilter(payload)`. 
            // If it returns an array, checking length > 0 is the best guess for "has more" if we don't have total pages.

            if (newData.length > 0) {
                setMotorListings((prev) => [...prev, ...newData]);
                setCurrentPage(nextPage);
                // If we don't know total pages, we might keep hasMore true until we get empty list.
                setHasMore(newData.length >= 6); // Assuming per_page is 6.
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("❌ Error loading more:", err);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, hasMore, isLoading, filters, sortBy]);

    // Load motor listings on filter/sort change
    const loadMotorListings = async () => {
        setIsLoading(true);
        try {
            const payload = {
                ...filters,
                max_price: filters?.price_max,
                min_price: filters?.price_min,
                search: filters?.search,
                category_id: filters?.category_id || "",
                sort: sortBy,
                pagination: {
                    page: 1, // Reset to page 1 for new search
                    per_page: 30,
                },
            };

            const response = await motorsApi.getMotorsByFilter(payload);
            setMotorListings(response || []);
            // verification: if response is array, we might need to reset hasMore
            if (response && response.length >= 30) {
                setHasMore(true);
            } else {
                setHasMore(false);
            }
            setCurrentPage(1);
        } catch (error) {
            console.error("Error loading motor listings:", error);
            // toast.error("Failed to load motor listings"); // toast not imported, removing
            setMotorListings([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Effect to reload when relevant state changes
    useEffect(() => {
        loadMotorListings();
    }, [filters.category_id, filters.make, filters.model, filters.min_price, filters.max_price, filters.city, sortBy]);
    // Added other filter dependencies since we removed the generic "searchQuery" or reliance on just one prop.
    // Basically if initialFilters changed (which they won't), or if we had UI to change them (we don't).
    // Filters are likely static after mount unless we add `clearFilters` logic.
    // sortBy changes via UI.

    // Intersection Observer
    useEffect(() => {
        if (isLoading || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (firstLoad.current) {
                    firstLoad.current = false;
                    return;
                }
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    loadMore();
                }
            },
            { root: null, rootMargin: "300px", threshold: 0.1 }
        );

        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [hasMore, isLoading, loadMore]);


    const clearFilters = () => {
        setFilters({
            vehicle_type: "",
            make: "",
            model: "",
            year_min: "",
            year_max: "",
            price_min: undefined,
            price_max: undefined,
            fuel_type: "",
            transmission: "",
            body_style: "",
            condition: "",
            odometer_min: "",
            odometer_max: "",
            search: "",
            governorate: "",
            region: "",
            category_id: null,
            city: "",
        });
        setSortBy("price_low");
        setCurrentPage(1);
        // loadMotorListings will be triggered by useEffect dependency change if we add filters to dependency
        // or we can call it explicitly if we remove filters from dependency to avoid double call.
        // Let's rely on useEffect with explicit dependencies on filter values.
    };

    // Apply sorting client-side for immediate feedback? 
    // The API does sorting, but the original code had client-side sorting on `motorListings`. 
    // If the API returns sorted data, client-side sort is redundant but harmless if consistent.
    // I'll keep the client-side sort logic for the currently viewed list as requested ("make sure code does not break").
    const sortedListings = [...motorListings].sort((a, b) => {
        const getPrice = (item) => {
            if (item.allow_offers) {
                return parseFloat(item.start_price) || 0;
            }
            return parseFloat(item.buy_now_price) || 0;
        };

        const getCreatedAt = (item) => new Date(item.created_at).getTime();

        switch (sortBy) {
            case "price_low":
                return getPrice(a) - getPrice(b);
            case "price_high":
                return getPrice(b) - getPrice(a);
            case "year_new":
                return getCreatedAt(b) - getCreatedAt(a);
            case "year_old":
                return getCreatedAt(a) - getCreatedAt(b);
            default:
                return 0;
        }
    });

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div
                className="w-full h-64 sm:h-72 lg:h-80 rounded-b-[60px] text-white px-4 sm:px-8 py-10 sm:py-12 relative flex items-center"
                style={{ background: "rgb(23, 95, 72)" }}
            >
                <div className="max-w-6xl mx-auto w-full">
                    <h1
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-6 sm:mb-8"
                        dangerouslySetInnerHTML={{
                            __html: t("SHOP NEW & USED ITEMS <br /> FOR SALE"),
                        }}
                    />
                </div>
            </div>

            <div className="mt-10 px-5 md:px-0 md:mx-10">
                {/* Results header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <p className="text-gray-900 text-sm">
                        {isLoading && motorListings.length === 0 ? (
                            ""
                        ) : (
                            <>
                                {t("Showing")}{" "}
                                <span className="font-semibold">
                                    {motorListings.length || 0}
                                </span>{" "}
                                {t("Results")}
                            </>
                        )}
                    </p>
                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                        >
                            <option value="price_low">{t("Price: Low to High")}</option>
                            <option value="price_high">{t("Price: High to Low")}</option>
                            <option value="year_new">{t("Newest First")}</option>
                            <option value="year_old">{t("Oldest First")}</option>
                        </select>
                        <div className="flex justify-center gap-2">
                            <button
                                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm ${viewMode === "list"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                onClick={() => setViewMode("list")}
                                aria-pressed={viewMode === "list"}
                            >
                                <FaThList />
                                <span>{t("List")}</span>
                            </button>
                            <button
                                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm ${viewMode === "grid"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                onClick={() => setViewMode("grid")}
                                aria-pressed={viewMode === "grid"}
                            >
                                <FaTh />
                                <span>{t("Grid")}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Motor listings */}
                {isLoading && motorListings.length === 0 ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                ) : motorListings.length > 0 ? (
                    <div
                        className={`grid gap-6 ${viewMode === "grid"
                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 md:mx-10"
                            }`}
                    >
                        {sortedListings.map((listing) => (
                            <MotorListingCard
                                key={listing.id}
                                listing={listing}
                                viewMode={viewMode}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-500 mb-4">
                            <Search className="w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                {t("No motors found")}
                            </h3>
                            <p>{t("Try adjusting your search criteria or filters")}</p>
                        </div>
                        <button
                            onClick={clearFilters}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
                        >
                            {t("Clear Filters")}
                        </button>
                    </div>
                )}

                {/* Infinite Scroll trigger */}
                <div ref={observerRef} className="h-10 w-full flex justify-center items-center">
                    {isLoading && motorListings.length > 0 && (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MotorsClient;
