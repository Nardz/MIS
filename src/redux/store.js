import { configureStore,combineReducers  } from '@reduxjs/toolkit';
import poReducer from './poSlice';
import approvedPOReducer from './approvedPOSlice';


const rootReducer = combineReducers({

  po: poReducer,
  approvedPO: approvedPOReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

