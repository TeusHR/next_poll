import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateResearchWorkDto } from "./dto/create-research-work.dto";
import { UpdateResearchWorkDto } from "./dto/update-research-work.dto";
import { paginate, PrismaService } from "../prisma.service";
import { ResearchWork, Prisma, Language } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";
import { deleteFiles } from "../common/helpers/storage.helper";

@Injectable()
export class ResearchWorkService {
  constructor(private prismaService: PrismaService) {}

  create(createResearchWorkDto: CreateResearchWorkDto) {
    return this.prismaService.researchWork.create({
      data: createResearchWorkDto,
    });
  }

  async findAll({
    page,
    perPage,
    orderBy,
    language,
  }: {
    language: Language;
    orderBy?: Prisma.ResearchWorkOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<ResearchWork>> {
    return paginate(
      this.prismaService.researchWork,
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
    const researchWork = await this.prismaService.researchWork.findUnique({
      where: { id },
    });

    if (!researchWork) throw new NotFoundException();
    return researchWork;
  }

  async update(id: string, updateResearchWorkDto: UpdateResearchWorkDto) {
    const researchWork = await this.findOne(id);

    if (researchWork.image !== updateResearchWorkDto.image)
      await deleteFiles([researchWork.image]);

    return this.prismaService.researchWork.update({
      where: { id },
      data: updateResearchWorkDto,
    });
  }

  async remove(id: string) {
    const researchWork = await this.findOne(id);

    await deleteFiles([researchWork.image]);

    return this.prismaService.researchWork.delete({ where: { id } });
  }
}
