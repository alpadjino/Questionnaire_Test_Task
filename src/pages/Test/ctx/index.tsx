import { createSlice } from "@reduxjs/toolkit";
import type { TestVariant } from '../types';

interface TestState {
  questions: TestVariant[];
  totalPages: number;
  currentPage: number;
  questionsPerPage: number;
  tempRatings: Record<string, number>;
  isCompleted: boolean;
}

type TestInitProps = {
  payload: {
    questions: TestVariant[];
    questionsPerPage: number;
  };
};

const initialState: TestState = {
  questions: [],
  totalPages: 0,
  currentPage: 0,
  tempRatings: {},
  isCompleted: false,
  questionsPerPage: 2,
};

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    init: (state, { payload: { questions, questionsPerPage } }: TestInitProps ) => {
      state.questions = questions;
      state.totalPages = Math.ceil(questions.length / questionsPerPage);
      state.currentPage = 0;
      state.tempRatings = {};
      state.isCompleted = false;
      state.questionsPerPage = questionsPerPage;
    },
    nextQuestions: (state) => {
      state.questions = state.questions.map((q) => ({
        ...q,
        rating: state.tempRatings[q.id] ?? q.rating,
      }));

      state.currentPage += 1;
      state.tempRatings = {};

      if (state.currentPage >= state.totalPages) {
        state.isCompleted = true;
      }
    },
    setTempRating: (state, action) => {
      state.tempRatings[action.payload.id] = action.payload.rating;
    },
    resetTest: () => initialState,
  },
});

export const { init, nextQuestions, setTempRating, resetTest } = testSlice.actions;

export default testSlice.reducer;
