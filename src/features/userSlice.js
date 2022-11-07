import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../axios'

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    try {
        const response = await axiosInstance.get('/users')
        return response.data.users
    } catch (error) {
        console.log(error)
    }
})

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: null
    },
})