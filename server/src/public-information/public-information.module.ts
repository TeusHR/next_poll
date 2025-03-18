import { Module } from "@nestjs/common";
import { PublicInformationService } from "./public-information.service";
import { PublicInformationController } from "./public-information.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [PublicInformationService, PrismaService, JwtService],
  controllers: [PublicInformationController],
})
export class PublicInformationModule {}
