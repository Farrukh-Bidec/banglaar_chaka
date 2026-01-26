import axiosClient from "./axiosClient";

export const homeApi = {
    getHomeData: () => axiosClient.get("/listings/mainapi"),
};
