import { configureStore } from '@reduxjs/toolkit';
import answersReducer from '../slices/answersSlice';
import usersReducer from '../slices/usersSlice';
import profileReducer from '../slices/profileSlice';
import questionsReducer from '../slices/questionsSlice';
import reponsesReducer from '../slices/reponsesSlice';
import utilisateurReponseReducer from '../slices/utilisateurReponseSlice';
import resultatReducer from '../slices/resultatSlice';

const store = configureStore({
  reducer: {
    answers: answersReducer,
    utilisateurs: usersReducer,
    users: profileReducer,
    questions:questionsReducer,
    reponses: reponsesReducer,
    utilisateurReponse:utilisateurReponseReducer,
    resultat:resultatReducer,
  },
});

export default store;
