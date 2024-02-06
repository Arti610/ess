import apiService from "../../../config/apiService"

export default{
    getStaffList : (id) => apiService.get(`get_branch_user/${id}`),
    getLateEarlyList : (id) => apiService.get(`get_lateEarly_list/${id}`),
    getLeaveList : (id) => apiService.get(`get_leave_list/${id}`),

    getAllUserList: (id) => apiService.get(`all_details_user/${id}`),
    getIndividualUser: (id) => apiService.get(`get_user/${id}`),
    getVlog : (id) => apiService.get(`/${id}`),

    // utils
    getManagerStaff : (id) => apiService.get(`all_branch_managers/${id}`),
    getWeekOff : (id) => apiService.get(`week_off_list/${id}`),
    getBranchDepartment : (id) => apiService.get(`get_branch_department/${id}`),
    getBranchDesignation : (id) => apiService.get(`get_branch_designation/${id}`),
    getLeaveTypeList : (id)=> apiService.get( `leavetype_by_branch/${id}`),



    // VLog
    getAllVlog : (id) => apiService.get(`get_task_list/${id}`),









    // Single Get API @start
        getAllLeaveRequest : ()=> apiService.get(`get_leaverequest_list`),
        getIndividualLeaveRequest : (id)=> apiService.get(`get_leaverequest/${id}`)
    // Single Get API @end
}