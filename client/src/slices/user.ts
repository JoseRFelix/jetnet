import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAddress,
  ISecurityQuestion,
  IUser,
  IUserEditProfileDTO
} from "interfaces";
import { toast } from "react-toastify";
import { AppThunk } from "app/store";
import { userService } from "services";
import { push } from "connected-react-router";
import { routes } from "../constants";
import localforage from "localforage";
import { persistReducer } from "redux-persist";
import { logout } from "./auth";

interface UserState {
  _id: string;
  fullName: string;
  email: string;
  birthday: string;
  phone: string;
  password: string;
  salt: string;
  picture: string | null;
  address: IAddress | null;
  securityQuestions: ISecurityQuestion[] | null;

  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  _id: "",
  fullName: "",
  email: "",
  birthday: "",
  phone: "",
  password: "",
  salt: "",
  address: null,
  securityQuestions: null,
  picture: null,

  isLoading: false,
  error: null
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUpUser(state, { payload }: PayloadAction<IUser>) {
      return {
        ...payload,
        isLoading: false,
        error: null
      };
    },
    clearUser() {
      return initialState;
    },
    profileEditStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    profileEditSuccess(state, { payload }: PayloadAction<IUser>) {
      return {
        ...payload,
        isLoading: false,
        error: null
      };
    },
    profileEditFailure(state, { payload }: PayloadAction<any>) {
      state.isLoading = false;
      state.error = payload;

      toast.error("Error updating user.");
    }
  }
});

export const {
  setUpUser,
  clearUser,

  profileEditStart,
  profileEditSuccess,
  profileEditFailure
} = user.actions;

const userPersistConfig = {
  key: "user",
  storage: localforage,
  blacklist: ["isLoading", "error"]
};

export default persistReducer(userPersistConfig, user.reducer);

export const editProfile = (input: IUserEditProfileDTO): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    const {
      auth: { token }
    } = getState();

    dispatch(profileEditStart());
    const result = await userService.editProfile(input, token);

    dispatch(profileEditSuccess(result.user));

    dispatch(push(routes.user.Profile));
  } catch (err) {
    if (err?.response?.data.message.includes("No authorization")) {
      toast.error("Session expired.");
      return dispatch(logout());
    }
    dispatch(profileEditFailure(err?.response?.data));
  }
};
