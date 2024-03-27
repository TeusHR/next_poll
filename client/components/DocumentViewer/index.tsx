'use client'
import React from 'react'
import {Modal, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/react";
import {Button} from "@nextui-org/button";

const DocumentViewer = ({}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button onPress={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <iframe src="/image/document.pdf"
                                    style={{width: "600px", height: "500px"}}></iframe>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default DocumentViewer;