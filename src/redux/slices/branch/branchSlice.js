import { createSlice } from '@reduxjs/toolkit';

const branchSlice = createSlice({
  name: 'branch',
  initialState: {
    isLoading: false,
    isSuccess: false,
    error: false,
    branchData: null,
    branchDataById: null
  },
  reducers: {
    getBranchStart: state => {
     
      state.isLoading = true;
      state.error = false;
      state.isSuccess = false
    },
    getBranchSuccess: (state, action) => {
     
      state.branchData = action.payload
      state.isLoading = false;
      state.error = false;
      state.isSuccess = true;
    },
    getBranchFailure: state => {
     
      state.isLoading = false;
      state.error = true;
      state.isSuccess = false
    },
    getBranchByIdStart: state => {
      console.log('get id start');
      state.isLoading = true;
      state.error = false;
      state.isSuccess = false
    },
    getBranchByIdSuccess: (state, action) => {
      console.log('get id success');
      state.isLoading = false;
      state.error = false;
      state.isSuccess = true
      state.branchDataById = action.payload
    },
    getBranchByIdFailure: state => {
      console.log('get id falied');
      state.isLoading = false;
      state.error = true;
      state.isSuccess = false
    },
    createBranchStart: state => {
 
      state.isLoading = true;
      state.error = false;
      state.isSuccess = false
    },
    createBranchSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.isSuccess = true
      state.branchData.push(action.payload);
    },
    createBranchFailure: state => {
      state.isLoading = false;
      state.isSuccess = false
      state.error = true;
    },
    updateBranchStart: state => {
      state.isLoading = true;
      state.isSuccess = false
      state.error = false;
    },
    updateBranchSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true
      state.error = false;
      state.branchDataById.push(action.payload)
    },
    updateBranchFailure: state => {
      state.isLoading = false;
      state.isSuccess = false
      state.error = true;
    },
  },
});

export const {
  getBranchStart,
  getBranchSuccess,
  getBranchFailure,
  getBranchByIdStart,
  getBranchByIdSuccess,
  getBranchByIdFailure,
  createBranchStart,
  createBranchSuccess,
  createBranchFailure,
  updateBranchStart,
  updateBranchSuccess,
  updateBranchFailure
} = branchSlice.actions;
export default branchSlice.reducer;
