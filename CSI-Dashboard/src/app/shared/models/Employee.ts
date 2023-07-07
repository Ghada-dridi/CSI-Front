
import { TechnicalFile } from "./TechnicalFile";
export class Employee {
    
    id?: number;
    lastName ?:string;
    firstName?:string;
     birthDate ?:string;
     emailOne ?:string;
     emailTwo ?:string;
     phoneNumberOne ?: number;
     phoneNumberTwo ?: number;
    address?:string;
    experience ?: number;
     postCode ?: number;
     city ?: string;
     recommendationMark ?: number;
     resourceType ?: ResourceType;
     departement?: Departement;
     experienceDetails ?:string;
     civility?: Civility;
     title?: Title;
     employeeStatus?:EmployeeStatus;
     country?:string;
     maritalSituation ?:MaritalSituation;
     technicalfile ?:TechnicalFile ;
    recommendationType ?: number;
    employeeFirstName ?:string;
    employeeLastName ?:string;
    employeeSerialNumber ?:string;
    provenance ?: Provenance;
    serialNumber?:string;
    socialSecurityNumber?:string;
    bankAccountNumber?:string;
    productivity?:number;
    photo?:string;
    workLocation?:WorkLocation;
    locationName?:string;
    recruitmentDate?:string;
    nationalIdentity?:string;
}

export enum Departement{
    DEVELOPPEMENT = 'DEVELOPPEMENT' ,
    QUALITE ='QUALITE',
    ARCHITECTURE='ARCHITECTURE' ,
    DESIGN = 'DESIGN' ,
    TESTS = 'TESTS',
    RESSOURCES_HUMAINES ='RESSOURCES_HUMAINES' ,
    MARKETING ='MARKETING',
    VENTE ='VENTE',
    COMPTABILITE = 'COMPTABILITE',
    FINANCES ='FINANCES',
    JURIDIQUE ='JURIDIQUE' ,
    SUPPORT = 'SUPPORT'
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
    LINKEDIN="LINKEDIN",
    SPONTANEOUS_APPLICATION="SPONTANEOUS_APPLICATION",
    JOBS_FORUM="JOBS_FORUM",
    RECOMMENDATION="RECOMMENDATION",
    JOBBOARD="JOBBOARD",
    OTHER="OTHER"
}

export enum WorkLocation{
    MAIN="MAIN",
     OTHER_LOCATION="OTHER_LOCATION"
}

export enum ResourceType{
    EXTERNAL_RESOURCE="EXTERNAL_RESOURCE", 
    BACKOFFICE_RESOURCE="BACKOFFICE_RESOURCE", 
    INTERNAL_RESOURCE="INTERNAL_RESOURCE"
}