'use client'
import React from 'react'
import {Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
// import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const DocumentViewer = ({}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    // const docs = [
    //     { uri: "http://localhost:3000/image/document.pdf" },
    //     { uri: require("./image/document.pdf") }, // Local File
    // ];

    return (
        <div className="flex flex-col gap-2">
            <Button onClick={onOpen}>Open Modal</Button>
            {/*<DocViewer documents={docs} />*/}
            {/*<Document file={"/image/document.pdf"}>*/}
            {/*    <Page pageNumber={1} />*/}
            {/*</Document>*/}

            {/*<Modal isOpen={isOpen} onOpenChange={onOpenChange}*/}
            {/*       placement={"top"}*/}
            {/*       radius="lg"*/}
            {/*       classNames={{*/}
            {/*           body: "py-6",*/}
            {/*           backdrop: "bg-[#292f46]/50 backdrop-opacity-40",*/}
            {/*           base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",*/}
            {/*           header: "border-b-[1px] border-[#292f46]",*/}
            {/*           footer: "border-t-[1px] border-[#292f46]",*/}
            {/*           closeButton: "hover:bg-white/5 active:bg-white/10",*/}
            {/*       }}*/}
            {/*       // portalContainer={document.getElementsByTagName('main')[0]}*/}
            {/*>*/}
            {/*    <ModalContent>*/}
            {/*        {(onClose) => (*/}
            {/*            <>*/}
            {/*                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>*/}
            {/*                <ModalBody>*/}
            {/*                    <p>*/}
            {/*                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.*/}
            {/*                        Nullam pulvinar risus non risus hendrerit venenatis.*/}
            {/*                        Pellentesque sit amet hendrerit risus, sed porttitor quam.*/}
            {/*                    </p>*/}
            {/*                    <p>*/}
            {/*                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.*/}
            {/*                        Nullam pulvinar risus non risus hendrerit venenatis.*/}
            {/*                        Pellentesque sit amet hendrerit risus, sed porttitor quam.*/}
            {/*                    </p>*/}
            {/*                    <p>*/}
            {/*                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit*/}
            {/*                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.*/}
            {/*                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.*/}
            {/*                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur*/}
            {/*                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.*/}
            {/*                    </p>*/}
            {/*                </ModalBody>*/}
            {/*                <ModalFooter>*/}
            {/*                    <Button color="danger" variant="light" onPress={onClose}>*/}
            {/*                        Close*/}
            {/*                    </Button>*/}
            {/*                    <Button color="primary" onPress={onClose}>*/}
            {/*                        Action*/}
            {/*                    </Button>*/}
            {/*                </ModalFooter>*/}
            {/*            </>*/}
            {/*        )}*/}
            {/*    </ModalContent>*/}
            {/*</Modal>*/}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <iframe src="/image/document.pdf"></iframe>
                                {/*<Viewer fileUrl="/image/document.pdf" />*/}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default DocumentViewer;