export interface ItemOrder {
    amount: Amount,
    items: [Item]
}

export interface UnitAmount {
    currency_code: string,
    value: string
}

export interface OrderBuyAcais {
    quantity: number,
    price: number,
    unit_price: number
}

export interface Amount {
    currency_code: string,
    value: string
}

export interface Item {
    name: string,
    quantity: string,
    unit_amount: UnitAmount,
    category?: string,
    description?:string,

}

export interface PaymentData {
    paypal_response: any,
    status: string,
    amount: number,
    acais_quantity: number,
    user_data: any
}

export interface PaymentDataResponse {
    data: any,
    code: number,
    type: string,
    msg: string,
    error: boolean
}
