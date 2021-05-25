import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../domain/test/testSlice';
import transactionsReducer from '../domain/transactions/transactionsSlice';

const store = configureStore({
  reducer: {
    test: testReducer,
    transactions: transactionsReducer,
  },
});

export default store;
