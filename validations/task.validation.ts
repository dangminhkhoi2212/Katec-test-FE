import * as yup from "yup";

import { REQURIED_KEY } from "@/constants";
import { Priority, Status } from "@/types";

export const taskValidation = yup.object({
	name: yup.string().max(250).required(REQURIED_KEY),
	employee: yup.string().max(30).required(REQURIED_KEY),
	assignedDate: yup.string().required(REQURIED_KEY),
	dueDate: yup.string().required(REQURIED_KEY),
	description: yup.string().max(2000),
	project: yup.string().required(REQURIED_KEY),
	status: yup
		.mixed<Status>()
		.oneOf(Object.values(Status), REQURIED_KEY)
		.required(REQURIED_KEY),
	priority: yup
		.mixed<Priority>()
		.oneOf(Object.values(Priority), REQURIED_KEY)
		.required(REQURIED_KEY),
});
export const updateTaskValidation = taskValidation.concat(
	yup.object({
		_id: yup.string(),
	})
);
