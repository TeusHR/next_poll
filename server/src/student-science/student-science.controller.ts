import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { StudentScienceService } from "./student-science.service";
import { CreateStudentScienceDto } from "./dto/create-student-science.dto";
import { Auth } from "../common/decorators/auth.decorator";
import { Language } from "@prisma/client";

@Controller("student-science")
export class StudentScienceController {
  constructor(private readonly studentScienceService: StudentScienceService) {}

  @Post()
  @Auth()
  createOrUpdate(@Body() createStudentScienceDto: CreateStudentScienceDto) {
    return this.studentScienceService.createOrUpdate(createStudentScienceDto);
  }

  @Get()
  find(@Query("language") language: Language) {
    return this.studentScienceService.find(language);
  }
}
