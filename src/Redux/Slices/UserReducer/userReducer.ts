import { createSlice } from '@reduxjs/toolkit';
import { clientProfileSubmit, freelancerProfileSubmit, userLoginAction, userLogoutAction, userOauthLogin, userRegisterAction } from '../../Actions/UserActions/userActions';
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
  const userId = token.userId;

  if (token.exp * 1000 < Date.now()) {
    console.log("Unauthorized request!");
    removeCookie("AccessToken");
  } else {
    user = {
      userId,
      userName,
      role,
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
  reducers: {
    registerUser(state) {
      state.loading = true;
    },
    registerUserLoading(state) {
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // User Login Reducer
      .addCase(userLoginAction.pending, (state, _) => {
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
      .addCase(userRegisterAction.pending, (state, _) => {
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
      .addCase(userOauthLogin.pending, (state, _) => {
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
      // Freelancer Profile Submit
      .addCase(freelancerProfileSubmit.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(freelancerProfileSubmit.fulfilled, (state, action) => {
        toast.success(action.payload.message);
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(freelancerProfileSubmit.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Client Profile Submit
      .addCase(clientProfileSubmit.pending, (state) => {
        state.loading = true;
      })
      .addCase(clientProfileSubmit.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload.message;
      })
      .addCase(clientProfileSubmit.rejected, (state) => {
        state.loading = false
      })
      .addCase(userLogoutAction.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(userLogoutAction.fulfilled, (state, action) => {
        state.message = action.payload.meessage;
        state.loading = false;
        state.user = null;
        toast.success(action.payload.meessage)

      })
      .addCase(userLogoutAction.rejected, (state, _) => {
        state.message = "Something Went Wrong"
      })
  }
});


export default userReducer.reducer;
export const { registerUser, registerUserLoading } = userReducer.actions;