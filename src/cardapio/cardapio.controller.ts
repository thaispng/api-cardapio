import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { CardapioService } from './cardapio.service';
import { CreateCardapioDto } from './dto/create-cardapio.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('cardapios')
export class CardapioController {
  constructor(private readonly cardapioService: CardapioService) {}

  @Post()
  @ApiBody({ type: CreateCardapioDto })
  @ApiOperation({ summary: 'Criar um novo cardapio' })
  create(@Body() createCardapioDto: CreateCardapioDto) {
    return this.cardapioService.create(createCardapioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cardapios' })
  findAll() {
    return this.cardapioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cardapio por ID' })
  findOne(@Param('id') id: string) {
    return this.cardapioService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um cardapio' })
  remove(@Param('id') id: string) {
    return this.cardapioService.remove(id);
  }
}
