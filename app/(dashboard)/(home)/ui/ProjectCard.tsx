import React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TProject } from "@/types";
import { formatDate } from "@/utils/format.util";

type Props = { project: TProject };

const ProjectCard: React.FC<Props> = ({ project }) => {
	return (
		<Card className="w-full h-fit">
			<CardHeader>
				<CardTitle className="text-sm">{project.name}</CardTitle>
				<CardContent className="p-0 m-0">
					<div className="text-xs ">
						{formatDate(project.startDate, { removeTime: true })} -{" "}
						{formatDate(project.endDate, { removeTime: true })}
					</div>
					<div></div>
				</CardContent>
				<CardDescription>{project.description}</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default ProjectCard;
