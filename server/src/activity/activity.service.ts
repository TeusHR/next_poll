import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { paginate, PrismaService } from "../prisma.service";
import { Prisma, Activity, Language } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";
import { deleteFiles } from "../common/helpers/storage.helper";

@Injectable()
export class ActivityService {
  constructor(private prismaService: PrismaService) {}

  create(createActivityDto: CreateActivityDto) {
    return this.prismaService.activity.create({
      data: createActivityDto,
    });
  }

  async findAll({
    page,
    perPage,
    orderBy,
    language,
  }: {
    language: Language;
    orderBy?: Prisma.ActivityOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Activity>> {
    return paginate(
      this.prismaService.activity,
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
    const activity = await this.prismaService.activity.findUnique({
      where: { id },
    });

    if (!activity) throw new NotFoundException();
    return activity;
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const activity = await this.findOne(id);

    if (activity.image !== updateActivityDto.image)
      await deleteFiles([activity.image]);

    return this.prismaService.activity.update({
      where: { id },
      data: updateActivityDto,
    });
  }

  async remove(id: string) {
    const activity = await this.findOne(id);
    await deleteFiles([activity.image]);
    return this.prismaService.activity.delete({ where: { id } });
  }
}
