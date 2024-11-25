import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { CreateDocumentsDto } from "./dto/create-documents.dto";
import { UpdateDocumentsDto } from "./dto/update-documents.dto";
import { Auth } from "../common/decorators/auth.decorator";
import { Language } from "@prisma/client";

@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @Auth()
  create(@Body() createDocumentsDto: CreateDocumentsDto) {
    return this.documentsService.create(createDocumentsDto);
  }

  @Get()
  findAll(
    @Query("language") language: Language,
    @Query("limit") limit?: string,
    @Query("page") page?: string,
    @Query("column") column?: string,
    @Query("order") order?: string,
  ) {
    const orderBy = { [column || "updatedAt"]: order || "desc" };
    return this.documentsService.findAll({
      language,
      perPage: +limit || undefined,
      page: +page || 1,
      orderBy,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.documentsService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updateDocumentsDto: UpdateDocumentsDto,
  ) {
    return this.documentsService.update(id, updateDocumentsDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.documentsService.remove(id);
  }
}
