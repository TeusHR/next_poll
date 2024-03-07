import {ChangeEvent, useEffect, useState} from 'react';

function usePreviewLoader() {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [preview, setPreview] = useState<string | undefined>();
    const onSelectFile = (e: ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files || e.target.files.length === 0)
            setSelectedFile(undefined);
        else
            setSelectedFile(e.target.files[0]);
    };


    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    return {preview, setPreview, selectedFile, setSelectedFile, onSelectFile} as const;
}

export default usePreviewLoader;