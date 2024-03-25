import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateResearchWorkDto } from "./dto/create-research-work.dto";
import { UpdateResearchWorkDto } from "./dto/update-research-work.dto";
import { PrismaService } from "../prisma.service";
import { deleteFile } from "../common/helpers/storage.helper";

@Injectable()
export class ResearchWorkService {
  constructor(private prismaService: PrismaService) {}

  create(createResearchWorkDto: CreateResearchWorkDto) {
    return this.prismaService.researchWork.create({
      data: createResearchWorkDto,
    });
  }

  findAll(limit: number) {
    return this.prismaService.researchWork.findMany({
      orderBy: { updatedAt: "desc" },
      take: limit || undefined,
    });
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
