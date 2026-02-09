import axiosClient from "./axiosClient";

export const NewsletterApi = {
  NewsLetter: async ( payload) =>{
    try {
       const response = await axiosClient.post("newsletter", payload);
       return response;
    } catch (error) {
       console.log(error);
    }
  }

};
