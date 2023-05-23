import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsPrismaRepository } from './repositories/contacts.prisma.repository';

@Injectable()
export class ContactsService {
  constructor(private contactsRepository: ContactsPrismaRepository) {}
  create(createContactDto: CreateContactDto, userId: string) {
    return this.contactsRepository.create(createContactDto, userId);
  }

  findAll(userId: string) {
    return this.contactsRepository.findAll(userId);
  }

  findOne(id: string) {
    return this.contactsRepository.findOne(id);
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.contactsRepository.update(id, updateContactDto);
  }

  remove(id: string) {
    return this.contactsRepository.delete(id);
  }
}
