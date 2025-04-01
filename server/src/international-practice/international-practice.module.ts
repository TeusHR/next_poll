import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";
import { InternationalPracticeService } from "./international-practice.service";
import { InternationalPracticeController } from "./international-practice.controller";

@Module({
  controllers: [InternationalPracticeController],
  providers: [InternationalPracticeService, JwtService, PrismaService],
})
export class InternationalPracticeModule {}
