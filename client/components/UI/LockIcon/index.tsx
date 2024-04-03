import React, {FC} from 'react'

type Props = {
    width?:string,
    height?:string,
    style?:string,
    fill?:string
}

const LockIcon:FC<Props> = ({width, height, style, fill}) => {


    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width || 24} height={height || 24} className={style} fill={fill || "currentColor"}>
            <path
                d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17ZM11 14V18H13V14H11Z"></path>
        </svg>
    )
}

export default LockIcon;