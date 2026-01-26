import { create } from "zustand";
import { homeApi } from "../api/home";
import { extractErrorMessage } from "../utils/errorHelpers";

export const useHomeStore = create((set) => ({
    homeData: null,
    isLoading: false,
    error: null,
    fetchHomeData: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await homeApi.getHomeData();
            set({ homeData: data, isLoading: false });
        } catch (error) {
            console.log("error", error);
            const errorMessage = extractErrorMessage(error, "Failed to fetch home data");
            set({ error: errorMessage, isLoading: false });
        }
    },
}));
