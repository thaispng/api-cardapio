import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  // Criar um produto
  async create(createProdutoDto: CreateProdutoDto) {
    return await this.prisma.produto.create({
      data: createProdutoDto,
    });
  }

  // Buscar todos os produtos
  async findAll() {
    return await this.prisma.produto.findMany();
  }

  // Buscar um produto por ID
  async findOne(id: string) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return produto;
  }

  // Atualizar um produto por ID
  async update(id: string, updateProdutoDto: CreateProdutoDto) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return await this.prisma.produto.update({
      where: { id },
      data: updateProdutoDto,
    });
  }

  // Deletar um produto por ID
  async remove(id: string) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return await this.prisma.produto.delete({
      where: { id },
    });
  }
}
