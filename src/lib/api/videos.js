import axiosClient from "./axiosClient"

export const getVideos = async () => {
    try {
        const response = await axiosClient.get("admin/videos")
        return response
    } catch (error) {
        console.log("error" , error);
        return null
        
    }
}
