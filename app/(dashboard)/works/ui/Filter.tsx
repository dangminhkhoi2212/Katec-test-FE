"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils";

import { workStore } from "./store";

export function Filter() {
	const [open, setOpen] = React.useState<boolean>(false);
	const { query, setQuery } = workStore((state) => state);
	const handleOnChange = (date) => {
		setOpen(false);
		setQuery({ date: date.toISOString() });
	};
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!query.date && "text-muted-foreground"
					)}
				>
					<CalendarIcon />
					{query.date ? (
						formatDate(query.date, {
							removeTime: true,
						})
					) : (
						<span>Chọn ngày</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={query.date ? new Date(query.date) : new Date()}
					onSelect={handleOnChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
