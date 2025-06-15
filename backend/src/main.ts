import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MongoExceptionFilter } from './common/exceptions/mongo-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new MongoExceptionFilter());

  const config = new DocumentBuilder()
  .setTitle('Moontech API Prueba')
  .setDescription('API para la prueba técnica de Moontech')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup('api/docs', app, document);


 
  await app.listen(3000);
}
bootstrap();
