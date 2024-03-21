import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import userDetails from "../../../Interfaces/userInterface";
import axiosInstance from "../../../Config/AxiosConfig/axiosConfig";


interface jwtPayload {
  userName:String;
  message:String;
  email: String;
  role: String;
}

export const userLoginAction = createAsyncThunk(
  "user/userLogin",
  async (userCredentail: userDetails, { rejectWithValue }) => {

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axiosInstance.post('/api/v1/auth/login', userCredentail, config);
      const data = response.data;
      console.log("Authenticated Successfully");
      const decodedJwt = jwtDecode<jwtPayload>(data.accessToken);
      
      return {
        username: decodedJwt.userName,
        email: decodedJwt.email,
        message:decodedJwt.message,
        role: decodedJwt.role,
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
