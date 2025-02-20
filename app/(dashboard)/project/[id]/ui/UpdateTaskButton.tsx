import React, { useEffect } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { TTask } from "@/types";

import UpdateTaskForm from "./UpdateTaskForm";

type Props = {
	setTask: React.Dispatch<React.SetStateAction<TTask | null>>;
	task: TTask | null;
};
const UpdateTaskButton: React.FC<Props> = ({ setTask, task }) => {
	const [openModal, setOpenModal] = React.useState(false);
	useEffect(() => {
		setOpenModal(!!task);
	}, [task]);
	useEffect(() => {
		if (!openModal) {
			setTask(null);
		}
	}, [openModal, setTask]);
	return (
		<div>
			<Dialog open={openModal} onOpenChange={setOpenModal}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Cập nhật công việc</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					{task && <UpdateTaskForm task={task} setTask={setTask} />}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default UpdateTaskButton;
