'use client'
import React, {FC} from 'react'
import CloseIcon from "@/UI/CloseIcon";
import PdfIcon from "@/UI/PdfIcon";
import WordIcon from "@/UI/WorkIcon";
import DocumentIcon from "@/UI/DocumentIcon";

type Props = {
    files: string[],
    handleRemoveFile: (index: number) => void,
}

const PreviewUpload: FC<Props> = ({files, handleRemoveFile}) => {

    const getIconByFileType = (fileName: string): JSX.Element => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        if (extension === 'pdf') {
            return <PdfIcon width={'35px'} height={'35px'}/>;
        } else if (extension === 'doc' || extension === 'docx') {
            return <WordIcon width={'35px'} height={'35px'}/>;
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
                    {getIconByFileType(fileOrString)}
                    <span className="w-full truncate">
                         {renderFileName(fileOrString)}
                    </span>
                    <span onClick={() => handleRemoveFile(index)}>
                        <CloseIcon />
                    </span>
                </div>
            ))}
        </>
    )
}

export default PreviewUpload;