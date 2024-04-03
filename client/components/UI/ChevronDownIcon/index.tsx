import React, {FC} from 'react'

type Props = {
    width?:string,
    height?:string,
    style?:string,
    fill?:string
}

const ChevronDownIcon:FC<Props> = ({width, height, style, fill}) => {


    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width={width || 24} height={height || 24} className={style} fill={fill || "currentColor"}>
            <path
                d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
        </svg>
    )
}

export default ChevronDownIcon;