import axiosInterceptor from "@/configs/axios.config";
import {
	TProject,
	TProjectCrate,
	TProjectQuery,
	TProjectUpdate,
	TResponse,
} from "@/types";

const intercep = axiosInterceptor();
const create = async (data: TProjectCrate): Promise<TResponse<TProject>> => {
	return (await intercep.post("/api/projects", data)).data;
};
const update = async (
	id: string,
	data: TProjectUpdate
): Promise<TResponse<TProject>> => {
	return (await intercep.patch(`/api/projects/${id}`, data)).data;
};
const getAll = async (query: TProjectQuery): Promise<TResponse<TProject[]>> => {
	return (
		await intercep.get("/api/projects", {
			params: { ...query, isDeleted: false },
		})
	).data;
};
const getOneById = async (id: string): Promise<TResponse<TProject>> => {
	return (await intercep.get(`/api/projects/${id}`)).data;
};
const projectService = {
	getAll,
	create,
	update,
	getOneById,
};
export default projectService;
