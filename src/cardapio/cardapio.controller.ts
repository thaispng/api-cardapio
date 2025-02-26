import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { CardapioService } from './cardapio.service';
import { CreateCardapioDto } from './dto/create-cardapio.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cardapios')
@Controller('cardapios')
export class CardapioController {
  constructor(private readonly cardapioService: CardapioService) {}

  @Post()
  @ApiBody({ type: CreateCardapioDto })
  @ApiOperation({ summary: 'Criar um novo cardápio' })
  @ApiResponse({ status: 201, description: 'Cardápio criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro na criação do cardápio.' })
  create(@Body() createCardapioDto: CreateCardapioDto) {
    return this.cardapioService.create(createCardapioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cardápios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cardápios retornada com sucesso.',
  })
  @ApiResponse({ status: 500, description: 'Erro ao buscar cardápios.' })
  findAll() {
    return this.cardapioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cardápio por ID' })
  @ApiResponse({ status: 200, description: 'Cardápio encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cardápio não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.cardapioService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um cardápio' })
  @ApiResponse({ status: 200, description: 'Cardápio removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cardápio não encontrado.' })
  remove(@Param('id') id: string) {
    return this.cardapioService.remove(id);
  }
}
