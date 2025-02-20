import { Task } from "gantt-task-react";

import { TTask } from "./task.type";

export type TGanttTask = {
	origin: TTask;
} & Task;
