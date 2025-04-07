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
import { Auth } from "../common/decorators/auth.decorator";
import { Language } from "@prisma/client";
import { EventsService } from "./events.service";
import { CreateEventsDto } from "./dto/create-events.dto";
import { UpdateEventsDto } from "./dto/update-events.dto";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Auth()
  create(@Body() createDto: CreateEventsDto) {
    return this.eventsService.create(createDto);
  }

  @Get()
  findAll(
    @Query("language") language: Language,
    @Query("column") column?: string,
    @Query("order") order?: string,
  ) {
    const orderBy = { [column || "updatedAt"]: order || "desc" };
    return this.eventsService.findAll({
      language,
      orderBy,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(@Param("id") id: string, @Body() updateDto: UpdateEventsDto) {
    return this.eventsService.update(id, updateDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.eventsService.remove(id);
  }
}
