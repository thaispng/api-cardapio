import { IsArray, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddProdutosDto {
  @ApiProperty({
    type: [String],
    description: 'Array de IDs dos produtos a serem adicionados ao cardápio',
  })
  @IsArray()
  @IsMongoId({ each: true })
  produtoIds: string[];
}
