export interface ICurrentUser {
  id: string;
  phone: string;
  email: string;
  role: 'ADMIN' | 'CASHIER';
}
