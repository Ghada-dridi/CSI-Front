import { AdministrativeData } from "./AdministrativeData";
import { AssOfferCandidate } from "./AssOfferCandidate";

export interface Evaluation{
    id ?:number;
    globalAppreciation?: number;
    administrativeData?: AdministrativeData;
    offerCandidates?:AssOfferCandidate[];
}

