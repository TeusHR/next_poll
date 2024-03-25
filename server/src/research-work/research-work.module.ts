import { Module } from "@nestjs/common";
import { ResearchWorkService } from "./research-work.service";
import { ResearchWorkController } from "./research-work.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [ResearchWorkController],
  providers: [ResearchWorkService, PrismaService, JwtService],
})
export class ResearchWorkModule {}
