import axiosClient from "./axiosClient";

export const filterApi = {
  getAllFilters: async ( payload) =>{
    try {
       const response = await axiosClient.post("listings/filters/", payload);
       return response;
    } catch (error) {
       console.log(error);
    }
  }

};
