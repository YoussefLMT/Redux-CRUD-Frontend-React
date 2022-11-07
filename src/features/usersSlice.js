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

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            state.users = action.payload
        })
        builder.addCase(getUsers.rejected, (state) => {
            state.error = true
            state.loading = false
        })
    }
})

export default usersSlice.reducer