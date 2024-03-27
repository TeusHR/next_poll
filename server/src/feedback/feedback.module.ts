import { Module } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { FeedbackController } from "./feedback.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, PrismaService, JwtService],
})
export class FeedbackModule {}
