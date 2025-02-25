import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class AddProdutosDto {
  @ApiProperty({ description: 'Array de IDs dos produtos a serem adicionados', type: [String] })
  @IsArray()
  @IsString({ each: true })
  produtosIds: string[];
}
