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
import { LaboratoryService } from "./laboratory.service";
import { CreateLaboratoryDto } from "./dto/create-laboratory.dto";
import { UpdateLaboratoryDto } from "./dto/update-laboratory.dto";
import { Auth } from "../common/decorators/auth.decorator";
import { Language } from "@prisma/client";

@Controller("laboratories")
export class LaboratoryController {
  constructor(private readonly laboratoryService: LaboratoryService) {}

  @Post()
  @Auth()
  create(@Body() createLaboratoryDto: CreateLaboratoryDto) {
    return this.laboratoryService.create(createLaboratoryDto);
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
    return this.laboratoryService.findAll({
      language,
      perPage: +limit || undefined,
      page: +page || 1,
      orderBy,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.laboratoryService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updateLaboratoryDto: UpdateLaboratoryDto,
  ) {
    return this.laboratoryService.update(id, updateLaboratoryDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.laboratoryService.remove(id);
  }
}
