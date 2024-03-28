import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { paginate, PrismaService } from "../prisma.service";
import { deleteFile } from "../common/helpers/storage.helper";
import { Prisma, Activity } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";

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
  }: {
    orderBy?: Prisma.ActivityOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Activity>> {
    return paginate(
      this.prismaService.activity,
      {
        orderBy,
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
      await deleteFile(activity.image, true);

    return this.prismaService.activity.update({
      where: { id },
      data: updateActivityDto,
    });
  }

  async remove(id: string) {
    const activity = await this.findOne(id);
    await deleteFile(activity.image, true);
    return this.prismaService.activity.delete({ where: { id } });
  }
}
