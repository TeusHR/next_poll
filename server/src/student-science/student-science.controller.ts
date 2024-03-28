import { Controller, Get, Post, Body } from "@nestjs/common";
import { StudentScienceService } from "./student-science.service";
import { CreateStudentScienceDto } from "./dto/create-student-science.dto";
import { Auth } from "../common/decorators/auth.decorator";

@Controller("student-science")
export class StudentScienceController {
  constructor(private readonly studentScienceService: StudentScienceService) {}

  @Post()
  @Auth()
  createOrUpdate(@Body() createStudentScienceDto: CreateStudentScienceDto) {
    return this.studentScienceService.createOrUpdate(createStudentScienceDto);
  }

  @Get()
  find() {
    return this.studentScienceService.find();
  }
}
