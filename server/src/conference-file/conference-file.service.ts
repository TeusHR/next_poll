import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateConferenceFileDto } from "./dto/create-conference-file.dto";
import { Language } from "@prisma/client";

@Injectable()
export class ConferenceFileService {
  constructor(private prismaService: PrismaService) {}

  async createOrUpdate(createConferenceFileDto: CreateConferenceFileDto) {
    return this.prismaService.conferenceFile.upsert({
      where: { language: createConferenceFileDto.language },
      update: { files: createConferenceFileDto.files },
      create: createConferenceFileDto,
    });
  }

  async findByLanguage(language: Language) {
    return this.prismaService.conferenceFile.findUnique({
      where: { language },
    });
  }
}
