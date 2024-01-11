import Toast from 'react-native-toast-message';
import apiService from '../../../config/apiService';
import { createBranchFailure, createBranchStart, createBranchSuccess, deleteBranchFailure, deleteBranchStart, deleteBranchSuccess, getBranchByIdFailure, getBranchByIdStart, getBranchByIdSuccess, getBranchFailure, getBranchStart, getBranchSuccess, updateBranchFailure, updateBranchStart, updateBranchSuccess, } from './branchSlice';


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

export const getBranchById = async (id, dispatch) => {
  try {
    dispatch(getBranchByIdStart())
    const res = await apiService.get(`get_branch/${id}`)
    dispatch(getBranchByIdSuccess(res.data))
    return res
  } catch (error) {
    dispatch(getBranchByIdFailure())
  }
};

export const createBranch = async (dispatch, formData, navigation) => {
  try {
    dispatch(createBranchStart());
    const res = await apiService.post('create_branch', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(createBranchSuccess(res.data));
    if (res.status === 201 || res.status === 200) {
      navigation.navigate('Base');
      getAllBranch();
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Branch created successfully',
        visibilityTime: 4000,
        autoHide: true,
      });
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Something went wrong during branch creation',
        visibilityTime: 4000,
        autoHide: true,
      });
    }
    return res;
  } catch (error) {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Something went wrong during branch creation',
      visibilityTime: 4000,
      autoHide: true,
    });
    dispatch(createBranchFailure());
  }
};

export const updateBrnach = async (id, dispatch, formData, navigation) => {

  try {
    dispatch(updateBranchStart())
    const res = await apiService.put(`update_branch/${id}`, formData, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    })
    dispatch(updateBranchSuccess(res.data))
    if (res.status === 201 || res.status === 200) {
      navigation.navigate('Base');
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Branch updated successfully',
        visibilityTime: 4000,
        autoHide: true,
      });
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Something went wrong during branch updation ============>',
        visibilityTime: 4000,
        autoHide: true,
      });
    }
    return res
  } catch (error) {
    console.log('error=================>', error);
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Something went wrong during branch updation',
      visibilityTime: 4000,
      autoHide: true,
    });
    dispatch(updateBranchFailure())
  }
};

export const deleteBranch = async (id, dispatch) => {
  console.log('id', id);
  try {
    dispatch(deleteBranchStart())
    const res = await apiService.delete(`delete_branch/${id}`)
    if (res.status === 200) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: `Branch deleted successfully`,
        visibilityTime: 4000,
        autoHide: true,
      });
      getAllBranch()
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: `error occured during branch deletion`,
        visibilityTime: 4000,
        autoHide: true,
      });
    }
    dispatch(deleteBranchSuccess())
    return res
  } catch (error) {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: `error occured during branch deletion`,
      visibilityTime: 4000,
      autoHide: true,
    });
    dispatch(deleteBranchFailure())
  }
}