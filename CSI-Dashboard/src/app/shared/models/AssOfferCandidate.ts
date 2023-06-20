export interface AssOfferCandidate{
    id ?:number;
    employeeNum ?:number;
    offerNum ?:number;
    applicationDate ?:string;
    expeienceLevel ?: ExperienceLevel
    
}

export enum ExperienceLevel{
    INTERN="INTERN",
    JUNIOR="JUNIOR",
    MID_LEVEL="MID_LEVEL",
    SENIOR="SENIOR",
    EXPERT="EXPERT"
}