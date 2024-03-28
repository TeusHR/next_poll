import { Module } from "@nestjs/common";
import { InternationalProjectService } from "./international-project.service";
import { InternationalProjectController } from "./international-project.controller";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [InternationalProjectController],
  providers: [InternationalProjectService, JwtService, PrismaService],
})
export class InternationalProjectModule {}
