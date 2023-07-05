import { Currency, Partner } from "./Partner";

export interface req {

    id ?:number;
    //
    
    description? : number;
    criteria?: string;
    plannedBudget?: number
    plannedIncome?: number
    workField ?:WorkField
    totalCandidateNumber : number
    company : string
    //
    title?: string;
    budgetPerDay?: number
    currency?: Currency
    candidateNumber?: number
    requirementType? :RequirementType;
    requirementStatus ?:RequirementStatus,
    expectedEndDate ?:string
    closureDate ?:string
    availability ?:Availability
    startDate? :string 
    responseDate? :string
    creationDate? :string
    partnerId :number
    comment: string
}

export enum Availability {

    FROM="FROM",
     IMMEDIATELY="IMMEDIATELY",
      ASAP="ASAP"
}

export enum RequirementType {
    FOR_SETTLEMENT = "FOR_SETTLEMENT",
    IN_PACKAGE = "IN_PACKAGE"
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