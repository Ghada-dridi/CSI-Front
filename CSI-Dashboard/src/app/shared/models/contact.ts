import { Partner } from "./Partner";

export interface contact {
    contactId :number;
    firstName :string;
    lastName: string;
    fullName: string;
    function: string;
    emailOne:string;
    emailTwo:string;
    comment:string;
    phoneNumberOne:number ;
    phoneNumberTwo:number ;
    partner ?: Partner 
    partnerNum ?:number
    privilege ?: Privilege
    civility: Civility
    service: Service
}

export enum Privilege {

    HIGH ="HIGH"
    , MEDIUM ="MEDIUM",
     LOW="LOW"
}

export enum Civility {

    MRS="MRS" ,
     MS="MS" ,
      MR="MR"
}

export enum Service {

    RH="RH" ,
     R_AND_D ="R_AND_D", 
     FINANCE="FINANCE" , 
     DEVELOPEMENT="DEVELOPEMENT"
}