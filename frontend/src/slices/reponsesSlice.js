//reponsesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/reponses/question';

export const fetchReponses = createAsyncThunk(
  'reponses/fetchReponses',
  async (question_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/${question_id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const reponsesSlice = createSlice({
  name: 'reponses',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReponses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReponses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchReponses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default reponsesSlice.reducer;