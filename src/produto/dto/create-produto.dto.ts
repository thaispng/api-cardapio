import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty({ description: 'Nome do produto' })
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Preço do produto' })
  @IsNumber()
  preco: number;

  @ApiProperty({ description: 'Descrição do produto' })
  @IsString()
  descricao: string;

  @ApiProperty({ description: 'URL da imagem', required: false })
  @IsOptional()
  @IsString()
  imagem?: string;

  @ApiProperty({ description: 'ID da categoria (opcional)', required: false })
  @IsOptional()
  @IsString()
  categoriaId?: string;
}
