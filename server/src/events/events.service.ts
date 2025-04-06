import { Injectable, NotFoundException } from "@nestjs/common";
import { paginate, PrismaService } from "../prisma.service";
import { Events, Prisma, Language } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";
import { CreateEventsDto } from "./dto/create-events.dto";
import { UpdateEventsDto } from "./dto/update-events.dto";

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  create(createDto: CreateEventsDto) {
    return this.prismaService.events.create({
      data: createDto,
    });
  }

  async findAll({
    page,
    perPage,
    orderBy,
    language,
  }: {
    language: Language;
    orderBy?: Prisma.EventsOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Events>> {
    return paginate(
      this.prismaService.events,
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
    const events = await this.prismaService.events.findUnique({
      where: { id },
    });

    if (!events) throw new NotFoundException();
    return events;
  }

  async update(id: string, updateDto: UpdateEventsDto) {
    return this.prismaService.events.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.events.delete({ where: { id } });
  }
}
