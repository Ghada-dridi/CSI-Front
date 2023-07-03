import { contract } from './contract';
export class Endorsement {
    id?: number;
    title ?:string;
    address ?:string;
    endorsementDate ?:Date;
    object?:string;
    note?:string;
    contractNum?:number;
    contract?:contract
}