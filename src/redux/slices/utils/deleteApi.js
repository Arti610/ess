import apiService from "../../../config/apiService";

export default{
    deleteUser : (id)=> apiService.delete(`deleteuser/${id}`)
}