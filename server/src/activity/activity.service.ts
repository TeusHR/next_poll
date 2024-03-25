import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { PrismaService } from "../prisma.service";
import { deleteFile } from "../common/helpers/storage.helper";

@Injectable()
export class ActivityService {
  constructor(private prismaService: PrismaService) {}

  create(createActivityDto: CreateActivityDto) {
    return this.prismaService.activity.create({
      data: createActivityDto,
    });
  }

  findAll(limit: number) {
    return this.prismaService.activity.findMany({
      orderBy: { updatedAt: "desc" },
      take: limit || undefined,
    });
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
