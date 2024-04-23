export interface ISearch {
    activities:ISearchItems[],
    conferences:ISearchItems[],
    cooperations:ISearchItems[],
    innovations:ISearchItems[],
    internationalProjects:ISearchItems[],
    laboratories:ISearchItems[],
    laboratoryDevelopments:ISearchItems[],
    researchWork:ISearchItems[],
    scienceSchools:ISearchItems[],
    trainings:ISearchItems[],
    [key: string]: ISearchItems[] | undefined;
}

export interface ISearchInput {
    type:string,
    items:ISearchItems[]
}

export interface ISearchItems {
    id:string,
    title:string,
    text:string,
}