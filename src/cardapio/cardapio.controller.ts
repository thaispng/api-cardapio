import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CardapioService } from './cardapio.service';
import { CreateCardapioDto } from './dto/create-cardapio.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cardapio, CardapioProduto } from '@prisma/client';
import { UpdateCardapioDto } from './dto/update-cardapio.dto';

interface CardapioWithProdutos extends Cardapio {
  produtos: (CardapioProduto & {
    produto: {
      id: string;
      nome: string;
      preco: number;
      descricao: string;
      imagem?: string | null;
      categoria?: {
        id: string;
        nome: string;
      } | null;
    };
  })[];
}

@ApiTags('cardapio')
@Controller('cardapio')
export class CardapioController {
  constructor(private readonly cardapioService: CardapioService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo cardápio' })
  @ApiResponse({ status: 201, description: 'Cardápio criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(
    @Body() createCardapioDto: CreateCardapioDto,
  ): Promise<CardapioWithProdutos> {
    return this.cardapioService.create(createCardapioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cardápios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cardápios retornada com sucesso',
  })
  async findAll(): Promise<CardapioWithProdutos[]> {
    return this.cardapioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cardápio por ID' })
  @ApiResponse({ status: 200, description: 'Cardápio encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cardápio não encontrado' })
  async findOne(@Param('id') id: string): Promise<CardapioWithProdutos> {
    return this.cardapioService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um cardápio' })
  @ApiResponse({ status: 200, description: 'Cardápio removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Cardápio não encontrado' })
  async remove(@Param('id') id: string): Promise<Cardapio> {
    return this.cardapioService.remove(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Adicionar mais produtos ao cardápio' })
  @ApiResponse({ status: 200, description: 'Produtos adicionados com sucesso' })
  @ApiResponse({ status: 404, description: 'Cardápio não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async update(
    @Param('id') id: string,
    @Body() updateCardapioDto: UpdateCardapioDto,
  ): Promise<CardapioWithProdutos> {
    return this.cardapioService.update(id, updateCardapioDto);
  }
}
