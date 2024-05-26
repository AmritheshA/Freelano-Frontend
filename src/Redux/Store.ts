import { configureStore } from '@reduxjs/toolkit';

import userReducer from './Slices/UserReducer/userReducer'
import AdminReducer from './Slices/AdminReducer';

export const store = configureStore({
    reducer: {
        userDetails: userReducer,
        adminUserDetails: AdminReducer
    },
});

export type TypeDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
