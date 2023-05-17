export class exceptionalFee {
    Id?: number;
    feeType?:FeeType;
    shortDescription?:string;
    amount?:number;
   currency?: Currency;
   name?: string;
   contractId?: number;
}


export class benefit {
    id?: number;
    shortDescription?: string;
    description ?:string;
    contractBenifitType?:ContractBenifitType;
    contractId?: number;
}


export enum ContractBenifitType {
    COMPUTER,
    PHONE,
    OFFICE_SUPPLIES,
    FOURNITURE,OTHER
    
}


export enum FeeType {
    RESTAURANT,
    TRAVEL,
    MILEAGE,
    PHONE,
    HOTEL,
    OTHER
  }


  export enum Currency {
    AED,AFN,ALL,AMD,ANG,AOA,ARS,AUD,AWG,AZN,BAM,BBD, BDT,BGN,BHD,BIF,BMD,BND,BOB, BRL,BSD,BTN,BWP,BYN,BZD, CAD, CDF,CHF, CLP,CNY,COP,CRC,CUC,CUP,
    CVE,CZK, DJF,DKK, DOP,DZD,EGP,ERN,ETB,EUR,FJD,FKP, GBP,GEL,GGP,GHS,GIP,GMD, GNF,GTQ,GYD,HKD,HNL,HRK, HTG, HUF,IDR, ILS,IMP, INR,  IQD, IRR, ISK,JEP,  
    JMD,JOD, JPY, KES,  KGS,  KHR, KMF, KPW, KRW, KWD, KYD,KZT,LAK,LBP,LKR, LRD,LSL,LYD, MAD,MDL,MGA, MKD, MMK,SSP,STD,SVC,SYP,SZL,THB,
    TJS,TMT,TND,TOP,TRY,TTD,TWD, TZS,UAH,UGX, USD, UYU, UZS,
    VEF,VND,VUV,WST,XAF,XCD, XDR, XOF, XPF, YER, ZAR, ZMW,ZWD
    
      }
    