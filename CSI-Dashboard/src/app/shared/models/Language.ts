export interface Language{
    Id ?:number;
    languageLevel?:LanguageLevel;
    additionalInformation?:string;
    language ?:Languages;
}

export enum Languages{
        ARABIC = "Arabic",
        AZERBAIJANI = "Azerbaijani",
        BENGALI = "Bengali",
        CHINESE_CANTONESE = "Cantonese",
        CHINESE_MANDARIN = "Mandarin Chinese",
        ENGLISH = "English",
        FRENCH = "French",
        GERMAN = "German",
        GUJARATI = "Gujarati",
        HINDI = "Hindi",
        INDONESIAN = "Indonesian",
        ITALIAN = "Italian",
        JAPANESE = "Japanese",
        JAVANESE = "Javanese",
        KANNADA = "Kannada",
        KOREAN = "Korean",
        MALAY = "Malay",
        MARATHI = "Marathi",
        PERSIAN = "Persian",
        POLISH = "Polish",
        PORTUGUESE = "Portuguese",
        PUNJABI = "Punjabi",
        RUSSIAN = "Russian",
        SPANISH = "Spanish",
        TAMIL = "Tamil",
        TELUGU = "Telugu",
        TURKISH = "Turkish",
        URDU = "Urdu",
        VIETNAMESE = "Vietnamese"
      }


export enum LanguageLevel{
    BEGINNER_A1="Niveau Débutant A1",
    BEGINNER="Niveau Débutant",
    ELEMENTARY_A2="Niveau Élémentaire A2",
    BASIC="Niveau Basique",
    INTERMEDIATE_B1="Niveau Intermédiaire B1",
    INTERMEDIATE="Niveau Intermédiaire",
    UPPER_INTERMEDIATE_B2="Niveau Opérationnel de base B2",
    PROFESSIONAL="Niveau Professionnel",
    ADVANCED_C1="Niveau Expérimenté C1",
    FLUENT="Courant",
    PROFICIENT_C2="Niveau Expérimenté C2",
    NATIVE_LANGUAGE="",
    BILINGUAL="Bilangue"
}