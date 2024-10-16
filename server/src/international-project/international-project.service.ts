import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateInternationalProjectDto } from "./dto/create-international-project.dto";
import { UpdateInternationalProjectDto } from "./dto/update-international-project.dto";
import { paginate, PrismaService } from "../prisma.service";
import { InternationalProject, Language, Prisma } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";
import { deleteFilePack, deleteFiles } from "../common/helpers/storage.helper";

@Injectable()
export class InternationalProjectService {
  constructor(private prismaService: PrismaService) {}

  create(createInternationalProjectDto: CreateInternationalProjectDto) {
    return this.prismaService.internationalProject.create({
      data: createInternationalProjectDto,
    });
  }

  async findAll({
    page,
    perPage,
    orderBy,
    language,
  }: {
    language: Language;
    orderBy?: Prisma.InternationalProjectOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<InternationalProject>> {
    return paginate(
      this.prismaService.internationalProject,
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
    const internationalProject =
      await this.prismaService.internationalProject.findUnique({
        where: { id },
      });

    if (!internationalProject) throw new NotFoundException();
    return internationalProject;
  }

  async update(
    id: string,
    updateInternationalProjectDto: UpdateInternationalProjectDto,
  ) {
    const internationalProject = await this.findOne(id);

    await deleteFilePack(
      internationalProject.files,
      updateInternationalProjectDto.files,
    );

    await deleteFilePack(
      internationalProject.images,
      updateInternationalProjectDto.images,
    );

    return this.prismaService.internationalProject.update({
      where: { id },
      data: updateInternationalProjectDto,
    });
  }

  async remove(id: string) {
    const internationalProject = await this.findOne(id);

    await deleteFiles(internationalProject.files);
    await deleteFiles(internationalProject.images);

    return this.prismaService.internationalProject.delete({ where: { id } });
  }
}
