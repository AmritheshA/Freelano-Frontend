import { createSlice } from "@reduxjs/toolkit";
import { blockClient, fetchClients } from "../Actions/AdminActions";
import Client from "@/Interfaces/clientInterface";

interface UserDetails {
    loading: boolean;
    data: Client[] | null;
    message: string;
    error: any;
}

const initialState: UserDetails = {
    loading: false,
    data: null,
    message: "",
    error: null,
};



const AdminReducer = createSlice({
    name: 'adminReducer',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // Fetch Client
            .addCase(fetchClients.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.message = "Just wait user data is fetching";
                state.error = null;
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.error = null;
            })
            .addCase(fetchClients.rejected, (state) => {
                state.loading = false;
                state.data = null;
                state.message = "Cant block or unblock now";
            })
            // Block client
            .addCase(blockClient.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.message = "Blocking User";
                state.error = null;
            })
            .addCase(blockClient.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.error = null;
            })
            .addCase(blockClient.rejected, (state) => {
                state.loading = false;
                state.data = null;
                state.message = "Falid to block user";
                state.error = null;
            })
    }
})


export default AdminReducer.reducer;