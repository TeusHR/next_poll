import sanitizeHtml from 'sanitize-html'
export const getQueryString = (name: string, value: string, searchParams: URLSearchParams, pathname: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    return `${pathname}?${params.toString()}`
}

export const stripHtml = (html: any) => {
    return sanitizeHtml(html, {
        allowedTags: [],
        allowedAttributes: {}
    });
    // const doc = new DOMParser().parseFromString(html, 'text/html');
    // return doc.body.textContent || ""
}
