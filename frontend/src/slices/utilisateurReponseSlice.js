//utilisateurReponseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/user-response';

// Thunk to store or update a response
export const storeOrUpdateReponse = createAsyncThunk(
  'utilisateurReponse/storeOrUpdate',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrl, payload);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Thunk to fetch responses by quiz and user
export const fetchResponsesByQuiz = createAsyncThunk(
  'utilisateurReponse/fetchByQuiz',
  async ({ quizId, utilisateurId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/quiz/${quizId}/utilisateur/${utilisateurId}/reponses`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const utilisateurReponseSlice = createSlice({
  name: 'utilisateurReponse',
  initialState: {
    response: null,
    responsesByQuiz: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(storeOrUpdateReponse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(storeOrUpdateReponse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.response = action.payload;
      })
      .addCase(storeOrUpdateReponse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ✅ Handle fetchResponsesByQuiz cases
      .addCase(fetchResponsesByQuiz.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchResponsesByQuiz.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.responsesByQuiz = action.payload;
      })
      .addCase(fetchResponsesByQuiz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default utilisateurReponseSlice.reducer;
