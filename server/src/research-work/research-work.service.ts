import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateResearchWorkDto } from "./dto/create-research-work.dto";
import { UpdateResearchWorkDto } from "./dto/update-research-work.dto";
import { paginate, PrismaService } from "../prisma.service";
import { deleteFile } from "../common/helpers/storage.helper";
import { ResearchWork, Prisma } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";

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
  }: {
    orderBy?: Prisma.ResearchWorkOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<ResearchWork>> {
    return paginate(
      this.prismaService.researchWork,
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
    const researchWork = await this.prismaService.researchWork.findUnique({
      where: { id },
    });

    if (!researchWork) throw new NotFoundException();
    return researchWork;
  }

  async update(id: string, updateResearchWorkDto: UpdateResearchWorkDto) {
    const researchWork = await this.findOne(id);

    if (researchWork.image !== updateResearchWorkDto.image)
      await deleteFile(researchWork.image, true);

    return this.prismaService.researchWork.update({
      where: { id },
      data: updateResearchWorkDto,
    });
  }

  async remove(id: string) {
    const researchWork = await this.findOne(id);
    await deleteFile(researchWork.image, true);
    return this.prismaService.researchWork.delete({ where: { id } });
  }
}
