import apiService from "../../../config/apiService";

export default {
    getBranchUsers: (branchId) => apiService.get(`get_branch_user/${branchId}`),
    getManagerUsers: (managerId) => apiService.get(`get_managers_staff/${managerId}`),
    
    // staff apiServices @start
    createUser: (payload) => apiService.post(`createuser`, payload),
    getUserById: (id) => apiService.get(`get_user/${id}`),
    updateUser: (id, payload, option) => apiService.put(`updateuser/${id}`, payload, option),
    deleteUser: (id) => apiService.delete(`deleteuser/${id}`),
    changePassword: (payload) => apiService.put(`change_password`, payload),
    deactivateUser: (id) => apiService.put(`deactivate_user/${id}`),
    getAllUserDetails: (id) => apiService.get(`all_details_user/${id}`),
    // staff apis @end
}