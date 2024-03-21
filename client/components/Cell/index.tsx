import React, {ReactNode} from 'react'
import CellItem from "@/components/Cell/CellItem";

type Props = {
    style:string
    children?:ReactNode
}


const Cell = ({style, children}:Props) => {


    return (
        <div className={style}>
            {children}

            {/*<div className="grid grid-cols-2 text-4xl text-center">*/}
            {/*       <span>*/}
            {/*           Наукова робота ОНТУ*/}
            {/*       </span>*/}
            {/*    <span>*/}
            {/*           Міжнародна діяльність ОНТУ*/}
            {/*       </span>*/}
            {/*</div>*/}


            <CellItem/>
            <CellItem/>
        </div>
    )
}

export default Cell;