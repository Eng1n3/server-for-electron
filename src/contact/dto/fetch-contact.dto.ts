import { IsDate, IsOptional } from 'class-validator';

export class uploadsDto {
  @IsDate()
  @IsOptional()
  lastDate?: Date;
}
