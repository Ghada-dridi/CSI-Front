import { Partner } from "./Partner"

export interface BankAccount{
    id?: number
    bankName?: string
    rib?: number,
    bic?: number,
    iban?: number,
    bankAddress?: string
    partnerNum?: number,
    partner ?: Partner
}