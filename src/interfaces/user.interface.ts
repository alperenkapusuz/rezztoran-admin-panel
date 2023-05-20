export interface IUserTable {
  id: number;
  username: string;
  name: string;
  surname: string;
  mail: string;
  profileImageUrl: string;
  resetPassword: string;
  role: string;
}

export interface IUserPost {
  username: string;
  mail: string;
  password: string;
  name: string;
  surname: string;
  role: string;
}
