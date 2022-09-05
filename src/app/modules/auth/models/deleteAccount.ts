export interface DeleteAccount {
    password: string,
    confirmPassword: string
}
export interface DeleteAccountResponse {
    error: boolean;
    data: string;
    code: number;
    type: number;
    msg: string;
}