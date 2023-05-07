import { Partner } from "./Partner"

export interface BankAccount{
    id?: number
    bankName?: string
    rib?: number
    partnerNum?: number,
    partner ?: Partner
}