export type NewsItem = {
  id: string;
  site: string;
  url: string;
  parsed: boolean;
  forced: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
export type NewsFeed = NewsItem[];

export type GetNewsFilters = Record<string, never> | {
  limit: number;
  page: number;
};

export type User = {
  id?: string;
  username: string;
  email: string;
  password?: string;
};

export type RegisterResponse = {
  id: string;
  email: string;
  token: string;

};

export type Users = User[];

export type Token = string | null;


export type LoginRequest = {
  email: string;
  password: string;
};    

export type LoginResponse = {
  id: string;
  username: string;
  email: string;
}
export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};
export type NewsRequest = {
  token: Token;
}; 

export type GetUsersFilters = {
  limit: number;
  page: number;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  setToken: (token: Token) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export type RegisterForm = {
  username: string;
   email: string;
  password: string;
  name: string;
};

export type AuthField = {
  name: keyof RegisterForm; 
  type: string;
  placeholder: string;
  required?: boolean;
};

export type AuthFormProps = {
  title: string;
  fields: AuthField[];
  values: Partial<RegisterForm>;
  onChange?: <K extends keyof RegisterForm>(name: K, value: RegisterForm[K]) => void;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  submitText: string;
  disabled?: boolean;
  error?: string;
};
