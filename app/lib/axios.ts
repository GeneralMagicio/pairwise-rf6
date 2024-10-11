import Axios, { InternalAxiosRequestConfig } from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	config.headers = config.headers || {};
	config.headers.Accept = 'application/json';
	const token = localStorage.getItem('auth');
	if (token) config.headers.auth = token;
	return config;
}

export const axios = Axios.create({
	baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);