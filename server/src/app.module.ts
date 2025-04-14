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
import { FeedbackModule } from "./feedback/feedback.module";

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
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
