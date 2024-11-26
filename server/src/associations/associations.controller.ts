import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { AssociationsService } from "./associations.service";
import { CreateAssociationsDto } from "./dto/create-associations.dto";
import { Auth } from "../common/decorators/auth.decorator";
import { Language } from "@prisma/client";

@Controller("associations")
export class AssociationsController {
  constructor(private readonly AssociationsService: AssociationsService) {}

  @Post()
  @Auth()
  createOrUpdate(@Body() createAsscotiaonsDto: CreateAssociationsDto) {
    return this.AssociationsService.createOrUpdate(createAsscotiaonsDto);
  }

  @Get()
  find(@Query("language") language: Language) {
    return this.AssociationsService.find(language);
  }
}
