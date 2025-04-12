export interface IUser {
  name: string;
  email: string;
  password: string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserLoginResponse {
  id: string;
  email: string;
  name: string;
  balance: number;
}