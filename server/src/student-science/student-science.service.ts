import { Injectable } from "@nestjs/common";
import { CreateStudentScienceDto } from "./dto/create-student-science.dto";
import { PrismaService } from "../prisma.service";
import { deleteFilePack } from "src/common/helpers/storage.helper";

@Injectable()
export class StudentScienceService {
  constructor(private prismaService: PrismaService) {}

  async createOrUpdate(createStudentScienceDto: CreateStudentScienceDto) {
    const studentScience = await this.prismaService.studentScience.findFirst();
    let res: any;
    if (studentScience)
      res = this.prismaService.studentScience.update({
        data: createStudentScienceDto,
        where: { id: studentScience.id },
      });
    else
      res = this.prismaService.studentScience.create({
        data: createStudentScienceDto,
      });

    await deleteFilePack(res.files, createStudentScienceDto.files);

    return res;
  }

  find() {
    return this.prismaService.studentScience.findFirst();
  }
}
