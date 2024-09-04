import { Editor } from "@tiptap/core";
import { find } from "linkifyjs";
import * as tippy from "@/components/EditorWrapper/utils/tippy";


type setHyperlinkModalOptions = {
    editor: Editor;
    validate?: (url: string) => boolean;
    extentionName: string;
    attributes: Record<string, any>;
};

export default function setHyperlink(options: setHyperlinkModalOptions) {
    const { tippyModal } = tippy.init({ ...options, view: options.editor.view });

    const hyperlinkLinkModal = document.createElement("div");
    const buttonsWrapper = document.createElement("div");
    const inputsWrapper = document.createElement("div");

    hyperlinkLinkModal.classList.add("hyperlink-set-modal");

    buttonsWrapper.classList.add("hyperlink-set-modal__buttons-wrapper");
    inputsWrapper.classList.add("inputsWrapper");

    const input = document.createElement("input");
    const button = document.createElement("button");

    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "https://example.com");
    button.setAttribute("type", "button");
    button.innerText = "Submit";

    inputsWrapper.append(input);
    buttonsWrapper.append(button);
    hyperlinkLinkModal.append(inputsWrapper, buttonsWrapper);

    tippyModal.innerHTML = "";
    tippyModal.append(hyperlinkLinkModal);
    tippy.update(options.editor.view);

    setTimeout(() => {
        input.focus();
    });

    button.addEventListener("click", () => {
        const url = input.value;

        if (!url) return;

        const sanitizeURL = find(url)
            .filter((link) => link.isLink)
            .filter((link) => {
                if (options.validate) {
                    return options.validate(link.value);
                }
                return true;
            })
            .at(0);

        if (!sanitizeURL?.href) return;

        tippy.hide();

        return options.editor
            .chain()
            .setMark(options.extentionName, { href: sanitizeURL.href })
            .setMeta("preventautolink", true)
            .run();
    });

    return tippyModal;
}
