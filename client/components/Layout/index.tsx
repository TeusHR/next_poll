import React, {ReactNode} from 'react'
import Header from "@/components/Header";

type Props = {
    children: ReactNode
}

const Layout = ({children}:Props) => {


    return (
        <div className="bg-white w-full text-primary">
            <Header/>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout;