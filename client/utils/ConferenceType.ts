import {IConferenceTypeSelect, IGroupConference, ILiftGroupConference, IMonth} from "@/types/Conference";

export function StringConferenceType<T>(type: T): string {
    if (type === 'SEMINAR')
        return 'Семінар'
    else if (type === 'COMPETITION')
        return 'Конкурси'
    else if (type === 'CONFERENCT')
        return 'Конференція'
    return String(type)
}

export const typeConference:IConferenceTypeSelect[] = [
    {
        label: 'Конференція',
        value: 'CONFERENCT',
    },
    {
        label: 'Семінар',
        value: 'SEMINAR',
    },
    {
        label: 'Конкурс',
        value: 'COMPETITION',
    }
]

export const monthsArray: IMonth[] = [
    {
        label: 'Січень',
        value: 'СІЧЕНЬ',
    },
    {
        label: 'Лютий',
        value: 'ЛЮТИЙ',
    },
    {
        label: 'Березень',
        value: 'БЕРЕЗЕНЬ',
    },
    {
        label: 'Квітень',
        value: 'КВІТЕНЬ',
    },
    {
        label: 'Травень',
        value: 'ТРАВЕНЬ',
    },
    {
        label: 'Червень',
        value: 'ЧЕРВЕНЬ',
    },
    {
        label: 'Липень',
        value: 'ЛИПЕНЬ',
    },
    {
        label: 'Серпень',
        value: 'СЕРПЕНЬ',
    },
    {
        label: 'Вересень',
        value: 'ВЕРЕСЕНЬ',
    },
    {
        label: 'Жовтень',
        value: 'ЖОВТЕНЬ',
    },
    {
        label: 'Листопад',
        value: 'ЛИСТОПАД',
    },
    {
        label: 'Грудень',
        value: 'ГРУДЕНЬ',
    }
];

export function isIGroupConference(value: any): value is IGroupConference {
    return Object.keys('month').includes(value);
}

export function LiftGroupConference(groupConferences: IGroupConference[]): ILiftGroupConference[] {
    const result: ILiftGroupConference[] = [];

    groupConferences.forEach(oneMonthConference => {
        oneMonthConference.items.forEach((item) => {
            const newItem = {...item, month: oneMonthConference.month};
            result.push(newItem);
        });
    });

    return result;
}