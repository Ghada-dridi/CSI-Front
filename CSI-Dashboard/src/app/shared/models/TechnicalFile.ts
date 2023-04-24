import { Education } from './Education';
import { Certification } from './Certification';
import { Language } from './Language';
import { Experience } from './Experience';
import { Skills } from './Skills';
export interface TechnicalFile{
    id ?:number;
    reference?: string;
    description?: string;
    title?: string;
    objective?: string;
    driverLicense?: string;
    nationality?: Nationality;
    skills?: Skills[];
    experiences?: Experience[];
    languages ?: Language[];
    certifications?: Certification[];
    education?: Education[];
}

export enum Nationality{
    
}