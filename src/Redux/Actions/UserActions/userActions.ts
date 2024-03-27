import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import userDetails from "../../../Interfaces/userInterface";
import axiosInstance from "../../../Config/AxiosConfig/axiosConfig";
import { handleErrors } from "../../../Util/handleErrors";
import JwtPayload from '../../../Interfaces/userInterface'
import { AxiosRequestConfig } from "axios";


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

      console.log(response.status);
      console.log(data);

      const decodedJwt = jwtDecode<JwtPayload>(data.accessToken);
      console.log("calling func2");
      console.log("Authenticated Successfully");

      return {
        username: decodedJwt.userName,
        email: decodedJwt.email,
        message: data.message,
        role: decodedJwt.role,
      }
    } catch (error: any) {
      
      return rejectWithValue(handleErrors(error));
    }
  }
);


export const userRegisterAction = createAsyncThunk(
  "user/userSignup",
  async (token: string | undefined, { rejectWithValue }) => {

       try {

      const config:AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      console.log("token"+token)
      const response = await axiosInstance.get(`/api/v1/auth/register?token=${token}`, config);
      const data = response.data;

      return {
        username: data.userName,
        email: data.email,
        role: data.role
      }

    } catch (error: any) {
      console.log("Error Response Body:", error.response.data);
      return rejectWithValue(handleErrors(error));
    }
  }
);


export const userOauthLogin = createAsyncThunk(
  "user/userOauthLogin",
  async (oauthToken: string | undefined, { rejectWithValue }): Promise<any> => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axiosInstance.post("/api/v1/auth/oauth/login",
        { oauthToken, role: "CLIENT" },
        config
      );
      const data = response.data;
      const decodedJwt = jwtDecode<JwtPayload>(data);
      return {
        username: decodedJwt.sub,
        role: decodedJwt.role,
      };
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

// export const sendMailToUser = createAsyncThunk(
//   "user/sendEmail", async (email: string, { rejectWithValue }): Promise<any> => {
//     try {
//       const userCredentail = sessionStorage.getItem("userCredentail");

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const response = await axiosInstance.post(`/api/v1/auth/verifyEmail?token=${token}`,
//         userCredentail,
//         config
//       );

//     } catch (error: any) {
//       console.error(error);
//       if (error.response && error.response.status) {
//         return rejectWithValue(error.response.status);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// )


export const verifyUserEmail = createAsyncThunk(
  "user/verifyUserEmail",
  async (_, { rejectWithValue }): Promise<any> => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axiosInstance.get("/api/v1/auth/verifyEmail", config);
      const data = response.data;

      console.log(data);

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
