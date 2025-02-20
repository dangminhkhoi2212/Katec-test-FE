import { Audit, Priority, QueryBase, Status } from "@/types";

export type TProject = {
	_id: string;
	name: string;
	description?: string;
	startDate: string;
	endDate: string;
	status: Status;
	priority: Priority;
	isDeleted?: boolean;
} & Audit;

export type TProjectCrate = Omit<TProject, "_id" | keyof Audit>;
export type TProjectUpdate = Partial<TProjectCrate>;
export type TProjectQuery = {
	search?: string;
	sort?: string;
	status?: Status;
} & QueryBase;
