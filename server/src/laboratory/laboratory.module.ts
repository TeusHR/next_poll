import { Module } from "@nestjs/common";
import { LaboratoryService } from "./laboratory.service";
import { LaboratoryController } from "./laboratory.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [LaboratoryController],
  providers: [LaboratoryService, PrismaService, JwtService],
})
export class LaboratoryModule {}
