import { Injectable, NotFoundException } from "@nestjs/common";
import { createReadStream } from "fs";
import * as iconv from "iconv-lite";
import { path } from "app-root-path";
import { ensureDir, writeFile } from "fs-extra";
import { FileResponse } from "./app.interface";
import { checkFileExists, getFileInfo } from "./common/helpers/storage.helper";
import { join } from "path";

@Injectable()
export class AppService {
  async saveFiles(files: Express.Multer.File[], folder: string = "default") {
    const uploadFolder = join(path, "server", "uploads", "folder");
    await ensureDir(uploadFolder);

    if (files.filter((file) => file).length === 0) return [];

    const res: FileResponse[] = await Promise.all(
      files.map(async (file, index) => {
        const fileInfo = getFileInfo(
          iconv.encode(file.originalname, "utf8").toString(),
        );
        const fileName = `${fileInfo.fileName}__${Date.now() + index}.${fileInfo.fileExtension}`;
        await writeFile(join(uploadFolder, fileName), file.buffer);

        return {
          url: `/uploads/${folder}/${fileName}`,
          name: fileName,
        };
      }),
    );

    return res;
  }

  async download(folderName: string = "default", fileName: string) {
    const filePath = join(path, "server", "uploads", folderName, fileName);

    const isExist = await checkFileExists(filePath);
    if (!isExist) throw new NotFoundException("File not found");

    return createReadStream(filePath);
  }
}
