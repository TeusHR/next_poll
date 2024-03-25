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
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(path, "uploads"),
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
        dir: path + "/templates",
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
    ResearchWorkModule,
    ActivityModule,
    InnovationModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
