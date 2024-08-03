export type User = {
  id: number;
  email: string;
  username: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};
