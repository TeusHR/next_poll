'use client'
import React, {FC, useEffect, useRef, useState} from 'react'
import {DragEvent} from "react";
import {Input} from "@nextui-org/input";

type Props = {
    onUpload: (files: File[]) => void
    styleContainer?: string
    children: React.ReactNode
    formats?: string[]
    multiple?: boolean
    count?: number
}

interface IMessage {
    show: boolean,
    text: string | null,
    type: string | null,
}

const DNDUpload: FC<Props> = ({
                                  onUpload,
                                  styleContainer,
                                  children,
                                  multiple= true,
                                  formats,
                                  count
                              }) => {
    // const drop = React.useRef<HTMLDivElement>(null);
    // const [dragging, setDragging] = React.useState(false);
    //
    // useEffect(() => {
    //     if (drop.current) {
    //         drop.current.addEventListener('dragover', handleDragOver);
    //         drop.current.addEventListener('drop', handleDrop);
    //         drop.current.addEventListener('dragenter', handleDragEnter);
    //         drop.current.addEventListener('dragleave', handleDragLeave);
    //     }
    //
    //     return () => {
    //         if (drop.current) {
    //             drop.current.removeEventListener('dragover', handleDragOver);
    //             drop.current.removeEventListener('drop', handleDrop);
    //             drop.current.removeEventListener('dragenter', handleDragEnter);
    //             drop.current.removeEventListener('dragleave', handleDragLeave);
    //         }
    //     };
    // }, []);
    //
    // const handleDragOver = (e: any) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    // };
    //
    // const handleDrop = (e: any) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //
    //     const files = [...e.dataTransfer.files];
    //
    //     // check if the provided count prop is less than uploaded count of files
    //     if (count && count < files.length) {
    //         console.log(`Only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time`);
    //         return;
    //     }
    //
    //     // check if some uploaded file is not in one of the allowed formats
    //     if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
    //         console.log(`Only following file formats are acceptable: ${formats.join(', ')}`);
    //         return;
    //     }
    //
    //     if (files && files.length) {
    //         console.log(files)
    //     }
    // };
    //
    // const handleDragEnter = (e:any) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //
    //     setDragging(true);
    // };
    //
    // const handleDragLeave = (e:any) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //
    //     setDragging(false);
    // };

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
        setFiles(droppedFiles);

        if (count && count < files.length) {
            showMessage(`Тільки ${count} файл${count !== 1 ? 'ов' : ''} можна завантажувати одночасно`, 'error', 2000);
            return;
        }

        if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
            showMessage(`Прийнятні лише такі формати файлів: ${formats.join(', ')}`, 'error', 2000);
            return;
        }

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
        console.log(files)
        if (files.length > 0) {
            onUpload(files)
            showMessage(`Файл${count !== 1 ? 'и' : ''} успішно завантажено`, 'success', 1000);
            setFiles([]);
        }
    }, [count, files, onUpload])


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputFiles = event.target.files;
        console.log(inputFiles)
        console.dir(event.target)
        if (inputFiles) {
            const inputFilesArray = Array.from(inputFiles);
            onUpload(inputFilesArray);
            // showMessage(`Файл${inputFilesArray.length !== 1 ? 'и' : ''} успішно завантажено`, 'success', 1000);
            setFilesInput(event.target.value);
        }
    };

    useEffect(() => {
        console.log(filesInput)
    }, [filesInput])

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
                <div className="w-full h-full flex z-50 items-center justify-center bg-default-100 rounded-[12px]">
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
                <Input
                    type={"file"}
                    multiple={multiple}
                    accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    classNames={{
                        base: 'h-full',
                        inputWrapper: 'h-full'
                    }}
                    value={filesInput}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default DNDUpload;