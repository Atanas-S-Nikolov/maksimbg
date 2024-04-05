import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import authenticationReducer from "./slices/authenticationSlice";

const persistConfig = {
  key: 'global-store',
  storage: storage,
};

const persistedReducer = persistCombineReducers(
  persistConfig, 
  {
    authentication: authenticationReducer
  }
); 

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
export default store;
