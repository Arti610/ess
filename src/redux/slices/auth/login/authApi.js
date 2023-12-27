import apiService from '../../../../config/apiService';

export default {
  forgetPassword: payload => apiService.post(`generate_otp`, payload),
  verifyOtp: payload => apiService.post(`verify_otp`, payload),
  passwordReset: payload => apiService.put(`password_reset`, payload),
  Login: payload => apiService.post(`userlogin`, payload),
  Logout: payload => apiService.post(`logout`, payload),
  getBranchUsers: branchId => apiService.get(`get_branch_user/${branchId}`),
  getManagerUsers: id => apiService.get(`get_managers_staff/${id}`),
};
