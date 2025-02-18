import React, {ReactNode, useEffect, useState} from 'react'
import {Editor} from "@tiptap/react";

type Props = {
    defaultColor: string
    editor:Editor,
    children?: ReactNode,
}

const EditorTextColor = ({defaultColor, editor}:Props) => {

    const edit:Record<string, any> | undefined = editor.getAttributes('textStyle')

    const rgbToHex = (color: string): string => {
        const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            const [_, r, g, b] = rgbMatch;
            return `#${(+r).toString(16).padStart(2, '0')}${(+g).toString(16).padStart(2, '0')}${(+b).toString(16).padStart(2, '0')}`;
        }
        return color;
    };

    const [valueColor, setValueColor] = useState<string>(rgbToHex(defaultColor))

    useEffect(() => {
        if (edit.color !== valueColor) {
            setValueColor(edit.color ? rgbToHex(edit.color) : defaultColor);
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
