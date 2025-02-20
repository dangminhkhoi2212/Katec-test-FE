"use client";
import "gantt-task-react/dist/index.css";

import dayjs from "dayjs";
import { Gantt, Task } from "gantt-task-react";
import React, { useEffect, useState } from "react";

import Empty from "@/components/shared/Empty";
import LoadingSpinner from "@/components/ui/loading-spinner";
import taskService from "@/services/task.service";
import { Status, TGanttTask, TTask } from "@/types";
import { useQuery } from "@tanstack/react-query";

import AddTaskButton from "./AddTaskButton";
import UpdateTaskButton from "./UpdateTaskButton";

type Props = { id: string };

const convertGanttTasks = (tasks: TTask[]): TGanttTask[] => {
	return tasks.map((task) => ({
		start: dayjs(task.assignedDate).toDate(),
		end: dayjs(task.dueDate).toDate(),
		name: task.name,
		id: task._id,
		type: "task",
		progress:
			task.status === Status.NEW
				? 0
				: task.status === Status.IN_PROGRESS
				? 45
				: task.status === Status.DONE
				? 100
				: 0,
		isDisabled: false,
		origin: task,
		// styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
	}));
};
const TaskList: React.FC<Props> = ({ id }) => {
	const { data: tasks, isLoading } = useQuery({
		queryKey: ["tasks", { project: id }],
		queryFn: () => taskService.getAll({ project: id }),
	});
	const [selected, setSelected] = useState<TTask | null>(null);
	const [ganttTasks, setGanttTasks] = useState<TGanttTask[]>([]);
	useEffect(() => {
		if (tasks?.data?.length) {
			console.log(tasks.data);
			setGanttTasks(convertGanttTasks(tasks.data));
		}
	}, [tasks]);
	return (
		<div className="bg-sky-50 p-4 rounded-lg flex flex-col gap-6 overflow-hidden min-h-96 w-full    ">
			<UpdateTaskButton task={selected} setTask={setSelected} />

			<div className="flex justify-between items-center">
				<h3 className="text-2xl font-semibold">Danh sách công việc</h3>
				<div className="flex justify-end gap-2">
					<AddTaskButton id={id} />
				</div>
			</div>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<div className="flex justify-center  max-w-full items-center  overflow-auto bg-white py-2 rounded-md">
					{ganttTasks?.length ? (
						<div className="w-full bg-whtie">
							<Gantt
								tasks={ganttTasks}
								locale="vi"
								listCellWidth="155px"
								barCornerRadius={5}
								onClick={(task: Task) => {
									const ganttTask = task as TGanttTask;
									setSelected(ganttTask.origin);
								}}
							/>
						</div>
					) : (
						<Empty />
					)}
				</div>
			)}
		</div>
	);
};

export default TaskList;
