import NextAuth from "next-auth";

declare module "next-auth" {
    import {IUserTokens} from "@/types/IUser";
    import {IUser} from "@/types/IUser";

    interface Session {
        user: IUser;
        backendTokens: IUserTokens;
        error?: string
    }
}

import {JWT} from "next-auth/jwt";

declare module "next-auth/jwt" {
    import {IUserTokens} from "@/types/IUser";
    import {IUser} from "@/types/IUser";
    interface JWT {
        user: IUser;
        backendTokens: IUserTokens;
        error?: string
    }
}
