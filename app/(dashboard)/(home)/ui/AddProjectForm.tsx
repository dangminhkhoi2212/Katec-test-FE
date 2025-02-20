import dayjs from "dayjs";
import React from "react";
import { Control, useForm } from "react-hook-form";

import DateRangePickForm from "@/components/shared/Form/DateRangePickForm";
import SelectPriorityInput from "@/components/shared/Form/SelectPriorityForm";
import SelectStatusInput from "@/components/shared/Form/SelectStatusForm";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import projectService from "@/services/project.service";
import { Priority, Status, TProject, TProjectCrate, TResponse } from "@/types";
import { projectValidation } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectStore } from "./store";

type TForm = TProjectCrate;
const defaultValue: TForm = {
	name: "",
	startDate: dayjs().toISOString(),
	endDate: dayjs().add(1, "week").toISOString(),
	status: Status.NEW,
	priority: Priority.MEDIUM,
	description: "",
};

const AddProjectForm: React.FC = () => {
	const { setOpen } = projectStore((state) => state);
	const form = useForm<TForm>({
		resolver: yupResolver(projectValidation),
		defaultValues: defaultValue,
	});
	const queryClient = useQueryClient();
	const {
		control,
		reset,
		formState: { errors },
	} = form;
	console.log("🚀 ~ errors:", errors);
	const { toast } = useToast();

	const createProjectMutation = useMutation({
		mutationFn: async (data: TForm) => {
			return await projectService.create(data);
		},
		onSuccess(data: TResponse<TProject>) {
			console.log("🚀 ~ mutationFn:async ~ data:", data);
			queryClient.invalidateQueries({
				queryKey: ["projects"],
				refetchType: "all",
			});
			reset(defaultValue);
			setOpen(false);
			toast({ description: "Đã tạo dự án thành công." });
		},
		onError(error) {
			toast({
				variant: "destructive",
				description: "Đã có lỗi xảy ra",
			});
			console.log("🚀 ~ mutationFn:async ~ error:", error);
		},
	});

	const onSubmit = (data: TForm) => {
		console.log("🚀 ~ onSubmit ~ data:", data);
		createProjectMutation.mutate(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<FormField
					control={control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên dự án</FormLabel>
							<FormControl>
								<Input
									placeholder="Nhập tên dự án"
									{...field}
								/>
							</FormControl>
							<FormMessage>{errors.name?.message}</FormMessage>
						</FormItem>
					)}
				/>
				<DateRangePickForm
					control={control}
					nameStart="startDate"
					nameEnd="endDate"
					label="Khoảng thời gian"
					error={errors.startDate?.message || errors.endDate?.message}
				/>
				<SelectStatusInput<TForm>
					control={control}
					label="Trạng thái"
					name="status"
					error={errors.status?.message}
				/>
				<SelectPriorityInput
					control={control}
					name="priority"
					label="Độ ưu tiên"
					error={errors.priority?.message}
				/>
				<TextAreaInput
					control={control}
					label="Mô tả"
					error={errors.description?.message}
				/>
				<div className="flex justify-end mt-4">
					<Button
						type="submit"
						className="text-white"
						loading={createProjectMutation.isPending}
					>
						Tạo
					</Button>
				</div>
			</form>
		</Form>
	);
};

const TextAreaInput: React.FC<{
	control: Control<TForm>;
	label: string;
	error?: string;
}> = ({ control, label, error }) => {
	return (
		<FormField
			control={control}
			name="description"
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Textarea
							placeholder="Mô tả"
							className="resize-none"
							{...field}
						/>
					</FormControl>

					<FormMessage>{error}</FormMessage>
				</FormItem>
			)}
		/>
	);
};

export default AddProjectForm;
