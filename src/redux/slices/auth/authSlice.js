import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    loginStart: state => {
      state.isLoading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.currentUser = action.payload;
      setCurrentUserData(action.payload);
    },
    loginFailure: state => {
      state.isLoading = false;
      state.error = true;
    },
    logoutStart: state => {
      state.isLoading = true;
      state.error = false;
    },
    logoutSuccess: async state => {
      state.isLoading = false;
      state.error = false;
    },
    logoutFailure: state => {
      state.isLoading = false;
      state.error = true;
    },
    forgetPasswordStart: state => {
      state.isLoading = true;
      state.error = false;
    },
    forgetPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      setCurrentUserEmail(action.payload);
    },
    forgetPasswordFailure: state => {
      state.isLoading = false;
      state.error = true;
    },
    otpVerificationStart: state => {
      state.isLoading = true;
      state.error = false;
    },
    otpVerificationSuccess: state => {
      state.isLoading = false;
      state.error = false;
    },
    otpVerificationFailure: state => {
      state.isLoading = false;
      state.error = true;
    },
    resetPasswordStart: state => {
      state.isLoading = true;
      state.error = false;
    },
    resetPasswordSuccess: state => {
      state.isLoading = false;
      state.error = false;
    },
    resetPasswordFailure: state => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

// set current user data in asyncstorage
const setCurrentUserData = async userData => {
  try {
    const userDataString = JSON.stringify(userData);
    await AsyncStorage.setItem('currentUser', userDataString);
    console.log('Current User data set in AsyncStorage successfully');
  } catch (error) {
    console.log('Current User data is not set in AsyncStorage');
  }
};

// set current user email in asyncstorage
const setCurrentUserEmail = async userEmail => {
  try {
    await AsyncStorage.setItem('userEmail', userEmail);
    console.log('User email set in AsyncStorage successfully');
  } catch (error) {
    console.log('User email is not set in AsyncStorage');
  }
};


export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  forgetPasswordStart,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  otpVerificationStart,
  otpVerificationSuccess,
  otpVerificationFailure,
  resetPasswordStart,
  resetPasswordFailure,
  resetPasswordSuccess,
} = authSlice.actions;
export default authSlice.reducer;
