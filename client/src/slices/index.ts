import modalReducer from "./modal";
import authReducer from "./auth";
import { connectRouter } from "connected-react-router";
import { combineReducers } from "@reduxjs/toolkit";
import { history } from "helpers";

const rootReducer = combineReducers({
  router: connectRouter(history),
  modal: modalReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
