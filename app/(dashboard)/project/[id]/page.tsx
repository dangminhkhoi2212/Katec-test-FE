import React from "react";

import { TaskList, UpdateProjectForm } from "./ui";

type Props = { params: { id: string } };

const DetailPage: React.FC<Props> = async ({ params }) => {
	const { id } = await params;
	return (
		<div className="flex flex-col gap-4 w-full">
			<UpdateProjectForm id={id} />
			<TaskList id={id} />
		</div>
	);
};

export default DetailPage;
