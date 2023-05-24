import { UserEntity } from '../../domain/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface CreateUserProps {
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
}

export interface CheckUserExistenceProps {
  email?: string;
  phone?: string;
  excluded_id?: string;
}

export interface UserRepository {
  create(props: CreateUserProps): Promise<UserEntity>;

  checkExistence(props: CheckUserExistenceProps): Promise<UserEntity | null>;

  findById(): Promise<any>;
}
