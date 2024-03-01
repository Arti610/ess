import apiService from "../../../config/apiService";

export default {

    updateUser: async (id, payload, option) => { return await apiService.put(`updateuser/${id}`, payload, option) },
   
    changePassword: async (payload, option) => { return await apiService.put(`change_password`, payload, option) },

    leaveApproval : async (id, payload) => {return await apiService.put(`leave_approve_decline/${id}`, payload)},
    
    lateEarlyApproval : async (id, payload) => {return await apiService.put(`change_lateEarly_status/${id}`, payload)}

}