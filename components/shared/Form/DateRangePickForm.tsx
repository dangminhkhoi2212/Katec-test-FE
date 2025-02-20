import { CalendarIcon } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/utils";

type DateRangePickFormProps<T extends FieldValues> = {
	control: Control<T>;
	nameStart: Path<T>;
	nameEnd: Path<T>;
	label: string;
	error?: string;
};

const DateRangePickForm = <T extends FieldValues>({
	control,
	nameStart,
	nameEnd,
	label,
	error,
}: DateRangePickFormProps<T>) => {
	return (
		<FormField
			control={control}
			name={nameStart}
			render={({ field: startField }) => (
				<FormField
					control={control}
					name={nameEnd}
					render={({ field: endField }) => (
						<FormItem className="flex flex-col !w-56">
							<FormLabel>{label}</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											className=" pl-3 text-left font-normal"
										>
											{startField.value &&
											endField.value ? (
												`${formatDate(
													startField.value,
													{ removeTime: true }
												)} - ${formatDate(
													endField.value,
													{ removeTime: true }
												)}`
											) : (
												<span>Chọn khoảng ngày</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0"
									align="start"
								>
									<Calendar
										mode="range"
										selected={{
											from: startField.value
												? new Date(startField.value)
												: undefined,
											to: endField.value
												? new Date(endField.value)
												: undefined,
										}}
										onSelect={(range) => {
											startField.onChange(
												range?.from || null
											);
											endField.onChange(
												range?.to || null
											);
										}}
										disabled={(date) =>
											date.getTime() <
											new Date().setHours(0, 0, 0, 0)
										}
										numberOfMonths={2}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage>{error}</FormMessage>
						</FormItem>
					)}
				/>
			)}
		/>
	);
};

export default DateRangePickForm;
