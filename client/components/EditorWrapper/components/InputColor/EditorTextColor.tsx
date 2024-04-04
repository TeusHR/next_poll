import React, {ReactNode, useEffect, useState} from 'react'
import {Editor} from "@tiptap/react";

type Props = {
    defaultColor: string
    editor:Editor,
    children?: ReactNode,
}

const EditorTextColor = ({defaultColor, editor}:Props) => {

    const edit:Record<string, any> | undefined = editor.getAttributes('textStyle')
    const [valueColor, setValueColor] = useState<string>( defaultColor)

    useEffect(() => {
        if (edit.color !== valueColor) {
            setValueColor(edit.color ? edit.color : defaultColor);
        }
    }, [defaultColor, edit, valueColor]);

    return (
        <div className="flex items-center">
            <input
            type="color"
            className="cursor-pointer"
            onChange={(evt)=> {
                setValueColor(evt.target.value)
                return editor.chain().focus().setColor(evt.target.value).run()
            }}
            value={valueColor}
            />
        </div>
    )
}

export default EditorTextColor;
