import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { CardapioService } from './cardapio.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddProdutosDto } from './dto/add-produtos.dto';

@ApiTags('cardapios')
@Controller('cardapios')
export class CardapioController {
  constructor(private readonly cardapioService: CardapioService) {}

  @Get('turno/:turno')
  @ApiOperation({ summary: 'Buscar cardápio pelo turno (diurno/noturno)' })
  @ApiResponse({ status: 200, description: 'Cardápio encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cardápio não encontrado.' })
  async findByTurno(@Param('turno') turno: string) {
    return this.cardapioService.findByTurno(turno);
  }

  @Put(':id/produtos')
  @ApiOperation({ summary: 'Adicionar produtos ao cardápio' })
  @ApiResponse({ status: 200, description: 'Produtos adicionados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cardápio não encontrado.' })
  async addProdutos(@Param('id') id: string, @Body() addProdutosDto: AddProdutosDto) {
    return this.cardapioService.addProdutos(id, addProdutosDto.produtosIds);
  }
}
