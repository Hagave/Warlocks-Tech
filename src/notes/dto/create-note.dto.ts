import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    description: 'Nome do Título',
    example: 'Minha primeira nota',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Nome da descrição',
    example: 'Minha primeira descrição',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
