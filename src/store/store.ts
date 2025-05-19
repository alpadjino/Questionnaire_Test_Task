import { configureStore } from '@reduxjs/toolkit';
import testSlice from '../pages/Test/ctx';

const rtkQueryStore = configureStore({
  reducer: {
    test: testSlice
  },
});

export type AppStore = typeof rtkQueryStore;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export { rtkQueryStore };
