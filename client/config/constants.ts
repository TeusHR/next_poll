export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export const IS_CLIENT = typeof window !== 'undefined'

export const API_URL = `http://localhost:3000/v1/api`

export const LOCAL_API_URL = `http://localhost:4000/v1/api`

export const USER_PAGES = ['/cabinet'];

export const ADMIN_PAGES = ['/cms'];

