import { Injectable, NotFoundException } from "@nestjs/common";
import { paginate, PrismaService } from "../prisma.service";
import { InternationalPractice, Language, Prisma } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";
import { deleteFilePack, deleteFiles } from "../common/helpers/storage.helper";
import { CreateInternationalPracticeDto } from "./dto/create-international-practice.dto";
import { UpdateInternationalPracticeDto } from "./dto/update-international-practice.dto";

@Injectable()
export class InternationalPracticeService {
  constructor(private prismaService: PrismaService) {}

  create(createDto: CreateInternationalPracticeDto) {
    return this.prismaService.internationalPractice.create({
      data: createDto,
    });
  }

  async findAll({
    page,
    perPage,
    orderBy,
    language,
  }: {
    language: Language;
    orderBy?: Prisma.InternationalPracticeOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<InternationalPractice>> {
    return paginate(
      this.prismaService.internationalPractice,
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
    const data = await this.prismaService.internationalPractice.findUnique({
      where: { id },
    });

    if (!data) throw new NotFoundException();
    return data;
  }

  async update(id: string, updateDto: UpdateInternationalPracticeDto) {
    const data = await this.findOne(id);

    await deleteFilePack(data.files, updateDto.files);

    await deleteFilePack(data.images, updateDto.images);

    return this.prismaService.internationalPractice.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    const internationalProject = await this.findOne(id);

    await deleteFiles(internationalProject.files);
    await deleteFiles(internationalProject.images);

    return this.prismaService.internationalPractice.delete({ where: { id } });
  }
}
