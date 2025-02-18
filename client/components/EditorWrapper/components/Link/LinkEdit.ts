import {Editor} from "@tiptap/core";
import {EditorView} from "@tiptap/pm/view";
import * as tippy from "@/components/EditorWrapper/utils/tippy";
import {roundArrow} from "tippy.js";


type EditHyperlinkModalOptions = {
    editor: Editor;
    validate?: (url: string) => boolean;
    view: EditorView;
    link: HTMLAnchorElement;
    hyperlinkLinkModal: HTMLElement;
};

export const editHyperlinkHandler = (options: EditHyperlinkModalOptions) => {
    const {hyperlinkLinkModal, editor, view, link} = options;

    const buttonsWrapper = document.createElement("div");
    const inputsWrapper = document.createElement("div");

    const linkTextInput = document.createElement("input");
    const hrefInput = document.createElement("input");
    const applyButton = document.createElement("button");

    buttonsWrapper.classList.add("hyperlink-edit-modal__buttons-wrapper");
    inputsWrapper.classList.add("inputsWrapper");

    linkTextInput.type = "text";
    linkTextInput.value = link?.innerText || "";
    linkTextInput.placeholder = "Введіть текст посилання";

    hrefInput.type = "text";
    hrefInput.value = link.href;
    hrefInput.placeholder = "Вставте посилання";

    applyButton.type = "button";
    applyButton.classList.add("hyperlink-set-modal__apply-button");
    applyButton.innerText = "Застосувати";

    inputsWrapper.append(linkTextInput, hrefInput);
    buttonsWrapper.append(applyButton);

    hyperlinkLinkModal.innerHTML = "";
    hyperlinkLinkModal.append(inputsWrapper, buttonsWrapper);

    applyButton.addEventListener("click", () => {
        const newLinkText = linkTextInput.value;
        const newHref = hrefInput.value;

        tippy.destroyTooltip();

        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .editHyperlink({
                newURL: newHref,
                newText: newLinkText,
            });

    });


    tippy.update(view, {
        arrow: roundArrow,
    });

    setTimeout(() => linkTextInput.focus());
};