export interface Question{
      
    question ?:string;
    interviewType ?: InterviewType;

}


export enum InterviewType{
    BEHAVIORAL_INTERVIEW ="Entretien comportemental",
    TECHNICAL_INTERVIEW ="Entretien technique",
    CASE_STUDY_INTERVIEW ="Entretien d'étude de cas",
    HUMAN_RESOURCE_INTERVIEW ="Entretien ressources humaines",
    ONLINE_TEST="Entretien en ligne",
    ON_SITE_TEST ="Entretien présentiel",
    PANEL_INTERVIEW="Entretien avec un panel",
    GROUP_INTERVIEW="Entretien collectif",
    PHONE_INTERVIEW="Entretien téléphonique",
    IN_PERSON="Entretien individuel "


}