import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, SharedSelection, useDisclosure} from "@nextui-org/react";
import {Editor} from "@tiptap/react";
import {Button} from "@nextui-org/button";

type Props = {
    options: Options[],
    editor: Editor,
    selectionMode?: 'single' | 'multiple',
    disabled?: boolean,
    mainWrapperStyle?: string
    disallowEmptySelection?: boolean
}

type Options = {
    label: string,
    key: string,
}

export const LineHeightOptions = [
    {
        title: '0.75rem',
        key: '0.75rem',
    },
    {
        title: '1rem',
        key: '1rem',
    },
    {
        title: '1.25rem',
        key: '1.25rem',
    },
    {
        title: '1.5rem',
        key: '1.5rem',
    },
    {
        title: '1.75rem',
        key: '1.75rem',
    },
    {
        title: '2rem',
        key: '2rem',
    },
    {
        title: '2.25rem',
        key: '2.25rem',
    },
    {
        title: '2.5rem',
        key: '2.5rem',
    },
]

export const generateOptions = () => {
    return LineHeightOptions.map((item) => ({
        label: `${item.title}`,
        key: `${item.key}`,
    }));
};

const LineHeight = ({
                        options = [],
                        editor,
                        selectionMode = 'single',
                        disabled = false,
                        mainWrapperStyle = '',
                        disallowEmptySelection = false
                    }: Props) => {

    const edit: Record<string, any> | undefined = editor.getAttributes('textStyle')
    const [selected, setSelected] = useState(edit.lineHeight || '')
    const parentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (edit.lineHeight !== selected) {
            setSelected(edit.lineHeight || '')
        }
    }, [edit.lineHeight, selected]);

    const {isOpen, onClose, onOpenChange} = useDisclosure()

    const changeHandler = useCallback((keys: SharedSelection) => {
        const keysString = Array.from(keys).toString();
        editor.chain().focus().setLineHeight(`${keysString}`).run()
    }, [editor])

    return (
        <div ref={parentRef} className={`${mainWrapperStyle}`}>
            <Dropdown shouldBlockScroll={false} closeOnSelect={selectionMode === 'single'} aria-disabled={disabled}
                      style={{width: parentRef?.current?.clientWidth ? `${parentRef?.current?.clientWidth}px` : '100%'}}
                      isDisabled={disabled} triggerScaleOnOpen={false}
                      placement="bottom-start" portalContainer={parentRef?.current || undefined}
                      isOpen={disabled ? false : isOpen} onClose={onClose}
                      onOpenChange={onOpenChange}
            >
                <DropdownTrigger disabled={disabled} aria-disabled={disabled}>
                    <Button isIconOnly
                            className={`w-[50px] h-[50px] max-[580px]:max-w-[32px] bg-transparent max-[580px]:min-w-[32px] max-[580px]:h-[32px] max-[580px]:w-[32px] ${editor.isActive({textAlign: 'lineHeight'}) ? 'is-active border-gray-500 solid border-1' : ''}`}>
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 className="!w-full !h-[30px] max-[580px]:!h-[20px] ">
                                <path
                                    d="M11 4H21V6H11V4ZM6 7V11H4V7H1L5 3L9 7H6ZM6 17H9L5 21L1 17H4V13H6V17ZM11 18H21V20H11V18ZM9 11H21V13H9V11Z">
                                </path>
                            </svg>
                        </div>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu disallowEmptySelection={disallowEmptySelection}
                              selectedKeys={selected}
                              onSelectionChange={changeHandler}
                              aria-label="Select"
                              aria-disabled={disabled}
                              items={options}
                              emptyContent={<div>Нічого не знайдено</div>}
                              variant="solid"
                              classNames={{
                                  list: 'overflow-y-auto scrollbar-hide scroll-py-6 max-h-64 w-full',
                              }}
                              selectionMode={selectionMode}>
                    {(item) => <DropdownItem className="first:[&>span]:!font-bold"
                                             key={item.key}
                                             textValue={item.label}
                                             value={item.key}
                    >
                        {item.label}
                    </DropdownItem>}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
export default LineHeight;
