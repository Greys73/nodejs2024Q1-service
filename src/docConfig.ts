import { DocumentBuilder } from '@nestjs/swagger';
export const config = new DocumentBuilder()
  .setTitle('REST Service')
  .setDescription('Home Library Service!')
  .setVersion('1.0')
  .build();
