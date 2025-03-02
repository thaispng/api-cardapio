import { IsArray, IsMongoId, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardapioDto {
  @ApiProperty({
    type: [String],
    description: 'Array de IDs dos produtos a serem adicionados ao cardápio',
  })
  @IsArray({ message: 'produtoIds deve ser um array' })
  @ArrayMinSize(1, { message: 'Selecione pelo menos um produto' })
  @IsMongoId({ each: true, message: 'ID de produto inválido' })
  produtoIds: string[];
}
