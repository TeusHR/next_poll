import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { IsAdmin } from "./common/decorators/auth.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/upload")
  @IsAdmin()
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query("folder") folder?: string,
  ) {
    return this.appService.saveFiles([file], folder);
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
