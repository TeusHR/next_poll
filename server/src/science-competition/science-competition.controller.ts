import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";

import { Auth } from "../common/decorators/auth.decorator";
import { Language } from "@prisma/client";
import { ScienceCompetitionService } from "./science-competition.service";
import { CreateScienceCompetitionDto } from "./dto/create-science-competition.dto";
import { UpdateScienceCompetitionDto } from "./dto/update-science-competition.dto";

@Controller("science-competition")
export class ScienceCompetitionController {
  constructor(
    private readonly scienceCompetitionService: ScienceCompetitionService,
  ) {}

  @Post()
  @Auth()
  create(@Body() createConferenceDto: CreateScienceCompetitionDto) {
    return this.scienceCompetitionService.create(createConferenceDto);
  }

  @Get()
  findAll(@Query("language") language: Language) {
    return this.scienceCompetitionService.findAll(language);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.scienceCompetitionService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updateConferenceDto: UpdateScienceCompetitionDto,
  ) {
    return this.scienceCompetitionService.update(id, updateConferenceDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.scienceCompetitionService.remove(id);
  }
}
