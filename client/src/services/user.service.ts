import { API, authHeader } from "helpers";
import { AxiosRequestConfig } from "axios";
import { IUser, IUserEditProfileDTO } from "interfaces";

export interface IEditProfileResult {
  user: IUser;
}

const editProfile = async (input: IUserEditProfileDTO, token: string) => {
  const params: AxiosRequestConfig = {
    url: "/users/profile/edit",
    method: "post",
    data: input,
    headers: authHeader(token)
  };

  const { data } = await API.request<IEditProfileResult>(params);
  return data;
};

export const userService = { editProfile };
