import apiService from "../../../config/apiService";

export default {
    getUserById: (id) => apiService.get(`get_user/${id}`),
}