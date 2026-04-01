import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
