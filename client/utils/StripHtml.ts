import sanitizeHtml from 'sanitize-html'
export const getQueryString = (name: string, value: string, searchParams: URLSearchParams, pathname: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    return `${pathname}?${params.toString()}`
}

export const stripHtml = (html: any, limit = 0) => {
    const str =  sanitizeHtml(html, {
        allowedTags: [],
        allowedAttributes: {}
    });
    return limit ? str.slice(0, limit) + '...' : str
    // const doc = new DOMParser().parseFromString(html, 'text/html');
    // return doc.body.textContent || ""
}
