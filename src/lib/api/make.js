import axiosClient from "./axiosClient";

export const makeAndModelApi = {
  getAllMakes: () => axiosClient.get(`brands`),
  getModelsByMake: (makeId) => axiosClient.get(`vehicle-models?brand_id=${makeId}`)
};
