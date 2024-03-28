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
  findAll(
    @Query("limit") limit?: string,
    @Query("page") page?: string,
    @Query("column") column?: string,
    @Query("order") order?: string,
  ) {
    const orderBy = { [column || "updatedAt"]: order || "desc" };
    return this.activityService.findAll({
      perPage: +limit || undefined,
      page: +page || 1,
      orderBy,
    });
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
