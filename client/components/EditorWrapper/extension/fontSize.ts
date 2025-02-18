import { Extension } from "@tiptap/react";
import "@tiptap/extension-text-style";

export type FontSizeOptions = {
    types: string[];
};

declare module "@tiptap/react" {
    interface Commands<ReturnType> {
        fontSize: {
            /**
             * Set the font size
             */
            setFontSize: (fontSize: string) => ReturnType;
            /**
             * Unset the font size
             */
            unsetFontSize: () => ReturnType;
        };
    }
}

export const FontSize = Extension.create<FontSizeOptions>({
    name: "fontSize",

    addOptions() {
        return {
            types: ["textStyle"],
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) => {
                            const fontSize = element.style.fontSize;
                            if (fontSize) {
                                if (fontSize.includes('rem')) {
                                    return fontSize;
                                } else if (fontSize.includes('px')) {
                                    const fontSizeInRem = String(parseFloat(fontSize.replace('px', '')) / 16);
                                    return `${fontSizeInRem}rem`;
                                }
                            }
                            return '1rem'
                        },
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) {
                                return {};
                            }

                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setFontSize:
                (fontSize) =>
                    ({ chain }) => {
                        return chain().setMark("textStyle", { fontSize }).run();
                    },
            unsetFontSize:
                () =>
                    ({ chain }) => {
                        return chain()
                            .setMark("textStyle", { fontSize: null })
                            .removeEmptyTextStyle()
                            .run();
                    },
        };
    },
});
