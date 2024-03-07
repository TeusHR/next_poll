import {uploadFilesUrl} from "@/config/url.config";
import {AxiosInstance} from "axios";

export const FileService = {
    async uploadFile(apiAuth: AxiosInstance,file: FormData, folder?: string) {
        return await apiAuth.post<{url: string, name: string}[]>(uploadFilesUrl(folder), file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}
