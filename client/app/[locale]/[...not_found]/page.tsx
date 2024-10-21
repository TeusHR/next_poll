import {notFound} from "next/navigation";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Сторінка не знайдена",
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false
        }
    }
}
const NotFoundCatchAll = () => {
    return notFound()
}

export default NotFoundCatchAll;