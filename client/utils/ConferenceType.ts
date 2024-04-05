import {IGroupConference, ILiftGroupConference} from "@/types/Conference";

export function StringConferenceType<T>(type:T):string {
    if(type === 'SEMINAR')
        return 'Семінар'
    else if(type === 'COMPETITION')
        return 'Конкурси'
    else if(type === 'CONFERENCT')
        return 'Конференція'
    return String(type)
}


export function isIGroupConference(value:any):value is IGroupConference {
    return Object.keys('month').includes(value);
}

export function LiftGroupConference(groupConferences:IGroupConference[]):ILiftGroupConference[] {
    const result: ILiftGroupConference[] = [];

     groupConferences.forEach(oneMonthConference => {
        oneMonthConference.items.forEach((item) => {
            const newItem = { ...item, month: oneMonthConference.month };
            result.push(newItem);
        });
    });

    return result;
}