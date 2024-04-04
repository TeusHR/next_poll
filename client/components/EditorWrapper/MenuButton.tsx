import React, {ReactNode} from 'react'
import {Button} from "@nextui-org/react";

export type EditorMenuButton = {
    children:ReactNode,
    name:string,
    onClick:any,
    classCondition?:boolean,
    classActive?:string,
    classPassive?:string
}

const MenuButton = ({
                        children,
                        name,
                        onClick,
                        classCondition = false,
                        classActive = '',
                        classPassive = ''}:EditorMenuButton) => {


    return (
        <Button isIconOnly
                onClick={onClick}
                className={`w-[50px] h-[50px] max-[580px]:max-w-[32px] bg-transparent max-[580px]:min-w-[32px] max-[580px]:h-[32px] max-[580px]:w-[32px]" 
                    ${classCondition ? classActive : classPassive}`}>
            <div className="flex items-center justify-center">
                {children}
            </div>
        </Button>
    )
}

export default MenuButton;
