import apiService from "../../../config/apiService";

export default{
    createUser: ( payload, option) => apiService.post(`createuser`, payload, option),

}