import apiService from "../../../config/apiService";

export default {

    createUser: (payload, option) => apiService.post(`createuser`, payload, option),
    uploadTask: (payload, option) => apiService.post(`create_taskupload`, payload, option),
    createLeaveRequest: (payload, option) => apiService.post(`create_leaverequest`, payload, option),
    createLateEarly: (payload, option) => apiService.post(`create_lateEarly`, payload, option),


    createCheckin: (payload) => apiService.post(`create_manual_checkIn`, payload),
    createCheckout: (payload) => apiService.post(`create_manual_checkOut`, payload),
    
}