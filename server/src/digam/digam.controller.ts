import { Controller, Get, Post, Body } from "@nestjs/common";
import { DIGAMService } from "./digam.service";
import { CreateDIGAMDto } from "./dto/create-digam.dto";
import { Auth } from "../common/decorators/auth.decorator";

@Controller("digam")
export class DIGAMController {
  constructor(private readonly digamService: DIGAMService) {}

  @Post()
  @Auth()
  createOrUpdate(@Body() createDIGAMDto: CreateDIGAMDto) {
    return this.digamService.createOrUpdate(createDIGAMDto);
  }

  @Get()
  find() {
    return this.digamService.find();
  }
}
