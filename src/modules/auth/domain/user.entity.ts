import { EmployeeEntity } from '../../employee-management/domain/employee.entity';
import { TransactionEntity } from '../../transaction-management/domain/transaction.entity';

export class UserEntity {
  id: string;
  phone: string;
  email: string;
  password: string;
  role: userRole;
  employee?: EmployeeEntity;
  transactions?: TransactionEntity[];
}

export type userRole = 'ADMIN' | 'CASHIER';
