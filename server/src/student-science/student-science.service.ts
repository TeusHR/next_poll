import { Injectable } from "@nestjs/common";
import { CreateStudentScienceDto } from "./dto/create-student-science.dto";
import { PrismaService } from "../prisma.service";
import { deleteFilePack } from "src/common/helpers/storage.helper";
import { Language } from "@prisma/client";

@Injectable()
export class StudentScienceService {
  constructor(private prismaService: PrismaService) {}

  async createOrUpdate(createStudentScienceDto: CreateStudentScienceDto) {
    const studentScience = await this.prismaService.studentScience.findFirst({
      where: { language: createStudentScienceDto.language },
    });
    let res: any;
    if (studentScience)
      res = await this.prismaService.studentScience.update({
        data: createStudentScienceDto,
        where: { id: studentScience.id },
      });
    else
      res = await this.prismaService.studentScience.create({
        data: createStudentScienceDto,
      });

    await deleteFilePack(res.files, createStudentScienceDto.files);

    return res;
  }

  find(language: Language) {
    return this.prismaService.studentScience.findFirst({ where: { language } });
  }
}
