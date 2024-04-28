'use client'
import React, {ReactNode, useEffect, useState} from 'react'
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";

import {defaultFontSize, ItemFontSize} from "@/components/EditorWrapper/utils/fontsize";
import {Editor} from "@tiptap/react";
import {Input} from "@nextui-org/react";

type Props = {
    defaultSize: string
    editor: Editor,
    children?: ReactNode,
    itemFontSize?: ItemFontSize[]
}


const EditorFontSize = ({defaultSize, itemFontSize, editor}: Props) => {

    const edit: Record<string, any> | undefined = editor.getAttributes('textStyle')
    const [selectSize, setSelectSize] = useState<string>(edit.fontSize ? String(parseFloat(edit.fontSize) * 16) : defaultSize)
    const [openDropDown, setOpenDropDown] = useState<boolean>(false)

    const handlerFontSize = (fontSize: string) => {
        if (fontSize === selectSize) {
            editor.commands.unsetFontSize()
        } else {
            setSelectSize(fontSize)
            editor.commands.setFontSize(`${Number(fontSize) / 16}rem`)
        }
    }

    useEffect(() => {
        if (edit.fontSize !== selectSize) {
            setSelectSize(edit.fontSize ? String(parseFloat(edit.fontSize) * 16) : defaultSize)
        }
        //ts-ignore
    }, [defaultSize, edit.fontSize]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const debounceUpdate = useCallback(
    //     debounce((event: string) => {
    //         let fs = Number(event);
    //         if (fs > 8 && fs < 64) {
    //             editor.commands.setFontSize(`${Number(event) / 16}rem`);
    //         }
    //     }, 350),
    //     [editor.commands]
    // );

    const UpdateEditorFontSize = (event:string) => {
        let fs = Number(event);
        if (fs >= 8 && fs <= 64) {
            editor.commands.setFontSize(`${Number(event) / 16}rem`);
        }
    }

    const handleChangFilter = (event: any) => {
        let fs = Number(event.target.value)
        if (fs <= 8) {
            setSelectSize("8")
            editor.commands.setFontSize(`${8 / 16}rem`)
        } else if (fs >= 64) {
            setSelectSize("64")
            editor.commands.setFontSize(`${64 / 16}rem`)
        }
    }

    return (
        <>
            <div className="flex items-center w-[90px] select-none">
                <div
                    className="flex items-center flex-row w-full border-1 solid border-black pl-1 justify-between cursor-pointer">
                    <Input value={selectSize}
                           onChange={(evt) => {
                               setSelectSize(evt.target.value)
                               // debounceUpdate(evt.target.value)
                               UpdateEditorFontSize(evt.target.value)
                           }}
                           type={"number"}
                           onBlur={handleChangFilter}
                           classNames={{
                               inputWrapper: "bg-inherit p-0 h-auto hover:!bg-inherit data-[focus=true]:!bg-inherit min-h-fit"
                           }}
                           size="lg"
                    />
                    <div>
                        <Dropdown
                            classNames={{
                                content: '!min-w-[90px]',
                                trigger: '!opacity-100 !scale-100'
                            }}
                        >
                            <DropdownTrigger>
                                <svg viewBox="0 0 24 24"
                                      onClick={() => setOpenDropDown((prevState) => !prevState)}
                                      className={`w-[30px] !h-[30px] max-[580px]:!h-[20px] max-[580px]:!w-[10px] transition-all  ${openDropDown ? 'rotate-180' : ''}`}>
                                    <path xmlns="http://www.w3.org/2000/svg"
                                          d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"/>
                                </svg>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Dropdown fontsize"
                                variant={"solid"}
                            >
                                {itemFontSize && itemFontSize.length > 0
                                    ? itemFontSize.map((item) =>
                                        <DropdownItem
                                            className="py-0"
                                            key={item.key}
                                            textValue={String(item.fontSize)}
                                            onClick={() => handlerFontSize(String(item.fontSize))}>
                                            {item.fontSize}
                                        </DropdownItem>)

                                    : defaultFontSize.map((item) =>
                                        <DropdownItem
                                            className="py-0"
                                            key={item.key}
                                            textValue={String(item.fontSize)}
                                            onClick={() => handlerFontSize(String(item.fontSize))}>
                                            {item.fontSize}
                                        </DropdownItem>)
                                }
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditorFontSize;
