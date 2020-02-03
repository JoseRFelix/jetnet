import { API } from "helpers";
import { AxiosRequestConfig } from "axios";
import { IUserSignUpDTO, IUserSignInDTO, IUser } from "interfaces";

export interface IResult {
  user: IUser;
  token: string;
}

const isAvailable = async (email: string) => {
  const params: AxiosRequestConfig = {
    url: "/auth/available",
    method: "post",
    data: { email }
  };

  const { data } = await API.request<{ isAvailable: boolean }>(params);
  return data;
};

const signUp = async (input: IUserSignUpDTO) => {
  const params: AxiosRequestConfig = {
    url: "/auth/signup",
    method: "post",
    data: input
  };

  const { data } = await API.request<IResult>(params);
  return data;
};

const signIn = async (input: IUserSignInDTO) => {
  const params: AxiosRequestConfig = {
    url: "/auth/signin",
    method: "post",
    data: input
  };

  const { data } = await API.request<IResult>(params);
  return data;
};

export const authService = { signUp, signIn, isAvailable };
