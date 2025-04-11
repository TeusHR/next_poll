import { Module } from "@nestjs/common";
import { CysController } from "./cys.controller";
import { CysService } from "./cys.service";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [CysController],
  providers: [CysService, PrismaService, JwtService],
})
export class CysModule {}
