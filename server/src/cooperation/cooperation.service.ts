import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCooperationDto } from "./dto/create-cooperation.dto";
import { UpdateCooperationDto } from "./dto/update-cooperation.dto";
import { paginate, PrismaService } from "../prisma.service";
import { Cooperation, Language, Prisma } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";

@Injectable()
export class CooperationService {
  constructor(private prismaService: PrismaService) {}

  create(createCooperationDto: CreateCooperationDto) {
    return this.prismaService.cooperation.create({
      data: createCooperationDto,
    });
  }

  async findAll({
    page,
    perPage,
    orderBy,
    language,
  }: {
    language: Language;
    orderBy?: Prisma.CooperationOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Cooperation>> {
    return paginate(
      this.prismaService.cooperation,
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
    const cooperation = await this.prismaService.cooperation.findUnique({
      where: { id },
    });

    if (!cooperation) throw new NotFoundException();
    return cooperation;
  }

  async update(id: string, updateCooperationDto: UpdateCooperationDto) {
    await this.findOne(id);
    return this.prismaService.cooperation.update({
      where: { id },
      data: updateCooperationDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.cooperation.delete({ where: { id } });
  }
}
