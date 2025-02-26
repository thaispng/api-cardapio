import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { CardapioModule } from './cardapio/cardapio.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CardapioAtualModule } from './cardapio-atual/cardapio.module';

@Module({
  imports: [
    ProdutoModule,
    CardapioModule,
    CategoriaModule,
    CardapioAtualModule,
  ],
})
export class AppModule {}
