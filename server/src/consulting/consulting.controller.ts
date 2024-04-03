import { Controller, Get, Post, Body } from "@nestjs/common";
import { ConsultingService } from "./consulting.service";
import { CreateConsultingDto } from "./dto/create-consulting.dto";
import { Auth } from "../common/decorators/auth.decorator";

@Controller("consulting")
export class ConsultingController {
  constructor(private readonly consultingService: ConsultingService) {}

  @Post()
  @Auth()
  createOrUpdate(@Body() createConsultingDto: CreateConsultingDto) {
    return this.consultingService.createOrUpdate(createConsultingDto);
  }

  @Get()
  find() {
    return this.consultingService.find();
  }
}
