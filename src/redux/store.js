import { configureStore } from '@reduxjs/toolkit';
import poReducer from './poSlice';

const store = configureStore({
  reducer: {
    po: poReducer
  }
});

export default store;