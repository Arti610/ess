import apiService from "../../../config/apiService";

export default{
    updateUser: (id, payload, option) => apiService.post(`updateuser/${id}`, payload, option),

    // changePassword: (_, payload, option) => apiService.put(`change_password`, payload, option),
    changePassword: (payload) => console.log('payload', payload)
  
}