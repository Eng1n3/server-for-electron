import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactImage } from './entities/contact-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, ContactImage])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
