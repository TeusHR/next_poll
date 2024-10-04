import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateLaboratoryDto } from "./dto/create-laboratory.dto";
import { UpdateLaboratoryDto } from "./dto/update-laboratory.dto";
import { paginate, PrismaService } from "../prisma.service";
import { Laboratory, Prisma } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";
import { deleteFilePack, deleteFiles } from "../common/helpers/storage.helper";

@Injectable()
export class LaboratoryService {
  constructor(private prismaService: PrismaService) {}

  create(createLaboratoryDto: CreateLaboratoryDto) {
    return this.prismaService.laboratory.create({
      data: createLaboratoryDto,
    });
  }

  async findAll({
    page,
    perPage,
    orderBy,
  }: {
    orderBy?: Prisma.LaboratoryOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Laboratory>> {
    return paginate(
      this.prismaService.laboratory,
      {
        orderBy,
      },
      {
        page,
        perPage,
      },
    );
  }

  async findOne(id: string) {
    const laboratory = await this.prismaService.laboratory.findUnique({
      where: { id },
      include: { developments: true },
    });

    if (!laboratory) throw new NotFoundException();
    return laboratory;
  }

  async update(id: string, updateLaboratoryDto: UpdateLaboratoryDto) {
    const laboratory = await this.findOne(id);

    await deleteFilePack(laboratory.files, updateLaboratoryDto.files);

    await deleteFilePack(laboratory.images, updateLaboratoryDto.images);

    return this.prismaService.laboratory.update({
      where: { id },
      data: updateLaboratoryDto,
    });
  }

  async remove(id: string) {
    const laboratory = await this.findOne(id);

    await deleteFiles(laboratory.files);
    await deleteFiles(laboratory.images);

    await this.prismaService.laboratoryDevelopment.deleteMany({
      where: { laboratoryId: id },
    });

    return this.prismaService.laboratory.delete({ where: { id } });
  }
}
