import { useMemo } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Priority } from "@/types";

type SelectPriorityInputProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label: string;
	error?: string;
};

const SelectPriorityInput = <T extends FieldValues>({
	control,
	name,
	label,
	error,
}: SelectPriorityInputProps<T>) => {
	// Lưu danh sách priority vào useMemo để tránh re-render không cần thiết
	const priorityOptions = useMemo(
		() => [
			{ value: Priority.LOW, label: "Thấp" },
			{ value: Priority.MEDIUM, label: "Trung bình" },
			{ value: Priority.HIGH, label: "Cao" },
		],
		[]
	);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				console.log("🚀 SelectPriorityInput ~ field:", field.value);

				return (
					<FormItem className="w-56">
						<FormLabel>{label}</FormLabel>
						<Select
							onValueChange={(value) => {
								if (value) {
									field.onChange(value);
								}
							}}
							value={field.value}
						>
							<FormControl>
								<SelectTrigger {...field}>
									<SelectValue placeholder="Lựa chọn độ ưu tiên" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{priorityOptions.map((option) => (
									<SelectItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FormMessage>{error}</FormMessage>
					</FormItem>
				);
			}}
		/>
	);
};

export default SelectPriorityInput;
