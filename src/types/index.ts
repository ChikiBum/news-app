export type NewsItem = {
  id: number;
  title: string;
  content?: string;
};
export type NewsFeed = NewsItem[];

export type GetNewsFilters = Record<string, never> | {
  limit: number;
  page: number;
};

export type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
};

export type Users = User[];

export type Token = string | null;


export type LoginRequest = {
  username: string;
  password: string;
};    

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
  token: Token | null;
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
