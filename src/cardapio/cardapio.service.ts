import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardapioDto } from './dto/create-cardapio.dto';

@Injectable()
export class CardapioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCardapioDto) {
    return await this.prisma.cardapio.create({
      data: {
        turno: dto.turno,
        produtos: {
          create: dto.produtoIds.map((produtoId) => ({
            produto: { connect: { id: produtoId } },
          })),
        },
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.cardapio.findMany();
  }

  async findOne(id: string): Promise<any> {
    const cardapio = await this.prisma.cardapio.findUnique({ where: { id } });
    if (!cardapio) {
      throw new NotFoundException('Cardápio não encontrado');
    }
    return cardapio;
  }

  async remove(id: string): Promise<any> {
    const cardapio = await this.prisma.cardapio.findUnique({ where: { id } });
    if (!cardapio) {
      throw new NotFoundException('Cardápio não encontrado');
    }
    return this.prisma.cardapio.delete({ where: { id } });
  }
}
