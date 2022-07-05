import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfig, AppConfigMap } from './types/app.types';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('/api');

  const configService: ConfigService<AppConfigMap> = app.get(ConfigService);

  const port = configService.get(AppConfig.SERVER_PORT);
  if (configService.get(AppConfig.IS_DEVELOPMENT)) {
    const docsConfig = new DocumentBuilder()
      .setTitle('CRUD Boilerplate API')
      .setVersion('1.0')
      .addBearerAuth()
      .setDescription('All api endpoints')
      .build();

    const docs = SwaggerModule.createDocument(app, docsConfig);
    SwaggerModule.setup('/docs', app, docs);
  }

  await app.listen(port, () => {
    console.log(port);
    console.log(configService.get(AppConfig.IS_DEVELOPMENT));
  });
}

void bootstrap();
