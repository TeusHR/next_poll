import React, {FC} from 'react';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Tab,
    Tabs
} from "@nextui-org/react";
import CreateFilterForm from "@/components/CMS/CreateFilterForm";
import EditFilterModal from "@/components/CMS/EditFilterForm";

type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
}

const InnovationFilterModal:FC<Props> = ({isOpen, onOpen, onOpenChange}) => {
    const [selected, setSelected] = React.useState("create");

    return (
        <div className="flex flex-col w-full">
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <Tabs
                                fullWidth
                                aria-label="Tabs form"
                                selectedKey={selected}
                                size="md"
                                classNames={{
                                    panel:'py-8'
                                }}
                                onSelectionChange={(key)=>setSelected(key.toString())}
                            >
                                <Tab key="create" title="Створити">
                                    <div className="flex flex-col">
                                        <ModalHeader className="flex flex-col gap-1 px-6 py-1">Створити фільтр</ModalHeader>
                                        <ModalBody>
                                            <CreateFilterForm/>
                                        </ModalBody>
                                    </div>
                                </Tab>
                                <Tab key="update" title="Оновити">
                                    <div className="flex flex-col">
                                        <ModalHeader className="flex flex-col gap-1 px-6 py-1">Оновити фільтр</ModalHeader>
                                        <ModalBody>
                                           <EditFilterModal/>
                                        </ModalBody>
                                    </div>
                                </Tab>
                            </Tabs>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default InnovationFilterModal;