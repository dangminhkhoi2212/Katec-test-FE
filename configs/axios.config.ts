import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_API_URL;

const headers = {
	Accept: "application/json",
	"Access-Control-Allow-Origin": "*",
	"ngrok-skip-browser-warning": true,
};
const axiosInterceptor = () => {
	const instance = axios.create({
		baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
		headers,
	});

	instance.interceptors.request.use(
		async (
			config: InternalAxiosRequestConfig
		): Promise<InternalAxiosRequestConfig> => {
			return config;
		}
	);

	instance.interceptors.response.use((response: AxiosResponse) => {
		return response;
	});

	return instance;
};

export default axiosInterceptor;
