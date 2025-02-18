import axiosInterceptor from "@/configs/axios.config";
import { TProject, TProjectQuery, TResponse } from "@/types";

const intercep = axiosInterceptor();
const getAll = async (query: TProjectQuery): Promise<TResponse<TProject[]>> => {
	return (await intercep.get("/api/projects", { params: query })).data;
};
const projectService = {
	getAll,
};
export default projectService;
