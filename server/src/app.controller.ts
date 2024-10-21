import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Language } from "@prisma/client";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  healthCheck() {
    return { success: true };
  }

  @Get("search/:value")
  async search(@Param("value") value: string, language: Language) {
    return this.appService.globalSearch(value, language);
  }

  @Post("/upload")
  @UseInterceptors(FilesInterceptor("file"))
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Query("folder") folder?: string,
  ) {
    return this.appService.saveFiles(files, folder);
  }

  @Get("/download/:fileName")
  async downloadFile(
    @Query("folder") folderName: string,
    @Param("fileName") fileName: string,
  ) {
    const file = await this.appService.download(folderName, fileName);
    return new StreamableFile(file);
  }
}
