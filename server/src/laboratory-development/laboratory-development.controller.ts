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
import { LaboratoryDevelopmentService } from "./laboratory-development.service";
import { CreateLaboratoryDevelopmentDto } from "./dto/create-laboratory-development.dto";
import { UpdateLaboratoryDevelopmentDto } from "./dto/update-laboratory-development.dto";
import { Auth } from "../common/decorators/auth.decorator";
import { Language } from "@prisma/client";

@Controller("laboratory-developments")
export class LaboratoryDevelopmentController {
  constructor(
    private readonly laboratoryDevelopmentService: LaboratoryDevelopmentService,
  ) {}

  @Post()
  @Auth()
  create(
    @Body() createLaboratoryDevelopmentDto: CreateLaboratoryDevelopmentDto,
  ) {
    return this.laboratoryDevelopmentService.create(
      createLaboratoryDevelopmentDto,
    );
  }

  findAll(
    @Query("language") language: Language,
    @Query("limit") limit?: string,
    @Query("page") page?: string,
    @Query("column") column?: string,
    @Query("order") order?: string,
  ) {
    const orderBy = { [column || "updatedAt"]: order || "desc" };
    return this.laboratoryDevelopmentService.findAll({
      language,
      perPage: +limit || undefined,
      page: +page || 1,
      orderBy,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.laboratoryDevelopmentService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updateLaboratoryDevelopmentDto: UpdateLaboratoryDevelopmentDto,
  ) {
    return this.laboratoryDevelopmentService.update(
      id,
      updateLaboratoryDevelopmentDto,
    );
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.laboratoryDevelopmentService.remove(id);
  }
}
