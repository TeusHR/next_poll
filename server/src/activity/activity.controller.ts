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
import { ActivityService } from "./activity.service";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { Auth } from "src/common/decorators/auth.decorator";

@Controller("activities")
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @Auth()
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Get()
  findAll(@Query("limit") limit: string) {
    return this.activityService.findAll(+limit);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.activityService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.activityService.remove(id);
  }
}
