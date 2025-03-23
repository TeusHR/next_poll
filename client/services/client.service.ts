import { AxiosInstance } from "axios";
import {IConferences, IConferencesFile, IResponseMeta} from "@/types/Conference";
import {
  getActivitiesUrl, getAgreementsUrl, getAssociationsUrl, getConferencesFileUrl,
  getConferencesUrl,
  getConsultingUrl,
  getCooperationsUrl,
  getDigamUrl, getDocumentsTemplateUrl, getDocumentsUrl,
  getFeedBackUrl,
  getInnovationsUrl,
  getInternationalUrl,
  getLaboratoryDevelopmentsUrl,
  getLaboratoryUrl, getPublicInformationUrl,
  getResearchWorksUrl,
  getScienceSchoolsUrl,
  getStudentUrl,
  getTrainingUrl
} from "@/config/url.config";
import { $api } from "@/api/interceptors";
import { IFeedbackForm } from "@/types/Feedback";
import { API_URL, LOCAL_API_URL } from "@/config/constants";
import { ISearch } from "@/types/Search";
import { IResearch } from "@/types/Research";
import { getContentType, getEmptyResponse } from "@/api/api.helpers";
import { IActivity } from "@/types/Activity";
import { IConsulting, ITraining } from "@/types/Consulting";
import { ICooperation } from "@/types/Cooperation";
import { IDigam } from "@/types/Digam";
import { IInternational } from "@/types/International";
import { ILaboratory } from "@/types/Laboratory";
import { IDevelopments } from "@/types/LaboratoryDevelopments";
import { IScience } from "@/types/Science";
import { IStudent } from "@/types/Student";
import { IInnovation } from "@/types/Innovation";
import { IDocuments } from "@/types/Documents";
import { IAssociations } from "@/types/Associations";

import { IAgreements } from "@/types/Agreements";
import {IPublicInformation} from "@/types/PublicInformation";
import {IDocumentsTemplates} from "@/types/DocumentsTemplates";
export const ResearchWorkService = {
  async getAll(page: number, limit: number, column = "createdAt", order: "asc" | "desc" = "desc", language: string) {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      column,
      order,
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getResearchWorksUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["researchWork"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IResponseMeta<IResearch[]> = await res.json();

      return data;
    } catch (e) {
      return getEmptyResponse<IResearch>();
    }
  },
};

export const CooperationService = {
  async getAll(page: number, limit: number, column = "createdAt", order: "asc" | "desc" = "desc", language: string) {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      column,
      order,
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getCooperationsUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["cooperation"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IResponseMeta<ICooperation[]> = await res.json();

      return data;
    } catch (e) {
      return getEmptyResponse<ICooperation>();
    }
  },
};

export const DocumentsService = {
  async getAll(page: number, limit: number, column = "createdAt", order: "asc" | "desc" = "desc", language: string) {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      column,
      order,
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getDocumentsUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["documents"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IResponseMeta<IDocuments[]> = await res.json();

      return data;
    } catch (e) {
      return getEmptyResponse<IDocuments>();
    }
  },
};

export const PublicInformationService = {
  async getAll(language: string) {
    const searchParams = new URLSearchParams({
      // page: page.toString(),
      // limit: limit.toString(),
      // column,
      // order,
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getPublicInformationUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["public-information"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IPublicInformation[] = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
};

export const DocumentsTemplatesService = {
  async getAll(language: string) {
    const searchParams = new URLSearchParams({
      // page: page.toString(),
      // limit: limit.toString(),
      // column,
      // order,
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getDocumentsTemplateUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["documents-templates"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IDocumentsTemplates[] = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
};

export const InnovationService = {
  async getAll(page: number, limit: number, column = "createdAt", order: "asc" | "desc" = "desc", language: string) {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      column,
      order,
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getInnovationsUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["innovation"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IResponseMeta<IInnovation[]> = await res.json();

      return data;
    } catch (e) {
      return getEmptyResponse<IInnovation>();
    }
  },
  async get(id: string) {
    try {
      const res = await fetch(`${LOCAL_API_URL}${getInnovationsUrl(`/${id}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["innovation"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IInnovation = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
};

export const InternationalService = {
  async getAll(page: number, limit: number, column = "createdAt", order: "asc" | "desc" = "desc", language: string) {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      column,
      order,
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getInternationalUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["international"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IResponseMeta<IInternational[]> = await res.json();

      return data;
    } catch (e) {
      return getEmptyResponse<IInternational>();
    }
  },
  async get(id: string) {
    try {
      const res = await fetch(`${LOCAL_API_URL}${getInternationalUrl(`/${id}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["international"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IInternational = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
};

export const ScienceService = {
  async getAll(page: number, limit: number, column = "createdAt", order: "asc" | "desc" = "desc", language: string) {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      column,
      order,
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getScienceSchoolsUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["science"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IResponseMeta<IScience[]> = await res.json();

      return data;
    } catch (e) {
      return getEmptyResponse<IScience>();
    }
  },
};

export const LaboratoryService = {
  async getAllLaboratories(
    page: number,
    limit: number,
    column = "createdAt",
    order: "asc" | "desc" = "desc",
    language: string,
  ) {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      column,
      order,
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getLaboratoryUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["laboratory"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IResponseMeta<ILaboratory[]> = await res.json();

      return data;
    } catch (e) {
      return getEmptyResponse<ILaboratory>();
    }
  },
  async get(id: string) {
    try {
      const res = await fetch(`${LOCAL_API_URL}${getLaboratoryUrl(`/${id}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["laboratory"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: ILaboratory = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
  async getDevelopment(id: string) {
    try {
      const res = await fetch(`${LOCAL_API_URL}${getLaboratoryDevelopmentsUrl(`/${id}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["laboratory"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IDevelopments = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
};

export const ActivityService = {
  async getAll(page: number, limit: number, column = "createdAt", order: "asc" | "desc" = "desc", language: string) {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      column,
      order,
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getActivitiesUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["activity"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IResponseMeta<IActivity[]> = await res.json();

      return data;
    } catch (e) {
      return getEmptyResponse<IActivity>();
    }
  },
};

export const ConferencesService = {
  async getAll(language: string) {
    const searchParams = new URLSearchParams({
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getConferencesUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["conference"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: { items: IConferences[]; month: string }[] = await res.json();

      return data;
    } catch (e) {
      return [];
    }
  },
  async getAllFiles(locale: string) {
    try {
      const res = await fetch(`${LOCAL_API_URL}${getConferencesFileUrl(`/?language=${locale}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["conference"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IConferencesFile = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
  async get(id: string) {
    try {
      const res = await fetch(`${LOCAL_API_URL}${getConferencesUrl(`/${id}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["conference"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IConferences = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
};

export const ConsultingService = {
  async getAll(language: string) {
    const searchParams = new URLSearchParams({
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getConsultingUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["consulting"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IConsulting = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
};

export const TrainingService = {
  async getAll(language: string) {
    const searchParams = new URLSearchParams({
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getTrainingUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["training"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IResponseMeta<ITraining[]> = await res.json();

      return data.data;
    } catch (e) {
      return [];
    }
  },
  async get(id: string) {
    try {
      const res = await fetch(`${LOCAL_API_URL}${getTrainingUrl(`/${id}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["training"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: ITraining = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
};

export const DIGAMService = {
  async getAll(language: string) {
    const searchParams = new URLSearchParams({
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getDigamUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["digam"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IDigam = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
};

export const AssociationService = {
  async getAll(language: string) {
    const searchParams = new URLSearchParams({
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getAssociationsUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["associations"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IAssociations = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
};

export const AgreementsService = {
  async getAll(language: string) {
    const searchParams = new URLSearchParams({
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getAgreementsUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["agreements"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IAgreements = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
};

export const StudentService = {
  async getAll(language: string) {
    const searchParams = new URLSearchParams({
      language,
    });
    try {
      const res = await fetch(`${LOCAL_API_URL}${getStudentUrl(`?${searchParams.toString()}`)}`, {
        method: "GET",
        headers: getContentType(),
        next: {
          tags: ["studentScience"],
        },
        cache: "force-cache",
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data: IStudent = await res.json();

      return data;
    } catch (e) {
      return null;
    }
  },
};

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

export async function getBySearch(search: string): Promise<ISearch[]> {
  try {
    const response = await fetch(`${API_URL}/search/${search}`);
    if (!response.ok) {
      console.log("Unable to fetch", response);
      return [];
    }
    return response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}
