import React, {ReactNode} from 'react'
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
            <Footer/>
        </div>
    )
}

export default Layout;