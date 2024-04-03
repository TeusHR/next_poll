import { Module } from "@nestjs/common";
import { DIGAMService } from "./digam.service";
import { DIGAMController } from "./digam.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [DIGAMController],
  providers: [DIGAMService, PrismaService, JwtService],
})
export class DIGAMModule {}
