import {Node} from "@tiptap/react";
import {findChildren} from "@tiptap/react";

export interface UniqueIDOptions {
    attributeName: string,
    types: string[],
    // generateID: () => any,
}

export interface IUniquiID {
    HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/react'

export const UniquiIDFT = Node.create<UniqueIDOptions>({
    name: 'UniquiIDFT',

    priority: 10000,

    addOptions() {
        return {
            attributeName: 'id',
            types: [],
            // generateID: () => uuidv4(),
            filterTransaction: null,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    [this.options.attributeName]: {
                        default: null,
                        parseHTML: element => element.getAttribute(`data-${this.options.attributeName}`),
                        renderHTML: attributes => {
                            if (!attributes[this.options.attributeName]) {
                                return {}
                            }

                            return {
                                [`data-${this.options.attributeName}`]: attributes[this.options.attributeName],
                            }
                        },
                    },
                },
            },
        ]
    },

    // check initial content for missing ids
    onCreate() {
        const { view, state } = this.editor
        const { tr, doc } = state
        const { types, attributeName} = this.options
        const nodesWithoutId = findChildren(doc, node => {
            return types.includes(node.type.name)
                && node.attrs[attributeName] === null
        })

        nodesWithoutId.forEach(({ node, pos }) => {
            tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
            })
        })
        view.dispatch(tr)
    },

})
