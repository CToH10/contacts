import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { User } from 'src/modules/users/entities/user.entity';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User> | User;
  abstract findAll(): Promise<User[]> | User[];
  abstract findOne(id: string): Promise<User> | User;
  abstract update(id: string, data: UpdateUserDto): Promise<User> | User;
  abstract delete(id: string): Promise<void> | void;
  abstract findEmail(email: string): Promise<User | null>;
}
