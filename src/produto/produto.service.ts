import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateProdutoDto): Promise<any> {
    try {
      return await this.prisma.produto.create({
        data: {
          nome: dto.nome,
          preco: dto.preco,
          descricao: dto.descricao,
          imagem: dto.imagem || null, 
          categoriaId: dto.categoriaId || undefined,
        },
      });
    } catch {
      throw new BadRequestException('Erro ao criar o produto');
    }
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.produto.findMany();
  }

  async findOne(id: string): Promise<any> {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  async update(id: string, dto: UpdateProdutoDto): Promise<any> {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.prisma.produto.update({
      where: { id },
      data: {
        nome: dto.nome ?? produto.nome,
        preco: dto.preco ?? produto.preco,
        descricao: dto.descricao ?? produto.descricao,
        imagem: dto.imagem !== undefined ? dto.imagem : produto.imagem,
        categoriaId: dto.categoriaId ?? produto.categoriaId,
      },
    });
  }

  async remove(id: string): Promise<any> {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return this.prisma.produto.delete({ where: { id } });
  }
}
