import axiosInstance from "@/Config/AxiosConfig/axiosConfig";
import Client from "@/Interfaces/clientInterface";
import { handleErrors } from "@/Util/handleErrors";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchClients = createAsyncThunk(
    "user/fetchClients",
    async (_,{ rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const response = await axiosInstance.get(`/api/v1/user/fetchAllClients`, config);
            const data = response?.data;
        
            console.log("🚀 ~ data:", data)

            return{
                data
            }
        } catch (error: any) {

            return rejectWithValue(handleErrors(error));
        }
    }
);


export const blockClient = createAsyncThunk(
    "user/blockClient",
    async (cliDetails: Client, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const response = await axiosInstance.put(`/api/v1/user/blockClient?clientId=${cliDetails.clientAuthId}&status=${cliDetails.blocked}`, config);
            const data = response?.data;
            
            console.log("🚀 ~ data:", data)
            
            return{
                data
            }
        } catch (error: any) {

            return rejectWithValue(handleErrors(error));
        }
    }
);