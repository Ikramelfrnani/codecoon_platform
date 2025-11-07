// src/slices/resultatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/resultats';

// Thunk to fetch score by utilisateur_id and quiz_id
export const fetchScoreByUserAndQuiz = createAsyncThunk(
  'resultat/fetchScore',
  async ({ utilisateurId, quizId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/score/${utilisateurId}/${quizId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to update score by utilisateur_id and quiz_id
export const updateScoreByUserAndQuiz = createAsyncThunk(
  'resultat/updateScore',
  async ({ utilisateurId, quizId, score }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update-by-user-quiz`, {
        utilisateur_id: utilisateurId,
        quiz_id: quizId,
        score,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Optional: Thunk to create a new result if not exists
export const createResultat = createAsyncThunk(
  'resultat/create',
  async ({ utilisateurId, quizId, score }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, {
        utilisateur_id: utilisateurId,
        quiz_id: quizId,
        score,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const resultatSlice = createSlice({
  name: 'resultat',
  initialState: {
    score: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearResultatState: (state) => {
      state.score = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH SCORE
      .addCase(fetchScoreByUserAndQuiz.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchScoreByUserAndQuiz.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.score = action.payload.score ?? null;
      })
      .addCase(fetchScoreByUserAndQuiz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.error.message;
      })

      // UPDATE SCORE
      .addCase(updateScoreByUserAndQuiz.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateScoreByUserAndQuiz.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.score = action.payload.data?.score ?? state.score;
      })
      .addCase(updateScoreByUserAndQuiz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.error.message;
      })

      // CREATE RESULT
      .addCase(createResultat.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createResultat.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.score = action.payload.score ?? null;
      })
      .addCase(createResultat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export default resultatSlice.reducer;