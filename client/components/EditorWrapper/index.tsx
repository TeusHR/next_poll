'use client'
import React, {FC, useEffect} from 'react';
import {Editor, EditorContent, mergeAttributes, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import TextStyle from '@tiptap/extension-text-style'
import {FontSize} from "@/components/EditorWrapper/extension/fontSize";
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'
import MenuButton, {EditorMenuButton} from "@/components/EditorWrapper/MenuButton";
import {Document} from "@tiptap/extension-document";
import {Underline} from "@tiptap/extension-underline";
import {Color} from "@tiptap/extension-color";
import {Placeholder} from "@tiptap/extension-placeholder";
import {UniqueID} from "@tiptap/extension-unique-id";
import EditorFontSize from "@/components/EditorWrapper/components/FontSize/EditorFontSize";
import EditorTextColor from "@/components/EditorWrapper/components/InputColor/EditorTextColor";


type Props = {
    editor: Editor | null
}

const EditorWrapper = ({editor}: Props) => {

    if (!editor)
        return null

    const MenuEditorButton: EditorMenuButton[] = [
        {
            name: 'heading 1',
            onClick: () => editor.chain().focus().unsetFontSize().toggleHeading({level: 1}).run(),
            classCondition: editor.isActive('heading', {level: 1}),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px]">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M13 20H11V13H4V20H2V4H4V11H11V4H13V20ZM21.0005 8V20H19.0005L19 10.204L17 10.74V8.67L19.5005 8H21.0005Z"/>
                </svg>
            )
        },
        {
            name: 'heading 2',
            onClick: () => editor.chain().focus().unsetFontSize().toggleHeading({level: 2}).run(),
            classCondition: editor.isActive('heading', {level: 2}),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px]">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M4 4V11H11V4H13V20H11V13H4V20H2V4H4ZM18.5 8C20.5711 8 22.25 9.67893 22.25 11.75C22.25 12.6074 21.9623 13.3976 21.4781 14.0292L21.3302 14.2102L18.0343 18H22V20H15L14.9993 18.444L19.8207 12.8981C20.0881 12.5908 20.25 12.1893 20.25 11.75C20.25 10.7835 19.4665 10 18.5 10C17.5818 10 16.8288 10.7071 16.7558 11.6065L16.75 11.75H14.75C14.75 9.67893 16.4289 8 18.5 8Z"/>
                </svg>
            )
        },
        {
            name: 'heading 3',
            onClick: () => editor.chain().focus().unsetFontSize().toggleHeading({level: 3}).run(),
            classCondition: editor.isActive('heading', {level: 3}),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px]">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M22 8L21.9984 10L19.4934 12.883C21.0823 13.3184 22.25 14.7728 22.25 16.5C22.25 18.5711 20.5711 20.25 18.5 20.25C16.674 20.25 15.1528 18.9449 14.8184 17.2166L16.7821 16.8352C16.9384 17.6413 17.6481 18.25 18.5 18.25C19.4665 18.25 20.25 17.4665 20.25 16.5C20.25 15.5335 19.4665 14.75 18.5 14.75C18.214 14.75 17.944 14.8186 17.7056 14.9403L16.3992 13.3932L19.3484 10H15V8H22ZM4 4V11H11V4H13V20H11V13H4V20H2V4H4Z"/>
                </svg>
            )
        },
        {
            name: 'heading 4',
            onClick: () => editor.chain().focus().unsetFontSize().toggleHeading({level: 4}).run(),
            classCondition: editor.isActive('heading', {level: 4}),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px]">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M13 20H11V13H4V20H2V4H4V11H11V4H13V20ZM22 8V16H23.5V18H22V20H20V18H14.5V16.66L19.5 8H22ZM20 11.133L17.19 16H20V11.133Z"/>
                </svg>
            )
        },
        {
            name: 'paragraph',
            onClick: () => editor.chain().focus().setParagraph().run(),
            classCondition: editor.isActive('paragraph'),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px]">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M12 6V21H10V16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4H20V6H17V21H15V6H12ZM10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14V6Z"/>
                </svg>
            )
        },
        {
            name: 'bold',
            onClick: () => editor.chain().focus().toggleBold().run(),
            classCondition: editor.isActive('bold'),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px]">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z"/>
                </svg>
            )
        },
        {
            name: 'italic',
            onClick: () => editor.chain().focus().toggleItalic().run(),
            classCondition: editor.isActive('italic'),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px]">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"/>
                </svg>
            )
        },
        {
            name: 'strike',
            onClick: () => editor.chain().focus().toggleStrike().run(),
            classCondition: editor.isActive('strike'),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px]">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M17.1538 14C17.3846 14.5161 17.5 15.0893 17.5 15.7196C17.5 17.0625 16.9762 18.1116 15.9286 18.867C14.8809 19.6223 13.4335 20 11.5862 20C9.94674 20 8.32335 19.6185 6.71592 18.8555V16.6009C8.23538 17.4783 9.7908 17.917 11.3822 17.917C13.9333 17.917 15.2128 17.1846 15.2208 15.7196C15.2208 15.0939 15.0049 14.5598 14.5731 14.1173C14.5339 14.0772 14.4939 14.0381 14.4531 14H3V12H21V14H17.1538ZM13.076 11H7.62908C7.4566 10.8433 7.29616 10.6692 7.14776 10.4778C6.71592 9.92084 6.5 9.24559 6.5 8.45207C6.5 7.21602 6.96583 6.165 7.89749 5.299C8.82916 4.43299 10.2706 4 12.2219 4C13.6934 4 15.1009 4.32808 16.4444 4.98426V7.13591C15.2448 6.44921 13.9293 6.10587 12.4978 6.10587C10.0187 6.10587 8.77917 6.88793 8.77917 8.45207C8.77917 8.87172 8.99709 9.23796 9.43293 9.55079C9.86878 9.86362 10.4066 10.1135 11.0463 10.3004C11.6665 10.4816 12.3431 10.7148 13.076 11H13.076Z"/>
                </svg>
            )
        },

        {
            name: 'underline',
            onClick: () => editor.chain().focus().toggleUnderline().run(),
            classCondition: editor.isActive('underline'),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px]">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z"/>
                </svg>
            )
        }, {
            name: 'left',
            onClick: () => editor.chain().focus().setTextAlign('left').run(),
            classCondition: editor.isActive({textAlign: 'left'}),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px]">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M3 4H21V6H3V4ZM3 19H17V21H3V19ZM3 14H21V16H3V14ZM3 9H17V11H3V9Z"/>
                </svg>
            )
        },
        {
            name: 'center',
            onClick: () => editor.chain().focus().setTextAlign('center').run(),
            classCondition: editor.isActive({textAlign: 'center'}),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px]">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M3 4H21V6H3V4ZM5 19H19V21H5V19ZM3 14H21V16H3V14ZM5 9H19V11H5V9Z"/>
                </svg>
            )
        },
        {
            name: 'right',
            onClick: () => editor.chain().focus().setTextAlign('right').run(),
            classCondition: editor.isActive({textAlign: 'right'}),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px]">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z"/>
                </svg>
            )
        },
        {
            name: 'justify',
            onClick: () => editor.chain().focus().setTextAlign('justify').run(),
            classCondition: editor.isActive({textAlign: 'justify'}),
            classActive: 'is-active border-gray-500 solid border-1',
            classPassive: '',
            children: (
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px] ">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="M3 4H21V6H3V4ZM3 19H21V21H3V19ZM3 14H21V16H3V14ZM3 9H21V11H3V9Z"/>
                </svg>
            )
        },
    ]

    return (
        <div className="flex flex-wrap gap-2">
            {MenuEditorButton.map((item, index) => (
                <MenuButton
                    key={`${item.name}-${index}`}
                    name={item.name}
                    onClick={item.onClick}
                    classCondition={item.classCondition}
                    classActive={item.classActive}
                    classPassive={item.classPassive}
                >
                    {item.children}
                </MenuButton>
            ))}
            <EditorFontSize defaultSize={"16"} editor={editor}/>
            <EditorTextColor defaultColor={"#000000"} editor={editor}/>
        </div>
    )
}

type PropsWrapper = {
    onChange: (e: any) => void
    description: string,
    placeholder: string
}

const EditorWrapper2: FC<PropsWrapper> = ({onChange, description, placeholder}) => {

    const editor = useEditor({
        extensions: [
            UniqueID.configure({
                attributeName: 'uid',
                types: ['textBox', 'textBoxPC', 'textBoxLaptop', 'textBoxPhone'],
            }),
            StarterKit.configure({
                heading: false,
                blockquote: false,
                bulletList: false,
                code: false,
                codeBlock: false,
                document: false,
                history: false,
                horizontalRule: false,
                orderedList: false,
            }),
            Placeholder.configure({
                placeholder: placeholder,
                showOnlyWhenEditable: false,
            }),
            Document,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Heading.extend({
                levels: [1, 2, 3, 4, 5, 6],
                renderHTML({node, HTMLAttributes}) {
                    const level = this.options.levels.includes(node.attrs.level)
                        ? node.attrs.level
                        : this.options.levels[0];
                    const styles: { [index: number]: string } = {
                        1: 'font-size: 2.25rem; line-height: 2.5rem;',
                        2: 'font-size: 1.875rem; line-height: 2.25rem;',
                        3: 'font-size: 1.5rem; line-height: 2rem;',
                        4: 'font-size: 1.25rem; line-height: 1.75rem;',
                        5: 'font-size: 1.125rem; line-height: 1.75rem;',
                        6: 'font-size: 1rem; line-height: 1.5rem;',
                    };
                    return [
                        `h${level}`,
                        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                            style: `${styles[level]}`,
                        }),
                        0,
                    ];
                },
            }).configure({levels: [1, 2, 3, 4, 5, 6]}),
            TextStyle,
            FontSize,
            Underline,
            Color,
        ],
        editorProps: {
            attributes: {
                class: 'border-gray-500 solid border-1 p-4 rounded-l-[20px] h-full min-h-[250px] max-h-[950px] overflow-auto bg-gray-100',
            },
        },
        onBlur:() => {
            if (editor) {
                onChange(editor.getHTML());
            }
        },
        content: description,
    })

    useEffect(() => {
        if (description.trim() !== '' && editor) {
            editor.commands.setContent(description);
        }
        if (description === '' && editor) {
            editor.commands.setContent('');
        }
    }, [description, editor]);


    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const debounceUpdate = useCallback(
    //     debounce(() => {
    //         if (editor) {
    //             onChange(editor.getHTML());
    //         }
    //     }, 300),
    //     [editor]
    // );

    return (
        <div className="flex transition-all flex-col gap-4">
            <EditorWrapper editor={editor}/>
            <EditorContent editor={editor}
                           className="text-base transition-all max-w-[calc(100vw_-_28rem)] max-xl:max-w-[calc(100vw_-_24.5rem)] max-lg:max-w-[calc(100vw_-_9rem)]"/>
        </div>
    )
}

export default EditorWrapper2
