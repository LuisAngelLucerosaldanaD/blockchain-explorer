export interface ChangePasswordRequest {
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;
}

export interface ChangePasswordResponse {
    error: boolean;
    data: string;
    code: number;
    type: number;
    msg: string;
}