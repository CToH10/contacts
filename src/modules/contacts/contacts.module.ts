import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../../database/prisma.service';
import { ContactsPrismaRepository } from './repositories/contacts.prisma.repository';
import { ContactsRepository } from './repositories/contacts.repository';

@Module({
  imports: [UsersModule],
  controllers: [ContactsController],
  providers: [
    ContactsService,
    PrismaService,
    ContactsPrismaRepository,
    {
      provide: ContactsRepository,
      useClass: ContactsPrismaRepository,
    },
  ],
})
export class ContactsModule {}
