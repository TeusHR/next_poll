export function StringConferenceType<T>(type:T):string {
    if(type === 'SEMINAR')
        return 'Семінар'
    else if(type === 'COMPETITION')
        return 'Конкурси'
    else if(type === 'CONFERENCT')
        return 'Конференція'
    return String(type)
}