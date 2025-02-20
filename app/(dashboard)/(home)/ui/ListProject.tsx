import { Clock, Cpu, ListFilterPlus, PackageCheck } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";
import { Status } from "@/types";
import { statusColor } from "@/utils";

import ColumnProject from "./ColumnProject";
import FilterProject from "./FilterProject";

type Props = {
	className?: string;
};
type Title = {
	className?: string;
	label: string;
	icon: React.ReactNode;
};
const TitleRender: React.FC<Title> = ({ className, label, icon }) => {
	return (
		<h4
			className={cn(
				"flex gap-2 shadow-md ring-1 scroll-m-20 text-lg tracking-tight px-3 py-1 rounded-md bg-sky-200",
				className
			)}
		>
			{icon}
			{label}
		</h4>
	);
};
const StatusList = [
	{
		name: "Mới",
		status: Status.NEW,
		statusColor: statusColor[Status.NEW],
		title: await TitleRender({
			label: "Mới",
			icon: <ListFilterPlus />,
			className: "bg-sky-200",
		}),
	},
	{
		name: "Đang xử lý",
		statusColor: statusColor[Status.IN_PROGRESS],
		status: Status.IN_PROGRESS,
		title: await TitleRender({
			label: "Đang xử lý",
			icon: <Cpu />,
			className: "bg-amber-200",
		}),
	},
	{
		name: "Hoàn thành",
		statusColor: statusColor[Status.DONE],
		status: Status.DONE,
		title: await TitleRender({
			label: "Hoàn thành",
			icon: <PackageCheck />,
			className: "bg-green-200",
		}),
	},
	{
		name: "Trễ",
		statusColor: statusColor[Status.LATE],
		status: Status.LATE,
		title: await TitleRender({
			label: "Trễ",
			icon: <Clock />,
			className: "bg-red-200",
		}),
	},
];

const ListProject: React.FC<Props> = ({ className }) => {
	return (
		<div className="flex flex-col gap-6 h-full">
			<FilterProject />
			<div className={cn("grid grid-cols-4 gap-4 xl:gap-10", className)}>
				{StatusList.map((status) => (
					<ColumnProject
						key={status.name}
						status={status.status}
						statusColor={status.statusColor}
						title={status.title}
					/>
				))}
			</div>
		</div>
	);
};

export default ListProject;
