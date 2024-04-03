import { Module } from "@nestjs/common";
import { TrainingService } from "./training.service";
import { TrainingController } from "./training.controller";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [TrainingController],
  providers: [TrainingService, JwtService, PrismaService],
})
export class TrainingModule {}
