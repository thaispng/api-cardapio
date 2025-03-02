import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardapioDto } from './dto/create-cardapio.dto';

@Injectable()
export class CardapioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCardapioDto) {
    try {
      console.log('Recebido no backend:', dto);

      let cardapio = await this.prisma.cardapio.findFirst({
        where: { turno: dto.turno },
      });

      if (!cardapio) {
        cardapio = await this.prisma.cardapio.create({
          data: {
            turno: dto.turno,
          },
        });
      }

      if (!dto.produtoIds || !Array.isArray(dto.produtoIds)) {
        console.warn('Nenhum produto foi enviado ou o formato está incorreto.');
        return cardapio;
      }

      const produtosJaAdicionados = await this.prisma.cardapioProduto.findMany({
        where: { cardapioId: cardapio.id },
        select: { produtoId: true },
      });

      const produtosExistentesIds = new Set(
        produtosJaAdicionados.map((p) => p.produtoId),
      );

      const novosProdutos = dto.produtoIds.filter(
        (produtoId) => !produtosExistentesIds.has(produtoId),
      );

      if (novosProdutos.length > 0) {
        await this.prisma.cardapioProduto.createMany({
          data: novosProdutos.map((produtoId) => ({
            cardapioId: cardapio.id,
            produtoId: produtoId,
          })),
        });
      }

      return cardapio;
    } catch (error: any) {
      console.error('Erro ao criar cardápio:', error);
      throw new InternalServerErrorException(
        `Erro ao criar cardápio: ${(error as Error).message || 'Erro desconhecido'}`,
      );
    }
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
