import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDIGAMDto } from "./dto/create-digam.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class DIGAMService {
  constructor(private prismaService: PrismaService) {}

  async createOrUpdate(createDIGAMDto: CreateDIGAMDto) {
    const DIGAM = await this.prismaService.dIGAM.findFirst();
    let res: any;
    console.log(DIGAM);
    if (DIGAM)
      res = this.prismaService.dIGAM.update({
        data: createDIGAMDto,
        where: { id: DIGAM.id },
      });
    else
      res = this.prismaService.dIGAM.create({
        data: createDIGAMDto,
      });

    return res;
  }

  async find() {
    const DIGAM = await this.prismaService.dIGAM.findFirst();
    if (!DIGAM) throw new NotFoundException();

    return {
      ...DIGAM,
      foreignUniversities: DIGAM.foreignUniversities.reduce(
        (
          acc,
          item: { country: string; title: string; description: string },
        ) => {
          const { country, title, description } = item;

          if (!acc[country]) {
            acc[country] = [];
          }

          acc[country].push({ title, description });
          return acc;
        },
        {} as Record<string, { country: string }[]>,
      ),
    };
  }
}
