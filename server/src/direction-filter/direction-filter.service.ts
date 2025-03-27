import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Language } from "@prisma/client";
import { CreateDirectionFilterDto } from "./dto/create-documents-templates.dto";
import { UpdateDirectionFilterDto } from "./dto/update-documents-templates.dto";

@Injectable()
export class DirectionFilterService {
  constructor(private prismaService: PrismaService) {}

  async create(createDto: CreateDirectionFilterDto) {
    const existing = await this.prismaService.directionFilter.findUnique({
      where: { name: createDto.name },
    });

    if (existing) {
      throw new ConflictException(
        `The title '${createDto.name}' is already taken`,
      );
    }

    return this.prismaService.directionFilter.create({
      data: createDto,
    });
  }

  async findAll(language: Language) {
    return this.prismaService.directionFilter.findMany({
      where: { language },
    });
  }

  async findOne(id: string) {
    const directionFilter = await this.prismaService.directionFilter.findUnique(
      {
        where: { id },
      },
    );

    if (!directionFilter) throw new NotFoundException();
    return directionFilter;
  }

  async update(id: string, updateData: UpdateDirectionFilterDto) {
    return this.prismaService.directionFilter.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prismaService.directionFilter.delete({ where: { id } });
  }
}
