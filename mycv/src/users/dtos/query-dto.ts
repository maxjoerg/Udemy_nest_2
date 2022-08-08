/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsDate, IsString, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { toBoolean, toLowerCase, toNumber, trim, toDate } from 'src/common/helper/cast.helper';

export class QueryDto {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  pwd: string;

  @IsOptional()
  @IsString()
  type: string;

  /*@Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  @IsOptional()
  public foo: boolean = false;

  @Transform(({ value }) => trim(value))
  @IsOptional()
  public bar: string;

  @Transform(({ value }) => toLowerCase(value))
  @IsOptional()
  public elon: string;

  @IsNumberString()
  @IsOptional()
  public musk: string;

  @Transform(({ value }) => toDate(value))
  @IsDate()
  @IsOptional()
  public date: Date; */
}