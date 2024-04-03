import { Module } from "@nestjs/common";
import { LaboratoryDevelopmentService } from "./laboratory-development.service";
import { LaboratoryDevelopmentController } from "./laboratory-development.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [LaboratoryDevelopmentController],
  providers: [LaboratoryDevelopmentService, PrismaService, JwtService],
})
export class LaboratoryDevelopmentModule {}
