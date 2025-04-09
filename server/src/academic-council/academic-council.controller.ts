import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { Language } from "@prisma/client";
import { Auth } from "../common/decorators/auth.decorator";
import { AcademicCouncilService } from "./academic-council.service";
import { CreateAcademicCouncilDto } from "./dto/create-academic-council.dto";
import { UpdateAcademicCouncilDto } from "./dto/update-academic-council.dto";

@Controller("academic-council")
export class AcademicCouncilController {
  constructor(private readonly academicCouncil: AcademicCouncilService) {}

  @Post()
  create(@Body() createDto: CreateAcademicCouncilDto) {
    return this.academicCouncil.create(createDto);
  }

  @Get()
  findAll(@Query("language") language: Language) {
    return this.academicCouncil.findAll(language);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.academicCouncil.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(@Param("id") id: string, @Body() updateDto: UpdateAcademicCouncilDto) {
    return this.academicCouncil.update(id, updateDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.academicCouncil.remove(id);
  }
}
