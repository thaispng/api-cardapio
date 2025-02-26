import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateProdutoDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @IsOptional()
  preco?: number;
}
