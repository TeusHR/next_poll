import {AxiosInstance} from "axios";
import {
    getActivitiesUrl,
    getConferencesUrl,
    getConsultingUrl,
    getCooperationsUrl,
    getInnovationsUrl,
    getResearchWorksUrl,
    getScienceSchoolsUrl
} from "@/config/url.config";
import {IConferences, ICreateConferences, IGroupConference, IResponseMeta} from "@/types/Conference";
import {ICreateScience} from "@/types/Science";
import {ICooperation, ICreateCooperation} from "@/types/Cooperation";
import {ICreateResearch, IResearch} from "@/types/Research";
import {ICreateInnovation} from "@/types/Innovation";
import {ICreateStudent} from "@/types/Student";
import {$api} from "@/api/interceptors";
import {IConsulting, ICreateConsulting} from "@/types/Consulting";


export const ConferencesService = {
    async getAllConference(authAxios: AxiosInstance, page: number, limit: number) {
        const {data} = await authAxios.get<IGroupConference[]>(getConferencesUrl(''))
        return data
    },
    async getConference(id: string) {
        const {data} = await $api.get<IConferences>(getConferencesUrl(`/${id}`))
        return data
    },
    async postConferences(item:ICreateConferences, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateConferences>(getConferencesUrl(''), item)
        return status
    },
    async updateConferences(item:ICreateConferences, id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.patch<ICreateConferences>(getConferencesUrl(`/${id}`), item)
        return status
    },
    async removeConferences(id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getConferencesUrl(`/${id}`))
        return status === 200
    },
};

export const ConsultingService = {
    async getConsulting(authAxios: AxiosInstance) {
        const {data} = await authAxios.get<IConsulting>(getConsultingUrl(''))
        return data
    },
    async postConsulting(item:ICreateConsulting, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateConsulting>(getConsultingUrl(''), item)
        return status
    },
};

export const ScienceService = {
    async postScience(item:ICreateScience, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateScience>(getScienceSchoolsUrl(''), item)
        return status
    },
    async updateScience(item:ICreateScience, id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.put<ICreateScience>(getScienceSchoolsUrl(`/${id}`), item)
        return status
    },
    async removeScience(id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getScienceSchoolsUrl(`/${id}`))
        return status === 200
    },
};


export const CooperationService = {
    async getAllCooperation(authAxios: AxiosInstance, page: number, limit: number) {
        const {data} = await authAxios.get<IResponseMeta<ICooperation[]>>(getCooperationsUrl(`?page=${page}&limit=${limit}`))
        return data
    },
    async getCooperation(id: string) {
        const {data} = await $api.get<ICooperation>(getCooperationsUrl(`/${id}`))
        return data
    },
    async post(item:ICreateCooperation, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateCooperation>(getCooperationsUrl(''), item)
        return status
    },
    async updateCooperation(item:ICreateCooperation, id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.patch<ICreateCooperation>(getCooperationsUrl(`/${id}`), item)
        return status
    },
    async removeCooperation(id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getCooperationsUrl(`/${id}`))
        return status === 200
    },
};


export const ResearchService = {
    async getAllResearch(authAxios: AxiosInstance, page: number, limit: number) {
        const {data} = await authAxios.get<IResponseMeta<IResearch[]>>(getResearchWorksUrl(`?page=${page}&limit=${limit}`))
        return data
    },
    async getResearch(id: string) {
        const {data} = await $api.get<IResearch>(getResearchWorksUrl(`/${id}`))
        return data
    },
    async postResearch(item:ICreateCooperation, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateResearch>(getResearchWorksUrl(''), item)
        return status
    },
    async updateResearch(item:ICreateCooperation, id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.patch<ICreateResearch>(getResearchWorksUrl(`/${id}`), item)
        return status
    },
    async removeResearch(id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getResearchWorksUrl(`/${id}`))
        return status === 200
    },
};


export const InnovationService = {
    async postScience(item:ICreateInnovation, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateInnovation>(getInnovationsUrl(''), item)
        return status
    },
    async updateScience(item:ICreateInnovation, id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.put<ICreateInnovation>(getInnovationsUrl(`/${id}`), item)
        return status
    },
    async removeScience(id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getInnovationsUrl(`/${id}`))
        return status === 200
    },
};


export const StudentService = {
    async postScience(item:ICreateStudent, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateStudent>(getInnovationsUrl(''), item)
        return status
    },
    async updateScience(item:ICreateStudent, id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.put<ICreateStudent>(getInnovationsUrl(`/${id}`), item)
        return status
    },
    async removeScience(id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getInnovationsUrl(`/${id}`))
        return status === 200
    },
};