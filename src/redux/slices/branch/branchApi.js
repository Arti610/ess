import apiService from '../../../config/apiService';
import {branchFailure, branchStart, branchSuccess} from './branchSlice';

export const getAllBranch = async dispatch => {
  try {
    dispatch(branchStart());
    const res = await apiService.get('get_all_branch', {
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    });
    dispatch(branchSuccess(res.data));
    return res;
  } catch (error) {

    dispatch(branchFailure());
  }
};

export const createBranch = async (dispatch, formData) => {
  try {
    dispatch(branchStart());
    const res = await apiService.post('create_branch', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',

      },
    });
    dispatch(branchSuccess());
    return res;
  } catch (error) {
    console.log('error', error);
    dispatch(branchFailure());
    throw error;
  }
};