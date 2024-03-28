import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateInternationalProjectDto } from "./dto/create-international-project.dto";
import { UpdateInternationalProjectDto } from "./dto/update-international-project.dto";
import { paginate, PrismaService } from "../prisma.service";
import { InternationalProject, Prisma } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";
import { deleteFile } from "../common/helpers/storage.helper";

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
  }: {
    orderBy?: Prisma.InternationalProjectOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<InternationalProject>> {
    return paginate(
      this.prismaService.internationalProject,
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

    if (
      internationalProject.files.length &&
      updateInternationalProjectDto.files
    ) {
      const filtered = internationalProject.files.filter(
        (file) => !updateInternationalProjectDto.files.includes(file),
      );
      for (let i = 0; i < filtered.length; i++) {
        await deleteFile(filtered[i], true);
      }
    }
    if (
      internationalProject.images.length &&
      updateInternationalProjectDto.images
    ) {
      const filtered = internationalProject.images.filter(
        (file) => !updateInternationalProjectDto.images.includes(file),
      );
      for (let i = 0; i < filtered.length; i++) {
        await deleteFile(filtered[i], true);
      }
    }

    return this.prismaService.internationalProject.update({
      where: { id },
      data: updateInternationalProjectDto,
    });
  }

  async remove(id: string) {
    const internationalProject = await this.findOne(id);
    if (internationalProject.files.length) {
      for (let i = 0; i < internationalProject.files.length; i++) {
        await deleteFile(internationalProject.files[i], true);
      }
    }

    if (internationalProject.images.length) {
      for (let i = 0; i < internationalProject.images.length; i++) {
        await deleteFile(internationalProject.images[i], true);
      }
    }
    return this.prismaService.internationalProject.delete({ where: { id } });
  }
}
