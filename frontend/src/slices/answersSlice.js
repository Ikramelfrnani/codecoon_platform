//slices/answersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const answersSlice = createSlice({
  name: 'answers',
  initialState: {
    responses: {}
  },
  reducers: {
    saveAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.responses[questionId] = answer;
    },
    // setUserId: (state, action) => {
    //   state.userId = action.payload;
    // },
    clearAnswers: (state) => {
      state.responses = {};
    }
  },
});

export const { saveAnswer, clearAnswers, setUserId } = answersSlice.actions;
export default answersSlice.reducer;
