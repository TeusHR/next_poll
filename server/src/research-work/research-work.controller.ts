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
import { ResearchWorkService } from "./research-work.service";
import { CreateResearchWorkDto } from "./dto/create-research-work.dto";
import { UpdateResearchWorkDto } from "./dto/update-research-work.dto";
import { Auth } from "../common/decorators/auth.decorator";

@Controller("research-works")
export class ResearchWorkController {
  constructor(private readonly researchWorkService: ResearchWorkService) {}

  @Post()
  @Auth()
  create(@Body() createResearchWorkDto: CreateResearchWorkDto) {
    return this.researchWorkService.create(createResearchWorkDto);
  }

  @Get()
  findAll(
    @Query("limit") limit?: string,
    @Query("page") page?: string,
    @Query("column") column?: string,
    @Query("order") order?: string,
  ) {
    const orderBy = { [column || "updatedAt"]: order || "desc" };
    return this.researchWorkService.findAll({
      perPage: +limit || undefined,
      page: +page || 1,
      orderBy,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.researchWorkService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updateResearchWorkDto: UpdateResearchWorkDto,
  ) {
    return this.researchWorkService.update(id, updateResearchWorkDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.researchWorkService.remove(id);
  }
}
