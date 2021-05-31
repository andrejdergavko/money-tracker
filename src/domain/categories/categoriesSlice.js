import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storage from 'electron-json-storage';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';

storage.setDataPath(os.tmpdir());
const categories = storage.getSync('categories');

const defaultCategories = [
  'food',
  'restaurant',
  'transport',
  'fuel',
  'clothes',
  'technics',
  'mobile/net',
  'household needs',
  'leisure',
  'currency',
  'health/education',
];

const initialState = {
  categories: isEmpty(categories) ? defaultCategories : JSON.parse(categories),
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // setTransactionToCategory: (state, action) => {
    //   const { category, transactionName } = action.payload;
    //   storage.set('transactions', JSON.stringify(allTransactions));
    //   state.categories = {
    //     ...categories,
    //     [category]: [...categories[category], transactionName],
    //   };
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  //   // The `extraReducers` field lets the slice handle actions defined elsewhere,
  //   // including actions generated by createAsyncThunk or in other slices.
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(incrementAsync.pending, (state) => {
  //         state.status = 'loading';
  //       })
  //       .addCase(incrementAsync.fulfilled, (state, action) => {
  //         state.status = 'idle';
  //         state.value += action.payload;
  //       });
  //   },
});

// export const { setTransactions } = categoriesSlice.actions;

export const categoriesSelector = (state) => state.categories.categories;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default categoriesSlice.reducer;
