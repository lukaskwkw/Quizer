import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.quiz || initialState;

export const selectQuiz = createSelector([selectSlice], state => state);
