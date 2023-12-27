import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    isLoading: false,
    error: false,
    isAuthenticated: false,
  },
  reducers: {
    loginStart: state => {
      state.isLoading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    loginFailure: state => {
      state.isLoading = false;
      state.error = true;
      state.isAuthenticated = false;
    },
  },
});

export const {loginStart, loginSuccess, loginFailure} = authSlice.actions;
export default authSlice.reducer;
