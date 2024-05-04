import {FC, PropsWithChildren, useEffect} from 'react';
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {toast} from "react-toastify";

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const router = useRouter();
    const {data} = useSession()

    useEffect(() => {
        if (data?.error) {
            router.push('/login')
            toast.error('Час авторизації минув, увійдіть в акаунт знову')
        }
    }, [data, router]);
    return children
};

export default AuthProvider;
