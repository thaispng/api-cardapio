import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const options = new DocumentBuilder()
    .setTitle('Cardápio API')
    .setDescription('API para gerenciar cardápios, produtos e categorias')
    .setVersion('1.0')
    .addTag('cardapio')  // Adicionando todas as tags
    .addTag('produtos')
    .addTag('categorias')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);  // Rota onde o Swagger estará disponível

  await app.listen(3000);
}
bootstrap();
