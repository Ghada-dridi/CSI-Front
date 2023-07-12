export class Quotation {
    id?: number
    ref?: string
    orderStatus?: string
    customerAgreement?: boolean
    orderDate?: string
    billingType?: string
    tva?: number
    paymentCondition?: string
    paymentMode?: string
    otherPaymentMode?: string
    rib?: number
    orderRevenue?: number
    reqId: number
    orderId: number
}

export enum OrderStatus{
    IN_PROGRESS = "IN_PROGRESS",
    VALIDATED = "VALIDATED",
    REFUSED = "REFUSED"
}

