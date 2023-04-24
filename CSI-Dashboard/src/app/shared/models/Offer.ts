import { AssOfferCandidate } from "./AssOfferCandidate";

export interface Offer{
    id ?:number;
    title ?:string;
    reference ?:string;
    candidature ?: AssOfferCandidate[]
}