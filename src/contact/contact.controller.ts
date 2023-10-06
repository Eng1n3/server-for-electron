import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { ContactService } from './contact.service';

@Controller('synchronize')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('fetch')
  @HttpCode(HttpStatus.OK)
  async fetch() {
    const result = await this.contactService.fetchAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'success fetch all data',
      data: result,
    };
  }

  @Post('uploads')
  @HttpCode(HttpStatus.CREATED)
  async uploads(
    @Body(new ParseArrayPipe({ items: ContactDto }))
    contactDto: ContactDto[],
  ) {
    await this.contactService.uploads(contactDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Success upload data',
    };
  }
}
