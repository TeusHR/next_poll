import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateScienceSchoolDto } from "./dto/create-science-school.dto";
import { UpdateScienceSchoolDto } from "./dto/update-science-school.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ScienceSchoolService {
  constructor(private prismaService: PrismaService) {}

  create(createScienceSchoolDto: CreateScienceSchoolDto) {
    return this.prismaService.scienceSchool.create({
      data: createScienceSchoolDto,
    });
  }

  findAll(limit: number) {
    return this.prismaService.scienceSchool.findMany({
      orderBy: { updatedAt: "desc" },
      take: limit || undefined,
    });
  }

  async findOne(id: string) {
    const school = await this.prismaService.scienceSchool.findUnique({
      where: { id },
    });

    if (!school) throw new NotFoundException();
    return school;
  }

  async update(id: string, updateScienceSchoolDto: UpdateScienceSchoolDto) {
    await this.findOne(id);
    return this.prismaService.scienceSchool.update({
      where: { id },
      data: updateScienceSchoolDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.scienceSchool.delete({ where: { id } });
  }
}
