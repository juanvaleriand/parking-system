import { ApiProperty } from "@nestjs/swagger";

export class LoggingDto {
  @ApiProperty()
  public kendaraan: string;

  @ApiProperty()
  public tipe: string;

  @ApiProperty()
  public check_in: Date;

  @ApiProperty()
  public check_out: Date;

  @ApiProperty()
  public biaya: number;
}