import { Audit, Priority, QueryBase, Status } from "@/types";

export type TProject = {
	id: number;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	status: Status;
	priority: Priority;
} & Audit;
export type TProjectQuery = {
	startDate?: string;
	endDate?: string;
	status?: Status;
	priority?: Priority;
} & QueryBase;
