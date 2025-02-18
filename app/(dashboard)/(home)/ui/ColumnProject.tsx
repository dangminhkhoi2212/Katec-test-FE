import React from "react";

import Empty from "@/components/shared/Empty";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import projectService from "@/services/project.service";
import { Status } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQueries } from "@tanstack/react-query";

import ProjectCard from "./ProjectCard";
import SkeletonCard from "./SkeletonCard";

type Props = {
	title: string;
	status: Status;
	color: string;
};

const ColumnProject: React.FC<Props> = ({ title, color, status }) => {
	const [{ data, isLoading }] = useQueries({
		queries: [
			{
				queryKey: [status],
				queryFn: async () => {
					return await projectService.getAll({
						status,
					});
				},
			},
		],
	});
	return (
		<div className="flex flex-col gap-2">
			<h4
				className={cn(
					"scroll-m-20 text-lg tracking-tight px-3 py-1 rounded-md",
					color
				)}
			>
				{title}
			</h4>
			<Separator />
			<SkeletonCard />

			{isLoading ? (
				<SkeletonCard />
			) : (
				<ScrollArea className="h-full w-full ">
					{data?.data?.length ? (
						data?.data?.map((project, index) => (
							<ProjectCard
								key={project?.id ?? index}
								project={project}
							/>
						))
					) : (
						<Empty />
					)}
				</ScrollArea>
			)}
		</div>
	);
};

export default ColumnProject;
