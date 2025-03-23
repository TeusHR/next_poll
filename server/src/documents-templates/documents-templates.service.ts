import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Language } from "@prisma/client";
import { deleteFilePack, deleteFiles } from "../common/helpers/storage.helper";
import { CreateDocumentsTemplatesDto } from "./dto/create-documents-templates.dto";
import { UpdateDocumentsTemplatesDto } from "./dto/update-documents-templates.dto";

@Injectable()
export class DocumentsTemplatesService {
  constructor(private prismaService: PrismaService) {}

  create(createDto: CreateDocumentsTemplatesDto) {
    return this.prismaService.documentsTemplates.create({
      data: createDto,
    });
  }

  async findAll(language: Language) {
    return this.prismaService.documentsTemplates.findMany({
      where: { language },
      include: { pages: true },
    });
  }

  async findOne(id: string) {
    const documentsTemplates =
      await this.prismaService.documentsTemplates.findUnique({
        where: { id },
        include: { pages: true },
      });

    if (!documentsTemplates) throw new NotFoundException();
    return documentsTemplates;
  }

  async update(id: string, updateData: UpdateDocumentsTemplatesDto) {
    const documentsTemplates = await this.findOne(id);

    await deleteFilePack(documentsTemplates.files, updateData.files);

    return this.prismaService.documentsTemplates.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    const documentsTemplates = await this.findOne(id);

    await deleteFiles(documentsTemplates.files);

    return this.prismaService.documentsTemplates.delete({ where: { id } });
  }
}
