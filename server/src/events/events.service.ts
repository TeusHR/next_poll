import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Language, Prisma } from "@prisma/client";
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
    orderBy,
    language,
  }: {
    language: Language;
    orderBy?: Prisma.EventsOrderByWithRelationInput;
  }) {
    return this.prismaService.events.findMany({
      where: { language },
      orderBy,
    });
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
