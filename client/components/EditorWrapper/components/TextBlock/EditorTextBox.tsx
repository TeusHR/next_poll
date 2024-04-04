import React, {ReactNode} from 'react'
import {Editor} from "@tiptap/react";
import {ItemFontSize} from "@/components/EditorWrapper/utils/fontsize";
import {Button} from "@nextui-org/react";

type Props = {
    defaultSize?: number
    editor: Editor,
    children?: ReactNode,
    classActive?: string,
    classPassive?: string,
    classToggle: {
        key: string,
        class: string,
    },
    itemFontSize?: ItemFontSize[]
}

const EditorTextBox = ({editor, classToggle, children}: Props) => {


    return (
        <Button isIconOnly
            className={`flex items-center w-[50px] h-[50px] max-[580px]:max-w-[32px] bg-transparent max-[580px]:min-w-[32px] max-[580px]:h-[32px] max-[580px]:w-[32px]
         ${editor.isActive('textBox', {key:classToggle.key})
            ? 'is-active border-brand-gray-200 solid border-1' : ''}`}>
            <svg viewBox="0 0 24 24"
                  onClick={() => editor.commands.toggleTextBox(classToggle)}
                  className={`w-[30px] !h-[30px] max-[580px]:!h-[20px] max-[580px]:!w-[10px] cursor-pointer`}>
                {children}
            </svg>
        </Button>
    )
}

export default EditorTextBox;