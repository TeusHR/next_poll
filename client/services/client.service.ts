import { AxiosInstance } from "axios";
import {IResponseMeta} from "@/types/Conference";
import {
  getFeedBackUrl
} from "@/config/url.config";
import { $api } from "@/api/interceptors";
import { IFeedbackForm } from "@/types/Feedback";

export const FeedbackService = {
  async getAll(authAxios: AxiosInstance, page: number, limit: number) {
    const { data } = await authAxios.get<IResponseMeta<IFeedbackForm[]>>(
      getFeedBackUrl(`?page=${page}&limit=${limit}`),
    );
    return data;
  },
  async post(item: IFeedbackForm) {
    const { status } = await $api.post<IFeedbackForm>(getFeedBackUrl(""), item);
    return status;
  },
};