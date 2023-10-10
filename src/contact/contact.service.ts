import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { EntityManager, MoreThan, Repository } from 'typeorm';
import { ContactDto } from './dto/uploads-contact.dto';
import { ContactImage } from './entities/contact-image.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectEntityManager()
    private readonly manager: EntityManager,
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

  async fetchAll(lastDate?: Date) {
    const contacts = await this.contactRepo.find({
      withDeleted: true,
      where: [
        {
          createdAt: lastDate ? MoreThan(lastDate) : undefined,
        },
        { updatedAt: lastDate ? MoreThan(lastDate) : undefined },
        {
          deletedAt: lastDate ? MoreThan(lastDate) : undefined,
        },
      ],
      relations: { image: true },
    });
    const lastCreatedDatabaseQuery = await this.contactRepo
      .createQueryBuilder('contacts')
      .select('MAX(createdAt)', 'dateColumn');
    const lastUpdatedDatabaseQuery = this.contactRepo
      .createQueryBuilder('contacts')
      .select('MAX(createdAt)', 'dateColumn');
    const lastDeletedDatabaseQuery = this.contactRepo
      .createQueryBuilder('contacts')
      .select('MAX(createdAt)', 'dateColumn');
    const [data] = await this.manager.query(
      `SELECT MAX(dateColumn) as lastDate FROM (
          ${lastCreatedDatabaseQuery.getQuery()}
          UNION
          ${lastUpdatedDatabaseQuery.getQuery()}
          UNION
          ${lastDeletedDatabaseQuery.getQuery()}
        )`,
    );
    const lastDateDatabase = data?.lastDate;
    return { contacts, lastDateDatabase };
  }
}
