import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storage from 'electron-json-storage';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';

storage.setDataPath(os.tmpdir());
const transactions = storage.getSync('transactions');

const initialState = {
  transactions: isEmpty(transactions) ? [] : JSON.parse(transactions),
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      const oldTransactions = state?.transactions;
      const newTransactions = action?.payload?.newTransactions;

      const uniqueTransactions = newTransactions.filter((newTransaction) => {
        const {
          date: newDate,
          name: newName,
          sum: newSum,
          currency: newCurrency,
        } = newTransaction;

        const isTransactionUnique = oldTransactions.every((oldTransaction) => {
          const {
            date: oldDate,
            name: oldName,
            sum: oldSum,
            currency: oldCurrency,
          } = oldTransaction;

          if (
            newDate === oldDate &&
            newName === oldName &&
            newSum === oldSum &&
            newCurrency === oldCurrency
          ) {
            return false;
          }

          return true;
        });

        return isTransactionUnique;
      });

      const uniqueTransactionsWithIds = uniqueTransactions.map((item) => {
        item.id = uuidv4();
        return item;
      });

      const allTransactions = [
        ...uniqueTransactionsWithIds,
        ...state.transactions,
      ].sort((a, b) => {
        return b.date - a.date;
      });

      storage.set('transactions', JSON.stringify(allTransactions));

      state.transactions = allTransactions;
    },
    deleteTransactions: (state, action) => {
      const transactionIds = action?.payload?.transactionIds;
      const allTransactions = state?.transactions;

      const updatedTransactions = allTransactions.filter((item) => {
        if (transactionIds.includes(item.id)) {
          return false;
        }

        return true;
      });

      storage.set('transactions', JSON.stringify(updatedTransactions));
      state.transactions = updatedTransactions;
    },
    setTransactionsCategory: (state, action) => {
      const category = action?.payload?.category;
      const transactionsIds = action?.payload?.transactionsIds;
      const allTransactions = state?.transactions;

      const updatedTransactions = allTransactions.map((item) => {
        if (transactionsIds.includes(item.id)) {
          item.category = category;
        }

        return item;
      });

      storage.set('transactions', JSON.stringify(updatedTransactions));
      state.transactions = updatedTransactions;
    },
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

export const {
  setTransactions,
  setTransactionsCategory,
  deleteTransactions,
} = transactionsSlice.actions;

export const transactionsSelector = (state) => state.transactions.transactions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default transactionsSlice.reducer;
