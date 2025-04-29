import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';


const initialState = {
  category: '',
  startDate: '',
  endDate: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const selectAllFilters = (state) => state.filters;

export const selectFilteredTransactions = createSelector(
  [(state) => state.transactions.transactions, (state) => state.filters],
  (transactions, filters) => {
    const { category, startDate, endDate } = filters;

    return transactions.filter((transaction) => {
     
      if (category && transaction.category !== category) return false;
      
      const transactionDate = new Date(transaction.date);
      
      if (startDate && transactionDate < new Date(startDate)) return false;
      if (endDate && transactionDate > new Date(endDate)) return false;
      
      return true;
    });
  }
);

export const { 
  setCategory,
  setStartDate,
  setEndDate,
  clearFilters 
} = filterSlice.actions;


export default filterSlice.reducer;
