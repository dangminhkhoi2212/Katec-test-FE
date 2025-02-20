import Link from "next/link";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/routes";
import { TProject } from "@/types";
import { priorityBage } from "@/utils";
import { formatDate } from "@/utils/format.util";

type Props = { project: TProject };

const ProjectCard: React.FC<Props> = ({ project }) => {
	return (
		<Link href={routes.project(project._id)}>
			<Card className="w-full hover:shadow-md hover:transition-shadow">
				<CardHeader>
					<CardTitle className="text-sm">{project.name}</CardTitle>
					<CardContent className="p-0 m-0 flex flex-col gap-2">
						<p className="text-xs ">
							{formatDate(project.startDate, {
								removeTime: true,
							})}{" "}
							-{" "}
							{formatDate(project.endDate, { removeTime: true })}
						</p>
						<div>{priorityBage[project.priority]}</div>
					</CardContent>
				</CardHeader>
			</Card>
		</Link>
	);
};

export default ProjectCard;
