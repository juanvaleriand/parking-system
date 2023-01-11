import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Kendaraan } from '../../common/constants/kendaraan.enum';

export class CreateLoggingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public kendaraan: Kendaraan;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public tipe: string;
}