import { Module } from "@nestjs/common";
import { DirectionFilterController } from "./direction-filter.controller";
import { DirectionFilterService } from "./direction-filter.service";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [DirectionFilterController],
  providers: [DirectionFilterService, PrismaService, JwtService],
})
export class DirectionFilterModule {}
