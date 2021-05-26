import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../domain/test/testSlice';
import transactionsReducer from '../domain/transactions/transactionsSlice';
import categoriesReducer from '../domain/categories/categoriesSlice';

const store = configureStore({
  reducer: {
    test: testReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
  },
});

export default store;
