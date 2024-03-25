import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCooperationDto } from "./dto/create-cooperation.dto";
import { UpdateCooperationDto } from "./dto/update-cooperation.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class CooperationService {
  constructor(private prismaService: PrismaService) {}

  create(createCooperationDto: CreateCooperationDto) {
    return this.prismaService.cooperation.create({
      data: createCooperationDto,
    });
  }

  findAll(limit: number) {
    return this.prismaService.cooperation.findMany({
      orderBy: { updatedAt: "desc" },
      take: limit || undefined,
    });
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
