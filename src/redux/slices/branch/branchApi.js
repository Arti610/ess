import apiService from '../../../config/apiService';
import {branchFailure, branchStart, branchSuccess} from './branchSlice';

export const getAllBranch = async dispatch => {
  try {
    dispatch(branchStart());
    const res = await apiService.get('get_all_branch');
    dispatch(branchSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(branchFailure());
  }
};


export const createBranch = async (dispatch, payload)=>{
  try {
    dispatch(branchStart())
    const res = await apiService.post('create_branch', payload)
    dispatch(branchSuccess())
    return res
  } catch (error) {
    dispatch(branchFailure())
  }
}
