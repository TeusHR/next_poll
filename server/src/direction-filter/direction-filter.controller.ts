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
import { DirectionFilterService } from "./direction-filter.service";
import { Language } from "@prisma/client";
import { Auth } from "../common/decorators/auth.decorator";
import { CreateDirectionFilterDto } from "./dto/create-documents-templates.dto";
import { UpdateDirectionFilterDto } from "./dto/update-documents-templates.dto";

@Controller("direction-filter")
export class DirectionFilterController {
  constructor(private readonly documentsService: DirectionFilterService) {}

  // @ApiResponse({
  //   status: 409,
  //   description: "A non-unique value is passed",
  // })
  @Post()
  create(@Body() createDto: CreateDirectionFilterDto) {
    return this.documentsService.create(createDto);
  }

  @Get()
  findAll(@Query("language") language: Language) {
    return this.documentsService.findAll(language);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.documentsService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(@Param("id") id: string, @Body() updateDto: UpdateDirectionFilterDto) {
    return this.documentsService.update(id, updateDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.documentsService.remove(id);
  }
}
