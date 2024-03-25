import { Module } from "@nestjs/common";
import { ScienceSchoolService } from "./science-school.service";
import { ScienceSchoolController } from "./science-school.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [ScienceSchoolController],
  providers: [ScienceSchoolService, PrismaService, JwtService],
})
export class ScienceSchoolModule {}
