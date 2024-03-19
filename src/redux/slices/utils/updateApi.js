import apiService from "../../../config/apiService";

export default {
    updateBranchInfo : (id, payload, option) => apiService.post(`update_branch_info/${id}`, payload, option),

    
    updateBranch : async (id, payload, option) => {return await apiService.put(`update_branch/${id}`, payload, option)},

    updateUser: async (id, payload, option) => { return await apiService.put(`updateuser/${id}`, payload, option) },
 
    changePassword: async (payload, option) => { return await apiService.put(`change_password`, payload, option) },

    leaveApproval : async (id, payload) => {return await apiService.put(`leave_approve_decline/${id}`, payload)},
    
    lateEarlyApproval : async (id, payload) => {return await apiService.put(`change_lateEarly_status/${id}`, payload)}

}