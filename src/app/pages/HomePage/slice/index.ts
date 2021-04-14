import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { initialQuestions } from './questions';
import { quizSaga } from './saga';
import { QuizState } from './types';

export const initialState: QuizState = {
  questions: initialQuestions,
  currentQuestionId: '',
  showQuestionDock: true,
  currentQuestionNumber: 0,
};

const slice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    navigate(state, action: PayloadAction<boolean>) {
      if (
        action.payload &&
        state.currentQuestionNumber < state.questions.length - 1
      ) {
        state.currentQuestionNumber += 1;
        return;
      }
      if (action.payload === false && state.currentQuestionNumber > 0) {
        state.currentQuestionNumber -= 1;
        return;
      }
    },
    toggleShowQuestionDock(state, action: PayloadAction<any>) {
      state.showQuestionDock = !state.showQuestionDock;
    },
    toggleShowAnswersForCurrentQuestion(state, action: PayloadAction<any>) {
      const question = state.questions[state.currentQuestionNumber];
      question.showAnswers = !question.showAnswers;
    },
    goToAdditionalSlide(state, action: PayloadAction<boolean>) {
      const currentQuestion = state.questions[state.currentQuestionNumber];
      if (
        !currentQuestion.currentAdditionalSlide ||
        !currentQuestion.additionalSlides ||
        currentQuestion.additionalSlides?.length === 0
      ) {
        return;
      }
      if (
        action.payload &&
        currentQuestion.currentAdditionalSlide <
          currentQuestion.additionalSlides.length - 1
      ) {
        state.currentQuestionNumber += 1;
      }
      if (currentQuestion.currentAdditionalSlide > 0) {
        state.currentQuestionNumber -= 1;
      }
    },
    selectOption(state, { payload }: PayloadAction<string>) {
      const currentQuestion = state.questions[state.currentQuestionNumber];
      const { currentSelectionOfOptionIds } = currentQuestion;

      if (
        currentQuestion.isMultiAnswer &&
        currentSelectionOfOptionIds &&
        currentSelectionOfOptionIds?.length > 0
      ) {
        const item = currentSelectionOfOptionIds.find(id => id === payload);

        if (Boolean(item)) {
          currentQuestion.currentSelectionOfOptionIds = currentSelectionOfOptionIds?.filter(
            id => id !== payload,
          );
          return;
        }
        currentQuestion.currentSelectionOfOptionIds = [
          ...(currentQuestion.currentSelectionOfOptionIds || []),
          payload,
        ];
        return;
      }
      currentQuestion.currentSelectionOfOptionIds = [payload];
    },
  },
});

export const { actions: quizActions } = slice;

export const useQuizSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: quizSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useQuizSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
