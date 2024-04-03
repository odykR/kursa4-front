import {JwtDecodeOptions} from "jwt-decode";
type roles = "admin" | "user"
export interface LoginJWTResponse extends JwtDecodeOptions {
    id: string,
    role: roles
}

export interface initStateLogin {
    login: string,
    password: string,
}

export interface loginRefresh {
    refreshToken: string
}