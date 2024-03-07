export const getUserUrl = (str: string) => `/user${str}`

export const getAuthUrl = (str: string) => `/auth${str}`

export const uploadFilesUrl = (folder?: string) => `/upload/?folder=${folder}`
