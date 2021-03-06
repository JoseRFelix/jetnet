interface IAddress {
  street: string;
  city: string;
  zip: string;
  state: string;
  country: string;
}

interface ISecurityQuestion {
  question: string;
  answer: string;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  birthday: Date;
  phone: string;
  password: string;
  salt: string;
  picture?: string;
  address: IAddress;
  securityQuestions: ISecurityQuestion[];
}

export interface IUserInputDTO {
  fullName: string;
  email: string;
  password: string;
  birthday: Date;
  phone: string;
  picture?: string;
  address: IAddress;
  securityQuestions: ISecurityQuestion[];
}
