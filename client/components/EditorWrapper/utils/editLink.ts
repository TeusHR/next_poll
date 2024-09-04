import {Editor} from "@tiptap/core";
import {find} from "linkifyjs";

type EditHyperlinkOptions = {
    editor: Editor;
    validate?: (url: string) => boolean;
    newURL?: string;
    newText?: string;
};

export default function editHyperlink(options: EditHyperlinkOptions) {
    const {state, dispatch} = options.editor.view;
    const {from,to} = options.editor.state.selection
    console.log('state.doc.textBetween(from, to): ',state.doc.textBetween(from, to))

    let link: HTMLAnchorElement | null = null;

    const selectedNode = options.editor.view.domAtPos(from - 1)
        .node as HTMLElement;

    console.log('selectedNode: ', selectedNode)

    if (selectedNode?.nodeName === "#text") {
        link = (selectedNode.parentNode as HTMLElement)?.closest("a");
    } else {
        link = selectedNode?.closest("a");
    }

    console.log('link: ', link)

    if (!link) return true;

    const text = options.newText || link?.innerText;

    console.log('text: ', text)
    // Получаем позицию узла в редакторе
    const nodePos = options.editor.view.posAtDOM(link, 0);
    console.log('nodePos: ', nodePos)
    console.log("Link position in document:", nodePos, "Link text length:", text.length);

    const sanitizeURL = find(options.newURL || link.href)
        .filter((link) => link.isLink)
        .filter((link) => (options.validate ? options.validate(link.value) : true))
        .at(0);

    console.log('sanitizeURL: ', sanitizeURL)
    if (!sanitizeURL) {
        console.error("Invalid or missing URL:", options.newURL);
        return true;
    }

    return options.editor
        .chain()
        .focus()
        .command(({tr}) => {

            tr.delete(nodePos, nodePos + link?.innerText.length);

            tr.insert(
                nodePos,
                options.editor.schema.text(text, [
                    options.editor.schema.marks.link.create({ href: sanitizeURL.href })
                ])
            );



            return true

            // // The command replaces the range from nodePos to nodePos + length of the text
            // // with a new text node with the provided text and a link mark with the sanitized URL
            // console.log("Before transaction:");
            // console.log("tr.doc:", tr.doc.toJSON());
            // console.log("state.doc:", state.doc.toJSON());
            // console.log("Documents equal:", tr.doc.eq(state.doc));
            //
            //
            // if (!tr.doc.eq(state.doc)) {
            //     console.error("Document state mismatch detected. Aborting transaction.");
            //     return false;
            // }
            // console.log("Replacing text with new link:", sanitizeURL.href);
            //
            // tr.replaceWith(
            //     nodePos,
            //     nodePos + text?.length,
            //     options.editor.schema.text(text,
            //         [
            //             options.editor.schema.marks.link.create({
            //                 href: sanitizeURL?.href,
            //             }),
            //         ]
            //     )
            // );
            //
            // console.log("After transaction:");
            // console.log("tr.doc:", tr.doc.toJSON());
            // console.log("state.doc:", state.doc.toJSON());
            // console.log("Documents equal:", tr.doc.eq(state.doc));
            //
            // console.log('Transaction complete');
            // return true;
        })
        .run();
}