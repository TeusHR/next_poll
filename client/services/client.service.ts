import {AxiosInstance} from "axios";
import {IResponseMeta} from "@/types/Conference";
import {getFeedBackUrl} from "@/config/url.config";
import {$api} from "@/api/interceptors";
import {IFeedbackForm} from "@/types/Feedback";
import {API_URL} from "@/config/constants";
import {ISearch} from "@/types/Search";


export const FeedbackService = {
    async getAll(authAxios: AxiosInstance, page: number, limit: number) {
        const {data} = await authAxios.get<IResponseMeta<IFeedbackForm[]>>(getFeedBackUrl(`?page=${page}&limit=${limit}`))
        return data
    },
    async post(item:IFeedbackForm) {
        const {status} = await $api.post<IFeedbackForm>(getFeedBackUrl(''), item)
        return status
    },
};


export async function getBySearch(search: string, limit = 15): Promise<ISearch[]> {
    try {
        const response = await fetch(`${API_URL}/search/${search}`, {
            next: {
                revalidate: 60,
            },
        });
        if (!response.ok) {
            console.log("Unable to fetch", response)
            return []
        }
        return response.json();
    } catch (e) {
        console.error(e)
        return []
    }
}