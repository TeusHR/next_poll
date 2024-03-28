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
import { InternationalProjectService } from "./international-project.service";
import { CreateInternationalProjectDto } from "./dto/create-international-project.dto";
import { UpdateInternationalProjectDto } from "./dto/update-international-project.dto";

@Controller("international-projects")
export class InternationalProjectController {
  constructor(
    private readonly internationalProjectService: InternationalProjectService,
  ) {}

  @Post()
  create(@Body() createInternationalProjectDto: CreateInternationalProjectDto) {
    return this.internationalProjectService.create(
      createInternationalProjectDto,
    );
  }

  @Get()
  findAll(
    @Query("limit") limit?: string,
    @Query("page") page?: string,
    @Query("column") column?: string,
    @Query("order") order?: string,
  ) {
    const orderBy = { [column || "updatedAt"]: order || "desc" };
    return this.internationalProjectService.findAll({
      perPage: +limit || undefined,
      page: +page || 1,
      orderBy,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.internationalProjectService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateInternationalProjectDto: UpdateInternationalProjectDto,
  ) {
    return this.internationalProjectService.update(
      id,
      updateInternationalProjectDto,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.internationalProjectService.remove(id);
  }
}
