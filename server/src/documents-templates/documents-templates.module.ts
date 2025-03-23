import { Module } from "@nestjs/common";
import { DocumentsTemplatesService } from "./documents-templates.service";
import { DocumentsTemplatesController } from "./documents-templates.controller";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [DocumentsTemplatesService, PrismaService, JwtService],
  controllers: [DocumentsTemplatesController],
})
export class DocumentsTemplatesModule {}
