import {IResponseMeta} from "@/types/Conference";

export const getContentType = () => ({
	'Content-Type': 'application/json',
})

export function getEmptyResponse<T>(): IResponseMeta<T[]> {
	return {
		data: [],
		meta: {
			total: 0,
			lastPage: 1,
			currentPage: 1,
			perPage: 5,
			prev: 1,
			next: 1
		}
	}
}

export const errorCatch = (error: any) => error.response && error.response.data ? typeof error.response.data.message === 'object' ? error.response.data.message[0] : error.response.data.message : error.message
