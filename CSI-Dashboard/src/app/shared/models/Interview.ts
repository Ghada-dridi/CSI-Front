import { InterviewType } from "./Question";

export interface Interview{
    id ?:number;
    interviewDate ?:string;
    comment ?:string;
    globalMark ?:string;
    interviewType ?:InterviewType;
    duration ?:string;
    interviewMode ?:InterviewMode;


}

export enum InterviewMode{
    REMOTE="Remote",
    ON_SITE="On site"

}

