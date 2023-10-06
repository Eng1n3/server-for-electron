import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
  ) {}

  async uploads(contactDto: ContactDto[]) {
    const contacts = contactDto?.map(this.contactRepo.create);
    await this.contactRepo.save(contacts);
  }

  async fetchAll() {
    const contacts = await this.contactRepo.find({
      relations: { image: true },
    });
    return contacts;
  }
}
