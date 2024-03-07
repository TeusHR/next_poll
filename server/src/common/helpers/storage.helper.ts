import * as fs from "fs";
import { path } from "app-root-path";
import * as pathNode from "path";

export const checkFileExists = (filePath: string) => {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (error) => {
      resolve(!error);
    });
  });
};

export const checkDirExists = async (dirPath: string) => {
  try {
    await fs.promises.stat(dirPath);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }
    throw err;
  }
};

export const getFileInfo = (fileName: string) => {
  const fileExtension = pathNode.extname(fileName).slice(1);
  const fileNameWithoutExtension = pathNode.basename(
    fileName,
    `.${fileExtension}`,
  );

  return { fileName: fileNameWithoutExtension, fileExtension };
};

export const createFile = async (
  filePath: string,
  fileName: string,
  data: string,
): Promise<void> => {
  const isDirExist = await checkDirExists(filePath);
  const absoluteDirPath = pathNode.join(path, filePath);

  if (!isDirExist) await fs.promises.mkdir(absoluteDirPath);

  const absoluteFilePath = pathNode.join(absoluteDirPath, fileName);

  const isFileExist = await checkFileExists(absoluteFilePath);
  if (isFileExist) await deleteFile(absoluteFilePath);
  return await fs.promises.writeFile(absoluteFilePath, data, "utf8");
};

export const renameFile = async (oldFile: string, newFilePath: string) => {
  try {
    const oldAbsoluteFilePath = pathNode.join(path, oldFile);
    const newAbsoluteFilePath = pathNode.join(path, newFilePath);
    await fs.promises.rename(oldAbsoluteFilePath, newAbsoluteFilePath);
  } catch (e) {
    throw new Error(`Error renaming file: ${e.message}`);
  }
};

export const deleteFile = async (filePath: string): Promise<void> => {
  return await fs.promises.unlink(filePath);
};

export const readFileContents = async (filePath: string): Promise<string> => {
  try {
    return await fs.promises.readFile(pathNode.join(path, filePath), "utf8");
  } catch (err) {
    if (err.code === "ENOENT") {
      return null;
    }
    throw err;
  }
};

export const getFileCreationDate = async (
  filePath: string,
): Promise<Date | null> => {
  try {
    const stats = await fs.promises.stat(pathNode.join(path, filePath));
    return stats.birthtime;
  } catch (err) {
    if (err.code === "ENOENT") {
      return null;
    }
    throw err;
  }
};
