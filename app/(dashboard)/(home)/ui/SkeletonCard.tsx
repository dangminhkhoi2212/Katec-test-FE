import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

type Props = Record<string, unknown>;

const SkeletonCard: React.FC<Props> = ({}) => {
	return (
		<div className="flex flex-col space-y-3">
			<Skeleton className="h-[125px] w-full rounded-xl" />
		</div>
	);
};

export default SkeletonCard;
