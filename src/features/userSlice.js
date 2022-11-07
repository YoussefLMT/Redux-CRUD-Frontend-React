import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../axios';

export const addNewUser = createAsyncThunk('users/addNewUser', async (data) => {
    const response = await axiosInstance.post('/users', data)
    console.log(response.data)
})