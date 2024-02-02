import apiService from "../../../config/apiService";

export default {

    createUser: (payload, option) => apiService.post(`createuser`, payload, option),
    uploadTask: (payload, option) => apiService.post(`create_taskupload`, payload, option),
    // uploadTask: (payload, option) =>  console.log('payload===>', payload),

}