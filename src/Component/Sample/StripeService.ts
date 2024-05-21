import axiosInstance from "@/Config/AxiosConfig/axiosConfig";


export const createStripeAccount = async () => {
    const response = await axiosInstance.get(`/api/v1/payment/create-account`);
    return response.data;
};

export const createStripeAccountLink = async (accountId: any) => {
    const response = await axiosInstance.get(`/api/v1/payment/create-account-link`, {
        params: { accountId },
    });
    return response.data;
};
