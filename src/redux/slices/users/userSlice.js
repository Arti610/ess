import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : 'user',
    initialState:{
        isLoading : false,
        isSuccess : false,
        error: false,
        userData : null,
        updateUserData : null,
    },
    reducers:{
        getUserStart : state =>{
            state.isLoading = true,
            state.isSuccess = false,
            state.error = false
        },
        getUserSuccess : (state, action) => {
            state.isLoading= false,
            state.isSuccess= true,
            state.error = false,
            state.userData = action.payload
        },
        getUserFailed : state => {
            state.isLoading = false,
            state.isSuccess = false,
            state.error = true
        },
        getByIdUserStart : state =>{
            state.isLoading = true,
            state.isSuccess = false,
            state.error = false
        },
        getByIdUserSuccess : (state, action) => {
            state.isLoading= false,
            state.isSuccess= true,
            state.error = false,
            state.updateUserData = action.payload
        },
        getByIdUserFailed : state => {
            state.isLoading = false,
            state.isSuccess = false,
            state.error = true
        },
        createUserStart : state =>{
            state.isLoading = true,
            state.isSuccess = false,
            state.error = false
        },
        createUserSuccess : (state, action) => {
            state.isLoading= false,
            state.isSuccess= true,
            state.error = false ,
            state.userData.push(action.payload)
        },
        createUserFailed : state => {
            state.isLoading = false,
            state.isSuccess = false,
            state.error = true
        },
       updateUserStart : state =>{
            state.isLoading = true,
            state.isSuccess = false,
            state.error = false
        },
       updateUserSuccess : (state, action) => {
            state.isLoading= false,
            state.isSuccess= true,
            state.error = false ,
            state.updateUserData.push([...state.userData, action.payload])
        },
       updateUserFailed : state => {
            state.isLoading = false,
            state.isSuccess = false,
            state.error = true
        },
       deleteUserStart : state =>{
            state.isLoading = true,
            state.isSuccess = false,
            state.error = false
        },
       deleteUserSuccess : (state) => {
            state.isLoading= false,
            state.isSuccess= true,
            state.error = false 
        },
       deleteUserFailed : state => {
            state.isLoading = false,
            state.isSuccess = false,
            state.error = true
        },
    }
})

export const {getUserStart, getUserSuccess, getUserFailed, getByIdUserStart, getByIdUserSuccess, getByIdUserFailed, createUserStart, createUserSuccess,createUserFailed, updateUserStart,updateUserSuccess, updateUserFailed, deleteUserStart, deleteUserSuccess, deleteUserFailed} = userSlice.actions
export default userSlice.reducer