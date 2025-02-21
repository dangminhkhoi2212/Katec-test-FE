"use client";
import React from "react";

import Empty from "@/components/shared/Empty";
import LoadingSpinner from "@/components/ui/loading-spinner";
import taskService from "@/services/task.service";
import { useQuery } from "@tanstack/react-query";

import { columns } from "./column";
import { DataTable } from "./DataTable";
import { Filter } from "./Filter";
import { PaginationWork } from "./Pagination";
import { workStore } from "./store";

const WorkList: React.FC = () => {
	const { query } = workStore((state) => state);
	const { data, isLoading } = useQuery({
		queryKey: ["works", query],
		queryFn: async () => {
			return (await taskService.getAll(query)).data;
		},
	});
	if (isLoading) return <LoadingSpinner />;
	if (!data) return <Empty />;
	return (
		<div className="bg-white flex flex-col gap-4">
			<Filter />
			<div>
				<DataTable columns={columns} data={data!} />
			</div>
			<PaginationWork />
		</div>
	);
};

export default WorkList;
