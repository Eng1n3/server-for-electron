import { DataSource } from 'typeorm';
import { SeederEntity } from '../entities/seeder.entity';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Contact } from 'src/contact/entities/contact.entity';
import { ContactImage } from 'src/contact/entities/contact-image.entity';
import { v4 as uuidv4 } from 'uuid';

export default class ContactSeeder extends Seeder {
  public async run(datasource: DataSource): Promise<void> {
    // if seeder already executed
    if (
      await datasource
        .getRepository(SeederEntity)
        .findOneBy({ name: ContactSeeder.name })
    )
      return;

    const contactBulk: Contact[] = [];
    const contactRepo = await datasource.getRepository(Contact);
    const contactImageRepo = await datasource.getRepository(ContactImage);
    for (let i = 1; i < 11; i++) {
      const newContactImage = contactImageRepo.create({
        filename: `testfilename${i}`,
        mimeType: i > 5 ? 'image/png' : 'image/jpg',
        originalName: `testOriginalFileName${i}`,
      });
      const newContactImageSave = await contactImageRepo.save(newContactImage);
      const newContact = contactRepo.create({
        email: `test${i}@gmail.com`,
        name: `testnama${i}`,
        gender: i > 5 ? 'male' : 'female',
        phoneNumber: Number(`12${i}`),
        image: newContactImageSave,
      });
      contactBulk.push(newContact);
    }
    await contactRepo.save(contactBulk);
    // add to seeders table
    await datasource
      .getRepository(SeederEntity)
      .save({ name: ContactSeeder.name, timestamp: 1686702477477 });
  }
}
