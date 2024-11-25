import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDocumentsDto } from "./dto/create-documents.dto";
import { UpdateDocumentsDto } from "./dto/update-documents.dto";
import { paginate, PrismaService } from "../prisma.service";
import { Documents, Language, Prisma } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";

@Injectable()
export class DocumentsService {
  constructor(private prismaService: PrismaService) {}

  create(createDocumentsDto: CreateDocumentsDto) {
    return this.prismaService.documents.create({
      data: createDocumentsDto,
    });
  }

  async findAll({
                  page,
                  perPage,
                  orderBy,
                  language,
                }: {
    language: Language;
    orderBy?: Prisma.DocumentsOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Documents>> {
    return paginate(
      this.prismaService.documents,
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
    const document = await this.prismaService.documents.findUnique({
      where: { id },
    });

    if (!document) throw new NotFoundException();
    return document;
  }

  async update(id: string, updateDocumentsDto: UpdateDocumentsDto) {
    await this.findOne(id);
    return this.prismaService.documents.update({
      where: { id },
      data: updateDocumentsDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.documents.delete({ where: { id } });
  }
}