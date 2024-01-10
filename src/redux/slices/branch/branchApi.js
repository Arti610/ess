import apiService from '../../../config/apiService';
import { createBranchFailure, createBranchStart, createBranchSuccess, getBranchByIdFailure, getBranchByIdStart, getBranchByIdSuccess, getBranchFailure, getBranchStart, getBranchSuccess, updateBranchFailure, updateBranchStart, updateBranchSuccess, } from './branchSlice';

export const getAllBranch = async dispatch => {
  try {
    dispatch(getBranchStart());
    const res = await apiService.get('get_all_branch');
    dispatch(getBranchSuccess(res.data));
    return res;
  } catch (error) {

    dispatch(getBranchFailure());
  }
};

export const getBranchById = async (id, dispatch) =>{
  console.log('id get after navigation in edit ', id);
  console.log('api called ');
  try {
    dispatch(getBranchByIdStart())
    const res = await apiService.get(`get_branch/${id}`)
    dispatch(getBranchByIdSuccess(res.data))
    return res
  } catch (error) {
   dispatch(getBranchByIdFailure())
  }
};

export const createBranch = async (dispatch, formData) => {
  try {
    dispatch(createBranchStart());
    const res = await apiService.post('create_branch', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',

      },
    });
    dispatch(createBranchSuccess(res.data));
    return res;
  } catch (error) {
    console.log('error', error);
    dispatch(createBranchFailure());
    throw error;
  }
};

export const updateBrnach = async (id, dispatch, formData) => {
  console.log('getid in api call update branch', id);
  try {
    dispatch(updateBranchStart())
    const res = await apiService.put(`update_branch/${id}`, formData,{
      headers:{
        "Content-Type": 'multipart/form-data'
      }
    })
    dispatch(updateBranchSuccess(res.data))
    return res
  } catch (error) {
    dispatch(updateBranchFailure())
  }
};