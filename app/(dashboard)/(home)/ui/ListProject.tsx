import React from "react";

import { Status } from "@/types";

import ColumnProject from "./ColumnProject";

const StatusList = [
	{
		name: "Mới",
		color: "bg-sky-200",
		status: Status.NEW,
	},
	{
		name: "Đang xử lý",
		color: "bg-yellow-200",
		status: Status.IN_PROGRESS,
	},
	{
		name: "Hoàn thành",
		color: "bg-green-200",
		status: Status.DONE,
	},
	{
		name: "Trễ",
		color: "bg-red-300",
		status: Status.LATE,
	},
];
const ListProject: React.FC = ({}) => {
	return (
		<div className="grid grid-cols-4 gap-10">
			{StatusList.map((status) => (
				<ColumnProject
					key={status.name}
					title={status.name}
					color={status.color}
					status={status.status}
				/>
			))}
		</div>
	);
};

export default ListProject;
