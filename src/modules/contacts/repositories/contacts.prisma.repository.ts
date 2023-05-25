import { HttpException, Injectable } from '@nestjs/common';
import { ContactsRepository } from './contacts.repository';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';
import { PrismaService } from '../../../database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContactsPrismaRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateContactDto, user: string): Promise<Contact> {
    const contact: Contact = new Contact();
    Object.assign(contact, { ...data, userId: user });

    const createdContact: Contact = await this.prisma.contact.create({
      data: { ...contact },
    });

    return plainToInstance(Contact, createdContact);
  }

  async findAll(
    user: string,
    name: string | undefined,
    email: string | undefined,
  ): Promise<Contact[]> {
    const contactList: Contact[] = await this.prisma.contact.findMany({
      where: {
        userId: user,
        fullName: { contains: name },
        email: {
          contains: email,
        },
      },
    });

    return plainToInstance(Contact, contactList);
  }

  async findOne(id: string): Promise<Contact> {
    const findContact: Contact | null = await this.prisma.contact.findFirst({
      where: {
        id,
      },
    });

    if (!findContact) {
      throw new HttpException('Contact not found', 404);
    }

    return plainToInstance(Contact, findContact);
  }
  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const findContact: Contact | null = await this.prisma.contact.findFirst({
      where: {
        id,
      },
    });

    if (!findContact) {
      throw new HttpException('Contact not found', 404);
    }

    const updatedContact: Contact = await this.prisma.contact.update({
      where: {
        id: id,
      },
      data: { ...data },
    });

    return plainToInstance(Contact, updatedContact);
  }
  async delete(id: string): Promise<void> {
    const findContact: Contact | null = await this.prisma.contact.findFirst({
      where: {
        id,
      },
    });

    if (!findContact) {
      throw new HttpException('Contact not found', 404);
    }

    await this.prisma.contact.delete({
      where: {
        id: id,
      },
    });
  }
}
