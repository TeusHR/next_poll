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
import { ScienceSchoolService } from "./science-school.service";
import { CreateScienceSchoolDto } from "./dto/create-science-school.dto";
import { UpdateScienceSchoolDto } from "./dto/update-science-school.dto";
import { Auth } from "src/common/decorators/auth.decorator";
import { Language } from "@prisma/client";

@Controller("science-schools")
export class ScienceSchoolController {
  constructor(private readonly scienceSchoolService: ScienceSchoolService) {}

  @Post()
  @Auth()
  create(@Body() createScienceSchoolDto: CreateScienceSchoolDto) {
    return this.scienceSchoolService.create(createScienceSchoolDto);
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
    return this.scienceSchoolService.findAll({
      language,
      perPage: +limit || undefined,
      page: +page || 1,
      orderBy,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.scienceSchoolService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updateScienceSchoolDto: UpdateScienceSchoolDto,
  ) {
    return this.scienceSchoolService.update(id, updateScienceSchoolDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.scienceSchoolService.remove(id);
  }
}
