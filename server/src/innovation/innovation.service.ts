import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateInnovationDto } from "./dto/create-innovation.dto";
import { UpdateInnovationDto } from "./dto/update-innovation.dto";
import { paginate, PrismaService } from "../prisma.service";
import { Innovation, Language, Prisma } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";
import { deleteFilePack, deleteFiles } from "../common/helpers/storage.helper";

@Injectable()
export class InnovationService {
  constructor(private prismaService: PrismaService) {}

  create(createInnovationDto: CreateInnovationDto) {
    return this.prismaService.innovation.create({
      data: createInnovationDto,
    });
  }

  async findAll({
    page,
    perPage,
    orderBy,
    language,
  }: {
    language: Language;
    orderBy?: Prisma.InnovationOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Innovation>> {
    return paginate(
      this.prismaService.innovation,
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
    const innovation = await this.prismaService.innovation.findUnique({
      where: { id },
    });

    if (!innovation) throw new NotFoundException();
    return innovation;
  }

  async update(id: string, updateInnovationDto: UpdateInnovationDto) {
    const innovation = await this.findOne(id);

    await deleteFilePack(innovation.files, updateInnovationDto.files);
    await deleteFilePack(innovation.images, updateInnovationDto.images);

    return this.prismaService.innovation.update({
      where: { id },
      data: updateInnovationDto,
    });
  }

  async remove(id: string) {
    const innovation = await this.findOne(id);

    await deleteFiles(innovation.files);
    await deleteFiles(innovation.images);

    return this.prismaService.innovation.delete({ where: { id } });
  }
}
