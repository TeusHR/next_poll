import { Module } from "@nestjs/common";
import { AcademicCouncilService } from "./academic-council.service";
import { AcademicCouncilController } from "./academic-council.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [AcademicCouncilService, PrismaService, JwtService],
  controllers: [AcademicCouncilController],
})
export class AcademicCouncilModule {}
