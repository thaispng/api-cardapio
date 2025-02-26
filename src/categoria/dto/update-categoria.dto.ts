import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoriaDto {
  @ApiProperty({
    description: 'Nome da categoria atualizado',
    example: 'Eletrodomésticos',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;
}
