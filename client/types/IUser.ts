export interface IUser {
    id: number
    name: string
    email: string
}

export interface IUserTokens {
    refreshToken: string
    accessToken: string
    expiresIn: string
}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserRegister extends IUserLogin {
    name: string
}
