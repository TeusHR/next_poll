import {Editor} from "@tiptap/core";
import {EditorView} from "@tiptap/pm/view";
import { LinkSlash, Pencil } from "@/components/EditorWrapper/icons";
import * as tippy from "@/components/EditorWrapper/utils/tippy";
import { editHyperlinkHandler } from "@/components/EditorWrapper/components/Link/LinkEdit";


type HyperlinkModalOptions = {
    editor: Editor;
    validate?: (url: string) => boolean;
    view: EditorView;
    link: HTMLAnchorElement;
    node?: any;
    nodePos: number;
};

export default function previewHyperlink(options: HyperlinkModalOptions) {
    const href = options.link.href;

    const hyperlinkLinkModal = document.createElement("div");
    const removeButton = document.createElement("button");
    // const copyButton = document.createElement("button");
    const editButton = document.createElement("button");

    const newBubble = document.createElement("div");
    newBubble.classList.add("hyperlink-preview-modal__metadata");
    const hrefTitle = document.createElement("a");
    hrefTitle.innerText = href;
    newBubble.append(hrefTitle);

    hyperlinkLinkModal.classList.add("hyperlink-preview-modal");

    removeButton.classList.add("hyperlink-preview-modal__remove-button");
    removeButton.innerHTML = LinkSlash();

    editButton.classList.add("hyperlink-preview-modal__edit-button");
    editButton.innerHTML = Pencil();

    // copyButton.classList.add("copy");
    // copyButton.innerHTML = Copy();

    removeButton.addEventListener("click", () => {
        tippy.destroyTooltip();
        return options.editor.chain().focus().unsetLink().run();
    });

    editButton.addEventListener("click", () =>
        editHyperlinkHandler({...options, hyperlinkLinkModal})
    );

    // copyButton.addEventListener("click", () => {
    //     tippy.hide();
    //     navigator.clipboard.writeText(href);
    // });

    // hyperlinkLinkModal.append(newBubble, copyButton, removeButton, editButton);
    hyperlinkLinkModal.append(newBubble, removeButton, editButton);

    return hyperlinkLinkModal;
}