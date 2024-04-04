import {getNodeType, mergeAttributes, Node, Range} from "@tiptap/react";

export interface ScreenTypesFontSize {
    key: string,
    class: string
}

export interface TextBoxOptions {
    screens: ScreenTypesFontSize[]
    specificClass: string,
    HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/react' {
    interface Commands<ReturnType> {
        textBox: {
            /**
             * Toggle a textbox node
             */
            toggleTextBox: (attr: { key: string, class: string }) => ReturnType,
        }
    }
}

// function getMergedAttributes(baseClass: string, specificClass: string | undefined, extraAttributes: Record<string, any>) {
//     const specificClassMap:Record<string, any> = {
//         all: 'textBox-render-all border-l-4 border-primary-400 mt-4',
//         pc: 'textBox-render-pc border-l-4 border-purple-600 mt-4',
//         laptop: 'textBox-render-laptop border-l-4 border-rose-600 mt-4',
//         phone: 'textBox-render-phone border-l-4 border-cyan-600 mt-4',
//     };
//
//     const mergedClass = specificClassMap[specificClass || ''] || baseClass;
//
//     return mergeAttributes({class: mergedClass}, extraAttributes);
// }


export const TextBox = Node.create<TextBoxOptions>({
    name: 'textBox',
    priority: 1000,

    addOptions() {
        return {
            screens: [
                {
                    key: 'all',
                    class: 'textBox-render-all border-l-4 border-primary-400 mt-4'
                },
                {
                    key: 'pc',
                    class: 'textBox-render-pc border-l-4 border-purple-600 mt-4'
                },
                {
                    key: 'laptop',
                    class: 'textBox-render-laptop border-l-4 border-rose-600 mt-4'
                },
                {
                    key: 'phone',
                    class: 'textBox-render-phone border-l-4 border-cyan-600 mt-4',
                }
            ],
            specificClass: 'textBox-render-',
            HTMLAttributes: {},
        }
    },

    content: 'block+',
    group: 'block',
    defining: true,


    parseHTML() {
        // return [
        //     {
        //         tag: 'div',
        //     }
        // ];
        return this.options.screens
            .map((item: ScreenTypesFontSize) => ({
                tag: `div`,
                attrs: {key: item.key},
            }))
        // return [
        //     {
        //         tag: 'div',
        //         attrs: 'all',
        //     }
        // ]
    },

    renderHTML({HTMLAttributes}) {
        const {class: baseClass} = this.options.HTMLAttributes;
        const specificClassBox = this.options.specificClass
        const screens = this.options.screens

        const specificScreen = screens.find(screen => HTMLAttributes.class.includes(`${specificClassBox}${screen.key}`));
        const mergedClass = specificScreen?.class || baseClass;

        return ['div', mergeAttributes({class: mergedClass}, HTMLAttributes), 0];
    },


    addAttributes() {
        return {
            class: {
                parseHTML: element => element.getAttribute('class'),
            },
            key: {
                default: "all",
                rendered: false,
            },
        }
    },


    addCommands() {
        return {
            toggleTextBox: ({key, class: attrClass}) => (edt) => {
                const TypeName = this.name
                const type = getNodeType(TypeName, edt.state.schema)
                const {from, to} = edt.state.selection
                const nodes: Node[] = []

                edt.state.doc.nodesBetween(from, to, (node) => {
                    // @ts-ignore
                    nodes.push(node)
                })

                // @ts-ignore
                const textBoxAlreadyExists = nodes.some(node => node.type.name === type.name)

                if (textBoxAlreadyExists) {
                    let fromParent = edt.state.selection.$to.before(edt.state.selection.$from.depth - 1)
                    let toParent = edt.state.selection.$to.after(edt.state.selection.$from.depth - 1)

                    const range: Range = {from: fromParent + 2, to: toParent - 2}
                    return edt.chain().setTextSelection(range).lift(TypeName).run()
                }
                else {
                    const specificScreen = this.options.screens.find(screen => screen.key === key);

                    if (!specificScreen)
                        return false

                    return edt.commands.wrapIn(TypeName, {key: key, class: `${specificScreen.class} ${attrClass}`})
                }
            },
        }
    },

})
