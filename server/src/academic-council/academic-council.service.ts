import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Language } from "@prisma/client";
import { CreateAcademicCouncilDto } from "./dto/create-academic-council.dto";
import { UpdateAcademicCouncilDto } from "./dto/update-academic-council.dto";

@Injectable()
export class AcademicCouncilService {
  constructor(private prismaService: PrismaService) {}

  create(createDto: CreateAcademicCouncilDto) {
    return this.prismaService.academicCouncil.create({
      data: createDto,
    });
  }

  async findAll(language: Language) {
    return this.prismaService.academicCouncil.findMany({
      where: { language },
    });
  }

  async findOne(id: string) {
    const academicCouncil = await this.prismaService.academicCouncil.findUnique(
      {
        where: { id },
      },
    );

    if (!academicCouncil) throw new NotFoundException();
    return academicCouncil;
  }

  async update(id: string, updateData: UpdateAcademicCouncilDto) {
    return this.prismaService.academicCouncil.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prismaService.documentsTemplates.delete({ where: { id } });
  }
}
