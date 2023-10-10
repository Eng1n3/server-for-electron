import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseArrayPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ContactDto } from './dto/uploads-contact.dto';
import { ContactService } from './contact.service';
import { ParseDatePipe } from './pipes/parse-date.pipe';
import { Response } from 'express';

@Controller('synchronize')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get('download')
  @HttpCode(HttpStatus.OK)
  async download(
    @Res({ passthrough: true }) res: Response,
    @Query('lastDate', ParseDatePipe) lastDate?: Date,
  ) {
    const result = await this.contactService.fetchAll(lastDate);
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="contact.json"',
    });
    return result;
  }

  @Get('fetch')
  @HttpCode(HttpStatus.OK)
  async fetch(@Query('lastDate', ParseDatePipe) lastDate: Date) {
    const result = await this.contactService.fetchAll(lastDate);
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
