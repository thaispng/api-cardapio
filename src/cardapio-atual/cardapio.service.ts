import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CardapioService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<any[]> {
    return this.prisma.cardapio.findMany();
  }

  async findOne(id: string): Promise<any> {
    const cardapio = await this.prisma.cardapio.findUnique({
      where: { id },
    });
    if (!cardapio) {
      throw new NotFoundException('Cardápio não encontrado');
    }
    return cardapio;
  }

  async findCurrentCardapio(): Promise<any> {
    const horaAtual = new Date().getHours();
    const turno = horaAtual >= 6 && horaAtual < 18 ? 'DIURNO' : 'NOTURNO';

    return this.prisma.cardapio.findFirst({
      where: { turno: turno },
      include: {
        produtos: {
          select: {
            produto: {
              select: {
                nome: true,
                categoria: true,
                preco: true,
              },
            },
          },
        },
      },
    });
  }
}
