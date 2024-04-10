export const HandlerImageValidate = (value: File,
                                     imgWidth: number = 500,
                                     imgHeight: number | null = 500,
                                     errorSizeString: string = 'Зображення має бути 500x500',
                                     onlyFormatImg: string[] | null = null,
                                     onlyFormatRejectString: string = 'Тільки зображення png',
                                     valueSize: number = 2 * 1024 * 1024,
                                     excludeFormat: string[] | null = null,
                                     excludeFormatRejectString: string = 'Всі зображення крім') => {

    return new Promise<string>(async (resolve, reject) => {
        if (!acceptedFormats.includes(value.type)) {
            reject('Недійсний формат файлу. Дозволяються лише файли зображень.')
        } else if (onlyFormatImg && !onlyFormatImg.includes(value.type)) {
            reject(onlyFormatRejectString)
        } else if (excludeFormat && excludeFormat.includes(value.type)) {
            reject(excludeFormatRejectString)
        } else {
            const sizeFIle = value?.size < valueSize
            const fileReader = new FileReader();
            let img = new Image();

            const loadImage = new Promise<void>((resolve, reject): void => {
                fileReader.onload = (e) => {
                    img.src = e?.target?.result as string;
                    img.onload = () => {
                        if (value.type !== 'image/svg+xml') {
                            const isWidthValid = img.width === imgWidth;
                            const isHeightValid = imgHeight === null || img.height === imgHeight;
                            if (!isWidthValid || !isHeightValid) {
                                reject(errorSizeString)
                            } else {
                                resolve()
                            }
                        } else {
                            resolve()
                        }
                    }
                };
            })
            fileReader.readAsDataURL(value);
            try {
                await loadImage
                if (sizeFIle) {
                    resolve(value?.name)
                } else {
                    reject("Максимум 2mb")
                }

            } catch (error) {
                reject(errorSizeString)
            }
        }
    })
}

export const loadPreviewImage = (file: File | undefined): string | undefined => {
    if (file)
        return URL.createObjectURL(file);
    return undefined
};



export const acceptedFormats = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/jpg', 'image/webp'];