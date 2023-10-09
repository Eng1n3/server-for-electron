import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ContactDto } from './dto/uploads-contact.dto';
import { ContactService } from './contact.service';
import { ParseDatePipe } from './pipes/parse-date.pipe';

@Controller('synchronize')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('fetch')
  @HttpCode(HttpStatus.OK)
  async fetch(@Query('lastDate', ParseDatePipe) lastDate: Date) {
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
