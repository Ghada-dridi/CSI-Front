import { Resource } from "./Resource";
import { article } from "./article";
import { articleClient } from "./articleClient";

export class contract {
    id?: number;
    contractTitle?: ContractTitle;
    contractPlace?: Date;
    contractDate?: Date;
    startDate?: Date;
    endDate?: Date;
    entrepriseSignature?: string;
    resource?: Resource;
    articles?: articleClient[];
    reference?:string;
    employeeNum?: number;
    contractStatus?:ContractStatus;
    contractEmployee?:string;
    contractEmployer?:string;
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
 
 