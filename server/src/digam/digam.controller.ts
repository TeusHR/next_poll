import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { DIGAMService } from "./digam.service";
import { CreateDIGAMDto } from "./dto/create-digam.dto";
import { Auth } from "../common/decorators/auth.decorator";
import { Language } from "@prisma/client";

@Controller("digam")
export class DIGAMController {
  constructor(private readonly digamService: DIGAMService) {}

  @Post()
  @Auth()
  createOrUpdate(@Body() createDIGAMDto: CreateDIGAMDto) {
    return this.digamService.createOrUpdate(createDIGAMDto);
  }

  @Get()
  find(@Query("language") language: Language) {
    return this.digamService.find(language);
  }
}
