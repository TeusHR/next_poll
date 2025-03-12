import { Module } from "@nestjs/common";
import { ConferenceFileController } from "./conference-file.controller";
import { ConferenceFileService } from "./conference-file.service";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [ConferenceFileController],
  providers: [ConferenceFileService, PrismaService, JwtService],
})
export class ConferenceFileModule {}
