import modalReducer from "./modal";
import authReducer from "./auth";
import userReducer from "./user";

import { connectRouter } from "connected-react-router";
import { combineReducers } from "@reduxjs/toolkit";
import { history } from "helpers";

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  modal: modalReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
