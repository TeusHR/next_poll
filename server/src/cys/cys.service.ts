import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Language } from "@prisma/client";
import { CreateCysDto } from "./dto/create-cys.dto";
import { UpdateCysDto } from "./dto/update-cys.dto";

@Injectable()
export class CysService {
  constructor(private prismaService: PrismaService) {}

  async createOrUpdate(CreateCysDto: CreateCysDto) {
    const cys = await this.prismaService.cYS.findFirst({
      where: { language: CreateCysDto.language },
    });
    let res: any;
    if (cys)
      res = this.prismaService.cYS.update({
        data: CreateCysDto,
        where: { id: cys.id },
      });
    else
      res = this.prismaService.cYS.create({
        data: CreateCysDto,
      });

    return res;
  }

  async find(language: Language) {
    const cys = await this.prismaService.cYS.findFirst({
      where: { language },
    });
    if (!cys) throw new NotFoundException();
    return cys;
  }

  async findAll(language: Language) {
    return this.prismaService.cYS.findMany({
      where: { language },
    });
  }

  async findOne(id: string) {
    const cys = await this.prismaService.cYS.findUnique({
      where: { id },
    });

    if (!cys) throw new NotFoundException();
    return cys;
  }

  async update(id: string, updateData: UpdateCysDto) {
    return this.prismaService.cYS.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prismaService.cYS.delete({ where: { id } });
  }
}
