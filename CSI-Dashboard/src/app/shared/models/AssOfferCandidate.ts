export interface AssOfferCandidate{
    id ?:number;
    employeeNum ?:number;
    offerNum ?:number;
    applicationDate ?:number;
    expeienceLevel ?: ExperienceLevel
    
}

export enum ExperienceLevel{
    JUNIOR="Junior",
    MID_LEVEL="Confirmé",
    SENIOR="Senior",
    LEAD="Lead",
    ARCHITECT="Architecte",
    APPRENTICE="Apprentice",
    EXPERT="Expert"
}