import { getFileUrl } from "@/config/url.config";
import {AxiosInstance} from "axios";

export const FileService = {
    async upload(apiAuth: AxiosInstance, files: FileList, folder?: string) {
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append(`file`, files[i])
        }

        const { data } = await apiAuth.post<{
            url: string,
            name: string
        }[]>(getFileUrl(folder ?? ''), formData, { headers: { "Content-Type": "multipart/form-data" } })
        return data
    }
}
