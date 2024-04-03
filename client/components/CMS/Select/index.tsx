import React, {Key, useCallback, useEffect, useRef, useState} from 'react'
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure} from "@nextui-org/react";
import LockIcon from "@/UI/LockIcon";
import {Input} from "@nextui-org/input";
import CloseIcon from "@/UI/CloseIcon";
import ChevronDownIcon from "@/UI/ChevronDownIcon";

type Props = {
    options: { label: string, value: string }[],
    onChange: (keys: Set<string>) => any
    selected: Set<string>,
    selectionMode?: 'single' | 'multiple',
    disabled?: boolean,
    mainWrapperStyle?: string
    placeholder?: string
    disallowEmptySelection?: boolean
    isSearchable?: boolean
    selectAll?: boolean
    isClearable?: boolean
    justify?: boolean
}

const Select = ({
                    options,
                    onChange,
                    selected,
                    selectionMode = 'single',
                    disabled = false,
                    isSearchable = false,
                    selectAll,
                    mainWrapperStyle,
                    placeholder,
                    justify = false,
                    isClearable = true,
                    disallowEmptySelection = false
                }: Props) => {
    const [searchValue, setSearchValue] = useState('')
    const [filteredOptions, setFilteredOptions] = useState<{ label: string, value: string }[]>([])
    const parentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setFilteredOptions(options)
    }, [options]);

    useEffect(() => {
        if (!searchValue.trim().length)
            setFilteredOptions(options)
        else
            setFilteredOptions(options.filter(f => f.label.toLowerCase().includes(searchValue.toLowerCase().trim())))
    }, [options, searchValue]);

    const getSelectedString = useCallback(() => {
        if (!selected)
            return placeholder
        return Array.from(selected).map(select => {
            const find = options.find(f => f.value.toString() === select.toString())
            if (find)
                return find.label
            return ''
        }).filter(item => item.length > 0).join(', ')
    }, [options, placeholder, selected])

    const {isOpen, onClose, onOpenChange} = useDisclosure()

    const changeHandler = useCallback((keys: 'all' | Set<Key>) => {
        setSearchValue('')
        if (keys === "all") {
            const all = new Set<string>()

            options.forEach(item => {
                all.add(item.value)
            })
            onChange(all)
        } else {
            // @ts-ignore
            onChange(keys)
        }
    }, [onChange, options])

    const clearHandler = useCallback(() => {
        onClose()
        onChange(new Set())
    }, [onChange, onClose])
    return (
        <div ref={parentRef} className={`${mainWrapperStyle} py-2`}>
            <Dropdown shouldBlockScroll={false} closeOnSelect={selectionMode === 'single'} aria-disabled={disabled}
                      style={{width: parentRef?.current?.clientWidth ? `${parentRef?.current?.clientWidth}px` : '100%'}}
                      isDisabled={disabled} triggerScaleOnOpen={false}
                      placement="bottom-start" portalContainer={parentRef?.current || undefined}
                      isOpen={disabled ? false : isOpen} onClose={onClose}
                      onOpenChange={onOpenChange}
                      classNames={{}}
            >
                <DropdownTrigger disabled={disabled} aria-disabled={disabled}>
                    <div
                        className={`${disabled ? 'cursor-not-allowed border-[#cccccc]' : 'justify-between cursor-pointer hover:bg-default-200'} relative  rounded-medium pl-3 ${isClearable ? 'pr-14' : 'pr-10'} h-[40px] border-1 border-primary-500 flex items-center transition-colors bg-default-100`}>
                        <div
                            className={`truncate !text-[14px] font-bold ${disabled ? 'opacity-40' : ''} ${selected.size === 0 ? 'opacity-70' : ''}`}>{getSelectedString() || placeholder}</div>
                        {disabled
                            ? <LockIcon style="absolute brand.gray.200 right-3 w-unit-4 h-unit-4"/>
                            : <>
                                {(selected?.size > 0 && isClearable) &&
                                    <div className="absolute right-0 flex flex-row pr-2">
                                        <div onClick={clearHandler}>
                                            <CloseIcon
                                                style="w-[20px] h-[20px] right-8  transition-opacity hover:opacity-40 cursor-pointer"/>
                                        </div>
                                        <ChevronDownIcon
                                            style={`w-[20px] h-[20px]  transition-transform duration-150 ease motion-reduce:transition-none ${isOpen ? 'rotate-180' : 'rotate-0'}`}/>
                                    </div>}
                            </>}
                    </div>
                </DropdownTrigger>
                <DropdownMenu disallowEmptySelection={disallowEmptySelection}
                              selectedKeys={selected}
                              onSelectionChange={changeHandler}
                              aria-label="Select"
                              aria-disabled={disabled}
                              items={filteredOptions}
                              emptyContent={<div>Нічого не знайдено</div>}
                              variant="solid" classNames={{
                    list: 'overflow-y-auto scrollbar-hide scroll-py-6 max-h-64 w-full',
                }} selectionMode={selectionMode} topContent={
                    isSearchable ? <div className="relative">
                        <Input className={`border-brand-gray-200 rounded-[10px] border-primary-500 ${selectAll ? 'w-[90%] !pr-8' : ''}`}
                               type="text"
                               placeholder="Пошук..." value={searchValue}
                               onChange={(e) => setSearchValue(e.target.value)}/>
                        {selectAll && <svg viewBox="0 0 24 24" onClick={() => changeHandler("all")}
                              className="absolute top-3 right-1 w-[20px] h-[20px] cursor-pointer transition-colors hover:fill-primary-400">
                            <path
                                d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"/>
                        </svg>}
                        {searchValue.length > 0 && <div onClick={() => setSearchValue('')}>
                            <CloseIcon
                                style={`absolute z-10 ${selectAll ? 'right-10' : 'right-4'}  top-3 w-unit-4 h-unit-4 transition-opacity hover:opacity-40 cursor-pointer`}/>
                        </div>
                        }
                    </div> : undefined
                }>
                    {(item) => <DropdownItem className="first:[&>span]:!font-bold"
                                             key={item.value}
                                             textValue={item.label}
                                             value={item.value}
                    >
                        {item.label}
                    </DropdownItem>}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
export default Select;