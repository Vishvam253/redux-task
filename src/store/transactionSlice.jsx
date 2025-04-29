import { createSlice, nanoid } from '@reduxjs/toolkit';

const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: savedTransactions,
  },
  reducers: {
    addTransaction: {
      reducer: (state, action) => {
        state.transactions.push(action.payload);
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
      },
      prepare: (transaction) => {
        return { payload: { id: nanoid(), ...transaction } };
      } 
    },
    updateTransaction: (state, action) => {
      const { id, ...updatedFields } = action.payload;
      const index = state.transactions.findIndex(tx => tx.id === id);
      if (index !== -1) {
        state.transactions[index] = { ...state.transactions[index], ...updatedFields };
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
      }
    },
    
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(tx => tx.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
