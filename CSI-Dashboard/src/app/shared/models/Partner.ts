import { address } from "./address";
import { contact } from "./contact";
import { req } from "./req";

export interface Partner {
    
    id ?:number;
    name?: string;
    ref?: number;
    legalIdentifier: number
    tvaIdentifier: number
    nafCode: number
    staffNumber? : number;
    parentCompany?: string;
    ceoName ?: string;
    phoneNumber? :number;
    mobilePhoneNumber ?: number;
    postCode?: number ;
    city? : string;
    description ?: string ;
    logo ?: string ;
    email ?: string;
    webSite ?: string
    foundedSince ?: string;
    activityStartDate? : string;
    activityEndDate? : string;
    partnerShipDate ?: string;
    companyStatus ?:CompanyStatus,
    refPhoneNumber?: number,
    country? :string,
    workField ?:WorkField,
    legalStatus?:LegalStatus,
    provenance?:Provenance,
    insurancePolicy?: string,
    insuranceCompany?: string,
    comment?: string,
    controlType?: string,
    inProgressAuthorized?: number,
    capital?: number,
    paymentCondition?: string,
    paymentMode?: string,
    addresses?: address[],
    contacts?: contact[],
    currency?: Currency,
    requirements?:req[]
  }

  export interface Country {
    shortName: string;
    name: string;
  }

  export enum CompanyStatus {

    PROSPECT ="PROSPECT"
     , SUPPLIER = "SUPPLIER"
      , CLIENT ="CLIENT"
       , ARCHIVED = "ARCHIVED"
  }



  export enum WorkField {

    IT = "IT",
    INDUSTRY= "INDUSTRY", 
    SALES="SALES",
     AGRICULTURE="AGRICULTURE",
      BANKING="BANKING",
       E_COM="E_COM", 
       ASSURANCE="ASSURANCE",
        FINANCE="FINANCE"
  }

  export enum LegalStatus {
    SARL = "SARL",
    SA = "SA"
  }

  export enum Provenance {
    JOBS_FORUM="JOBS_FORUM" ,
    RECOMMENDATION="RECOMMENDATION" ,
    COOPERATION ="COOPERATION",
    OTHER="OTHER"
  }

  export enum PaymentMode {
    CASH="CASH" ,
    CREDIT="CREDIT" ,
    DEBIT_CARD ="DEBIT_CARD",
    BANK_TRANSFER="BANK_TRANSFER",
    PAYPAL="PAYPAL",
    CHECK="CHECK"
  }

  export enum PaymentCondition {
    IMMEDIATE="IMMEDIATE" ,
    ADVANCED="ADVANCED" ,
    ORDER ="ORDER",
    ON_DELIVERY="ON_DELIVERY",
    _30_DAYS="_30_DAYS",
    _60_DAYS="_60_DAYS",
    _90_DAYS="_90_DAYS",
    IN_TERM="IN_TERM",
    ADVANCE="ADVANCE",
    AT_REQUEST="AT_REQUEST"
  }

  export enum Currency {
    AFN ="AFN",
    MGA="MGA",
    THB="THB",
    PAB="PAB",
    ETB="ETB",
    VEF="VEF",
    BOB="BOB",
    GHS="GHS",
    CRC="CRC",
    SVC="SVC",
    NIO="NIO",
    GMD="GMD",
    MKD="MKD",
    DZD="DZD",
    BHD="BHD",
    IQD="IQD",
    JOD="JOD",
    KWD="KWD",
    LYD="LYD",
    RSD="RSD",
    TND="TND",
    MAD="MAD",
    AED="AED",
    AUD="AUD",
    BSD="BSD",
    BBD="BBD",
    BZD="BZD",
    BMD="BMD",
    BND="BND",
    CAD="CAD",
    XCD="XCD",
    KYD="KYD",
    HKD="HKD",
    FJD="FJD",
    GYD="GYD",
    JMD="JMD",
    LRD="LRD",
    NAD="NAD",
    NZD="NZD",
    SGD="SGD",
    SRD="SRD",
    TWD="TWD",
    TTD="TTD",
    USD="USD",
    VND="VND",
    AMD="AMD",
    STD="STD",
    NKR="NKR",
    CVE="CVE",
    EUR="EUR",
    HUF="HUF",
    BIF="BIF",
    XAF="XAF",
    XOF="XOF",
    XPF="XPF",
    KMF="KMF",
    CDF="CDF",
    DJF="DJF",
    GNF="GNF",
    RWF="RWF",
    CHF="CHF",
    HTG="HTG",
    PYG="PYG",
    UAH="UAH",
    PGK="PGK",
    LAK="LAK",
    CZK="CZK",
    HRK="HRK",
    MWK="MWK",
    ZMW="ZMW",
    MMK="MMK",
    GEL="GEL"
  }


