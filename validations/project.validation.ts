import * as yup from "yup";

import { REQURIED_KEY } from "@/constants";
import { Priority, Status } from "@/types";

export const projectValidation = yup.object({
	name: yup.string().max(250).required(REQURIED_KEY),
	startDate: yup.string().required(REQURIED_KEY),
	endDate: yup.string().required(REQURIED_KEY),
	description: yup.string().max(2000),
	status: yup
		.mixed<Status>()
		.oneOf(Object.values(Status), REQURIED_KEY)
		.required(REQURIED_KEY),
	priority: yup
		.mixed<Priority>()
		.oneOf(Object.values(Priority), REQURIED_KEY)
		.required(REQURIED_KEY),
});
export const updateProjectValidation = projectValidation.concat(
	yup.object({
		_id: yup.string(),
	})
);
