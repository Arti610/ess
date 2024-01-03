import {createSlice} from '@reduxjs/toolkit';

const branchSlice = createSlice({
  name: 'branch',
  initialState: {
    isLoading: false,
    error: false,
    branchData: null,
  },
  reducers: {
    branchStart: state => {
      state.isLoading = true;
      state.error = false;
    },
    branchSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.branchData = action.payload;
    },
    branchFailure: state => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {branchStart, branchSuccess, branchFailure} = branchSlice.actions;
export default branchSlice.reducer;
