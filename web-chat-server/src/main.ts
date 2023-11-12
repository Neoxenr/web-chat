import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule, { logger: console });

  app.useWebSocketAdapter(new WsAdapter(app));

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
