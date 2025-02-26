import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro na criação da categoria.' })
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias retornada com sucesso.',
  })
  @ApiResponse({ status: 500, description: 'Erro ao buscar categorias.' })
  @ApiOperation({ summary: 'Listar todas as categorias' })
  async getAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Categoria encontrada com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  @ApiOperation({ summary: 'Buscar categoria por ID' })
  async getById(@Param('id') id: string) {
    return this.categoriaService.findById(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na atualização da categoria.',
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  @ApiOperation({ summary: 'Atualizar categoria por ID' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Categoria deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  @ApiOperation({ summary: 'Deletar categoria por ID' })
  async delete(@Param('id') id: string) {
    return this.categoriaService.delete(id);
  }
}
