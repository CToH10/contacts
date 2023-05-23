import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { PrismaService } from '../../../database/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const user: User = new User();
    Object.assign(user, { ...data });

    const createdUser: User = await this.prisma.user.create({
      data: { ...user },
    });
    return plainToInstance(User, createdUser);
  }

  async findAll(): Promise<User[]> {
    const userList: User[] = await this.prisma.user.findMany();

    return plainToInstance(User, userList);
  }

  async findOne(id: string): Promise<User> {
    const findUser: User | null = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    return plainToInstance(User, findUser);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const findUser: User | null = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    const updatedUser: User = await this.prisma.user.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(User, updatedUser);
  }

  async delete(id: string): Promise<void> {
    const findUser: User | null = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!findUser) {
      throw new HttpException('User not found', 404);
    }

    await this.prisma.user.delete({ where: { id } });
  }

  async findEmail(email: string): Promise<User | null> {
    const findUser: User | null = await this.prisma.user.findUnique({
      where: { email },
    });

    return findUser;
  }
}
