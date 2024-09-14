import axiosInstance from "@/api/axios";

export const ApiCategories = async () => {
    const response = await axiosInstance.get("/categories");
    return response;
};

export const ApiCollections = async () => {
    const response = await axiosInstance.get("/collections");
    return response;
}

export const ApiSignDeal = async (credentials) => {
    const response = await axiosInstance.post("/deal/sign", credentials);
    return response;
}

export const ApiUnSignDeal = async (credentials) => {
    const response = await axiosInstance.post("/deal/unsign", credentials);
    return response;
}

export const ApiSignedDeals = async () => {
    const response = await axiosInstance.get("/deal/signed");
    return response;
}