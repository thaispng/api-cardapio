import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProdutoCategoriaDto {
  @ApiProperty({
    description: 'ID da nova categoria a ser associada ao produto',
  })
  @IsString()
  categoriaId: string;
}
