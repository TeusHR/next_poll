import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { UpdateTrainingDto } from "./dto/update-training.dto";
import { paginate, PrismaService } from "../prisma.service";
import { Training, Prisma, Language } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";
import { deleteFilePack, deleteFiles } from "../common/helpers/storage.helper";

@Injectable()
export class TrainingService {
  constructor(private prismaService: PrismaService) {}

  create(createTrainingDto: CreateTrainingDto) {
    return this.prismaService.training.create({
      data: createTrainingDto,
    });
  }

  async findAll({
    page,
    perPage,
    orderBy,
    language,
  }: {
    language: Language;
    orderBy?: Prisma.TrainingOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Training>> {
    return paginate(
      this.prismaService.training,
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
    const training = await this.prismaService.training.findUnique({
      where: { id },
    });

    if (!training) throw new NotFoundException();
    return training;
  }

  async update(id: string, updateTrainingDto: UpdateTrainingDto) {
    const training = await this.findOne(id);

    await deleteFilePack(training.files, updateTrainingDto.files);

    await deleteFilePack(training.images, updateTrainingDto.images);

    return this.prismaService.training.update({
      where: { id },
      data: updateTrainingDto,
    });
  }

  async remove(id: string) {
    const training = await this.findOne(id);

    await deleteFiles(training.files);
    await deleteFiles(training.images);

    return this.prismaService.training.delete({ where: { id } });
  }
}
