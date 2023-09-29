export interface User {
  username: string;
  password: string;
}

export interface LoginResponse {
  data: { token: string };
}
export interface LoginRequest {
  email: string;
  password: string;
}
