import { Plus } from "lucide-react";
import React from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import AddTaskForm from "./AddTaskForm";
import { projectDetailStore } from "./projectDetailStore";

type Props = {
	id: string;
};

const AddTaskButton: React.FC<Props> = ({ id }) => {
	const { open, setOpen } = projectDetailStore((state) => state);
	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>
					<div className="flex items-center gap-2 py-2 px-4 rounded-md bg-primary text-white">
						Thêm dự án <Plus size={16} />
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Thêm dự án mới</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<AddTaskForm id={id} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddTaskButton;
