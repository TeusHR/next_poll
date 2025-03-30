import { Module } from "@nestjs/common";
import { ScienceCompetitionController } from "./science-competition.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ScienceCompetitionService } from "./science-competition.service";

@Module({
  controllers: [ScienceCompetitionController],
  providers: [ScienceCompetitionService, PrismaService, JwtService],
})
export class ScienceCompetitionModule {}
