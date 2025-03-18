'use client'
import React, {FC} from 'react';
import {Accordion, AccordionItem} from "@nextui-org/react";

const FolderIconOpen = (props: any) => {
    return (
        <svg width="40"
             height="32"
             viewBox="0 0 40 32"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
             {...props}
        >
            <path
                d="M36 4H20L16 0H4C1.8 0 0.02 1.8 0.02 4L0 28C0 30.2 1.8 32 4 32H36C38.2 32 40 30.2 40 28V8C40 5.8 38.2 4 36 4ZM36 28H4V8H36V28Z"
                fill="#1E1E1E"/>
        </svg>
    )
}

const FolderIconClose = (props: any) => {
    return (
        <svg width="40"
             height="32"
             viewBox="0 0 40 32"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
             {...props}
        >
            <path
                d="M16 0H4C1.8 0 0.02 1.8 0.02 4L0 28C0 30.2 1.8 32 4 32H36C38.2 32 40 30.2 40 28V8C40 5.8 38.2 4 36 4H20L16 0Z"
                fill="#1E1E1E"/>
        </svg>
    )
}

export interface FolderItem {
    title: string;
    content: React.ReactNode;
}

type Props = {
    items: FolderItem[];
}

const Folder: FC<Props> = ({items}) => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(['']));

    return (
        <Accordion selectedKeys={selectedKeys}
                   showDivider={false}
                   itemClasses={{
                       trigger: 'flex-row-reverse',
                       indicator: 'data-[open=true]:!rotate-[none]',
                   }}
                   className={"px-0"}
                   selectionMode={"multiple"}
                   onSelectionChange={(key) => setSelectedKeys(key as Set<string>)}>
            {items && items.map((folder, index) => (
                <AccordionItem
                    key={index}
                    indicator={({isOpen}) => (isOpen ? <FolderIconOpen/> : <FolderIconClose/>)}
                    aria-label={folder.title}
                    title={folder.title}
                >
                    <div className="flex flex-col gap-3 ml-10">
                        {folder.content}
                    </div>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default Folder;