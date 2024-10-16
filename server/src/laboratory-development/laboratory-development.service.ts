import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateLaboratoryDevelopmentDto } from "./dto/create-laboratory-development.dto";
import { UpdateLaboratoryDevelopmentDto } from "./dto/update-laboratory-development.dto";
import { paginate, PrismaService } from "../prisma.service";
import { LaboratoryDevelopment, Language, Prisma } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";
import { deleteFilePack, deleteFiles } from "../common/helpers/storage.helper";

@Injectable()
export class LaboratoryDevelopmentService {
  constructor(private prismaService: PrismaService) {}

  create(createLaboratoryDevelopmentDto: CreateLaboratoryDevelopmentDto) {
    return this.prismaService.laboratoryDevelopment.create({
      data: createLaboratoryDevelopmentDto,
    });
  }

  async findAll({
    page,
    perPage,
    orderBy,
    language,
  }: {
    language: Language;
    orderBy?: Prisma.LaboratoryDevelopmentOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<LaboratoryDevelopment>> {
    return paginate(
      this.prismaService.laboratoryDevelopment,
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
    const laboratoryDevelopment =
      await this.prismaService.laboratoryDevelopment.findUnique({
        where: { id },
      });

    if (!laboratoryDevelopment) throw new NotFoundException();
    return laboratoryDevelopment;
  }

  async update(
    id: string,
    updateLaboratoryDevelopmentDto: UpdateLaboratoryDevelopmentDto,
  ) {
    const laboratoryDevelopment = await this.findOne(id);

    await deleteFilePack(
      laboratoryDevelopment.files,
      updateLaboratoryDevelopmentDto.files,
    );

    await deleteFilePack(
      laboratoryDevelopment.images,
      updateLaboratoryDevelopmentDto.images,
    );

    return this.prismaService.laboratoryDevelopment.update({
      where: { id },
      data: updateLaboratoryDevelopmentDto,
    });
  }

  async remove(id: string) {
    const laboratoryDevelopment = await this.findOne(id);

    await deleteFiles(laboratoryDevelopment.files);
    await deleteFiles(laboratoryDevelopment.images);

    return this.prismaService.laboratoryDevelopment.delete({ where: { id } });
  }
}
