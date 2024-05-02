import { Injectable, Logger } from "@nestjs/common";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { paginate, PrismaService } from "../prisma.service";
import { MailerService } from "@nestjs-modules/mailer";
import { Feedback, Prisma } from "@prisma/client";
import { PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);

  constructor(
    private prismaService: PrismaService,
    private mailerService: MailerService,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    const feedback = await this.prismaService.feedback.create({
      data: createFeedbackDto,
    });

    this.mailerService
      .sendMail({
        to: process.env.ROOT_EMAIL,
        from: process.env.SMTP_USER,
        subject: "Форма зворотного зв'язку",
        template: "feedback",
        context: { ...feedback, logo: `${process.env.NEXTAUTH_URL}/logo.svg` },
      })
      .catch((err) => {
        this.logger.error("CONTACTS EMAIL ERROR", err);
        console.log("CONTACTS EMAIL ERROR", err, new Date().toLocaleString());
      });

    return feedback;
  }

  async findAll({
    page,
    perPage,
    orderBy,
  }: {
    orderBy?: Prisma.FeedbackOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Feedback>> {
    return paginate(
      this.prismaService.feedback,
      {
        orderBy,
      },
      {
        page,
        perPage,
      },
    );
  }
}
