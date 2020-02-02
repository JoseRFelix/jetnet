import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAddress,
  ISecurityQuestion,
  IUserSignUpDTO,
  IUserSignInDTO
} from "interfaces";
import { IUserResult, authService } from "services";
import { AppThunk } from "app/store";
import { toast } from "react-toastify";
import { hideModal } from "./modal";
import { push } from "connected-react-router";
import { routes } from "../constants";

interface UserState {
  user: {
    _id: string;
    fullName: string;
    email: string;
    birthday: Date;
    phone: string;
    password: string;
    salt: string;
    picture: string | null;
    address: IAddress | null;
    securityQuestions: ISecurityQuestion[] | null;
  };
  token: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {
    _id: "",
    fullName: "",
    email: "",
    birthday: new Date(),
    phone: "",
    password: "",
    salt: "",
    address: null,
    securityQuestions: null,
    picture: null
  },
  token: "",
  isLoading: false,
  error: null
};

const startLoading = (state: UserState) => {
  state.isLoading = true;
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: startLoading,
    signUpStart: startLoading,
    signUpSuccess(state, { payload }: PayloadAction<IUserResult>) {
      const { token, user } = payload;
      state.token = token;
      state.isLoading = false;
      state.user = user;
    },
    signInSuccess(state, { payload }: PayloadAction<IUserResult>) {
      const { ...userData } = payload;
      //state = { isLoading: false, error: null, ...userData };
    },
    signUpFailure(state: UserState, action: PayloadAction<any>) {
      state.isLoading = true;
      state.error = action.payload;

      const error = action.payload?.response?.data?.errors;
      if (error?.message.includes("E11000 duplicate key")) {
        toast.error("User has already been registered.");
      } else {
        toast.error("Error while registering user. Please try again.");
      }
    },
    signInFailure(state: UserState, action: PayloadAction<any>) {
      state.isLoading = true;
      state.error = action.payload;

      const error = action.payload?.response?.data?.errors;

      if (error?.message.includes("Invalid Password")) {
        toast.error("Wrong password.");
      } else if (error?.message.includes("User not registered")) {
      } else {
        toast.error("Error logging user in.");
      }
    }
  }
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,

  signUpStart,
  signUpFailure,
  signUpSuccess
} = auth.actions;

export default auth.reducer;

export const signUp = (input: IUserSignUpDTO): AppThunk => async dispatch => {
  try {
    dispatch(signUpStart());
    const result = await authService.signUp(input);
    dispatch(signUpSuccess(result));
    dispatch(hideModal());
    dispatch(push(routes.user.Profile));
  } catch (err) {
    dispatch(signUpFailure(err));
  }
};

export const signIn = (input: IUserSignInDTO): AppThunk => async dispatch => {
  try {
    dispatch(signInStart());
    const result = await authService.signIn(input);
    dispatch(signInSuccess(result));
    dispatch(hideModal());
    dispatch(push(routes.user.Profile));
  } catch (err) {
    dispatch(signInFailure(err));
  }
};
