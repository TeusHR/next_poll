export function FileToFileList(files: File[]): FileList {
    const dataTransfer = new DataTransfer();

    files.forEach(file => {
        dataTransfer.items.add(file);
    });

    return dataTransfer.files;
}

export type FileItem = {
    name: string;
    type: 'uploaded' | 'server';
    file?: File;
    url: string;
}