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
import { InnovationService } from "./innovation.service";
import { CreateInnovationDto } from "./dto/create-innovation.dto";
import { UpdateInnovationDto } from "./dto/update-innovation.dto";
import { Auth } from "../common/decorators/auth.decorator";
import { Language } from "@prisma/client";

@Controller("innovations")
export class InnovationController {
  constructor(private readonly innovationService: InnovationService) {}

  @Post()
  @Auth()
  create(@Body() createInnovationDto: CreateInnovationDto) {
    return this.innovationService.create(createInnovationDto);
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
    return this.innovationService.findAll({
      language,
      perPage: +limit || undefined,
      page: +page || 1,
      orderBy,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.innovationService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updateInnovationDto: UpdateInnovationDto,
  ) {
    return this.innovationService.update(id, updateInnovationDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.innovationService.remove(id);
  }
}
