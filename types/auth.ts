export interface IRegister {
  email: string;
  username: string;
  password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  avatar: string;
  fullName: string;
  email: string;
  role: string;
}
