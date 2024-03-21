import { createSlice } from '@reduxjs/toolkit';
import { userLoginAction } from '../../Actions/UserActions/userActions';
import { getCookie, removeCookie } from "typescript-cookie";
import { jwtDecode } from 'jwt-decode';
import DecodedToken from "../../../Interfaces/userInterface"

interface userDetails {
  loading: boolean;
  user: any;
  message: String;
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
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // User Login Reducer
      .addCase(userLoginAction.pending, (state, action) => {
        state.loading = true;
        state.message = "Loading";
        state.error = null;
      })
      .addCase(userLoginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        state.error = action.error;
        state.message = "Faild To Login"
        state.loading = false;
      })
  }
});


export default userReducer.reducer;
