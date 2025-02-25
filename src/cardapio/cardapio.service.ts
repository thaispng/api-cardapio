import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CardapioService {
  constructor(private readonly prisma: PrismaService) {}

  // Buscar um cardápio pelo turno (diurno/noturno)
  async findByTurno(turno: string) {
    // Buscar o cardápio pelo turno
    const cardapio = await this.prisma.cardapio.findUnique({
      where: { turno },
    });

    if (!cardapio) {
      throw new NotFoundException('Cardápio não encontrado');
    }

    // Buscar produtos usando os IDs armazenados no cardápio
    const produtos = await this.prisma.produto.findMany({
      where: {
        id: { in: cardapio.produtos || [] }, // Evita erro se produtos for undefined
      },
    });

    return { ...cardapio, produtos };
  }

  // Adicionar produtos ao cardápio
  async addProdutos(cardapioId: string, produtosIds: string[]) {
    // Verifica se o cardápio existe
    const cardapio = await this.prisma.cardapio.findUnique({
      where: { id: cardapioId },
    });

    if (!cardapio) {
      throw new NotFoundException('Cardápio não encontrado');
    }

    // Se o cardápio ainda não tiver produtos, inicializa como um array vazio
    const produtosAtuais = cardapio.produtos ?? [];

    return await this.prisma.cardapio.update({
      where: { id: cardapioId },
      data: {
        produtos: [...new Set([...produtosAtuais, ...produtosIds])], // Evita IDs duplicados
      },
    });
  }
}
