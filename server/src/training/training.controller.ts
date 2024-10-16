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
import { TrainingService } from "./training.service";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { UpdateTrainingDto } from "./dto/update-training.dto";
import { Auth } from "../common/decorators/auth.decorator";
import { Language } from "@prisma/client";

@Controller("trainings")
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  @Auth()
  create(@Body() createTrainingDto: CreateTrainingDto) {
    return this.trainingService.create(createTrainingDto);
  }

  @Get()
  findAll(
    @Query("language") language: Language,
    @Query("limit") limit?: string,
    @Query("page") page?: string,
    @Query("column") column?: string,
    @Query("order") order?: string,
  ) {
    const orderBy = { [column || "updatedAt"]: order || "desc" };
    return this.trainingService.findAll({
      language,
      perPage: +limit || undefined,
      page: +page || 1,
      orderBy,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.trainingService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id") id: string,
    @Body() updateTrainingDto: UpdateTrainingDto,
  ) {
    return this.trainingService.update(id, updateTrainingDto);
  }

  @Delete(":id")
  @Auth()
  remove(@Param("id") id: string) {
    return this.trainingService.remove(id);
  }
}
