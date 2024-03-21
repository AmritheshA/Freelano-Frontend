import { configureStore } from '@reduxjs/toolkit';

import userReducer from './Slices/UserReducer/userReducer'

export const store = configureStore({
    reducer: {
        userDetails: userReducer
    },
});

export type TypeDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
