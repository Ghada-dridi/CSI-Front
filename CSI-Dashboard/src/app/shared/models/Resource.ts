export interface Resource{
    id ?:number;
    serialNumber?: string;
    socialSecurityNumber?: string;
    bankAccountNumber?: string;
    photo?:string;
    leaveBalanceRest?: number;
    leaveBalance?: number;
    productivity?: number;
    nationalIdentity?: number;
    recruitementDate?: Date; 
}