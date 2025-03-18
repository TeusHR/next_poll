import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreatePublicInformationDto } from "./dto/create-public-information.dto";
import { CreatePublicInformationPageDto } from "./dto/create-public-information-page.dto";
import { Language } from "@prisma/client";
import { deleteFilePack, deleteFiles } from "../common/helpers/storage.helper";
import { UpdatePublicInformationDto } from "./dto/update-public-information.dto";
import { UpdatePublicInformationPageDto } from "./dto/update-public-information-page.dto";

@Injectable()
export class PublicInformationService {
  constructor(private prismaService: PrismaService) {}

  create(createPublicInformationDto: CreatePublicInformationDto) {
    return this.prismaService.publicInformation.create({
      data: createPublicInformationDto,
    });
  }

  async findAll(language: Language) {
    return this.prismaService.publicInformation.findMany({
      where: { language },
      include: { pages: true },
    });
  }

  async findOne(id: string) {
    const publicInformation =
      await this.prismaService.publicInformation.findUnique({
        where: { id },
        include: { pages: true },
      });

    if (!publicInformation) throw new NotFoundException();
    return publicInformation;
  }

  async createPage(
    createPublicInformationPageDto: CreatePublicInformationPageDto,
  ) {
    return this.prismaService.page.create({
      data: createPublicInformationPageDto,
    });
  }

  async update(
    id: string,
    updatePublicInformationDto: UpdatePublicInformationDto,
  ) {
    const publicInformation = await this.findOne(id);

    await deleteFilePack(
      publicInformation.files,
      updatePublicInformationDto.files,
    );

    return this.prismaService.publicInformation.update({
      where: { id },
      data: updatePublicInformationDto,
    });
  }

  async updatePage(
    id: string,
    updatePublicInformationPageDto: UpdatePublicInformationPageDto,
  ) {
    const publicInformationPage = await this.prismaService.page.findUnique({
      where: { id },
    });

    await deleteFilePack(
      publicInformationPage.files,
      updatePublicInformationPageDto.files,
    );

    return this.prismaService.page.update({
      where: { id },
      data: updatePublicInformationPageDto,
    });
  }

  async remove(id: string) {
    const publicInformation = await this.findOne(id);

    await deleteFiles(publicInformation.files);

    return this.prismaService.publicInformation.delete({ where: { id } });
  }

  async removePage(id: string) {
    const publicInformationPage = await this.prismaService.page.findUnique({
      where: { id },
    });

    await deleteFiles(publicInformationPage.files);

    return this.prismaService.page.delete({ where: { id } });
  }
}
