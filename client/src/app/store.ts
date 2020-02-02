import { configureStore, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { history } from "helpers";

import rootReducer, { RootState } from "slices";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)]
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
