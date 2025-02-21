import React from "react";

import { WorkList } from "./ui";

const WorksPage: React.FC = () => {
	return (
		<div className="flex flex-col gap-4 ">
			<h4 className="text-xl font-semibold">Công việc hôm nay</h4>
			<WorkList />
		</div>
	);
};

export default WorksPage;
