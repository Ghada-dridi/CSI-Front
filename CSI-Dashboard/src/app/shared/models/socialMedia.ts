import { Partner } from "./Partner";

export interface socialMedia {
    id ?: number ,
    name ?: SocialMediaName , 
    link ?: string ,
    partner ?: Partner } 

    export enum SocialMediaName {
        LINKEDIN = "LINKEDIN",
        INSTAGRAM = "INSTAGRAM" ,
        FACEBOOK = "FACEBOOK",
        WEBSITE = "WEBSITE"
    }

