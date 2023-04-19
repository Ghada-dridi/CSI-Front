import { Partner } from "./Partner";

export interface address {
    id ?: number ,
    addressTitle ?: string ,
    street ?: string, 
    partnerNum?: number,
    partner ?: Partner
}