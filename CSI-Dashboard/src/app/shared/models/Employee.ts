import { TechnicalFile } from "./TechnicalFile";
export class Employee {
    id?: number;
     lastName ?:string;
     firstName?:string;
     birthDate ?:string;
     emailOne ?:string;
     emailTwo?:string;
     phoneNumberOne ?: number;
     phoneNumberTwo ?: number;
     address?:string;
     postCode ?: number;
     city ?: string;
     recommendationMark ?: number;
     experience ?: number;
     experienceDetails ?:string;
     civility?: Civility;
     title?: Title;
     employeeStatus?:EmployeeStatus;
     country?:string;
     maritalSituation ?:MaritalSituation;
     technicalfile ?:TechnicalFile ;

}
export interface Country {
    shortName?: string;
    name?: string;
  }

export enum Civility{
    MRS="MRS",
    MS="MS",
    MR="MR"
}
export enum Title{
    FRONT_END_DEVELOPER ="FRONT_END_DEVELOPER",
    BACK_END_DEVELOPER="BACK_END_DEVELOPER",
    FULLSTACK_DEVELOPER="FULLSTACK_DEVELOPER",
    CRM="CRM",
     HUMAN_RESOURCE_MANAGER="HUMAN_RESOURCE_MANAGER",
    HUMAN_RESOURCE="HUMAN_RESOURCE",
    PROJECT_MANAGER="PROJECT_MANAGER",
    TECH_LEAD="TECH_LEAD",
    UI_UX_DESIGNER="UI_UX_DESIGNER",
    QA_ENGINEER="QA_ENGINEER",
    DEVOPS_ENGINEER="DEVOPS_ENGINEER",
    WEB_DEVELOPER="WEB_DEVELOPER",
    OFFICE_MANAGER="OFFICE_MANAGER",
     ACCOUNTANT="ACCOUNTANT",
     SALES_REPRESENTATIVE="SALES_REPRESENTATIVE",
     CUSTOMER_SUPPORT_SPECIALIST="CUSTOMER_SUPPORT_SPECIALIST",
      MARKETING_COORDINATOR="MARKETING_COORDINATOR"
}
export enum EmployeeStatus{
    IN_PROCESS="IN_PROCESS",
    IN_PROGRESS="IN_PROGRESS",
    PRE_QUALIFIED="PRE_QUALIFIED",
    TOP_PROFILES="TOP_PROFILES",
    CONVERTED_TO_RESOURCE=" CONVERTED_TO_RESOURCE",
    DO_NOT_CONTACT=" DO_NOT_CONTACT",
    ARCHIVE="ARCHIVE"
}

export interface Country{
    shortName?: string;
    name?: string;
}
export enum MaritalSituation {
    SINGLE="SINGLE",
    MARRIED="MARRIED",
    DIVORCED="DIVORCED",
    WIDOWED="WIDOWED",
    COMPLICATED="COMPLICATED"
}
export enum Provenance {
    LINKEDIN,
    SPONTANEOUS_APPLICATION,
    JOBS_FORUM,
    RECOMMENDATION,
    JOBBOARD,OTHER
}