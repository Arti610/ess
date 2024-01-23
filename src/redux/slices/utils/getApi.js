import apiService from "../../../config/apiService"

export default{
    getStaffList : (id) => apiService.get(`get_branch_user/${id}`),
    getLateEarlyList : (id) => apiService.get(`get_lateEarly_list/${id}`),
    getLeaveList : (id) => apiService.get(`get_leave_list/${id}`),

    getAllUserList: (id) => apiService.get(`all_details_user/${id}`),

}