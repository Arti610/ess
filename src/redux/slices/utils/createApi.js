import apiService from "../../../config/apiService";

export default{
    createUser: (payload) => apiService.post(`createuser`, payload),
}