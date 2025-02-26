import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { CommonModule } from '../common/dto/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CategoriaController],
  providers: [CategoriaService, PrismaService],
  exports: [CategoriaService],
})
export class CategoriaModule {}
