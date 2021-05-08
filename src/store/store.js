import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../domain/test/testSlice';

const store = configureStore({
  reducer: {
    test: testReducer,
  },
});

export default store;
