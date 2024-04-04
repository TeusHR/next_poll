import {mergeAttributes, Node} from "@tiptap/react";

export interface FontsizeBox {
    HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/react' {
    interface Commands<ReturnType> {
        fontSizeBox: {
        }
    }
}


export const FontSizeBox = Node.create<FontsizeBox>({
    name: 'fontSizeBox',
    priority: 1000,

    addOptions() {
        return {
            // class: 'textBox-render border-l-4 border-primary-400 mt-4',
            HTMLAttributes: {
                class: 'ft-box'
            },
        }
    },

    // content: 'block+',
    // group: 'block',
    defining: true,

    parseHTML() {
        return [
            {
                tag: 'span',
            }
        ];
    },

    renderHTML({HTMLAttributes, node}) {
        console.log(node, 'node')
        console.log(HTMLAttributes)
        console.log(this.options.HTMLAttributes)
        return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },

    // addAttributes() {
    //     return {
    //         class: {
    //             parseHTML: element => element.getAttribute('class'),
    //             // renderHTML: (attributes:any) => {
    //             //     console.log(attributes)
    //             //     return {
    //             //         class: `${attributes.class}`,
    //             //     }
    //             // },
    //         },
    //     }
    // },


    // addCommands() {
    //     return {
    //         toggleTextBox: (attr) => (edt) => {
    //             const type = getNodeType('textBox', edt.state.schema)
    //             const {from, to} = edt.state.selection
    //             const nodes: Node[] = []
    //
    //             edt.state.doc.nodesBetween(from, to, (node) => {
    //                 // @ts-ignore
    //                 nodes.push(node)
    //             })
    //
    //             // @ts-ignore
    //             const textBoxAlreadyExists = nodes.some(node => node.type.name === type.name)
    //
    //             if (textBoxAlreadyExists) {
    //
    //                 let fromParent = edt.state.selection.$to.before(edt.state.selection.$from.depth - 1)
    //                 let toParent = edt.state.selection.$to.after(edt.state.selection.$from.depth - 1)
    //
    //                 const range:Range = {from:fromParent+2, to:toParent-2}
    //                 return edt.chain().setTextSelection(range).lift('textBox').run();
    //             } else {
    //                 return edt.commands.wrapIn('textBox', attr);
    //             }
    //         },
    //     }
    // },

})
