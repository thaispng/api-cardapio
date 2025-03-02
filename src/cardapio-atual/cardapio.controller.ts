/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, NotFoundException } from '@nestjs/common';
import { CardapioService } from './cardapio.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cardapio, Produto } from '@prisma/client';

@ApiTags('cardapio-atual')
@Controller('cardapio-atual')
export class CardapioController {
  constructor(private readonly cardapioService: CardapioService) {}

  @Get('cardapio-atual')
  @ApiOperation({ summary: 'Obter o cardápio baseado no horário atual' })
  @ApiResponse({ status: 200, description: 'Cardápio retornado com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Nenhum cardápio encontrado para o turno atual.',
  })
  async getCurrentCardapio(): Promise<Cardapio & { produtos: Produto[] }> {
    const cardapio = await this.cardapioService.findCurrentCardapio();
    if (!cardapio) {
      throw new NotFoundException(
        'Nenhum cardápio encontrado para o turno atual.',
      );
    }
    return cardapio;
  }
}
