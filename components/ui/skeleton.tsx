import { cn } from "@/lib/utils";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"animate-pulse delay-150 rounded-md bg-muted bg-slate-300",
				className
			)}
			{...props}
		/>
	);
}

export { Skeleton };
