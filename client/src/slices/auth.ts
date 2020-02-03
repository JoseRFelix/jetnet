import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserSignUpDTO, IUserSignInDTO } from "interfaces";
import { authService } from "services";
import { AppThunk } from "app/store";
import { toast } from "react-toastify";
import { hideModal } from "./modal";
import { push } from "connected-react-router";
import { routes } from "../constants";
import { setUpUser } from "./user";
import { persistReducer } from "redux-persist";
import localforage from "localforage";

interface AuthState {
  token: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: "",
  isLoading: false,
  error: null
};

const startLoading = (state: AuthState) => {
  state.isLoading = true;
};

const authSuccess = (state: AuthState, { payload }: PayloadAction<string>) => {
  state.token = payload;
  state.isLoading = false;
  state.error = null;
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: startLoading,
    signUpStart: startLoading,
    signUpSuccess: authSuccess,
    signInSuccess: authSuccess,
    signUpFailure(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = action.payload;

      if (action.payload.message.includes("E11000 duplicate key")) {
        toast.error("User has already been registered.");
      } else {
        toast.error("Error while registering user. Please try again.");
      }
    },
    signInFailure(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = action.payload;

      if (action.payload.message.includes("Invalid Password")) {
        toast.error("Wrong password.");
      } else if (action.payload.message.includes("User not registered")) {
      } else {
        toast.error("Error logging user in.");
      }
    },
    logout(state) {
      state.token = "";
    }
  }
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,

  signUpStart,
  signUpFailure,
  signUpSuccess,

  logout
} = auth.actions;

const authPersistConfig = {
  key: "auth",
  storage: localforage,
  blacklist: ["isLoading", "error"]
};

export default persistReducer(authPersistConfig, auth.reducer);

export const signUp = (input: IUserSignUpDTO): AppThunk => async dispatch => {
  try {
    dispatch(signUpStart());
    const result = await authService.signUp(input);

    dispatch(signUpSuccess(result.token));
    dispatch(setUpUser(result.user));

    dispatch(hideModal());
    dispatch(push(routes.user.Profile));
  } catch (err) {
    dispatch(signUpFailure(err?.response?.data?.errors));
  }
};

export const signIn = (input: IUserSignInDTO): AppThunk => async dispatch => {
  try {
    dispatch(signInStart());
    const result = await authService.signIn(input);

    dispatch(signInSuccess(result.token));
    dispatch(setUpUser(result.user));

    dispatch(hideModal());
    dispatch(push(routes.user.Profile));
  } catch (err) {
    dispatch(signInFailure(err?.response?.data?.errors));
  }
};
