import { Node, mergeAttributes } from '@tiptap/react';

export interface DivOptions {
    HTMLAttributes: Record<string, any>,
}

const DivNode = Node.create<DivOptions>({
    name: 'div',
    priority: 1000,

    addOptions() {
        return {
            HTMLAttributes: {
                class:'textBox-render'
            },
        }
    },
    content: 'block*',
    group: 'block',
    defining: true,

    parseHTML() {
        return [
            { tag: 'div' },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
});

export default DivNode;
export { DivNode };
