import { Audit, Priority, QueryBase, Status } from "@/types";

export type TTask = {
	_id: string;
	name: string;
	employee: string;
	description?: string;
	assignedDate: string;
	dueDate: string;
	status: Status;
	priority: Priority;
	isDeleted?: boolean;
	project: string;
} & Audit;

export type TTaskCrate = Omit<TTask, "_id" | keyof Audit>;
export type TTaskUpdate = Partial<TTaskCrate>;
export type TTaskQuery = {
	assginedDate?: string;
	dueDate?: string;
	date?: string;
	project?: string;
	status?: Status;
	priority?: Priority;
} & QueryBase;
