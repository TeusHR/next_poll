import React, {ReactNode} from 'react'
import {Button} from "@nextui-org/button";
import Link from "next/link";

type Props = {
    link:string,
    text?:string,
    children?:ReactNode,
    style?:string
}

const ButtonDetails = ({link, style, text = 'Детальніше', children}:Props) => {


    return (
        <Link href={link}>
            <Button disableRipple className={`${style ? style : 'cursor-pointer border border-[#111318] font-medium flex flex-row gap-4 py-4 px-8 max-sm:py-3 max-sm:px-6 text-base'}`}>
                {text}
                {children}
            </Button>
        </Link>
    )
}

export default ButtonDetails;