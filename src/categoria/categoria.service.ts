import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoriaDto) {
    try {
      return await this.prisma.categoria.create({
        data: { nome: dto.nome },
      });
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw new Error('Erro ao criar categoria');
    }
  }

  async findAll() {
    return this.prisma.categoria.findMany({
      include: { produtos: true },
    });
  }
}
