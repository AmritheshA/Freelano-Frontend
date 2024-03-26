import { createSlice } from '@reduxjs/toolkit';
import { userLoginAction, userOauthLogin, userRegisterAction } from '../../Actions/UserActions/userActions';
import { getCookie, removeCookie } from "typescript-cookie";
import { jwtDecode } from 'jwt-decode';
import DecodedToken from "../../../Interfaces/userInterface";
import { toast } from 'react-toastify';


interface userDetails {
  loading: boolean;
  user: any;
  message: string;
  error: any;
}

const accessToken = getCookie("AccessToken");
let user = null;
if (accessToken) {

  const decodedToken = atob(accessToken);
  const token: DecodedToken = jwtDecode(decodedToken);
  const userName = token.sub;
  const role = token.role;

  console.log("jwt Token" + decodedToken);

  if (token.exp * 1000 < Date.now()) {
    console.log("Unauthorized request!");
    removeCookie("AccessToken");
  } else {
    user = {
      username: userName,
      role: role,
    };
  }
} else {
  console.log("AccessToken not found");
}

const initialState: userDetails = {
  loading: false,
  user: user,
  message: "",
  error: null,
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // User Login Reducer
      .addCase(userLoginAction.pending, (state, action) => {
        state.loading = true;
        state.message = "Loading";
      })
      .addCase(userLoginAction.fulfilled, (state, action) => {
        toast.success(action.payload.message);
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        const mesg = (action.payload as { message: string }).message;
        toast.warn(mesg);
        state.error = action.error;
        state.message = mesg;
        state.loading = false;
      })
      // User Register Reducer
      .addCase(userRegisterAction.pending, (state, action) => {
        state.loading = true;
        state.message = "Loading";
      })
      .addCase(userRegisterAction.fulfilled, (state, action) => {
        toast.success("Registed Successfully");
        state.loading = false;
        state.user = action.payload;
        state.message = "Registed Successfully";
        state.error = null;
      })
      .addCase(userRegisterAction.rejected, (state, action) => {
        
        toast.warn("Something went wrong");
        state.error = action.error;
        state.message = "Something went wrong";
        state.loading = false;
      })
      // User oAuth Reducer
      .addCase(userOauthLogin.pending, (state, action) => {
        state.loading = true;
        state.message = "Loading";
      })
      .addCase(userOauthLogin.fulfilled, (state, action) => {
        toast.warn("Logged In Successfully");
        state.loading = false;
        state.message = "Logged In Successfully";
        state.user = action.payload;
      })
      .addCase(userOauthLogin.rejected, (state, action) => {
        const errMessage = (action.payload as { message: string }).message
        toast.warn(errMessage);
        state.error = action.error;
        state.message = errMessage;
        state.loading = false;
      })
  }
});


export default userReducer.reducer;
