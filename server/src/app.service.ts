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
    const uploadFolder =
      process.env.NODE_ENV === "production"
        ? join(path, "uploads", folder)
        : join(path, "server", "uploads", folder);
    await ensureDir(uploadFolder);

    if (files.filter((file) => file).length === 0) return [];
    const res: FileResponse[] = await Promise.all(
      files.map(async (file, index) => {
        const fileInfo = getFileInfo(
          iconv.encode(file.originalname, "utf8").toString(),
        );

        const fileName = `${decodeURIComponent(fileInfo.fileName)}__${Date.now() + index}.${fileInfo.fileExtension}`;
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
    const filePath =
      process.env.NODE_ENV === "production"
        ? join(path, "uploads", folderName, fileName)
        : join(path, "server", "uploads", folderName, fileName);

    const isExist = await checkFileExists(filePath);
    if (!isExist) throw new NotFoundException("File not found");

    return createReadStream(filePath);
  }

  private formatSearch(obj: Record<string, Record<string, any>[]>) {
    const keys = Object.keys(obj);
    const res = {};
    for (let i = 0; i < keys.length; i++) {
      if (obj[keys[i]].length)
        res[keys[i]] = obj[keys[i]].map((item) => ({
          id: item.id,
          title: item.title,
          text: item.text,
        }));
    }
    return res;
  }
}
