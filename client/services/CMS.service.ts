import {AxiosInstance} from "axios";
import {
    getActivitiesUrl,
    getConferencesUrl,
    getConsultingUrl,
    getCooperationsUrl,
    getInnovationsUrl, getInternationalUrl, getLaboratoryDevelopmentsUrl, getLaboratoryUrl,
    getResearchWorksUrl,
    getScienceSchoolsUrl,
    getStudentUrl
} from "@/config/url.config";
import {IConferences, ICreateConferences, IGroupConference, IResponseMeta} from "@/types/Conference";
import {ICreateScience} from "@/types/Science";
import {ICooperation, ICreateCooperation} from "@/types/Cooperation";
import {ICreateResearch, IResearch} from "@/types/Research";
import {ICreateInnovation, IInnovation} from "@/types/Innovation";
import {ICreateStudent, IStudent} from "@/types/Student";
import {$api} from "@/api/interceptors";
import {IConsulting, ICreateConsulting} from "@/types/Consulting";
import {IActivity, ICreateActivity} from "@/types/Activity";
import {ICreateInternational, IInternational} from "@/types/International";
import {ICreateLaboratory, ILaboratory} from "@/types/Laboratory";
import {ICreateDevelopments, IDevelopments} from "@/types/LaboratoryDevelopments";


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


export const ActivityService = {
    async getAllActivity(authAxios: AxiosInstance, page: number, limit: number) {
        const {data} = await authAxios.get<IResponseMeta<IActivity[]>>(getActivitiesUrl(`?page=${page}&limit=${limit}`))
        return data
    },
    async getActivity(id: string) {
        const {data} = await $api.get<IActivity>(getActivitiesUrl(`/${id}`))
        return data
    },
    async postActivity(item:ICreateCooperation, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateActivity>(getActivitiesUrl(''), item)
        return status
    },
    async updateActivity(item:ICreateCooperation, id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.patch<ICreateActivity>(getActivitiesUrl(`/${id}`), item)
        return status
    },
    async removeActivity(id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getActivitiesUrl(`/${id}`))
        return status === 200
    },
};


export const InnovationsService = {
    async getAllInnovations(authAxios: AxiosInstance, page: number, limit: number) {
        const {data} = await authAxios.get<IResponseMeta<IInnovation[]>>(getInnovationsUrl(`?page=${page}&limit=${limit}`))
        return data
    },
    async getInnovation(id: string) {
        const {data} = await $api.get<IInnovation>(getInnovationsUrl(`/${id}`))
        return data
    },
    async postInnovation(item:ICreateCooperation, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateInnovation>(getInnovationsUrl(''), item)
        return status
    },
    async updateInnovation(item:ICreateCooperation, id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.patch<ICreateInnovation>(getInnovationsUrl(`/${id}`), item)
        return status
    },
    async removeInnovation(id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getInnovationsUrl(`/${id}`))
        return status === 200
    },
};


export const InternationalService = {
    async getAllInternational(authAxios: AxiosInstance, page: number, limit: number) {
        const {data} = await authAxios.get<IResponseMeta<IInternational[]>>(getInternationalUrl(`?page=${page}&limit=${limit}`))
        return data
    },
    async getInternational(id: string) {
        const {data} = await $api.get<IInternational>(getInternationalUrl(`/${id}`))
        return data
    },
    async postInternational(item:ICreateCooperation, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateInternational>(getInternationalUrl(''), item)
        return status
    },
    async updateInternational(item:ICreateCooperation, id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.patch<ICreateInternational>(getInternationalUrl(`/${id}`), item)
        return status
    },
    async removeInternational(id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getInternationalUrl(`/${id}`))
        return status === 200
    },
};


export const StudentService = {
    async getStudent(authAxios: AxiosInstance) {
        const {data} = await authAxios.get<IResponseMeta<IStudent>>(getInternationalUrl(`/`))
        return data
    },
    async postStudent(item:ICreateStudent, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<ICreateStudent>(getStudentUrl(''), item)
        return status
    },
    async updateStudent(item:ICreateStudent, id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.put<ICreateStudent>(getStudentUrl(`/${id}`), item)
        return status
    },
    async removeStudent(id: number, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getStudentUrl(`/${id}`))
        return status === 200
    },
};


export const LaboratoryService = {
    async getAllLaboratory(authAxios: AxiosInstance, page: number, limit: number) {
        const {data} = await authAxios.get<IResponseMeta<ILaboratory[]>>(getLaboratoryUrl(`?page=${page}&limit=${limit}`))
        return data
    },
    async getLaboratory(id: string) {
        const {data} = await $api.get<ILaboratory>(getLaboratoryUrl(`/${id}`))
        return data
    },
    async postLaboratory(item:ICreateCooperation, authAxios: AxiosInstance) {
        const {status, data} = await authAxios.post<ILaboratory>(getLaboratoryUrl(''), item)
        return {status, data}
    },
    async updateLaboratory(item:ICreateCooperation, id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.patch<ICreateLaboratory>(getLaboratoryUrl(`/${id}`), item)
        return status
    },
    async removeLaboratory(id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getLaboratoryUrl(`/${id}`))
        return status === 200
    },
};


export const LaboratoryDevelopService = {
    async getAllLaboratoryDevelop(authAxios: AxiosInstance, page: number, limit: number) {
        const {data} = await authAxios.get<IResponseMeta<IDevelopments[]>>(getLaboratoryDevelopmentsUrl(`?page=${page}&limit=${limit}`))
        return data
    },
    async getLaboratoryDevelop(id: string) {
        const {data} = await $api.get<IDevelopments>(getLaboratoryDevelopmentsUrl(`/${id}`))
        return data
    },
    async postLaboratoryDevelop(item:ICreateDevelopments, authAxios: AxiosInstance) {
        const {status} = await authAxios.post<IDevelopments>(getLaboratoryDevelopmentsUrl(''), item)
        return status
    },
    async updateLaboratoryDevelop(item:ICreateDevelopments, id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.patch<ICreateDevelopments>(getLaboratoryDevelopmentsUrl(`/${id}`), item)
        return status
    },
    async removeLaboratoryDevelop(id: string, authAxios: AxiosInstance) {
        const {status} = await authAxios.delete(getLaboratoryDevelopmentsUrl(`/${id}`))
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