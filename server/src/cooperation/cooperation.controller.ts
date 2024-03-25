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
import { CooperationService } from "./cooperation.service";
import { CreateCooperationDto } from "./dto/create-cooperation.dto";
import { UpdateCooperationDto } from "./dto/update-cooperation.dto";
import { Auth } from "../common/decorators/auth.decorator";

@Controller("cooperations")
export class CooperationController {
  constructor(private readonly cooperationService: CooperationService) {}

  @Post()
  @Auth()
  create(@Body() createCooperationDto: CreateCooperationDto) {
    return this.cooperationService.create(createCooperationDto);
  }

  @Get()
  findAll(@Query("limit") limit: string) {
    return this.cooperationService.findAll(+limit);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cooperationService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updateCooperationDto: UpdateCooperationDto,
  ) {
    return this.cooperationService.update(id, updateCooperationDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.cooperationService.remove(id);
  }
}
