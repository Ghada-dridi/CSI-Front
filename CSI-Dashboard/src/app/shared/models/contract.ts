import { Resource } from "./Resource";
import { article } from "./article";

export class contract {
    id?: number;
    contractTitle?: ContractTitle;
    contractPlace?: Date;
    contractDate?: Date;
    startDate?: Date;
    endDate?: Date;
    entrepriseSignature?: string;
    resource?: Resource;
    articles?: article[];
    resourceId?: number;
    contractStatus?:ContractStatus;
    contractIntroduction?:string;
}


export enum ContractStatus{
  STILL_PENDING="STILL_PENDING",
  SENT="SENT",
  REFUSED="REFUSED",
  ACCEPTED="ACCEPTED"

}
export enum ContractTitle {
  PERMANENT_EMPLOYMENT_CONTRACT="PERMANENT_EMPLOYMENT_CONTRACT",
  FIXED_TERM_EMPLOYMENT_CONTRACT="FIXED_TERM_EMPLOYMENT_CONTRACT",
  PROFESSIONALIZATION_CONTRACT="PROFESSIONALIZATION_CONTRACT",
  TEMPORARY_WORK_CONTRACT="TEMPORARY_WORK_CONTRACT",
  PART_TIME_WORK_CONTRACT="PART_TIME_WORK_CONTRACT",
  SEASONAL_WORK_CONTRACT="SEASONAL_WORK_CONTRACT",
  STUDY_CONTRACT="STUDY_CONTRACT"
}
 
 