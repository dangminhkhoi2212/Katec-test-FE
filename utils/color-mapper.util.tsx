import { Badge } from "@/components/ui/badge";
import { Priority, Status } from "@/types";

export const priorityColor = {
	[Priority.HIGH]: "bg-red-400",
	[Priority.MEDIUM]: "bg-amber-400",
	[Priority.LOW]: "bg-amber-400",
};
export const statusColor = {
	[Status.NEW]: "bg-cyan-200",
	[Status.IN_PROGRESS]: "bg-yellow-300",
	[Status.DONE]: "bg-green-200",
	[Status.LATE]: "bg-red-300",
};
export const priorityBage = {
	[Priority.LOW]: (
		<Badge variant="default" className="bg-gray-200 text-gray-500">
			Thấp
		</Badge>
	),
	[Priority.MEDIUM]: (
		<Badge variant="default" className="!bg-primary/50 text-blue-500">
			Trung bình
		</Badge>
	),
	[Priority.HIGH]: (
		<Badge variant="default" className="bg-red-200 text-red-500">
			Cao
		</Badge>
	),
};
