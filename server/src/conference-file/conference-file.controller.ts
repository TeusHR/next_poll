import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ConferenceFileService } from "./conference-file.service";
import { Auth } from "../common/decorators/auth.decorator";
import { CreateConferenceFileDto } from "./dto/create-conference-file.dto";
import { Language } from "@prisma/client";

@Controller("conference-file")
export class ConferenceFileController {
  constructor(private readonly conferenceFile: ConferenceFileService) {}

  @Post()
  @Auth()
  createOrUpdate(@Body() createConferenceFileDto: CreateConferenceFileDto) {
    return this.conferenceFile.createOrUpdate(createConferenceFileDto);
  }

  @Get()
  find(@Query("language") language: Language) {
    return this.conferenceFile.findByLanguage(language);
  }
}
