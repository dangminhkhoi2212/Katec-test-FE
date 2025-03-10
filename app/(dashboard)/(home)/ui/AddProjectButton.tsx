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

import AddProjectForm from "./AddProjectForm";
import { projectStore } from "./store";

type Props = Record<string, unknown>;

const AddProjectButton: React.FC<Props> = () => {
	const { open, setOpen } = projectStore((state) => state);
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
					<AddProjectForm />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddProjectButton;
