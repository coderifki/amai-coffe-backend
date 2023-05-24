import { User } from '@prisma/client';
import { RoleEntity } from '../../auth/domain/role.entitty';
import { TransactionEntity } from '../../transaction-management/domain/transaction.entity';

export class EmployeeEntity {
  id: string;
  user_id: string;
  user_info: User;
  address: string;
  birth_date: Date;
}
