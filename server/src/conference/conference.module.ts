import { Module } from "@nestjs/common";
import { ConferenceService } from "./conference.service";
import { ConferenceController } from "./conference.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [ConferenceController],
  providers: [ConferenceService, PrismaService, JwtService],
})
export class ConferenceModule {}
