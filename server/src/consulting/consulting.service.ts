import { Injectable } from "@nestjs/common";
import { CreateConsultingDto } from "./dto/create-consulting.dto";
import { deleteFilePack } from "../common/helpers/storage.helper";
import { PrismaService } from "../prisma.service";
import { Language } from "@prisma/client";

@Injectable()
export class ConsultingService {
  constructor(private prismaService: PrismaService) {}

  async createOrUpdate(createConsultingDto: CreateConsultingDto) {
    const consulting = await this.prismaService.consulting.findFirst({
      where: { language: createConsultingDto.language },
    });
    let res: any;
    if (consulting)
      res = await this.prismaService.consulting.update({
        data: createConsultingDto,
        where: { id: consulting.id },
      });
    else
      res = await this.prismaService.consulting.create({
        data: createConsultingDto,
      });

    await deleteFilePack(
      res.images.map((item) => item.image),
      createConsultingDto.images.map((item) => item.image),
    );

    return res;
  }

  find(language: Language) {
    return this.prismaService.consulting.findFirst({ where: { language } });
  }
}
