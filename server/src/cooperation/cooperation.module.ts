import { Module } from "@nestjs/common";
import { CooperationService } from "./cooperation.service";
import { CooperationController } from "./cooperation.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [CooperationController],
  providers: [CooperationService, PrismaService, JwtService],
})
export class CooperationModule {}
