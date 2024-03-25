import { Module } from "@nestjs/common";
import { InnovationService } from "./innovation.service";
import { InnovationController } from "./innovation.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [InnovationController],
  providers: [InnovationService, PrismaService, JwtService],
})
export class InnovationModule {}
