import { configureStore, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { history } from "helpers";
import localforage from "localforage";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";

import rootReducer, { RootState } from "slices";

const persistConfig = {
  key: "root",
  storage: localforage,
  blacklist: ["router", "modal", "auth", "user"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)]
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
