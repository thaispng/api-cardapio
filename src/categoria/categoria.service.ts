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
    return this.prisma.categoria.findMany();
  }

  async findById(id: string) {
    return this.prisma.categoria.findUnique({ where: { id } });
  }

  async update(id: string, dto: CreateCategoriaDto) {
    return this.prisma.categoria.update({
      where: { id },
      data: { nome: dto.nome },
    });
  }

  async delete(id: string) {
    return this.prisma.categoria.delete({ where: { id } });
  }
}
