export interface RecoveryPassword {
    Nickname : string;
    Email: string;
}
export interface RecoveryPasswordResponse {
    error: boolean;
    data: string;
    code: number;
    type: number;
    msg: string;
}
export interface Code {
    code: string;
}
export interface DataChangePassword {
    oldPassword: string;
    password: string;
}
export interface DataPassword {
    password: string;
    passwordConfirm: string;
}
export interface ResetPasswordResponse {
    error: boolean;
    data: string;
    code: number;
    type: number;
    msg: string;
}