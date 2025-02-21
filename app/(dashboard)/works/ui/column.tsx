"use client";

import { TTask } from "@/types";
import { formatDate, priorityBage, statusBage } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};

export const columns: ColumnDef<TTask>[] = [
	{
		accessorKey: "name",
		header: "Công việc",
	},
	{
		accessorKey: "employee",
		header: "Nhân viên",
	},
	{
		accessorKey: "assignedDate",
		header: "Ngày giao",
		cell({ row }) {
			return formatDate(row.original.assignedDate, {
				removeTime: true,
			});
		},
	},
	{
		accessorKey: "dueDate",
		header: "Ngày kết thúc",
		cell({ row }) {
			return formatDate(row.original.dueDate, {
				removeTime: true,
			});
		},
	},
	{
		accessorKey: "status",
		header: "Trạng thái",
		cell({ row }) {
			return statusBage[row.original.status];
		},
	},
	{
		accessorKey: "priority",
		header: "Độ ưu tiên",
		cell({ row }) {
			return priorityBage[row.original.priority];
		},
	},
];
