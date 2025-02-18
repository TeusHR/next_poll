import {Document} from "@tiptap/extension-document";
import {Paragraph} from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import {mergeAttributes} from "@tiptap/react";
import {Strike} from "@tiptap/extension-strike";
import {Italic} from "@tiptap/extension-italic";
import {Bold} from "@tiptap/extension-bold";
import Text from "@tiptap/extension-text";
import {BulletList} from "@tiptap/extension-bullet-list";
import {ListItem} from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import {Color} from "@tiptap/extension-color";
import {Underline} from "@tiptap/extension-underline";
import { LineHeight } from "@/components/EditorWrapper/extension/LineHeight";
import { FontSize } from "@/components/EditorWrapper/extension/fontSize";
import { LinkEdit } from "@/components/EditorWrapper/extension/link";
import previewHyperlink from "@/components/EditorWrapper/components/Link/LinkPreview";
import setHyperlink from "@/components/EditorWrapper/components/Link/LinkSet";

export const defaultExtensions = [
    Document,
    Paragraph,
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
    Strike,
    Italic,
    Bold,
    Text,
    BulletList.configure({
        HTMLAttributes: {
            class: 'list-disc pl-4',
        },
    }),
    LineHeight.configure({
        heights:['0.75rem','1rem','1.25rem','1.5rem','1.75rem','2rem','2.25rem','2.5rem'],
        defaultHeight:'1.5rem',
    }),
    ListItem,
    TextStyle,
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    FontSize,
    Color,
    Underline,
    LinkEdit.extend({
        inclusive: false,
    }).configure({
        defaultProtocol: "https",
        openOnClick: true,
        autolink: true,
        modals: {
            previewHyperlink: (data) => {
                return previewHyperlink(data);
            },
            setHyperlink: (data) => {
                return setHyperlink(data);
            },
        },
        HTMLAttributes: {
            class: 'underline underline-offset-2 text-[#68cef8]'
        }
    }),
    // ImageResize.configure({
    //     uploadFn: uploadFn
    // }),
]