import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { ConsultingService } from "./consulting.service";
import { CreateConsultingDto } from "./dto/create-consulting.dto";
import { Auth } from "../common/decorators/auth.decorator";
import { Language } from "@prisma/client";

@Controller("consulting")
export class ConsultingController {
  constructor(private readonly consultingService: ConsultingService) {}

  @Post()
  @Auth()
  createOrUpdate(@Body() createConsultingDto: CreateConsultingDto) {
    return this.consultingService.createOrUpdate(createConsultingDto);
  }

  @Get()
  find(@Query("language") language: Language) {
    return this.consultingService.find(language);
  }
}
