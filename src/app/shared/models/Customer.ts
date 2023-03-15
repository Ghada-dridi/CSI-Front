export interface Customer {

    id :number ,
    name : string,
    email : string,
    phone :number
    phonep:number
    role: UserRole;
    country :Country
    states :string

}

export enum UserRole {
    ADMIN = 'tva',
    USER = 'lmp',
  }

 export interface Country {
    shortName: string;
    name: string;
  }