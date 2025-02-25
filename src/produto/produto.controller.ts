import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  // Criar um produto
  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro na criação do produto.' })
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  // Buscar todos os produtos (GET /produtos)
  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso.',
  })
  async findAll() {
    return this.produtoService.findAll();
  }

  // Buscar produto por ID (GET /produtos/:id)
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async findOne(@Param('id') id: string) {
    return this.produtoService.findOne(id);
  }

  // Atualizar um produto por ID (PUT /produtos/:id)
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async update(
    @Param('id') id: string,
    @Body() updateProdutoDto: CreateProdutoDto,
  ) {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Produto deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async remove(@Param('id') id: string) {
    return this.produtoService.remove(id);
  }
}
