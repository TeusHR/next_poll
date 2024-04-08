'use client'
import React, {FC, useEffect, useRef, useState} from 'react'
import {DragEvent} from "react";


type Props = {
    onUpload: (files: File[]) => void
    styleContainer?: string
    onChange?: (...event: any[]) => void
    children: React.ReactNode
    formats?: string[]
    size?: number
    multiple?: boolean
    count?: number
}

interface IMessage {
    show: boolean,
    text: string | null,
    type: string | null,
}

const ConstFormats = ['.pdf',
    '.doc',
    '.docx',
    '.xml',]

const DNDUpload: FC<Props> = ({
                                  onUpload,
                                  styleContainer,
                                  onChange,
                                  children,
                                  multiple = true,
                                  size,
                                  formats = ConstFormats,
                                  count
                              }) => {

    const drag = useRef<HTMLDivElement>(null);

    const [dragIsOver, setDragIsOver] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState(false);

    const [filesInput, setFilesInput] = useState<string>('');


    const [message, setMessage] = useState<IMessage>({
        show: false,
        text: null,
        type: null,
    });

    const showMessage = (text: string | null, type: string | null, timeout: number) => {
        setMessage({
            show: true,
            text,
            type,
        });

        setTimeout(() => setMessage({
            show: false,
            text: null,
            type: null,
        }), timeout);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragIsOver(true);
    };

    const handleDragEnder = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.target !== drag.current) {
            setDragging(true);
        }
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragIsOver(false);

        if (event.target === drag.current) {
            setDragging(false);
        }
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragIsOver(false);
        setDragging(false);

        const droppedFiles = Array.from(event.dataTransfer.files);

        if (count && count < files.length) {
            showMessage(`Тільки ${count} файл${count !== 1 ? 'ов' : ''} можна завантажувати одночасно`, 'error', 2000);
            return;
        }

        if (checkFormats(droppedFiles))
            return;

        setFiles(droppedFiles);

        droppedFiles.forEach((file) => {
            const reader = new FileReader();

            // reader.onloadend = () => {
            //     console.log(reader.result);
            // };

            reader.onerror = () => {
                console.error("Під час читання файлу виникла проблема.");
            };

            reader.readAsDataURL(file);
            return reader;
        });
    };

    useEffect(() => {
        if (files.length > 0) {
            onUpload(files)
            if (onChange) {
                onChange(files);
            }
            showMessage(`Файл${count !== 1 ? 'и' : ''} успішно завантажено`, 'success', 2500);
            setFiles([]);
        }
    }, [count, files, onChange, onUpload])

    const checkFormats = (file: File[]): boolean => {
        const invalidFiles = file.filter(file => {
            const extensionMatch = formats.some(extension => file.name.toLowerCase().endsWith(extension));
            return !extensionMatch;
        });
        if (invalidFiles.length > 0) {
            const allowedFormats = [...formats].join(', ');
            showMessage(`Прийнятні лише такі формати файлів: ${allowedFormats}`, 'error', 3000);
            return true;
        }

        return false
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputFiles = event.target.files;
        if (inputFiles) {
            const inputFilesArray = Array.from(inputFiles);
            if (!checkFormats(inputFilesArray)) {
                setFiles(inputFilesArray);
            }
        }
    };


    return (
        <div
            className={styleContainer}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnder}
            onDrop={handleDrop}
            // ref={drop}
        >
            {message.show && (
                <div
                    className="w-full h-full flex z-50 text-center items-center justify-center bg-default-100 rounded-[12px]">
                    {message.text}
                </div>
            )}
            {dragging && (
                <div
                    ref={drag}
                    className="w-full h-full flex z-50 items-center justify-center bg-default-100 rounded-[12px]"
                >
                    Опустіть цей файл нижче
                </div>
            )}
            <div className={(dragging || message.show) ? 'hidden' : ''}>
                {children}
            </div>
            <div className="absolute w-full h-full opacity-0">
                <input
                    type={"file"}
                    multiple={multiple}
                    className="w-full h-full"
                    size={size}
                    accept={formats.toString()}
                    value={filesInput}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default DNDUpload;