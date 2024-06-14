import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import authenticationReducer from "./slices/authenticationSlice";
import notificationReducer from "./slices/notificationSlice";

const persistConfig = {
  key: 'global-store',
  storage: storage,
};

const persistedReducer = persistCombineReducers(
  persistConfig, 
  {
    authentication: authenticationReducer,
    notification: notificationReducer,
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
