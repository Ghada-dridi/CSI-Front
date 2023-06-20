import { Partner } from "./Partner";

export interface req {

    id ?:number;
    title?: string;
    description? : number;
    criteria?: string;
    requirementType :RequirementType;
    requirementStatus ?:RequirementStatus,
    workField ?:WorkField,
    availability:Availability
    plannedBudget?: number,
    plannedIncome?: number,
    startDate? :string ,
    expectedEndDate? :string ,
    responseDate? :string ,
    totalCandidateNumber : number,
    company : string,
    partnerNum :number ,
    partnerId :number,
    comment: string,
    partner : Partner
  
}

export enum Availability {

    FROM="FROM",
     IMMEDIATELY="IMMEDIATELY",
      ASAP="ASAP",
       MONTH_MAXIMUM="MONTH_MAXIMUM",
        THREE_MONTHS_MINIMUM="THREE_MONTHS_MINIMUM"
}

export enum RequirementType {

    MANAGEMENT ="MANAGEMENT",
     RECRUITMENT ="RECRUITMENT",
      INTERN_PROJECT="INTERN_PROJECT"
}

export enum RequirementStatus {

    POSITIONED ="POSITIONED",
    WON="WON" , 
    IN_PROGRESS="IN_PROGRESS",
    LOST="LOST" ,
    ABANDONED ="ABANDONED"
}

export enum WorkField {
    IT = "IT",
    INDUSTRY= "INDUSTRY", 
    SALES="SALES",
     AGRICULTURE="AGRICULTURE",
      BANKING="BANKING",
       E_COM="E_COM", 
       ASSURANCE="ASSURANCE",
        FINANCE="FINANCE"
    
}