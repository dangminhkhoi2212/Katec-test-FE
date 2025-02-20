"use client";
import React from "react";

import Empty from "@/components/shared/Empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import projectService from "@/services/project.service";
import { Status } from "@/types";
import { useQueries } from "@tanstack/react-query";

import ProjectCard from "./ProjectCard";
import SkeletonCard from "./SkeletonCard";
import { projectStore } from "./store";

type Props = {
	title: React.ReactNode;
	status: Status;
	statusColor: string;
};

const ColumnProject: React.FC<Props> = ({ title, status }) => {
	const { query } = projectStore((state) => state);

	const [{ data, isLoading }] = useQueries({
		queries: [
			{
				queryKey: ["projects", status, query],
				queryFn: async () => {
					return await projectService.getAll({
						status,
						...query,
					});
				},
			},
		],
	});
	return (
		<div className="flex flex-col gap-2 h-full">
			{/* <h4
				className={cn(
					statusColor,
					"scroll-m-20 text-lg tracking-tight px-3 py-1 rounded-md"
				)}
			>
				{title}
			</h4> */}
			{title}
			<Separator />

			<ScrollArea className="h-0 flex-grow w-full  ">
				{isLoading ? (
					<SkeletonCard />
				) : (
					<div className="flex flex-col gap-2">
						{data?.data?.length ? (
							data?.data?.map((project, index) => (
								<ProjectCard
									key={project?._id ?? index}
									project={project}
								/>
							))
						) : (
							<Empty />
						)}
					</div>
				)}
			</ScrollArea>
		</div>
	);
};

export default ColumnProject;
