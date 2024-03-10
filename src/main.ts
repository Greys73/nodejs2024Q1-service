import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yaml';

dotenv.config();
const PORT = parseInt(process.env.PORT, 10) || 4000;

const yamlContent = fs.readFileSync('./doc/api.yaml', 'utf-8');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const yamlDoc = YAML.parse(yamlContent);
  SwaggerModule.setup('doc', app, yamlDoc);

  await app.listen(PORT);
}
bootstrap();
