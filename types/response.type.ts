export type TResponse<T> = {
	statusCode: number;
	message: string;
	error: unknown;
	data: T;
};
