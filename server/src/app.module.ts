import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { path } from "app-root-path";
import { ScheduleModule } from "@nestjs/schedule";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { AuthModule } from "./auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { ConferenceModule } from "./conference/conference.module";
import { ScienceSchoolModule } from "./science-school/science-school.module";
import { CooperationModule } from "./cooperation/cooperation.module";
import { ResearchWorkModule } from "./research-work/research-work.module";
import { ActivityModule } from "./activity/activity.module";
import { InnovationModule } from "./innovation/innovation.module";
import { StudentScienceModule } from "./student-science/student-science.module";
import { InternationalProjectModule } from "./international-project/international-project.module";
import { FeedbackModule } from "./feedback/feedback.module";
import { LaboratoryModule } from "./laboratory/laboratory.module";
import { LaboratoryDevelopmentModule } from "./laboratory-development/laboratory-development.module";
import { DIGAMModule } from "./digam/digam.module";
import { ConsultingModule } from "./consulting/consulting.module";
import { TrainingModule } from "./training/training.module";
import { DocumentsModule } from "./documents/documents.module";
import { AssociationsModule } from "./associations/associations.module";
import { AgreementsModule } from "./agreements/agreements.module";
import { PrismaService } from "./prisma.service";
import { ConferenceFileModule } from './conference-file/conference-file.module';
import { PublicInformationModule } from './public-information/public-information.module';
import { DocumentsTemplatesModule } from './documents-templates/documents-templates.module';
import { DirectionFilterModule } from './direction-filter/direction-filter.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath:
        process.env.NODE_ENV === "production"
          ? join(path, "uploads")
          : join(path, "server", "uploads"),
      serveRoot: "/uploads",
      serveStaticOptions: { fallthrough: false, maxAge: 1000 * 3600 * 24 },
    }),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        ignoreTLS: false,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SMTP_USER,
      },
      template: {
        dir:
          process.env.NODE_ENV === "production"
            ? join(path, "templates")
            : join(path, "server", "templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    ConferenceModule,
    ScienceSchoolModule,
    CooperationModule,
    DocumentsModule,
    ResearchWorkModule,
    ActivityModule,
    InnovationModule,
    StudentScienceModule,
    InternationalProjectModule,
    FeedbackModule,
    LaboratoryModule,
    LaboratoryDevelopmentModule,
    DIGAMModule,
    AssociationsModule,
    ConsultingModule,
    AgreementsModule,
    TrainingModule,
    ConferenceFileModule,
    PublicInformationModule,
    DocumentsTemplatesModule,
    DirectionFilterModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtService],
})
export class AppModule {}
