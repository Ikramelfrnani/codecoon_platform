//slices/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/utilisateurs';

export const updateUser = createAsyncThunk(
  'utilisateurs/updateUser',
  async ({ id, field, value }) => {
    const response = await axios.put(`${apiUrl}/${id}`, { [field]: value });
    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'utilisateurs',
  initialState: {
    data: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
            state.data[index] = action.payload;
        }
    })
    .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;
