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
    averageDayCost?: number
    currency?: Currency
    candidateNumber?: number
    budgetingType?: BudgetingType
    requirementType? :RequirementType
    paymentType? :PaymentType;
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

export enum PaymentType {
    FOR_SETTLEMENT = "FOR_SETTLEMENT",
    IN_PACKAGE = "IN_PACKAGE"
}

export enum RequirementType {
    RESOURCE = "RESOURCE",
    PROJECT = "PROJECT"
}

export enum BudgetingType {
    PROPOSED_BUDGET = "PROPOSED_BUDGET",
    ESTIMATED_BUDGET = "ESTIMATED_BUDGET"
}

export enum RequirementStatus {
    OPEN = "OPEN",
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