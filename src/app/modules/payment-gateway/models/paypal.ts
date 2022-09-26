export interface item {
    name: string,
    quantity: string,
    unitAmount: unitAmount,
    category: string,
    description: string

}

export interface unitAmount {
    currency_code: string,
    value: string
}