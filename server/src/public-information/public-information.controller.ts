import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { PublicInformationService } from "./public-information.service";
import { CreatePublicInformationDto } from "./dto/create-public-information.dto";
import { CreatePublicInformationPageDto } from "./dto/create-public-information-page.dto";
import { Language } from "@prisma/client";
import { Auth } from "../common/decorators/auth.decorator";
import { UpdatePublicInformationDto } from "./dto/update-public-information.dto";
import { UpdatePublicInformationPageDto } from "./dto/update-public-information-page.dto";

@Controller("public-information")
export class PublicInformationController {
  constructor(
    private readonly publicInformationService: PublicInformationService,
  ) {}

  @Post()
  createPublicInformation(
    @Body() createPublicInformationDto: CreatePublicInformationDto,
  ) {
    return this.publicInformationService.create(createPublicInformationDto);
  }

  @Post("/pages")
  createPage(
    @Body() createPublicInformationPageDto: CreatePublicInformationPageDto,
  ) {
    return this.publicInformationService.createPage(
      createPublicInformationPageDto,
    );
  }

  @Get()
  findAll(@Query("language") language: Language) {
    return this.publicInformationService.findAll(language);
  }

  @Get(":id")
  getPublicInformationPage(@Param("id") id: string) {
    return this.publicInformationService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updatePublicInformationDto: UpdatePublicInformationDto,
  ) {
    return this.publicInformationService.update(id, updatePublicInformationDto);
  }

  @Patch("/pages/:id")
  @Auth()
  updatePage(
    @Param("id") id: string,
    @Body() updatePublicInformationPageDto: UpdatePublicInformationPageDto,
  ) {
    return this.publicInformationService.updatePage(
      id,
      updatePublicInformationPageDto,
    );
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.publicInformationService.remove(id);
  }

  @Delete("/pages/:id")
  @Auth()
  removePage(@Param("id") id: string) {
    return this.publicInformationService.removePage(id);
  }
}
