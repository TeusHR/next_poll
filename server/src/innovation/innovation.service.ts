import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateInnovationDto } from "./dto/create-innovation.dto";
import { UpdateInnovationDto } from "./dto/update-innovation.dto";
import { paginate, PrismaService } from "../prisma.service";
import { deleteFile } from "../common/helpers/storage.helper";
import { Innovation, Prisma } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";

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
  }: {
    orderBy?: Prisma.InnovationOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Innovation>> {
    return paginate(
      this.prismaService.innovation,
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
    const innovation = await this.prismaService.innovation.findUnique({
      where: { id },
    });

    if (!innovation) throw new NotFoundException();
    return innovation;
  }

  async update(id: string, updateInnovationDto: UpdateInnovationDto) {
    const innovation = await this.findOne(id);

    if (innovation.files.length && updateInnovationDto.files) {
      const filtered = innovation.files.filter(
        (file) => !updateInnovationDto.files.includes(file),
      );
      for (let i = 0; i < filtered.length; i++) {
        await deleteFile(filtered[i], true);
      }
    }
    if (innovation.images.length && updateInnovationDto.images) {
      const filtered = innovation.images.filter(
        (file) => !updateInnovationDto.images.includes(file),
      );
      for (let i = 0; i < filtered.length; i++) {
        await deleteFile(filtered[i], true);
      }
    }

    return this.prismaService.innovation.update({
      where: { id },
      data: updateInnovationDto,
    });
  }

  async remove(id: string) {
    const innovation = await this.findOne(id);
    if (innovation.files.length) {
      for (let i = 0; i < innovation.files.length; i++) {
        await deleteFile(innovation.files[i], true);
      }
    }

    if (innovation.images.length) {
      for (let i = 0; i < innovation.images.length; i++) {
        await deleteFile(innovation.images[i], true);
      }
    }
    return this.prismaService.innovation.delete({ where: { id } });
  }
}
