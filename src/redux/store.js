import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
