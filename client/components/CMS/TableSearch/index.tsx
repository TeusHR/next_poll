import React from 'react'
import {Input} from "@nextui-org/react";
import {SVGSearchElement} from "@/UI/SearchIcon";
import cn from "classnames";


type  Props = {
    inputStartElement?: boolean,
    inputStartContent?:React.ReactNode,
    inputEndElement?: boolean,
    inputEndContent?:React.ReactNode,
    valueInput: string,
    placeholder?: string
    handleSearch: (search: string) => void
    wrapperClassName?: string
}

const TableSearch = ({
                         inputStartElement = true,
                         inputStartContent,
                         inputEndElement = false,
                         inputEndContent,
                         handleSearch,
                         placeholder = 'Пошук за назвою',
                         wrapperClassName,
                         valueInput
                     }: Props) => {


    return (
        <div className={cn('h-fit', wrapperClassName)}>
            <Input type="text"
                   onChange={(e) => {
                       handleSearch(e.target.value);
                   }}
                   value={valueInput}
                   classNames={{
                       inputWrapper: "w-full !h-full !p-1 focus:text-fd border border-solid border-primary-500 !rounded-lg"
                   }}
                   placeholder={placeholder}
                   startContent={
                       inputStartElement && <div className="text-center pointer-events-none">
                           {inputStartContent ? inputStartContent : <SVGSearchElement/>}
                       </div>
                   }
                   endContent={
                       inputEndElement && <div className="text-center pointer-events-none">
                           {inputEndContent ? inputEndContent : <SVGSearchElement/>}
                       </div>
                   }
            />
        </div>
    )
}

export default TableSearch;
