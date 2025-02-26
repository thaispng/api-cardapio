import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProdutoDto {
  @ApiProperty({
    description: 'ID do cardápio ao qual o produto será adicionado',
  })
  @IsString()
  cardapioId: string;

  @ApiProperty({ description: 'ID do produto a ser adicionado' })
  @IsString()
  produtoId: string;
}
