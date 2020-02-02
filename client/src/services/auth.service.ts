import { API } from "helpers";
import { AxiosRequestConfig } from "axios";
import { IUserSignUpDTO, IUserSignInDTO, IUser } from "interfaces";

export interface IUserResult {
  user: IUser;
  token: string;
}

const signUp = async (input: IUserSignUpDTO) => {
  const params: AxiosRequestConfig = {
    url: "/auth/signup",
    method: "post",
    data: input
  };

  const { data } = await API.request<IUserResult>(params);
  return data;
};

const signIn = async (input: IUserSignInDTO) => {
  const params: AxiosRequestConfig = {
    url: "/auth/signin",
    method: "post",
    data: input
  };

  const { data } = await API.request<IUserResult>(params);
  return data;
};

export const authService = { signUp, signIn };
