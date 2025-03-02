import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardapioDto } from './dto/create-cardapio.dto';
import { Prisma, Cardapio, CardapioProduto } from '@prisma/client';
import { UpdateCardapioDto } from './dto/update-cardapio.dto';

interface CardapioWithProdutos extends Cardapio {
  produtos: (CardapioProduto & {
    produto: {
      id: string;
      nome: string;
      preco: number;
      descricao: string;
      imagem?: string | null;
      categoria?: {
        id: string;
        nome: string;
      } | null;
    };
  })[];
}

@Injectable()
export class CardapioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCardapioDto): Promise<CardapioWithProdutos> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const cardapioExistente = await tx.cardapio.findFirst({
          where: { turno: dto.turno },
        });

        if (cardapioExistente) {
          throw new BadRequestException(
            `Já existe um cardápio cadastrado para o turno ${dto.turno}`,
          );
        }

        const produtos = await tx.produto.findMany({
          where: {
            id: {
              in: dto.produtoIds,
            },
          },
        });

        if (produtos.length !== dto.produtoIds.length) {
          throw new BadRequestException(
            'Um ou mais produtos não foram encontrados',
          );
        }

        const cardapio = await tx.cardapio.create({
          data: {
            turno: dto.turno,
            produtos: {
              create: dto.produtoIds.map((produtoId) => ({
                produto: {
                  connect: { id: produtoId },
                },
              })),
            },
          },
          include: {
            produtos: {
              include: {
                produto: {
                  include: {
                    categoria: true,
                  },
                },
              },
            },
          },
        });

        return cardapio as CardapioWithProdutos;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Já existe um cardápio para este turno',
          );
        }
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao criar cardápio');
    }
  }

  async findAll(): Promise<CardapioWithProdutos[]> {
    return this.prisma.cardapio.findMany({
      include: {
        produtos: {
          include: {
            produto: {
              include: {
                categoria: true,
              },
            },
          },
        },
      },
    }) as Promise<CardapioWithProdutos[]>;
  }

  async findOne(id: string): Promise<CardapioWithProdutos> {
    const cardapio = await this.prisma.cardapio.findUnique({
      where: { id },
      include: {
        produtos: {
          include: {
            produto: {
              include: {
                categoria: true,
              },
            },
          },
        },
      },
    });

    if (!cardapio) {
      throw new NotFoundException('Cardápio não encontrado');
    }

    return cardapio as CardapioWithProdutos;
  }
  async remove(id: string): Promise<Cardapio> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.cardapioProduto.deleteMany({
          where: { cardapioId: id },
        });

        return await tx.cardapio.delete({
          where: { id },
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Cardápio não encontrado');
        }
      }
      throw new InternalServerErrorException('Erro ao remover cardápio');
    }
  }
  async update(
    id: string,
    dto: UpdateCardapioDto,
  ): Promise<CardapioWithProdutos> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const cardapio = await tx.cardapio.findUnique({
          where: { id },
          include: {
            produtos: true,
          },
        });

        if (!cardapio) {
          throw new NotFoundException('Cardápio não encontrado');
        }

        const produtos = await tx.produto.findMany({
          where: {
            id: {
              in: dto.produtoIds,
            },
          },
        });

        if (produtos.length !== dto.produtoIds.length) {
          throw new BadRequestException(
            'Um ou mais produtos não foram encontrados',
          );
        }

        const produtosExistentes = cardapio.produtos.map((p) => p.produtoId);
        const novosProdutos = dto.produtoIds.filter(
          (produtoId) => !produtosExistentes.includes(produtoId),
        );

        if (novosProdutos.length > 0) {
          await tx.cardapioProduto.createMany({
            data: novosProdutos.map((produtoId) => ({
              cardapioId: id,
              produtoId,
            })),
          });
        }

        return (await tx.cardapio.findUnique({
          where: { id },
          include: {
            produtos: {
              include: {
                produto: {
                  include: {
                    categoria: true,
                  },
                },
              },
            },
          },
        })) as CardapioWithProdutos;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Cardápio não encontrado');
        }
      }
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao atualizar cardápio');
    }
  }
}
