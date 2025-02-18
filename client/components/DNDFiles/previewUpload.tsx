"use client";
import React, { FC } from "react";
import CloseIcon from "@/UI/CloseIcon";
import PdfIcon from "@/UI/PdfIcon";
import WordIcon from "@/UI/WorkIcon";
import DocumentIcon from "@/UI/DocumentIcon";
import { Image } from "@nextui-org/react";
import { loadPreviewImage } from "@/utils/ImageValidate";
import { uploadType } from "app/[locale]/(dashboard)/cms/innovations/components/InnovationsEdit";
import NextImage from "next/image";

type Props = {
  files: uploadType[];
  handleRemoveFile: (index: number) => void;
  type?: string;
};

const PreviewUpload: FC<Props> = ({ files, handleRemoveFile, type }) => {
  const getIconByFileType = (file: uploadType, index: number): JSX.Element => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension === "pdf") {
      return <PdfIcon width={"35px"} height={"35px"} />;
    } else if (extension === "doc" || extension === "docx") {
      return <WordIcon width={"35px"} height={"35px"} />;
    } else if (type === "image" && file.file) {
      return (
        <div className="w-[50px] h-[50px]">
          <Image src={loadPreviewImage(file.file)} as={NextImage}
                 width={50}
                 height={50}
                 radius="sm"
                 alt="preview"
                 style={{ objectFit: 'contain' }} />
        </div>
      );
    } else if (type === "image") {
      return (
        <div className="w-[50px] h-[50px]">
          <Image src={encodeURI(file.url)} as={NextImage}
                 width={50}
                 height={50}
                 radius="sm"
                 alt="preview"
                 style={{ objectFit: 'fill' }} />
        </div>
      );
    } else {
      return <DocumentIcon width={"35px"} height={"35px"} />;
    }
  };

  const renderFileName = (fileName: string): string => {
    return fileName.replace("/uploads/pdf/", "").replace(/__[^.]+/, "");
  };

  return (
    <>
      {files.length > 0 && <div className="text-base mb-2  max-xl:!text-sm text-primary">Завантажені файли</div>}
      {files.map((fileOrString, index) => (
        <div key={index} className="flex w-full gap-3 flex-row items-center text-base text-primary">
          {getIconByFileType(fileOrString, index)}
          <span className="w-full truncate">{renderFileName(fileOrString.name)}</span>
          <span onClick={() => handleRemoveFile(index)} className="cursor-pointer">
            <CloseIcon />
          </span>
        </div>
      ))}
    </>
  );
};

export default PreviewUpload;
