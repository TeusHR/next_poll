import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAssociationsDto } from "./dto/create-associations.dto";
import { PrismaService } from "../prisma.service";
import { Language } from "@prisma/client";

@Injectable()
export class AssociationsService {
  constructor(private prismaService: PrismaService) {}

  async createOrUpdate(createAssociationsDto: CreateAssociationsDto) {
    const Asscotiaons = await this.prismaService.associations.findFirst({
      where: { language: createAssociationsDto.language },
    });
    let res: any;
    if (Asscotiaons)
      res = this.prismaService.associations.update({
        data: createAssociationsDto,
        where: { id: Asscotiaons.id },
      });
    else
      res = this.prismaService.associations.create({
        data: createAssociationsDto,
      });

    return res;
  }

  async find(language: Language) {
    const Asscotiaons = await this.prismaService.associations.findFirst({
      where: { language },
    });
    if (!Asscotiaons) throw new NotFoundException();

    return Asscotiaons;
  }
}
