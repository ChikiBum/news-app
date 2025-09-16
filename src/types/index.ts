type NewsItem = {
	id: number;
	title: string;
};

export type NewsFeed = NewsItem[];

export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
export type LoginRequest = {
  email: string;
  password: string;
};    

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};
export type RegisterResponse = AuthResponse;
export type LoginResponse = AuthResponse;
export type ErrorResponse = {
  message: string;
};
export type GetUsersFilters = {
  limit: number;
  page: number;
};
