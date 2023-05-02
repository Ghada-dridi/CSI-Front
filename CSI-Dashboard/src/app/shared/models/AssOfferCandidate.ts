export interface AssOfferCandidate{
    id ?:number;
    applicationDate ?:number;
    experienceLevel ?: ExperienceLevel
    
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