'use client'
import React, {FC} from 'react'
import CloseIcon from "@/UI/CloseIcon";
import PdfIcon from "@/UI/PdfIcon";
import WordIcon from "@/UI/WorkIcon";
import DocumentIcon from "@/UI/DocumentIcon";
import {Image} from "@nextui-org/react";
import {loadPreviewImage} from "@/utils/ImageValidate";

type Props = {
    files: string[],
    handleRemoveFile: (index: number) => void,
    type?: string
    fileImage?: File[]
}

const PreviewUpload: FC<Props> = ({files, handleRemoveFile, type, fileImage}) => {

    const getIconByFileType = (fileName: string, index: number): JSX.Element => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        if (extension === 'pdf') {
            return <PdfIcon width={'35px'} height={'35px'}/>;
        } else if (extension === 'doc' || extension === 'docx') {
            return <WordIcon width={'35px'} height={'35px'}/>;
        } else if (type === 'image' && fileImage) {
            return <div className="w-[50px]">
                <Image src={loadPreviewImage(fileImage[index])}
                       alt="preview"/>
            </div>;
        } else {
            return <DocumentIcon width={'35px'} height={'35px'}/>;
        }
    }

    const renderFileName = (fileName: string): string => {
        return fileName.replace('/uploads/pdf/', '');
    }

    return (
        <>
            {files.length > 0 &&
                <div className="text-base mb-2  max-xl:!text-sm text-primary">
                    Завантажені файли
                </div>
            }
            {files.map((fileOrString, index) => (
                <div key={index} className="flex w-full gap-3 flex-row items-center text-base text-primary">
                    {getIconByFileType(fileOrString, index)}
                    <span className="w-full truncate">
                         {renderFileName(fileOrString)}
                    </span>
                    <span onClick={() => handleRemoveFile(index)} className="cursor-pointer">
                        <CloseIcon/>
                    </span>
                </div>
            ))}
        </>
    )
}

export default PreviewUpload;