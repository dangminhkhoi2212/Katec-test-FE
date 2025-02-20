"use client";
import React from "react";

import { AddProjectButton, ListProject } from "./ui";

type Props = Record<string, never>;

const HomePage: React.FC<Props> = ({}) => {
	return (
		<div className="flex flex-col gap-4 h-full">
			<div className="flex justify-between items-center p-2 bg-white rounded-lg">
				<h4 className="text-xl font-semibold">Quản lý dự án</h4>
				<AddProjectButton />
			</div>
			<ListProject className="flex-grow" />
		</div>
	);
};

export default HomePage;
