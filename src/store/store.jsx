import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import transactionReducer from './transactionSlice';
import filterReducer from './filterSlice';

const store = configureStore({
    reducer:{
        transactions: transactionReducer,
        filters: filterReducer,
    }
});

export default store