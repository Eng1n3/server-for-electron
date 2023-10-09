import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { ContactDto } from './dto/uploads-contact.dto';
import { ContactImage } from './entities/contact-image.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactImage)
    private contactImageRepo: Repository<ContactImage>,
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
  ) {}

  async uploads(contactDto: ContactDto[]) {
    const newImages = this.contactImageRepo.create(
      contactDto?.map((contact: Contact) => ({ ...contact.image })),
    );
    await this.contactImageRepo.save(newImages);
    const newContacts = this.contactRepo.create(contactDto);
    await this.contactRepo.save(newContacts);
  }

  async fetchAll() {
    const contacts = await this.contactRepo.find({
      relations: { image: true },
    });
    return contacts;
  }
}
