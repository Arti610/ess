import apiService from "../../../config/apiService";

export default{
    deleteBranch : (id)=> apiService.delete(`delete_branch/${id}`),
    deleteUser : (id)=> apiService.delete(`deleteuser/${id}`),
    deleteDocUpload : (id)=> apiService.delete(`delete_docsUploaad/${id}`),
}