import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { json, urlencoded } from "express";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("v1/api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: "*", // разрешить любой origin для теста
    credentials: true,
  });

  const whitelist = [
    "https://willowy-naiad-c968f3.netlify.app",
    process.env.NEXTAUTH_URL,
    "http://front:3000",
  ];

  app.enableCors({
    credentials: true,
    origin: function (origin, callback) {
      console.log("Origin:", origin);
      if (process.env.NODE_ENV !== "production") return callback(null, true);
      if (!origin || whitelist.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  });
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  await app.listen(4000);
}

bootstrap();
