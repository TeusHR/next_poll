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
import { CreateCysDto } from "./dto/create-cys.dto";
import { UpdateCysDto } from "./dto/update-cys.dto";
import { CysService } from "./cys.service";

@Controller("cys")
export class CysController {
  constructor(private readonly cys: CysService) {}

  @Post()
  @Auth()
  createOrUpdate(@Body() createDto: CreateCysDto) {
    return this.cys.createOrUpdate(createDto);
  }

  @Get()
  find(@Query("language") language: Language) {
    return this.cys.find(language);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cys.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(@Param("id") id: string, @Body() updateDto: UpdateCysDto) {
    return this.cys.update(id, updateDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.cys.remove(id);
  }
}
