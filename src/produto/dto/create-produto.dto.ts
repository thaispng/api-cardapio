import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNumber()
  preco: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  imagem: string;

  @ApiProperty()
  @IsString()
  descricao: string;

  @ApiProperty()
  @IsString()
  categoriaId: string;
}
