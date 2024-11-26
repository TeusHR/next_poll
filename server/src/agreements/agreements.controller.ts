import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { AgreementsService } from "./agreements.service";
import { CreateAgreementsDto } from "./dto/create-agreements.dto";
import { Auth } from "../common/decorators/auth.decorator";
import { Language } from "@prisma/client";

@Controller("agreements")
export class AgreementsController {
  constructor(private readonly agreementsService: AgreementsService) {}

  @Post()
  @Auth()
  createOrUpdate(@Body() createAgreementsDto: CreateAgreementsDto) {
    return this.agreementsService.createOrUpdate(createAgreementsDto);
  }

  @Get()
  find(@Query("language") language: Language) {
    return this.agreementsService.find(language);
  }
}
