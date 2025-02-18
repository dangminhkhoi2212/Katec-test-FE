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

type Props = Record<string, unknown>;

const AddProjectButton: React.FC<Props> = () => {
	return (
		<div>
			<Dialog>
				<DialogTrigger>
					<div className="flex items-center gap-2 py-2 px-4 rounded-md bg-primary text-white">
						Thêm dự án <Plus size={16} />
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently
							delete your account and remove your data from our
							servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddProjectButton;
