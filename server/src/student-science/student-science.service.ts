import { Injectable } from "@nestjs/common";
import { CreateStudentScienceDto } from "./dto/create-student-science.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class StudentScienceService {
  constructor(private prismaService: PrismaService) {}

  async createOrUpdate(createStudentScienceDto: CreateStudentScienceDto) {
    const studentScience = await this.prismaService.studentScience.findFirst();
    if (studentScience)
      return this.prismaService.studentScience.update({
        data: createStudentScienceDto,
        where: { id: studentScience.id },
      });
    else
      return this.prismaService.studentScience.create({
        data: createStudentScienceDto,
      });
  }

  find() {
    return this.prismaService.studentScience.findFirst();
  }
}
