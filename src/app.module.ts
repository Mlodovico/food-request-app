import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { FoodRequestModule } from "./food-request.module";

async function bootstrap() {
  const app = await NestFactory.create(FoodRequestModule);

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
