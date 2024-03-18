import apiService from "../../../config/apiService";

export default {

    createBranch : (payload, option) => apiService.post(`create_branch`, payload, option),
    createUser: (payload, option) => apiService.post(`createuser`, payload, option),
    uploadTask: (payload, option) => apiService.post(`create_taskupload`, payload, option),
    createLeaveRequest: (payload, option) => apiService.post(`create_leaverequest`, payload, option),
    createLateEarly: (payload, option) => apiService.post(`create_lateEarly`, payload, option),


    // createCheckin: (payload) => apiService.post(`create_manual_checkIn`, payload),
    // createCheckout: (payload) => apiService.post(`create_manual_checkOut`, payload),
    createCheckin: (payload) => apiService.post(`user/check_in`, payload),
    createCheckout: (payload) => apiService.post(`user/check_out`, payload),
    createDocUpload: (payload, option) => apiService.post(`create_docsUpload`, payload, option),
    // createDocUpload: (payload) => console.log(payload, 'payloda')
    
}