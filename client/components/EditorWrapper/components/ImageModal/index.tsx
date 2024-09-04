import React, {FC, useCallback, useState} from 'react';
import {Button, Input, Modal, ModalBody, ModalContent, Tab, Tabs, useDisclosure} from "@nextui-org/react";
import {Editor} from "@tiptap/core";
import DNDUpload from "@/components/DNDFiles";

type Props = {
    editor: Editor
}

const ImageModal: FC<Props> = ({editor}) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [url, setUrl] = useState('')

    const [inputURL, setInputURL] = useState("")
    const [inputAlt, setInputAlt] = useState("")

    const handleApplyUrl = () => {
        editor.chain().setImage({src:inputURL, alt:inputAlt}).run()
        onClose()
        setInputURL("")
        setInputAlt("")
    }


    const handleUpload = useCallback(async (uploadedFiles: File[], type: 'file' | 'image') => {

        if (uploadedFiles.length === 0) return;

        const file = uploadedFiles[0];

        editor.chain().uploadImage({file:file})

        const reader = new FileReader();

        reader.onloadend = () => {
            const result = reader.result as string;
            setUrl(result);
            editor.chain().setImage({src: result, alt: file.name}).run();
            onClose()
        };

        reader.readAsDataURL(file);
        console.log(uploadedFiles)

    }, [editor, url, onClose]);


    return (
        <>
            <Button onPress={onOpen}
                    isIconOnly aria-label="link"
                    className={`w-[50px] h-[50px] max-[580px]:max-w-[32px] bg-transparent max-[580px]:min-w-[32px] max-[580px]:h-[32px] max-[580px]:w-[32px]" 
                    ${editor.isActive('link') ? 'is-active border-gray-500 solid border-1' : ''}`}>
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px] ">
                    <path
                        d="M5 11.1005L7 9.1005L12.5 14.6005L16 11.1005L19 14.1005V5H5V11.1005ZM5 13.9289V19H8.1005L11.0858 16.0147L7 11.9289L5 13.9289ZM10.9289 19H19V16.9289L16 13.9289L10.9289 19ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10Z"></path>
                </svg>
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop={'transparent'}
                size="xs"
                classNames={{
                    base: 'max-w-[20rem]'
                }}
                closeButton={<></>}
            >
                <ModalContent
                >
                    {() => (
                        <>
                            <ModalBody className="px-2 py-2 flex-row gap-4 items-center">
                                <div className="flex flex-col w-full">
                                    <Tabs aria-label="Options" color="primary" variant="solid"
                                          classNames={{
                                              cursor:"bg-white",
                                              base:"justify-center",
                                              panel:"pt-3 pb-0"
                                          }}
                                    >
                                        <Tab
                                            key="upload"
                                            title={
                                                <div className="flex items-center space-x-2">
                                                    <svg viewBox="0 0 24 24"
                                                         className="!h-[16px] max-[580px]:!h-[13px] ">
                                                        <path
                                                            d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"></path>
                                                    </svg>
                                                    <span className="text-black">Upload</span>
                                                </div>
                                            }
                                        >
                                            <DNDUpload onUpload={(files) => handleUpload(files, 'image')}
                                                       formats={[".png", ".jpeg", ".jpg"]}
                                                       styleContainer="w-full relative h-[90px] max-sm:h-[70px] flex items-center justify-center text-sm max-sm:text-base border-2 border-primary border-dashed">
                                                <div>
                                                    <span className="font-bold">
                                                        Drop image
                                                    </span>
                                                    <br/>
                                                    or click
                                                </div>
                                            </DNDUpload>
                                        </Tab>
                                        <Tab
                                            key="url"
                                            title={
                                                <div className="flex items-center space-x-2">
                                                    <svg viewBox="0 0 24 24"
                                                         className="!h-[16px] max-[580px]:!h-[13px] ">
                                                        <path
                                                            d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path>
                                                    </svg>
                                                    <span className="text-black">URL</span>
                                                </div>
                                            }
                                        >
                                            <div className="flex flex-col gap-2 justify-center">
                                                <Input type="text"
                                                       label="URL"
                                                       value={inputURL}
                                                       onChange={(evt)=>setInputURL(evt.target.value)}
                                                       placeholder="https://"/>
                                                <Input type="text"
                                                       label="Назва"
                                                       value={inputAlt}
                                                       onChange={(evt)=>setInputAlt(evt.target.value)}
                                                       placeholder="Назва зображення"/>
                                                <div className="text-center">
                                                    <Button
                                                        className="px-6 bg-fd text-base"
                                                        onClick={handleApplyUrl}
                                                    >
                                                        Submit
                                                    </Button>
                                                </div>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ImageModal;