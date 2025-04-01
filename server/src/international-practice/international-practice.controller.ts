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

import { Language } from "@prisma/client";
import { CreateInternationalPracticeDto } from "./dto/create-international-practice.dto";
import { UpdateInternationalPracticeDto } from "./dto/update-international-practice.dto";
import { InternationalPracticeService } from "./international-practice.service";

@Controller("international-practice")
export class InternationalPracticeController {
  constructor(
    private readonly internationalPracticeService: InternationalPracticeService,
  ) {}

  @Post()
  create(@Body() createDto: CreateInternationalPracticeDto) {
    return this.internationalPracticeService.create(createDto);
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
    return this.internationalPracticeService.findAll({
      language,
      perPage: +limit || undefined,
      page: +page || 1,
      orderBy,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.internationalPracticeService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDto: UpdateInternationalPracticeDto,
  ) {
    return this.internationalPracticeService.update(id, updateDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.internationalPracticeService.remove(id);
  }
}
