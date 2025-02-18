import {Button, Input, Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/react";
import {Editor} from "@tiptap/core";
import {ChangeEvent, FC, useState} from "react";

type Props = {
    editor: Editor
}

const LinkModal: FC<Props> = ({editor}) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [link, setLink] = useState('')


    const handleApplyLink = () => {
        editor.chain().setLink({href: link}).run()
        setLink('')
        onClose()
    }

    const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
    };


    return (
        <>
            <Button onPress={onOpen}
                    isIconOnly aria-label="link"
                    className={`w-[50px] h-[50px] max-[580px]:max-w-[32px] bg-transparent max-[580px]:min-w-[32px] max-[580px]:h-[32px] max-[580px]:w-[32px]" 
                    ${editor.isActive('link') ? 'is-active border-gray-500 solid border-1' : ''}`}>
                <svg viewBox="0 0 24 24"
                     className="!w-full !h-[30px] max-[580px]:!h-[20px] ">
                    <path
                        d="M13.0607 8.11097L14.4749 9.52518C17.2086 12.2589 17.2086 16.691 14.4749 19.4247L14.1214 19.7782C11.3877 22.5119 6.95555 22.5119 4.22188 19.7782C1.48821 17.0446 1.48821 12.6124 4.22188 9.87874L5.6361 11.293C3.68348 13.2456 3.68348 16.4114 5.6361 18.364C7.58872 20.3166 10.7545 20.3166 12.7072 18.364L13.0607 18.0105C15.0133 16.0578 15.0133 12.892 13.0607 10.9394L11.6465 9.52518L13.0607 8.11097ZM19.7782 14.1214L18.364 12.7072C20.3166 10.7545 20.3166 7.58872 18.364 5.6361C16.4114 3.68348 13.2456 3.68348 11.293 5.6361L10.9394 5.98965C8.98678 7.94227 8.98678 11.1081 10.9394 13.0607L12.3536 14.4749L10.9394 15.8891L9.52518 14.4749C6.79151 11.7413 6.79151 7.30911 9.52518 4.57544L9.87874 4.22188C12.6124 1.48821 17.0446 1.48821 19.7782 4.22188C22.5119 6.95555 22.5119 11.3877 19.7782 14.1214Z">
                    </path>
                </svg>
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop={'transparent'}
                closeButton={<></>}
            >
                <ModalContent
                >
                    {() => (
                        <>
                            <ModalBody className="px-2 py-2 flex-row gap-4 items-center">
                                <Input
                                    type="text"
                                    variant="flat"
                                    label="Посилання"
                                    placeholder="Введіть своє посилання"
                                    value={link}
                                    onChange={handleLinkChange}
                                />
                                <Button onClick={() => handleApplyLink()}
                                        className="px-6 bg-fd text-base"
                                >
                                    Зберегти
                                </Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default LinkModal;

