import axios from 'axios'
import { getContentType } from './api.helpers'
import {API_URL} from "@/config/constants";


export const $api = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
})
