export class LoginResponse {
  jwt_token: string;
  user: {
    id?: string;
    phone: string;
    user_id?: string;
    role?: string;
  };
}
