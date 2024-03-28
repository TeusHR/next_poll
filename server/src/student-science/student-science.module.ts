import { Module } from "@nestjs/common";
import { StudentScienceService } from "./student-science.service";
import { StudentScienceController } from "./student-science.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [StudentScienceController],
  providers: [StudentScienceService, PrismaService, JwtService],
})
export class StudentScienceModule {}
