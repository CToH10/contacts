import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/users.repository';
import { UsersPrismaRepository } from './repositories/users.prisma.repository';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    UsersPrismaRepository,
    {
      provide: UserRepository,
      useClass: UsersPrismaRepository,
    },
  ],
})
export class UsersModule {}
