'use client';
import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {$api} from "@/api/interceptors";

const useAxiosAuth = (isRequired = true) => {
    const {data: session} = useSession()


    useEffect(() => {
        const requestIntercept = $api.interceptors.request.use((config) => {
            if (!config.headers['Authorization'] && session?.backendTokens.accessToken)
                config.headers['Authorization'] = `Bearer ${session.backendTokens.accessToken}`

            return config
        }, (error) => Promise.reject(error))

        let responseIntercept: number | null = null
        if (isRequired) {
            responseIntercept = $api.interceptors.response.use(
                (response) => response,
                async (error) => {
                    const prevRequest = error.config
                    if (error.response.status === 401 && !prevRequest.sent && session?.backendTokens.refreshToken) {
                        prevRequest.sent = true

                        const {data} = await $api.post('/auth/refresh', {}, {
                            headers: {
                                Authorization: `Refresh ${session.backendTokens.refreshToken}`
                            }
                        })

                        if (session) session.backendTokens = data

                        prevRequest.headers['Authorization'] = `Bearer ${session.backendTokens.accessToken}`
                        return $api(prevRequest)
                    }

                    return Promise.reject(error)
                }
            )
        }

        return () => {
            $api.interceptors.request.eject(requestIntercept)
            if (responseIntercept)
                $api.interceptors.response.eject(responseIntercept)
        }
    }, [isRequired, session])

    return $api
}

export default useAxiosAuth
