import React from "react";

import { cn } from "@/lib/utils";

import { Skeleton } from "./skeleton";

type LoadingSpinnerProps = {
	className?: string;
};
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
	return (
		<div className={cn("flex flex-col space-y-3", className)}>
			<Skeleton className="h-[125px] w-full rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-full " />
				<Skeleton className="h-4 w-full" />
			</div>
		</div>
	);
};
export default LoadingSpinner;
