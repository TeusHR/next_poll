import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAgreementsDto } from "./dto/create-agreements.dto";
import { PrismaService } from "../prisma.service";
import { Language } from "@prisma/client";

@Injectable()
export class AgreementsService {
  constructor(private prismaService: PrismaService) {}

  async createOrUpdate(createAgreementsDto: CreateAgreementsDto) {
    const agreements = await this.prismaService.cooperationAgreements.findFirst({
      where: { language: createAgreementsDto.language },
    });
    let res: any;
    if (agreements)
      res = this.prismaService.cooperationAgreements.update({
        data: createAgreementsDto,
        where: { id: agreements.id },
      });
    else
      res = this.prismaService.cooperationAgreements.create({
        data: createAgreementsDto,
      });

    return res;
  }

  async find(language: Language) {
    const agreements = await this.prismaService.cooperationAgreements.findFirst({
      where: { language },
    });
    if (!agreements) throw new NotFoundException();
    console.log(agreements);
    return {
      ...agreements,
      foreignUniversities: agreements.foreignUniversities.reduce(
        (
          acc,
          item: { country: string; title: string; description: string, files:string[] },
        ) => {
          const { country, title, description, files } = item;

          if (!acc[country]) {
            acc[country] = [];
          }

          acc[country].push({ title, description, files });
          return acc;
        },
        {} as Record<string, { country: string }[]>,
      ),
    };
  }
}
