import dayjs from "dayjs";
import React, { useEffect } from "react";
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
import taskService from "@/services/task.service";
import { Priority, Status, TResponse, TTask, TTaskCrate } from "@/types";
import { taskValidation } from "@/validations/task.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectDetailStore } from "./projectDetailStore";

type Props = { id: string };
type TForm = TTaskCrate;
const defaultValue: TForm = {
	name: "",
	employee: "",
	assignedDate: dayjs().toISOString(),
	dueDate: dayjs().add(1, "week").toISOString(),
	status: Status.NEW,
	priority: Priority.MEDIUM,
	description: "",
	project: "",
};

const AddTaskForm: React.FC<Props> = ({ id }) => {
	const { setOpen } = projectDetailStore((state) => state);
	const form = useForm<TForm>({
		resolver: yupResolver(taskValidation),
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

	useEffect(() => {
		return () => {
			reset({
				...defaultValue,
				project: id,
			});
		};
	}, [id, reset]);

	const createTaskMutation = useMutation({
		mutationFn: async (data: TForm) => {
			return await taskService.create({
				...data,
				project: id,
			});
		},
		onSuccess(data: TResponse<TTask>) {
			console.log("🚀 ~ mutationFn:async ~ data:", data);
			queryClient.invalidateQueries({
				queryKey: ["tasks", { project: id }],
				refetchType: "all",
			});
			reset(defaultValue);
			setOpen(false);
			toast({ description: "Đã thêm công việc mới." });
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
		createTaskMutation.mutate(data);
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
				<FormField
					control={control}
					name="employee"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên nhân viên</FormLabel>
							<FormControl>
								<Input
									placeholder="Nhập tên nhân viên"
									{...field}
								/>
							</FormControl>
							<FormMessage>
								{errors.employee?.message}
							</FormMessage>
						</FormItem>
					)}
				/>
				<DateRangePickForm
					control={control}
					nameStart="assignedDate"
					nameEnd="dueDate"
					label="Khoảng thời gian"
					error={
						errors.assignedDate?.message || errors.dueDate?.message
					}
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
				<div className="flex justify-end ">
					<Button
						type="submit"
						className="text-white"
						loading={createTaskMutation.isPending}
					>
						Thêm
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

export default AddTaskForm;
