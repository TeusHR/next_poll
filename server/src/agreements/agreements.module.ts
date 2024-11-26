import { Module } from "@nestjs/common";
import { AgreementsService } from "./agreements.service";
import { AgreementsController } from "./agreements.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [AgreementsController],
  providers: [AgreementsService, PrismaService, JwtService],
})
export class AgreementsModule {}
