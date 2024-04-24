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
        researchWork: "Наукова робота ОНТУ",
        scienceSchools: "Студентська наука",
        trainings: "Описание тренингов"
    };
    return descriptions[key] || `${key}`;
}