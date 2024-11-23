import React, {ReactNode} from 'react';
import {Button} from '@nextui-org/react';
import { Link } from "@/routing/*";

type Props = {
    link: string,
    text?: string,
    children?: ReactNode,
    style?: string
    className?: string
}

const ButtonDetails = ({link, style, text = 'Детальніше', children, className}: Props) => {
    return (
        <Link href={link} className={className}>
            <Button disableRipple
                    className={`${style ? style : `cursor-pointer rounded-none h-auto bg-white border border-[#111318] font-medium flex flex-row gap-4 py-4 px-8 max-sm:py-3 max-sm:px-6 text-base`}`}>
                {text}
                {children}
            </Button>
        </Link>
    );
};

export default ButtonDetails;
