// src/cardapio/dto/create-cardapio.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateCardapioDto {
  @ApiProperty()
  turno: string;

  @ApiProperty()
  produtos: string[]; // IDs de produtos

}
