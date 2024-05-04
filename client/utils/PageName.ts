import {ISearch} from "@/types/Search";

export function getKeyDescription(key: keyof ISearch): string {
    const descriptions: { [key in keyof ISearch]?: string } = {
        activities: "Міжнародна діяльність ОНТУ",
        conferences: "Конференції, семінари та конкурси",
        cooperations: "Напрямки для співпраці",
        innovations: "Інноваційні розробки",
        internationalProjects: "Міжнародні проекти",
        laboratories: "Науково-дослідні лабораторії",
        laboratoryDevelopments: "Розробки лабораторії",
        researchWorks: "Наукова робота ОНТУ",
        scienceSchools: "Студентська наука",
        trainings: "Опис тренінгів"
    };
    return descriptions[key] || `${key}`;
}

export function getKeyLink(key: keyof ISearch, id: string): string {
    const descriptions: { [key in keyof ISearch]?: string } = {
        activities: "/activity",
        conferences: `/conference/${id}`,
        cooperations: "/cooperation",
        innovations: `/innovations/${id}`,
        internationalProjects: `/international/${id}`,
        laboratories: `/laboratory/${id}`,
        laboratoryDevelopments: `/laboratory/${id}?develop=true`,
        researchWork: "/research",
        scienceSchools: "/student",
        trainings: `/training/${id}`
    };
    return descriptions[key] || `${key}`;
}
