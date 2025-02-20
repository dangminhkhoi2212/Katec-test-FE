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
import { Status } from "@/types";

type SelectStatusInputProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label: string;
	error?: string;
};

const SelectStatusInput = <T extends FieldValues>({
	control,
	name,
	label,
	error,
}: SelectStatusInputProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				console.log("🚀SelectStatusInputProps ~ field:", field.value);

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
								<SelectTrigger>
									<SelectValue placeholder="Lựa chọn trạng thái" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value={Status.NEW.toString()}>
									Mới
								</SelectItem>
								<SelectItem
									value={Status.IN_PROGRESS.toString()}
								>
									Đang xử lí
								</SelectItem>
								<SelectItem value={Status.DONE.toString()}>
									Hoàn thành
								</SelectItem>
								<SelectItem value={Status.LATE.toString()}>
									Trễ
								</SelectItem>
							</SelectContent>
						</Select>

						<FormMessage>{error}</FormMessage>
					</FormItem>
				);
			}}
		/>
	);
};

export default SelectStatusInput;
