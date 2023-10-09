import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class ContactImageDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  filename: string;

  @IsString()
  originalName: string;

  @IsString()
  mimeType: string;

  @IsString()
  createdAt?: Date;

  @IsString()
  @IsOptional()
  updatedAt?: Date;

  @IsString()
  @IsOptional()
  deletedAt?: Date;
}

export class ContactDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsNumber()
  phoneNumber: number;

  @IsObject()
  @Type(() => ContactImageDto)
  @ValidateNested()
  image: ContactImageDto;

  @IsString()
  gender: string;

  @IsString()
  createdAt: Date;

  @IsString()
  @IsOptional()
  updatedAt: Date;

  @IsString()
  @IsOptional()
  deletedAt: Date;
}
