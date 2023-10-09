import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string, metadata: ArgumentMetadata): Date {
    const val = new Date(parseInt(value)).getTime() > 0;
    if (!val) {
      throw new BadRequestException('last date synchronize is required');
    }
    return new Date(parseInt(value));
  }
}
