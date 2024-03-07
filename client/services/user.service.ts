import {IUser, IUserRegister} from "@/types/IUser";
import {$api} from "@/api/interceptors";
import {AxiosInstance} from "axios";
import {getAuthUrl, getUserUrl} from "@/config/url.config";

export const UserService = {
    async register(user: IUserRegister) {
        const {data, status} = await $api.post<IUser>(getAuthUrl('/register'), {...user})
        return {data, status}
    },
    async getMe(axios: AxiosInstance) {
        const {data} = await axios.get<IUser>(getUserUrl(''))
        return data
    }
}
