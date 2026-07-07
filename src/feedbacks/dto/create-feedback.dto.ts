import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty({ message: 'O texto do feedback não pode ser vazio.' })
  @IsString({ message: 'O texto do feedback deve ser uma string.' })
  @MaxLength(1000, { message: 'O feedback deve ter no máximo 1000 caracteres.' })
  text: string;
}
