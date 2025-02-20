"use client";
import dayjs from "dayjs";
import { Layers, Pencil } from "lucide-react"; // Thêm icon
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
import projectService from "@/services/project.service";
import { Priority, Status, TProject, TProjectCrate, TResponse } from "@/types";
import { projectValidation } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DeleteButtonForm from "./DeleteButtonForm";

type TProps = { id: string };
type TForm = TProjectCrate;
const defaultValue: TForm = {
	name: "",
	startDate: dayjs().toISOString(),
	endDate: dayjs().add(1, "week").toISOString(),
	status: Status.NEW,
	priority: Priority.MEDIUM,
	description: "",
};
const dataFilter = (data: TProject): TForm => {
	return {
		name: data.name,
		startDate: data.startDate,
		endDate: data.endDate,
		status: data.status,
		priority: data.priority,
		description: data.description,
	};
};

const UpdateProjectForm: React.FC<TProps> = ({ id }) => {
	const form = useForm<TForm>({
		resolver: yupResolver(projectValidation),
		defaultValues: defaultValue,
	});
	const {
		control,
		reset,
		formState: { errors },
	} = form;

	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { data: project, isLoading } = useQuery({
		queryKey: ["update-project", id],
		queryFn: () => {
			return projectService.getOneById(id);
		},
	});

	useEffect(() => {
		if (project?.data) {
			const newData = project.data;
			if (JSON.stringify(newData) !== JSON.stringify(form.getValues())) {
				console.log("🚀 ~ reset:", dataFilter(newData));
				reset(dataFilter({ ...newData }));
			}
		}
	}, [isLoading, project?.data, reset]);

	const updateProjectMutation = useMutation({
		mutationFn: (data: TForm) => {
			console.log("🚀 ~ data:", data);
			return projectService.update(id, data);
		},
		async onSuccess(data: TResponse<TProject>) {
			console.log("🚀 ~ onSuccess ~ data:", data);
			queryClient.invalidateQueries({
				queryKey: ["projects"],
				refetchType: "all",
			});
			toast({ description: "Đã cập nhật dự án thành công." });
		},
		onError() {
			toast({
				variant: "destructive",
				description: "Đã có lỗi xảy ra",
			});
		},
	});

	const onSubmit = (data: TForm) => {
		updateProjectMutation.mutate(data);
	};

	return (
		<div className="min-h-96 min-w-full ">
			<Form {...form}>
				{/* {isLoading ? (
					<div className="flex flex-col gap-6">
						<h3 className="text-2xl font-semibold">
							Thông tin dự án
						</h3>
						<LoadingSpinner />
					</div>
				) : ( */}
				<form
					onSubmit={form.handleSubmit((data) => onSubmit(data))}
					className=" bg-white rounded-lg flex flex-col gap-6 p-4"
				>
					<div className="flex justify-between items-center">
						<h3 className="text-2xl font-semibold">
							Thông tin dự án
						</h3>
						<div className="flex justify-end gap-2">
							<DeleteButtonForm id={id} />
							<Button
								type="submit"
								className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2"
								loading={updateProjectMutation.isPending}
							>
								<Pencil size={16} />
								Cập nhật dự án
							</Button>
						</div>
					</div>
					<FormField
						control={control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-700 flex items-center gap-2">
									<Layers size={16} /> Tên dự án
								</FormLabel>
								<FormControl>
									<Input
										className="border-gray-300 focus:ring-2 focus:ring-blue-500"
										placeholder="Nhập tên dự án"
										{...field}
									/>
								</FormControl>
								<FormMessage>
									{errors.name?.message}
								</FormMessage>
							</FormItem>
						)}
					/>
					<div className="grid gird-cols-1 lg:grid-cols-5 gap-6">
						<div className="col-span-1 flex flex-col justify-between gap-4">
							{/* Khoảng thời gian */}
							<DateRangePickForm
								control={control}
								nameStart="startDate"
								nameEnd="endDate"
								label="Khoảng thời gian"
								error={
									errors.startDate?.message ||
									errors.endDate?.message
								}
							/>

							{/* Trạng thái */}
							<SelectStatusInput<TForm>
								control={control}
								label="Trạng thái"
								name="status"
								error={errors.status?.message}
							/>

							{/* Độ ưu tiên */}
							<SelectPriorityInput
								control={control}
								name="priority"
								label="Độ ưu tiên"
								error={errors.priority?.message}
							/>
						</div>
						<div className="col-span-4">
							{/* Mô tả */}
							<TextAreaInput
								control={control}
								label="Mô tả"
								error={errors.description?.message}
							/>
						</div>
					</div>

					{/* Button */}
				</form>
			</Form>
		</div>
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
				<FormItem className="h-full">
					<FormLabel className="text-gray-700 flex items-center gap-2">
						<Pencil size={16} /> {label}
					</FormLabel>
					<FormControl>
						<Textarea
							placeholder="Mô tả dự án..."
							className=" border-gray-300 focus:ring-2 focus:ring-blue-500"
							{...field}
						/>
					</FormControl>

					<FormMessage>{error}</FormMessage>
				</FormItem>
			)}
		/>
	);
};

export default UpdateProjectForm;
