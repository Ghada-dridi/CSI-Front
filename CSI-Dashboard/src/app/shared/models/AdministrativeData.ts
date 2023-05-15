export interface AdministrativeData{
    id?: number;
    contractType ?:ContractType;
    currentSalary ?:number;
    expectedSalary ?:number;
    availability ?:AvailabilityEnum;
    availabilityDate ?:String;
}

export enum ContractType{ END_OF_THE_YEAR_PROJECT,
    SUMMER_INTERNSHIP="SUMMER_INTERNSHIP",
    END_OF_STUDY_PROJECT="END_OF_STUDY_PROJECT",
    INVITATION="INVITATION",
    DEVELOPMENT_INTERNSHIP="DEVELOPMENT_INTERNSHIP",
    CDI="CDI",
    CDD="CDD",
    CIVP="CIVP",
    CTT="CTT",
    FREELANCE="FREELANCE",
    ALTERNATION="ALTERNATION",
    SUB_CONTRACTING="SUB_CONTRACTING",
    }


export enum AvailabilityEnum{
    FROM="FROM",
    IMMEDIATELY="IMMEDIATELY",
    ASAP="ASAP",
    MONTH_MAXIMUM="MONTH_MAXIMUM",
    THREE_MONTHS_MAXIMUM="THREE_MONTHS_MAXIMUM"
}