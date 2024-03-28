import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { Auth } from "../common/decorators/auth.decorator";

@Controller("feedback")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  @Auth()
  findAll(
    @Query("limit") limit?: string,
    @Query("page") page?: string,
    @Query("column") column?: string,
    @Query("order") order?: string,
  ) {
    const orderBy = { [column || "updatedAt"]: order || "desc" };
    return this.feedbackService.findAll({
      perPage: +limit || undefined,
      page: +page || 1,
      orderBy,
    });
  }
}
