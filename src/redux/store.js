import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice.js';
import branchReducer from './slices/branch/branchSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    branch: branchReducer,
  },
});

export default store;
