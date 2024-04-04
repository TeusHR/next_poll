import {Extension} from "@tiptap/react";
import "@tiptap/extension-text-style";

export type ColorOptions = {
    types: string[];
};

declare module "@tiptap/react" {
    interface Commands<ReturnType> {
        color: {
            /**
             * Set the font family
             */
            setColor: (color: string) => ReturnType;
            /**
             * Unset the font family
             */
            unsetColor: () => ReturnType;
        };
    }
}

export const Color = Extension.create<ColorOptions>({
    name: "color",

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
                    color: {
                        default: null,
                        parseHTML: (element) =>
                             element.style.color.replace(/['"]+/g, ""),
                        renderHTML: (attributes) => {
                            if (!attributes.color) {
                                return {};
                            }

                            return {
                                style: `color: ${attributes.color};`,
                            };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setColor:
                (color) =>
                    ({chain}) => {
                        return chain().setMark("textStyle", {color}).run();
                    },
            unsetColor:
                () =>
                    ({chain}) => {
                        return chain()
                            .setMark("textStyle", {color: null})
                            .removeEmptyTextStyle()
                            .run();
                    },
        };
    },
});
