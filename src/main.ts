import * as fs from 'fs';
import { NestFactory } from "@nestjs/core";
import * as headers from "helmet";
import * as rateLimiter from "express-rate-limit";
import { AppModule } from "./modules/app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import path = require('path');

/**
 * The url endpoint for open api ui
 * @type {string}
 */
export const SWAGGER_API_ROOT = "api/docs";
/**
 * The name of the api
 * @type {string}
 */
export const SWAGGER_API_NAME = "API";
/**
 * A short description of the api
 * @type {string}
 */
export const SWAGGER_API_DESCRIPTION = "API Description";
/**
 * Current version of the api
 * @type {string}
 */
export const SWAGGER_API_CURRENT_VERSION = "1.0";

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
};

(async () => {
  const app = await NestFactory.create(AppModule, {
    logger: console, httpsOptions
  });
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
  app.enableCors();
  app.use(headers());
  app.use(
    rateLimiter({
      windowMs: 60, // 1 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(9000, "0.0.0.0");
})();
