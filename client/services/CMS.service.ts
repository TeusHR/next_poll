import {AxiosInstance} from "axios";
import {
    getActivitiesUrl,
    getConferencesUrl,
    getCooperationsUrl,
    getInnovationsUrl,
    getResearchWorksUrl,
    getScienceSchoolsUrl
} from "@/config/url.config";
import {IConferences, ICreateConferences} from "@/types/Conference";
import {ICreateScience} from "@/types/Science";
import {ICreateCooperation} from "@/types/Cooperation";
import {ICreateResearch} from "@/types/Research";
import {ICreateInnovation} from "@/types/Innovation";
import {ICreateStudent} from "@/types/Student";
import {$api} from "@/api/interceptors";


export const ConferencesService = {
    async getAllConference(authAxios: AxiosInstance, page: number, limit: number) {
        const {data} = await authAxios.get<IConferences[]>(getConferencesUrl(''))
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
    async updateConferences(item:ICreateConferences, id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.put<ICreateConferences>(getConferencesUrl(`/${id}`), item)
        return status
    },
    async removeConferences(id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getConferencesUrl(`/${id}`))
        return status === 200
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
    async postScience(item:ICreateCooperation, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateCooperation>(getCooperationsUrl(''), item)
        return status
    },
    async updateScience(item:ICreateCooperation, id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.put<ICreateCooperation>(getCooperationsUrl(`/${id}`), item)
        return status
    },
    async removeScience(id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getCooperationsUrl(`/${id}`))
        return status === 200
    },
};


export const ResearchService = {
    async postScience(item:ICreateResearch, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateResearch>(getResearchWorksUrl(''), item)
        return status
    },
    async updateScience(item:ICreateResearch, id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.put<ICreateResearch>(getResearchWorksUrl(`/${id}`), item)
        return status
    },
    async removeScience(id: number, authAxios: AxiosInstance) {
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