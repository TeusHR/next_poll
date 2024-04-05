import React from 'react'
import {Input} from "@nextui-org/react";
import {SVGSearchElement} from "@/UI/SearchIcon";


type  Props = {
    inputStartElement?: boolean,
    inputEndElement?: boolean,
    valueInput: string,
    placeholder?: string
    handleSearch: (search: string) => void
    wrapperClassName?: string
}

const TableSearch = ({
                         inputStartElement = true,
                         inputEndElement = false,
                         handleSearch,
                         placeholder = 'Пошук за назвою',
                         wrapperClassName,
                         valueInput
                     }: Props) => {


    return (
        <div className={wrapperClassName}>
            <Input type="text"
                   onChange={(e) => {
                       handleSearch(e.target.value);
                   }}
                   value={valueInput}
                   className="w-full !h-full !pl-12 !p-3 focus:text-fd border border-solid border-gray-300 !rounded-lg bg-white"
                   placeholder={placeholder}
                   startContent={
                       inputStartElement && <div className="!h-full pointer-events-none">
                           <SVGSearchElement/>
                       </div>
                   }
                   endContent={
                       inputEndElement && <div className="!h-full pr-4 fill-[#808080] pointer-events-none">
                           <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"
                                fill="inherit">
                               <path fillRule="evenodd" clipRule="evenodd"
                                     d="M0 9.49999C0 4.25321 4.25322 0 9.5 0C14.7468 0 19 4.25321 19 9.49999C19 14.7468 14.7468 19 9.5 19C4.25322 19 0 14.7468 0 9.49999ZM9.5 2.11846C5.42321 2.11846 2.11847 5.42321 2.11847 9.49999C2.11847 13.5768 5.42321 16.8815 9.5 16.8815C13.5768 16.8815 16.8815 13.5768 16.8815 9.49999C16.8815 5.42321 13.5768 2.11846 9.5 2.11846Z"
                               />
                               <path fillRule="evenodd" clipRule="evenodd"
                                     d="M7.91557 4.38594C8.51773 4.1311 9.16321 4.00028 9.81497 4.00098C10.4667 4.00028 11.1122 4.1311 11.7144 4.38594C12.317 4.64096 12.8643 5.01516 13.3249 5.48701C13.7324 5.90442 13.7315 6.58032 13.323 6.99667C12.9145 7.41302 12.253 7.41216 11.8456 6.99475C11.5794 6.72206 11.2631 6.50581 10.9148 6.35843C10.5666 6.21106 10.1933 6.13545 9.81636 6.13596H9.81357C9.43665 6.13545 9.06333 6.21106 8.71509 6.35843C8.36685 6.50581 8.05055 6.72206 7.78436 6.99475C7.3769 7.41216 6.71543 7.41302 6.30693 6.99667C5.89843 6.58032 5.89758 5.90442 6.30505 5.48701C6.76566 5.01516 7.31298 4.64096 7.91557 4.38594ZM15.0614 14.9329C15.4694 14.516 16.1309 14.516 16.5389 14.9329L20.694 19.1786C21.102 19.5955 21.102 20.2714 20.694 20.6883C20.286 21.1052 19.6246 21.1052 19.2166 20.6883L15.0614 16.4425C14.6534 16.0256 14.6534 15.3497 15.0614 14.9329Z"
                               />
                           </svg>
                       </div>
                   }
            />

            {/*<InputGroup className="h-full">*/}
            {/*    {inputLeftElement &&*/}
            {/*        <InputLeftElement className="!h-full" pointerEvents='none'>*/}
            {/*            <SVGSearchElement/>*/}
            {/*        </InputLeftElement>}*/}

            {/*    <Input type="text" focusBorderColor="primary.500"*/}
            {/*           onChange={(e) => {*/}
            {/*               handleSearch(e.target.value);*/}
            {/*           }}*/}
            {/*           value={valueInput}*/}
            {/*           className="w-full !h-full !pl-12 !p-3 border border-solid border-gray-300 !rounded-lg bg-white"*/}
            {/*           placeholder={placeholder || 'Пошук'}/>*/}

            {/*    {inputRightElement &&*/}
            {/*        <InputRightElement className="!h-full pr-4 fill-[#808080]"*/}
            {/*                           pointerEvents='none'*/}
            {/*                           _groupHover={{fill: "#ffd70d"}}*/}
            {/*        >*/}
            {/*            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"*/}
            {/*                 fill="inherit">*/}
            {/*                <path fillRule="evenodd" clipRule="evenodd"*/}
            {/*                      d="M0 9.49999C0 4.25321 4.25322 0 9.5 0C14.7468 0 19 4.25321 19 9.49999C19 14.7468 14.7468 19 9.5 19C4.25322 19 0 14.7468 0 9.49999ZM9.5 2.11846C5.42321 2.11846 2.11847 5.42321 2.11847 9.49999C2.11847 13.5768 5.42321 16.8815 9.5 16.8815C13.5768 16.8815 16.8815 13.5768 16.8815 9.49999C16.8815 5.42321 13.5768 2.11846 9.5 2.11846Z"*/}
            {/*                />*/}
            {/*                <path fillRule="evenodd" clipRule="evenodd"*/}
            {/*                      d="M7.91557 4.38594C8.51773 4.1311 9.16321 4.00028 9.81497 4.00098C10.4667 4.00028 11.1122 4.1311 11.7144 4.38594C12.317 4.64096 12.8643 5.01516 13.3249 5.48701C13.7324 5.90442 13.7315 6.58032 13.323 6.99667C12.9145 7.41302 12.253 7.41216 11.8456 6.99475C11.5794 6.72206 11.2631 6.50581 10.9148 6.35843C10.5666 6.21106 10.1933 6.13545 9.81636 6.13596H9.81357C9.43665 6.13545 9.06333 6.21106 8.71509 6.35843C8.36685 6.50581 8.05055 6.72206 7.78436 6.99475C7.3769 7.41216 6.71543 7.41302 6.30693 6.99667C5.89843 6.58032 5.89758 5.90442 6.30505 5.48701C6.76566 5.01516 7.31298 4.64096 7.91557 4.38594ZM15.0614 14.9329C15.4694 14.516 16.1309 14.516 16.5389 14.9329L20.694 19.1786C21.102 19.5955 21.102 20.2714 20.694 20.6883C20.286 21.1052 19.6246 21.1052 19.2166 20.6883L15.0614 16.4425C14.6534 16.0256 14.6534 15.3497 15.0614 14.9329Z"*/}
            {/*                />*/}
            {/*            </svg>*/}
            {/*        </InputRightElement>*/}
            {/*    }*/}
            {/*</InputGroup>*/}
        </div>
    )
}

export default TableSearch;