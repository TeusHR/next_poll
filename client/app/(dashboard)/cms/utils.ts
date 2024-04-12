export const getQueryString = (name: string, value: string, searchParams: URLSearchParams, pathname: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    return `${pathname}?${params.toString()}`
}
