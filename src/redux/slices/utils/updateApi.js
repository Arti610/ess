import apiService from "../../../config/apiService";

export default {

    updateUser: async (id, payload, option) => { return await apiService.put(`updateuser/${id}`, payload, option) },
   
    changePassword: async (payload, option) => { return await apiService.put(`change_password`, payload, option) }


}