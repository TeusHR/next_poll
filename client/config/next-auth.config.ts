import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {$api} from "@/api/interceptors";
import {JWT} from "next-auth/jwt";
import {LOCAL_API_URL} from "@/config/constants";
import {IUser} from "@/types/IUser";

async function refreshToken(token: JWT): Promise<JWT> {
    try {
        const res = await $api.post('/auth/refresh', {}, {
            headers: {
                Authorization: `Refresh ${token.backendTokens.refreshToken}`
            },
            baseURL: LOCAL_API_URL
        })

        return {
            ...token,
            backendTokens: res.data
        }
    } catch (e) {
        return {...token, error: "invalid-refresh"}
    }
}

async function updateMe(token: JWT) {
    try {
        const res = await $api.get<IUser>('/user', {
            headers: {
                Authorization: `Bearer ${token.backendTokens.accessToken}`
            },
            baseURL: LOCAL_API_URL
        })

        return {
            ...token,
            user: res.data
        }
    } catch (e) {
        return token
    }
}

export const nextAuthConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: "email",
                    placeholder: "example@email.com"
                },
                password: {
                    label: 'Пароль',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                // @ts-ignore
                if (credentials.profile) {
                    const {data} = await $api.post('/auth/refresh/profile', {}, {
                        headers: {
                    // @ts-ignore
                            Authorization: `Refresh ${credentials.profile}`,
                            baseURL: LOCAL_API_URL
                        }
                    })
                    return data
                }
                if (!credentials?.email || !credentials?.password) return null

                try {
                    const {email, password} = credentials
                    const {data} = await $api.post('/auth/login', {
                        email,
                        password
                    }, {
                        baseURL: LOCAL_API_URL
                    })
                    return data
                } catch (e) {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user, trigger}) {
            if (trigger === 'update') return await updateMe(token)

            if (user) return {...token, ...user}

            if (new Date().getTime() < token.backendTokens.expiresIn) return token

            return await refreshToken(token)
        },
        async session({token, session}) {
            session.user = token.user
            session.backendTokens = token.backendTokens
            if (token.error)
                session.error = token.error

            return session
        },
        redirect({url}) {
            return Promise.resolve(url)
        }
    },
    pages: {
        signIn: '/login',
    }
}
