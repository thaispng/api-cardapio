import { Controller, Post, Body } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
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
}
