export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export const IS_CLIENT = typeof window !== 'undefined'

export const API_URL = `${process.env.NEXTAUTH_URL}/v1/api`

export const LOCAL_API_URL = `${process.env.LOCAL_BACKEND_URL}/v1/api`

export const USER_PAGES = ['/cabinet'];

export const ADMIN_PAGES = ['/cms'];

