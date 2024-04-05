import {FileService} from "@/services/file.service";
import {AxiosInstance} from "axios";


export async function uploadFiles(files: FileList[], folder: string, $apiAuth:AxiosInstance) {
    const filePath: any = []

    for (const file of files) {
        let result  = await FileService.upload($apiAuth, file, folder)
        filePath.push(result)
    }
    console.log(filePath)
    return filePath
}