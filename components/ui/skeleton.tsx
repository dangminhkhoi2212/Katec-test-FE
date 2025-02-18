import { cn } from "@/lib/utils";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"animate-pulse delay-150 rounded-md bg-muted",
				className
			)}
			{...props}
		/>
	);
}

export { Skeleton };
