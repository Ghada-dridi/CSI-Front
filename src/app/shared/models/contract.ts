import { Employee } from "./Employee";
import { article } from "./article";

export class contract {
    id?: number;
    contractTitle?: string;
    contractPlace?: Date;
    contractDate?: Date;
    startDate?: Date;
    endDate?: Date;
    entrepriseSignature?: string;
    //resource?: Resource;
    articles?: article[];
    resourceId?: number;
    contractStatus?:ContractStatus;
    contractIntroduction?:string;
}


export enum ContractStatus{
  STILL_PENDING,
  SENT,
  REFUSED,
  ACCEPTED

}
 
 