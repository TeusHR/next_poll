import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { Language } from "@prisma/client";
import { Auth } from "../common/decorators/auth.decorator";
import { DocumentsTemplatesService } from "./documents-templates.service";
import { UpdateDocumentsTemplatesDto } from "./dto/update-documents-templates.dto";
import { CreateDocumentsTemplatesDto } from "./dto/create-documents-templates.dto";

@Controller("documents-templates")
export class DocumentsTemplatesController {
  constructor(private readonly documentsTemplates: DocumentsTemplatesService) {}

  @Post()
  create(@Body() createDto: CreateDocumentsTemplatesDto) {
    return this.documentsTemplates.create(createDto);
  }

  @Get()
  findAll(@Query("language") language: Language) {
    return this.documentsTemplates.findAll(language);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.documentsTemplates.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updateDto: UpdateDocumentsTemplatesDto,
  ) {
    return this.documentsTemplates.update(id, updateDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.documentsTemplates.remove(id);
  }
}
