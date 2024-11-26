import { Module } from "@nestjs/common";
import { AssociationsService } from "./associations.service";
import { AssociationsController } from "./associations.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService, PrismaService, JwtService],
})
export class AssociationsModule {}
