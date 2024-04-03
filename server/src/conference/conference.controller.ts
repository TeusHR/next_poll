import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ConferenceService } from "./conference.service";
import { CreateConferenceDto } from "./dto/create-conference.dto";
import { UpdateConferenceDto } from "./dto/update-conference.dto";
import { Auth } from "../common/decorators/auth.decorator";

@Controller("conferences")
export class ConferenceController {
  constructor(private readonly conferenceService: ConferenceService) {}

  @Post()
  @Auth()
  create(@Body() createConferenceDto: CreateConferenceDto) {
    return this.conferenceService.create(createConferenceDto);
  }

  @Get()
  findAll() {
    return this.conferenceService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.conferenceService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updateConferenceDto: UpdateConferenceDto,
  ) {
    return this.conferenceService.update(id, updateConferenceDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.conferenceService.remove(id);
  }
}
