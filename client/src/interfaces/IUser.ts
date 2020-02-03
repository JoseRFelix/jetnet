export interface IAddress {
  street: string;
  city: string;
  zip: string;
  state: string;
  country: string;
}

export interface ISecurityQuestion {
  question: string;
  answer: string;
}
export interface IUserEditProfileDTO {
  fullName: string;
  email: string;
  password: string;
  birthday: Date;
  phone: string;
  picture: string | null;
  address: IAddress;
  securityQuestions: ISecurityQuestion[];
}

export interface IUserSignUpDTO {
  fullName: string;
  email: string;
  password: string;
  birthday: Date;
  phone: string;
  picture: string | null;
  address: IAddress;
  securityQuestions: ISecurityQuestion[];
}

export interface IUserSignInDTO {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  birthday: string;
  phone: string;
  password: string;
  salt: string;
  picture: string | null;
  address: IAddress;
  securityQuestions: ISecurityQuestion[];
}
