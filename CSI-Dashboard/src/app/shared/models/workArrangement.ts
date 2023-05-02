import { Benefit } from "./Benefit"

export interface workArrangement{
    id?: number
    dailyWage?: number
    workingDaysNumber?: number
    workModel?: WorkModel
    benefit: Benefit
    benefitId: number
}

export enum WorkModel {
    REMOTE="REMOTE",
    ON_SITE="ON_SITE",
    HYBRID="HYBRID"
}