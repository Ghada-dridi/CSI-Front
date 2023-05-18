import { ExperienceLevel } from "./AssOfferCandidate";
import { Question } from "./Question";

export interface QuestionCategory{
    Id ?:number;
    name ?: string;
    questions ?:Question[] ;
    level ?: ExperienceLevel;
}