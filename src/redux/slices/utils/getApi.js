import apiService from "../../../config/apiService"

export default {
    getBranchById : (id) => apiService.get(`get_branch/${id}`),
    getAllBranch : () => apiService.get(`get_all_branch`),
    getAllBranchInfo : () => apiService.get(`all_branch_info`),
    getBranchInfoById : (id) => apiService.get(`get_branch_info/${id}`),
    get_places:(place)=> apiService.post(`get_places`,{places:place}),
    getStaffList: (id) => apiService.get(`get_branch_user/${id}`),
    getManagerStaffList: (id) => apiService.get(`get_managers_staff/${id}`),
    getLateEarlyList: (id) => apiService.get(`get_lateEarly_list/${id}`),
    getLeaveList: (id) => apiService.get(`get_leave_list/${id}`),
    // getAllDocumentList: (id) => apiService.get(`get_docsUpload_list/${id}`),
    getAllDocumentList: () => apiService.get(`get_DocsUpload_list`),
    // getAllDocumentList: (id) => console.log('id', id),
    getAllUserList: (id) => apiService.get(`all_details_user/${id}`),
    getIndividualUser: (id) => apiService.get(`get_user/${id}`),
    getVlog: (id) => apiService.get(`/${id}`),

    // utils
    getManagerStaff: (id) => apiService.get(`all_branch_managers/${id}`),
    getWeekOff: (id) => apiService.get(`week_off_list/${id}`),
    getBranchDepartment: (id) => apiService.get(`get_branch_department/${id}`),
    getBranchDesignation: (id) => apiService.get(`get_branch_designation/${id}`),
    getLeaveTypeList: (id) => apiService.get(`leavetype_by_branch/${id}`),
    getBranchsBranchInfo: (id) => apiService.get(`get_branchs_branch_info/${id}`),

    // VLog
    getAllVlog: (id) => apiService.get(`get_task_list/${id}`),

    // Single Get API @start
    getCountry: () => apiService.get(`all_countries`),
    getAllLeaveRequest: () => apiService.get(`get_leaverequest_list`),
    getAllLateEarly: () => apiService.get(`get_LateEarly_list`),
    getAllCheckinoutList: (token) => apiService.get(`check_in_out_list`, {
        headers: {
            Authorization: `token ${token}`
        }
    }),

    getIndividualLeaveRequest: (id) => apiService.get(`get_leaverequest/${id}`),
    getIndividualLateEarly: (id) => apiService.get(`get_lateEarly/${id}`),
    getTimeSheetList: (id) => apiService.get(`list_time_sheet/${id}`),
    // Single Get API @end


    getNotification: (id) => apiService.get(`list_notice/${id}`),

}