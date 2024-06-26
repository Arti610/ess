import apiService from "../../../config/apiService";

export default {

    createBranch : (payload, option) => apiService.post(`create_branch`, payload, option),
    createBranchInfo:(payload, option)=>apiService.post('create_branch_info', payload, option),
    createUser: (payload, option) => apiService.post(`createuser`, payload, option),
    // createUser: (payload, option) => console.log('pysu', payload),
    uploadTask: (payload, option) => apiService.post(`create_taskupload`, payload, option),
    createLeaveRequest: (payload, option) => apiService.post(`create_leaverequest`, payload, option),
    createLateEarly: (payload, option) => apiService.post(`create_lateEarly`, payload, option),


    // createCheckin: (payload) => apiService.post(`create_manual_checkIn`, payload),
    // createCheckout: (payload) => apiService.post(`create_manual_checkOut`, payload),
    createCheckin: (payload) => apiService.post(`user/check_in`, payload),
    createCheckout: (payload) => apiService.post(`user/check_out`, payload),
    createDocUpload: (payload, option) => apiService.post(`create_docsUpload`, payload, option),
 

    createNotificationFCM : (payload) => apiService.post(`fcm_token`, payload),
    createBreakHours : (payload) => apiService.post(`create_break_hours`, payload),
    // createBreakHours : (payload) => console.log('payload for create break hours', payload),
}