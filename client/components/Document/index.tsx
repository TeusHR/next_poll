'use client'
import React from 'react'
import Link from "next/link";
import {useDisclosure} from "@nextui-org/react";

const Document = ({}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <Link href={"/"} className="flex flex-row gap-3">
            <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.33332 20.6668H17.6667V23.5002H6.33332V20.6668ZM6.33332 15.0002H17.6667V17.8335H6.33332V15.0002ZM14.8333 0.833496H3.49999C1.94166 0.833496 0.666656 2.1085 0.666656 3.66683V26.3335C0.666656 27.8918 1.92749 29.1668 3.48582 29.1668H20.5C22.0583 29.1668 23.3333 27.8918 23.3333 26.3335V9.3335L14.8333 0.833496ZM20.5 26.3335H3.49999V3.66683H13.4167V10.7502H20.5V26.3335Z"
                    fill="#2E2C39"/>
            </svg>
            <span>
                Документ
            </span>
        </Link>
    )
}

export default Document;