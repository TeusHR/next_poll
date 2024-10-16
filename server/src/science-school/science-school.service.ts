import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateScienceSchoolDto } from "./dto/create-science-school.dto";
import { UpdateScienceSchoolDto } from "./dto/update-science-school.dto";
import { paginate, PrismaService } from "../prisma.service";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";
import { Language, Prisma, ScienceSchool } from "@prisma/client";

@Injectable()
export class ScienceSchoolService {
  constructor(private prismaService: PrismaService) {}

  create(createScienceSchoolDto: CreateScienceSchoolDto) {
    return this.prismaService.scienceSchool.create({
      data: createScienceSchoolDto,
    });
  }

  async findAll({
    page,
    perPage,
    orderBy,
    language,
  }: {
    language: Language;
    orderBy?: Prisma.ScienceSchoolOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<ScienceSchool>> {
    return paginate(
      this.prismaService.scienceSchool,
      {
        orderBy,
        where: { language },
      },
      {
        page,
        perPage,
      },
    );
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
