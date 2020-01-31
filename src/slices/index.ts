import modalReducer from "./modal";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  modal: modalReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
