import { Module } from "@nestjs/common";
import { ConsultingService } from "./consulting.service";
import { ConsultingController } from "./consulting.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [ConsultingController],
  providers: [ConsultingService, PrismaService, JwtService],
})
export class ConsultingModule {}
