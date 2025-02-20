import axiosInterceptor from "@/configs/axios.config";
import { TResponse, TTask, TTaskCrate, TTaskQuery, TTaskUpdate } from "@/types";

const intercep = axiosInterceptor();
const create = async (data: TTaskCrate): Promise<TResponse<TTask>> => {
	return (await intercep.post("/api/tasks", data)).data;
};
const update = async (
	id: string,
	data: TTaskUpdate
): Promise<TResponse<TTask>> => {
	return (await intercep.patch(`/api/tasks/${id}`, data)).data;
};
const getAll = async (query: TTaskQuery): Promise<TResponse<TTask[]>> => {
	return (
		await intercep.get("/api/tasks", {
			params: { ...query, isDeleted: false },
		})
	).data;
};
const getOneById = async (id: string): Promise<TResponse<TTask>> => {
	return (await intercep.get(`/api/tasks/${id}`)).data;
};
const taskService = {
	getAll,
	create,
	update,
	getOneById,
};
export default taskService;
