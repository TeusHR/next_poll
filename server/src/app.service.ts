import { Injectable, NotFoundException } from "@nestjs/common";
import { createReadStream } from "fs";
import * as iconv from "iconv-lite";
import { path } from "app-root-path";
import { ensureDir, writeFile } from "fs-extra";
import { FileResponse } from "./app.interface";
import { checkFileExists, getFileInfo } from "./common/helpers/storage.helper";

@Injectable()
export class AppService {
  async saveFiles(files: Express.Multer.File[], folder: string = "default") {
    const uploadFolder = `${path}/uploads/${folder}`;
    await ensureDir(uploadFolder);

    if (files.filter((file) => file).length === 0) return [];

    const fileInfo = getFileInfo(
      iconv.encode(files[0].originalname, "utf8").toString(),
    );

    const fileName = `${new Date().getTime()}__${fileInfo.fileName}.${fileInfo.fileExtension}`;

    const res: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        await writeFile(`${uploadFolder}/${fileName}`, file.buffer);

        return {
          url: `/uploads/${folder}/${fileName}`,
          name: fileName,
        };
      }),
    );

    return res;
  }

  async download(folderName: string = "default", fileName: string) {
    const filePath = `${path}/uploads/${folderName}/${fileName}`;

    const isExist = await checkFileExists(filePath);
    if (!isExist) throw new NotFoundException("File not found");

    return createReadStream(filePath);
  }
}
